<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>菜单管理</v-toolbar-title>
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
                                <v-flex xs12 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.menuSeqNo" label="菜单序号" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.menuSeqNo" label="菜单序号" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuId" label="菜单ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuName" label="菜单名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.menuParentId" label="父级菜单" :items="parent" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuLevel" label="菜单等级"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuStatus" label="状态"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuIcon" label="菜单标识"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuComponent" label="菜单URL"></v-text-field>
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
                <td>{{ props.item.menuSeqNo }}</td>
                <td>{{ props.item.menuId }}</td>
                <td>{{ props.item.menuParams }}</td>
                <td>{{ props.item.menuTitle }}</td>
                <td>{{ props.item.menuParentId }}</td>
                <td>{{ props.item.menuLevel }}</td>
                <td>{{ props.item.menuStatus }}</td>
                <td>{{ props.item.menuIcon }}</td>
                <td>{{ props.item.menuComponent }}</td>
                <td style="width: 50px">
                    <v-tooltip bottom color="blue" style="margin-left: -40px">
                        <v-btn flat icon slot="activator" @click="editItem(props.item)">
                            <v-icon small class="mr-2" style="color: #0d47a1">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -33px">
                        <v-btn flat icon slot="activator" @click="deleteItem(props.item)">
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
    import {getSysInfoByUser} from "@/api/url/prodInfo";

    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            headers: [
                {text: '菜单序号',sortable: false},
                {text: '菜单ID',sortable: false,size: "medium"},
                { text: '菜单参数',sortable: false},
                { text: '菜单名称',sortable: false},
                { text: '父级菜单',sortable: false },
                { text: '菜单等级',sortable: false },
                { text: '状态',sortable: false },
                { text: '菜单标识',sortable: false},
                { text: '菜单URL',sortable: false },
                { text: 'Action',sortable: false }
            ],
            parent: [],
            desserts: [],
            menuInfo: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "menuSeqNo"
                }
            ],
            editedIndex: -1,
            // title: "",
            editedItem: {
                menuSeqNo: '',
                menuId: '',
                menuName: '',
                menuTitle: '',
                menuParentId: '',
                menuLevel: '',
                menuStatus: '',
                menuIcon: '',
                menuComponent: ''
            },
            defaultItem: {
                menuSeqNo: '',
                menuId: '',
                menuName: '',
                menuTitle: '',
                menuParentId: '',
                menuLevel: '',
                menuStatus: '',
                menuIcon: '',
                menuComponent: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增菜单' : '修改菜单'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        mounted() {
            this.initialize();
            this.initMenuSeqNo();
        },
        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    //初始化 新增时候  父级菜单信息
                    for(let i=0; i<that.desserts.length; i++){
                        if(that.desserts[i].menuLevel === userLevel){
                            let temp={}
                            temp["key"] = that.desserts[i].menuId
                            temp["value"] = that.desserts[i].menuName
                            that.parent.push(temp)
                        }
                    }
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            initMenuSeqNo() {
                //新增菜单时候  菜单序号默认顺延
                let that = this
                getSysTable("OM_MENU").then(function (response) {
                    that.menuInfo = response.data.data.columnInfo;
                    if(that.menuInfo.length>0) {
                        let max = 0
                        max = parseInt(that.menuInfo[0].menuSeqNo)
                        for (let m = 1; m < that.menuInfo.length; m++) {
                            if(parseInt(that.menuInfo[m].menuSeqNo) >max){
                                max = parseInt(that.menuInfo[m].menuSeqNo)
                            }
                        }
                        that.editedItem.menuSeqNo = max+1+"";
                    }
                });
            },
            addClick() {
                this.disabled = "false"
                this.initMenuSeqNo()
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";
            },
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                var del=confirm('Are you sure you want to delete this item?');
                if(del==true) {
                    this.desserts.splice(index, 1)
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_MENU"
                    this.backValue.keySet = "MENU_SEQ_NO"
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            toast.success("提交成功！");
                        }
                    })
                }
                // this.initialize()
            },

            close () {
                this.dialog = false
                // this.initialize();
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                let equals = false;
                for (let i = 0; i < this.desserts.length; i++) {
                    if (this.editedItem.menuId == this.desserts[i].menuId) {
                        equals = true;
                    }
                }
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    equals=false;
                } else {
                    this.desserts.push(this.editedItem)
                }
                if(this.editedItem.menuId == []){
                    alert("菜单ID不能为空")
                }else if(this.editedItem.menuName == []){
                    alert("菜单名称不能为空")
                }else if(this.editedItem.menuLevel == []){
                    alert("菜单等级不能为空")
                }else if(equals==true){
                    alert("角色ID不能与已存在的角色ID相同")
                }else{
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_MENU"
                    this.backValue.keySet = "MENU_SEQ_NO"
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            toast.success("提交成功！");
                        }
                    })
                    this.close()
                }
                this.initialize();
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
                this.backValue.tableName = "OM_MENU"
                this.backValue.keySet = "MENU_SEQ_NO"
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