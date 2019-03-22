<template>
    <v-card>
        <v-toolbar dark>
            <v-toolbar-title>交易属性管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" >
                <v-btn slot="activator" flat color="#3C73E6" @click="addClick"> 添加 </v-btn>
                <v-card class="popups">
                    <v-card-title>
                        <span>{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.tableName" label="交易ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.tableName" label="交易ID"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.tableDesc" label="交易名称"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.system" label="所属系统" :items="system" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.modelId" label="所属模块" :items="model" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.parameter" label="参数类型" :items="paramType" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.searchColumn" label="检索条件"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="info" @click="close" class="bthStyle">取消</v-btn>
                        <v-btn color="info" @click="save" class="bthStyle">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.tableName }}</td>
                <td>{{ props.item.tableDesc }}</td>
                <td>{{ props.item.system }}</td>
                <td>{{ props.item.modelId }}</td>
                <td>{{ props.item.parameter }}</td>
                <td>{{ props.item.searchColumn }}</td>
                <td>
                    <v-tooltip bottom color="#3C73E6" style="margin-left: -20px">
                        <v-btn flat icon slot="activator">
                            <v-icon small @click="editItem(props.item)" color="#3C73E6">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -20px">
                        <v-btn flat icon slot="activator">
                            <v-icon small @click="deleteItem(props.item)" color="red" >delete</v-icon>
                        </v-btn>
                        <span>删除</span>
                    </v-tooltip>
                </td>
            </template>
        </v-data-table>
    </v-card>
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
            dialog: false,
            disabled: "false",
            system: [],
            model: [],
            icon: String,
            paramType: [
                {
                    key: "init",
                    value: "出厂参数"
                },
                {
                    key: "busi",
                    value: "业务参数"
                }
            ],
            headers: [
                { text: '交易ID',sortable: false},
                { text: '交易名称',sortable: false},
                { text: '所属系统',sortable: false },
                { text: '所属模块',sortable: false },
                { text: '参数类型',sortable: false },
                { text: '检索条件',sortable: false },
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "tableName"
                }
            ],
            editedIndex: -1,
            // title: "",
            editedItem: {
                tableName: '',
                tableDesc: '',
                system: '',
                modelId: '',
                parameter: '',
                searchColumn: ''
            },
            defaultItem: {
                tableName: '',
                tableDesc: '',
                system: '',
                modelId: '',
                parameter: '',
                searchColumn: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增交易模块信息' : '修改交易模块信息'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initRfData()
        },

        methods: {
            initialize () {
                let that = this
                getSysTable("OM_TABLE_LIST").then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            initRfData () {
                let that = this
                getSysTable("OM_SYSTEM_ORG").then(function (response) {
                    let data = []
                    data = response.data.data.columnInfo
                    for(let i=0; i<data.length; i++){
                        let temp={}
                        temp["key"] = data[i].systemId
                        temp["value"] = data[i].systemDesc
                        that.system.push(temp)
                    }
                });

                getSysTable("OM_MODULE_ORG").then(function (response) {
                    let data1 = []
                    data1 = response.data.data.columnInfo
                    for(let j=0; j<data1.length; j++){
                        let temp={}
                        temp["key"] = data1[j].moduleId
                        temp["value"] = data1[j].moduleDesc
                        that.model.push(temp)
                    }
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
                this.backValue.tableName = "OM_TABLE_LIST"
                this.backValue.keySet = "TABLE_NAME"
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
                this.backValue.tableName = "OM_TABLE_LIST"
                this.backValue.keySet = "TABLE_NAME"
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
</style>