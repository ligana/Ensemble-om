<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>用户角色授权</v-toolbar-title>
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
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-select v-model="editedItem.userId" label="用户" :items="userInfo" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-select v-model="editedItem.userId" label="用户" :items="userInfo" item-text="value" item-value="key" disabled></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="editedItem.roleId" label="角色" :items="roleInfo" item-text="value" item-value="key"></v-select>
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
                <td>{{ props.item.roleId }}</td>
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

    export default {
        props: ["title"],
        data: () => ({
            disabled: "false",

            dialog: false,
            headers: [
                { text: '用户ID',sortable: false},
                { text: '角色ID',sortable: false },
                { text: 'Action',sortable: false }
            ],
            userInfo: [],
            roleInfo: [],
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
                userId: "",
                roleId: ""
            },
            defaultItem: {
                userId: "",
                roleId: ""
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增用户角色关系' : '修改用户角色关系'
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
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.userRoleInfo;
                    let user = response.data.data.userInfo
                    let role = response.data.data.roleInfo
                    for(let i=0; i<user.length; i++) {
                        let info = {}
                        info['key'] = user[i].userId
                        info['value'] = user[i].userId
                        that.userInfo.push(info)
                    }
                    for(let j=0; j<role.length; j++) {
                        let info = {}
                        info['key'] = role[j].roleId
                        info['value'] = role[j].roleId+"-"+role[j].roleDesc
                        that.roleInfo.push(info)
                    }
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            addClick() {
                this.disabled = "false"
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";

            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                this.$swal({
                    title: 'Are you sure?',
                    text: "Are you sure you want to delete this item?",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value){
                        this.desserts.splice(index, 1)
                        this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                        this.backValue.userName = sessionStorage.getItem("userId")
                        this.backValue.tableName = "OM_USER_ROLE"
                        this.backValue.keySet = "USER_ID"
                        this.sourceData = this.copy(this.desserts,this.sourceData)
                        saveSysTable(this.backValue).then(response => {
                            if(response.status === 200){
                                this.sweetAlert('success',"提交成功!")
                            }
                        })
                    }
                })
                //this.initialize()
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
                for (let i = 0; i < this.desserts.length; i++) {
                    if (this.editedItem.userId == this.desserts[i].userId) {
                        equals = true;
                    }
                }
                if (this.editedIndex > -1) {
                    equals=false;
                }
                if(this.editedItem.userId == []){
                    this.sweetAlert('error',"用户名称不能为空!")
                }else if(this.editedItem.roleId == []){
                    this.sweetAlert('error',"角色ID不能为空!")
                }else if(equals==true){
                    this.sweetAlert('error', "该用户已存在!")
                }else{
                    if (this.editedIndex > -1) {
                        Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    } else {
                        this.desserts.push(this.editedItem)
                    }
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_USER_ROLE"
                    this.backValue.keySet = "USER_ID"
                    this.sourceData = this.copy(this.desserts,this.sourceData)
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            this.sweetAlert('success',"提交成功!")
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