<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>参数系统权限管理</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white;margin-left: 100px">添加</td>
                </v-btn>
                <v-card>
                    <v-card-title>
                        <span style="color: #00b0ff;font-size: x-large;margin-left: 5%">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text style="margin-top: -10%">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-select v-model="editedItem.userId" label="用户名称" :items="user" item-text="value" item-value="key" disabled></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-select v-model="editedItem.systemId" label="系统ID" :items="sys" item-text="value" item-value="key" disabled></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-select v-model="editedItem.modelId" label="模块ID" :items="model" item-text="value" item-value="key" disabled></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-select v-model="editedItem.userId" label="用户名称" :items="user" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-select v-model="editedItem.systemId" label="系统ID" :items="sys" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-select v-model="editedItem.modelId" label="模块ID" :items="model" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.permLevel" label="权限等级"></v-text-field>
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
                <td>{{ props.item.systemId }}</td>
                <td>{{ props.item.modelId }}</td>
                <td>{{ props.item.permLevel }}</td>
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
                { text: '系统ID',sortable: false},
                { text: '模块ID',sortable: false },
                { text: '权限等级',sortable: false },
                { text: 'Action',sortable: false }
            ],
            user: [],
            sys: [],
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
                    dataIndex: "systemId"
                },
                {
                    key: "true",
                    dataIndex: "modelId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                userId: '',
                systemId: '',
                modelId: '',
                permLevel: ''
            },
            defaultItem: {
                userId: '',
                systemId: '',
                modelId: '',
                permLevel: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增用户参数权限' : '修改用户参数权限'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initParentRef()
        },

        methods: {
            initialize () {
                let that = this
                getSysTable("OM_PARAM_PERM_DEF").then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            addClick() {
                this.disabled = "false"
            },
            initParentRef() {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //用户id备选数据加载
                getSysInfoByUser(userId).then(function (response) {
                    //初始化 新增时候  父级菜单信息
                    that.userInfo = response.data.data.userInfo;
                    for(let i=0; i<that.userInfo.length; i++){
                        let temp={}
                        temp["key"] = that.userInfo[i].userId;
                        temp["value"] = that.userInfo[i].userId + "-" + that.userInfo[i].userName;
                        that.user.push(temp)
                    }
                });
                //获取系统信息
                getSysTable("OM_SYSTEM_ORG").then(function (response) {
                    let sysInfo = response.data.data.columnInfo;
                    for(let index in sysInfo){
                        let temp = {};
                        temp["key"] = sysInfo[index].systemId;
                        temp["value"] = sysInfo[index].systemId + "-" + sysInfo[index].systemDesc;
                        that.sys.push(temp);
                    }
                });
                //获取模块信息
                getSysTable("OM_MODULE_ORG").then(function (response) {
                    let moduleInfo = response.data.data.columnInfo;
                    for(let index in moduleInfo){
                        let temps = {};
                        temps["key"] = moduleInfo[index].moduleId;
                        temps["value"] = moduleInfo[index].moduleId + "-" + moduleInfo[index].moduleDesc;
                        that.model.push(temps);
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
                this.backValue.tableName = "OM_PARAM_PERM_DEF"
                this.backValue.keySet = "USER_ID,SYSTEM_ID,MODEL_ID"
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
                this.backValue.tableName = "OM_PARAM_PERM_DEF"
                this.backValue.keySet = "USER_ID,SYSTEM_ID,MODEL_ID"
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