<template>
    <v-card>
        <v-toolbar dark>
            <v-toolbar-title>交易属性管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    class="search_box"
                    clearable
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
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
                                    <v-select v-model="editedItem.searchColumn" label="检索条件" :items="searchColumn" item-text="value" item-value="key" multiple></v-select>
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
        <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
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
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
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
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            system: [],
            model: [],
            icon: String,
            searchColumn: [],
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
                { text: '交易ID',sortable: false,value: 'tableName'},
                { text: '交易名称',sortable: false,value: 'tableDesc'},
                { text: '所属系统',sortable: false,value: 'system' },
                { text: '所属模块',sortable: false,value: 'modelId' },
                { text: '参数类型',sortable: false,value: 'parameter' },
                { text: '检索条件',sortable: false,value: 'searchColumn' },
                { text: 'Action',sortable: false, }
            ],
            desserts: [],
            sourceData: [],
            mafanData: [],
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
            backValue: {},
            search: '',
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
                let that = this
                that.editedIndex = this.desserts.indexOf(item)
                let changeItem = Object.assign({}, item)

                that.editedItem['tableName'] = changeItem.tableName
                that.editedItem['tableDesc'] = changeItem.tableDesc
                that.editedItem['system'] = changeItem.system
                that.editedItem['modelId'] = changeItem.modelId
                that.editedItem['parameter'] = changeItem.parameter
                if(changeItem.searchColumn != null){
                    let searchColumns = changeItem.searchColumn.split(",")
                    that.editedItem['searchColumn'] = searchColumns
                }else{
                    that.editedItem['searchColumn'] = []
                }
                getParamTable(that.editedItem.tableName).then(function (response) {
                    let dataInfo = []
                    that.searchColumn = []
                    dataInfo = response.data.data.column;
                    for(let i=0; i< dataInfo.length; i++){
                        let temp={}
                        temp["key"] = dataInfo[i].code
                        temp["value"] = dataInfo[i].title
                        that.searchColumn.push(temp)
                    }
                    that.dialog = true
                    that.disabled = "true";
                })
            },

            deleteItem (item) {
                const index = this.mafanData.indexOf(item)
                let confirms = confirm('Are you sure you want to delete this item?')
                if(confirms == true){
                    this.desserts.splice(index, 1)
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_TABLE_LIST"
                    this.backValue.keySet = "TABLE_NAME"
                    this.sourceData = []
                    this.sourceData = this.copy(this.desserts,this.sourceData)
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            this.sweetAlert('success',"删除成功!")
                        }
                    })
                }
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                let changeItem = {}
                if(this.editedItem.searchColumn != null && Array.isArray(this.editedItem.searchColumn)){
                    let searchColumns = ""
                    for(let i=0; i<this.editedItem.searchColumn.length; i++){
                        if(searchColumns == ""){
                            searchColumns = this.editedItem.searchColumn[i]
                        }else{
                            searchColumns = searchColumns +","+ this.editedItem.searchColumn[i]
                        }
                    }
                    changeItem['searchColumn'] = searchColumns
                }else{
                    changeItem['searchColumn'] = this.editedItem.searchColumn
                }
                changeItem['tableName'] = this.editedItem.tableName
                changeItem['tableDesc'] = this.editedItem.tableDesc
                changeItem['system'] = this.editedItem.system
                changeItem['modelId'] = this.editedItem.modelId
                changeItem['parameter'] = this.editedItem.parameter

                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], changeItem)
                } else {
                    this.desserts.push(changeItem)
                }
                //保存数据落库
                this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                this.backValue.userName = sessionStorage.getItem("userId")
                this.backValue.tableName = "OM_TABLE_LIST"
                this.backValue.keySet = "TABLE_NAME"
                this.sourceData = this.copy(this.desserts,this.sourceData)
                saveSysTable(this.backValue).then(response => {
                    if(response.status === 200){
                        this.sweetAlert('success',"提交成功!")
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
        }
    }
</script>
<style scoped>
    .bthStyle {
        color: #00b0ff;
        width: 120px;
    }
    .search_box {
        height: 40px;
        padding-top: 2px;
    }
    .search_box >>> .v-input__prepend-outer {
        margin-top: 8px;
    }
    .search_box >>> .theme--dark.v-icon {
        color: #7b82ee;
    }
    .search_box >>> .theme--dark.v-label {
        color: #737373;
        top: 8px;
    }
    .search_box >>> .v-input__slot {
        background-color: #fff;
        border-radius: 3px;
    }
    .search_box >>> .v-input__slot:before {
        border-color: #1e19bb !important;
    }
    .search_box >>> .v-input__slot .v-text-field__slot input {
        color: #000;
        padding: 8px 10px;
    }
</style>