<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>角色菜单授权</v-toolbar-title>
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
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="editedItem.roleId" label="角色ID" :items="roleInfo" item-text="value" item-value="key" ></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 >
                                    <v-select v-model="editedItem.menuId" label="菜单ID" :items="muneInfo" item-text="value" item-value="key"></v-select>
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
        <v-data-table :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" :headers="headers" :items="desserts" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.roleId }}</td>
                <td>{{ props.item.menuId }}</td>
                <td>
                    <v-tooltip right color="red" style="margin-left: -20px">
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
    import {getPkListRf} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getSysInfoByUser} from "@/api/url/prodInfo";

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            headers: [
                {text: '角色ID'},
                {text: '菜单ID',sortable: false,size: "medium"},
                { text: 'Action',sortable: false }
            ],
            muneRef: [{key: "",value: ""}],
            roleRef: [{key: "",value: ""}],
            roleInfo: [],
            muneInfo: [],
            columnInfo: [],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "menuId"
                },
                {
                    key: "true",
                    dataIndex: "roleId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                roleId: '',
                menuId: ''
            },
            defaultItem: {
                roleId: '',
                menuId: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增角色菜单关系' : '修改角色菜单关系'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initRf()
        },

        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.menuRoleInfo;
                    let menu = response.data.data.columnInfo;
                    let role = response.data.data.roleInfo;
                    for (let index in menu){
                        let info = {}
                        info['key'] = menu[index].menuId;
                        info['value'] = info['key']+"-"+menu[index].menuTitle;
                        that.muneInfo.push(info)

                    }
                    for(let j=0; j<role.length; j++){
                        let info = {}
                        info['key'] = role[j].roleId;
                        info['value'] = info['key']+"-"+role[j].roleDesc;
                        that.roleInfo.push(info)
                    }


                    /*for(let i=0; i<menu.length; i++){

                    }*/
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            addClick() {
                this.disabled = "false"
            },
            initRf() {
                //装载菜单列表
                let tempMenu = {}
                let that = this
                tempMenu["tableName"] = "OM_MENU";
                tempMenu["columnCode"] = "MENU_ID";
                tempMenu["columnDesc"] = "MENU_TITLE"
                getPkList(tempMenu,response => {
                    that.muneRef = response
                });
                //装载角色列表
                let tempRole = {}
                tempRole["tableName"] = "OM_ROLE";
                tempRole["columnCode"] = "ROLE_ID";
                tempRole["columnDesc"] = "ROLE_NAME"
                getPkList(tempRole,response => {
                    that.roleRef = response
                });
            },
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                var del=confirm('Are you sure you want to delete this item?');
                if(del==true) {
                    this.desserts.splice(index, 1)
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_MENU_ROLE"
                    this.backValue.keySet = "ROLE_ID,MENU_ID"
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            toast.success("提交成功！");
                        }
                    })
                }
                this.initialize()
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
                    if (this.editedItem.roleId == this.desserts[i].roleId&&this.editedItem.menuId == this.desserts[i].menuId) {
                        equals = true;
                    }
                }
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                if(this.editedItem.roleId==[]){
                    alert("角色ID不能为空")
                }else if(this.editedItem.menuId==[]){
                    alert("菜单ID不能为空")
                }else if(equals==true){
                    alert("该权限已存在")
                }else{
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_MENU_ROLE"
                    this.backValue.keySet = "ROLE_ID,MENU_ID"
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            toast.success("提交成功！");
                        }
                    })
                    this.close()
                }
                this.initialize()
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
                this.backValue.tableName = "OM_MENU_ROLE"
                this.backValue.keySet = "ROLE_ID,MENU_ID"
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