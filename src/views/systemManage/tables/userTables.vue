<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>用户管理</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white;margin-left: 100px">添加</td>
                </v-btn>

                <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text style="padding-top: 0px">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.userId" label="用户ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.userId" label="用户ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.userName" label="用户名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.parentUserId" label="父级用户" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.userLevel" label="用户级别"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.branch" label="所属部门"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.company" label="法人代码" :items="fmCompany" item-text="value" item-value="key"></v-select>
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
                <td>{{ props.item.userName }}</td>
                <td>{{ props.item.parentUserId }}</td>
                <td>{{ props.item.userLevel }}</td>
                <td>{{ props.item.branch }}</td>
                <td>{{ props.item.company }}</td>
                <td>
                    <v-tooltip bottom color="blue" style="margin-left: -20px">
                        <v-btn flat icon="edit" slot="activator" @click="editItem(props.item)">
                            <v-icon small class="mr-2" style="color: #0d47a1">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -20px">
                        <v-btn flat icon="delete" slot="activator" @click="deleteItem(props.item)">
                            <v-icon small style="color: red">delete</v-icon>
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
    import {getTableColumnInfo} from '@/api/url/prodInfo';


    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            fmCompany: [],
            headers: [
                {text: '用户ID',sortable: false},
                { text: '用户名称',sortable: false},
                { text: '父级用户ID',sortable: false },
                { text: '用户等级',sortable: false },
                { text: '所属部门',sortable: false },
                { text: '所属法人',sortable: false},
                { text: 'Action',sortable: false }

            ],
            perent: [{key: "",value: ""}],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "userId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                userId: '',
                userName: '',
                parentUserId: '',
                userLevel: '',
                branch: '',
                company: '',
                password: ''
            },
            defaultItem: {
                userId: '',
                userName: '',
                parentUserId: '',
                userLevel: '',
                branch: '',
                company: '',
                password: ''
            },
            backValue: {},
            index: '',
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增用户' : '修改用户'
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
            this.initClassAndFm()
        },

        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //增加用户 父级用户默认为本身
                that.editedItem.parentUserId = userId
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.userInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            //法人代码,参数分类
            initClassAndFm() {
                let that = this
                getTableColumnInfo().then(function (response) {
                    let fm = response.data.data.fmCompany
                    for(let i=0; i<fm.length; i++){
                        let temp = {}
                        temp["key"] = fm[i].company
                        temp["value"] = fm[i].companyName
                        that.fmCompany.push(temp)
                    }
                });
            },
            addClick() {
                this.disabled = "false"
            },
            initParentRef() {
                let temp = {}
                let that = this
                temp["tableName"] = "OM_USER";
                temp["columnCode"] = "USER_ID";
                temp["columnDesc"] = "USER_NAME"
                getPkList(temp,response => {
                    that.perent = response
            });
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";
            },

            deleteItem (item) {
                this.index = this.desserts.indexOf(item)
                this.$swal({
                    title: 'Are you sure?',
                    text: "Are you sure you want to delete this item?",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.desserts.splice(this.index, 1)
                        this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                        this.backValue.userName = sessionStorage.getItem("userId")
                        this.backValue.tableName = "OM_USER"
                        this.backValue.keySet = "USER_ID"
                        this.sourceData = this.copy(this.desserts,this.sourceData)
                        saveSysTable(this.backValue).then(response => {
                            if(response.status === 200){
                                this.sweetAlert('success', "提交成功!")
                            }
                        })
                    }
                })
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            },

            save () {
                let equals = false;
                for (let i = 0; i < this.sourceData.length; i++) {
                    if (this.editedItem.userId == this.sourceData[i].userId) {
                        equals = true;
                    }
                }
                if (this.editedIndex > -1) {
                    equals = false;
                }
                if(this.editedItem.userId == []){
                    this.sweetAlert('error', "用户ID不能为空!")
                }else if(this.editedItem.userName == []){
                    this.sweetAlert('error', "用户名称不能为空!")
                }else if(this.editedItem.userLevel == []){
                    this.sweetAlert('error', "用户级别不能为空!")
                }else if(equals==true){
                    this.sweetAlert('error', "角色ID不能与已存在的角色ID相同!")
                }else{
                    if (this.editedIndex > -1) {
                        Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    } else {
                        this.editedItem.password = "123456"
                        this.desserts.push(this.editedItem)
                    }
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_USER"
                    this.backValue.keySet = "USER_ID"
                    this.sourceData = this.copy(this.desserts,this.sourceData)
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            this.sweetAlert('success', "提交成功!")
                        }
                    })
                    this.close()
                }
                //this.initialize()
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