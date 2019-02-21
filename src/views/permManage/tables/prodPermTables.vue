<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>产品工厂权限管理</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white;margin-left: 100px">添加</td>
                </v-btn>
                <v-card style="padding-bottom: 20px;">
                    <v-card-title>
                        <span style="color: #00b0ff;font-size: x-large;margin-left: 5%">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text style="margin-top: -10%;">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-select v-model="editedItem.userId" label="用户名称" :items="user" item-text="value" item-value="key" disabled></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-select v-model="editedItem.modelType" label="模块信息" :items="model" item-text="value" item-value="key" disabled></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-select v-model="editedItem.userId" label="用户名称" :items="user" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-select v-model="editedItem.modelType" label="模块信息" :items="model" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="editedItem.baseProdLevel" label="基础产品权限设置" :items="permLevel" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="editedItem.soldProdLevel" label="可售产品权限设置" :items="permLevel" item-text="value" item-value="key"></v-select>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions style="margin-top: -7%">
                        <v-btn color="info" @click="close" class="bthStyle" style="margin-left: 6%">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="save" class="bthStyle" style="margin-right: 6%">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.userId }}</td>
                <td>{{ props.item.modelType }}</td>
                <td>{{ props.item.baseProdLevel }}</td>
                <td>{{ props.item.soldProdLevel }}</td>
                <td>
                    <v-tooltip bottom color="blue" style="margin-left: -20px">
                        <v-btn flat icon="edit" slot="activator">
                            <v-icon small class="mr-2" @click="editItem(props.item)" style="color: #0d47a1">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -20px">
                        <v-btn flat icon="delete" slot="activator">
                            <v-icon small @click="deleteItem(props.item)" style="color: red">delete</v-icon>
                        </v-btn>
                        <span>删除</span>
                    </v-tooltip>
                </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getSysInfoByUser} from "@/api/url/prodInfo";
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            headers: [
                { text: '用户名称',sortable: false},
                { text: '模块信息',sortable: false},
                { text: '基础产品权限',sortable: false },
                { text: '可售产品权限',sortable: false },
                { text: 'Action',sortable: false }

            ],
            permLevel: [
                {
                    key: "1",
                    value: "可编辑可修改查看",
                },
                {
                    key: "2",
                    value: "可修改查看",
                },
                {
                    key: "3",
                    value: "查看",
                }
            ],
            user: [],
            userInfo: [],
            prodClass: [],
            model: [],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "userId"
                },
                {
                    key: "true",
                    dataIndex: "modelType"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                userId: '',
                modelType: '',
                baseProdLevel: '',
                soldProdLevel: ''
            },
            defaultItem: {
                userId: '',
                modelType: '',
                baseProdLevel: '',
                soldProdLevel: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增用户产品工厂权限' : '修改用户产品工厂权限'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initRef()
        },

        methods: {
            initialize () {
                let that = this
                getSysTable("OM_PROD_PERM_DEF").then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            addClick() {
                this.disabled = "false"
            },
            initRef() {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //用户id备选数据加载
                getSysInfoByUser(userId).then(function (response) {
                    //初始化 新增时候  父级菜单信息
                    that.userInfo = response.data.data.userInfo;
                    for(let i=0; i<that.userInfo.length; i++){
                        let temp={}
                        temp["key"] = that.userInfo[i].userId
                        temp["value"] = that.userInfo[i].userName
                        that.user.push(temp)
                    }
                });
                //所属模块备选数据加载
                getParamTable("MB_PROD_CLASS").then(function (response) {
                    that.prodClass = response.data.data.columnInfo;
                    for(let k=0; k<that.prodClass.length; k++){
                        if(that.prodClass[k].PROD_CLASS_LEVEL === "1"){
                            let temp={}
                            temp["key"] = that.prodClass[k].PROD_CLASS
                            temp["value"] = that.prodClass[k].PROD_CLASS_DESC
                            that.model.push(temp)
                        }
                    }
                });
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";

            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                //保存数据落库
                this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                this.backValue.userName = sessionStorage.getItem("userId")
                this.backValue.tableName = "OM_PROD_PERM_DEF"
                this.backValue.keySet = "USER_ID,MODEL_TYPE"
                saveSysTable(this.backValue).then(response => {
                    if(response.status === 200){
                    toast.success("提交成功！");
                }
                 })
                this.close()
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
            saveClick() {
                //保存数据落库
                this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                this.backValue.userName = sessionStorage.getItem("userId")
                this.backValue.tableName = "OM_PROD_PERM_DEF"
                this.backValue.keySet = "USER_ID,MODEL_TYPE"
                saveSysTable(this.backValue).then(response => {
                    if(response.status === 200){
                        toast.success("提交成功！");
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .ee{
        font-size: medium;
    }
    .bthStyle {
        color: #00b0ff;
        width: 120px;
    }
</style>