<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>角色管理</v-toolbar-title>
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
                                    <v-text-field v-model="editedItem.roleId" label="角色ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.roleId" label="角色ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.roleName" label="角色名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.roleDesc" label="角色描述"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.roleLevel" label="角色等级"></v-text-field>
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
                <td>{{ props.item.roleName }}</td>
                <td>{{ props.item.roleDesc }}</td>
                <td>{{ props.item.roleLevel }}</td>
                <td>
                    <v-tooltip bottom color="blue" style="margin-left: -20px">
                        <v-btn flat icon="edit" slot="activator" @click="editItem(props.item)">
                            <v-icon small class="mr-2" style="color: #0d47a1">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="blue" style="margin-left: -20px">
                        <v-btn flat icon="widgets" slot="activator" @click="authorization(props.item)">
                            <v-icon small class="mr-2" style="color: #0d47a1">widgets</v-icon>
                        </v-btn>
                        <span>授权</span>
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
            menuRole: [],
            copMenuRole: [],
            dialog: false,
            headers: [
                { text: '角色ID',sortable: false},
                { text: '角色名称',sortable: false },
                { text: '角色描述',sortable: false },
                { text: '角色适用等级',sortable: false },
                { text: 'Action',sortable: false }
            ],
            headers2: [
                { text: '菜单id', sortable: false},
                { text: '父菜单id', sortable: false },
                { text: '菜单状态', sortable: false },
                { text: '菜单名称', sortable: false },
            ],
            desserts: [],
            menu: [],
            menu2: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "roleId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                roleId: '',
                roleName: '',
                roleDesc: '',
                roleLevel: ''
            },
            defaultItem: {
                roleId: '',
                roleName: '',
                roleDesc: '',
                roleLevel: ''
            },
            backValue: {},
            backValueRole: {},
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增角色' : '修改角色'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.roleInfo;
                    that.menu = response.data.data.columnInfo;
                    that.menuRole = response.data.data.menuRoleInfo
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                    that.copMenuRole = that.copy(that.menuRole,that.copMenuRole)
                });
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";

            },
            authorization(item){
                this.$router.push({
                    name: 'roleMenuAuthorzation',
                    hash: item
                })
            },
            addClick() {
                this.disabled = "false"
            },
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                var del=confirm('Are you sure you want to delete this item?');
                if(del==true) {
                    this.desserts.splice(index, 1)
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_ROLE"
                    this.backValue.keySet = "ROLE_ID"

                    const roleIndex = item.roleId
                    for(let i=0; i<this.menuRole.length; i++){
                        if(this.menuRole[i].roleId == roleIndex){
                            this.menuRole.splice(i, 1)
                            i=i-1
                        }
                    }
                    this.backValueRole.data = filterTableChangeData(this.keySet,this.menuRole,this.copMenuRole)
                    this.backValueRole.userName = sessionStorage.getItem("userId")
                    this.backValueRole.tableName = "OM_MENU_ROLE"
                    this.backValueRole.keySet = "ROLE_ID,MENU_ID"
                    saveSysTable(this.backValueRole).then(response => {
                        saveSysTable(this.backValue).then(response => {
                            if (response.status === 200) {
                                toast.success("提交成功！");
                            }
                        })
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
                    if (this.editedItem.roleId == this.desserts[i].roleId) {
                        equals = true;
                    }
                }
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    equals = false;
                } else {
                    this.desserts.push(this.editedItem)
                }
                if(this.editedItem.roleId == []){
                    alert("角色ID不能为空")
                }else if(this.editedItem.roleName == []){
                    alert("角色名称不能为空")
                }else if(equals==true){
                    alert("角色ID不能与已存在的角色ID相同")
                }else{
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_ROLE"
                    this.backValue.keySet = "ROLE_ID"
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            toast.success("提交成功！");
                        }
                    })
                    this.close();
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
                this.backValue.tableName = "OM_ROLE"
                this.backValue.keySet = "ROLE_ID"
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