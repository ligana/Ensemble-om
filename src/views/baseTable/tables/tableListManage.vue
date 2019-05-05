<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>交易属性管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    clearable
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white">添加</td>
                </v-btn>
                <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text style="padding-top: 0px">
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
                                    <v-select v-model="editedItem.loadModel" label="处理方式" :items="loadModel" item-text="value" item-value="key" @change="modelClick"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.loadPath" label="加载路径"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.system" label="所属系统" :items="system" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.parameter" label="参数类型" :items="paramType" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-show="show">
                                    <v-select v-model="editedItem.searchColumn" label="检索条件" :items="searchColumn" item-text="value" item-value="key" multiple></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-show="show">
                                    <v-select v-model="editedItem.eidtColumns" label="可见参数" :items="eidtColumns" item-text="value" item-value="key" multiple></v-select>
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
        <v-data-table :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" :headers="headers" :items="desserts" :search="search" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.tableName }}</td>
                <td>{{ props.item.tableDesc }}</td>
                <td>{{ props.item.system }}</td>
                <td>{{ props.item.parameter }}</td>
                <td>{{ props.item.searchColumn }}</td>
                <td>{{ props.item.eidtColumns }}</td>
                <td>{{ props.item.loadModel }}</td>
                <td>{{ props.item.loadPath }}</td>

                <td>
                    <v-layout wrap>
                        <v-flex xs6 sm6 md6>
                            <v-tooltip bottom color="blue" style="margin-left: -20px">
                                <v-btn flat icon="edit" slot="activator" @click="editItem(props.item)">
                                    <v-icon small class="mr-2" style="color: #0d47a1">edit</v-icon>
                                </v-btn>
                                <span>修改</span>
                            </v-tooltip>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                            <v-tooltip bottom color="red" style="margin-left: -20px">
                                <v-btn flat icon="delete" slot="activator" @click="deleteItem(props.item)">
                                    <v-icon small style="color: red">delete</v-icon>
                                </v-btn>
                                <span>删除</span>
                            </v-tooltip>
                        </v-flex>
                    </v-layout>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
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
            system: [],
            searchColumn: [],
            eidtColumns: [],
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
            loadModel: [
                {
                    key: "P",
                    value: "统一处理"
                },
                {
                    key: "S",
                    value: "特殊处理"
                }
            ],
            headers: [
                { text: '交易ID',sortable: false,value: 'tableName'},
                { text: '交易名称',sortable: false,value: 'tableDesc'},
                { text: '所属系统',sortable: false,value: 'system' },
                { text: '参数类型',sortable: false,value: 'parameter' },
                { text: '检索条件',sortable: false,value: 'searchColumn' },
                { text: '可见参数',sortable: false,value: 'eidtColumns' },
                { text: '处理方式',sortable: false,value: 'loadModel' },
                { text: '加载路径',sortable: false,value: 'loadPath' },
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
            title: "",
            editedItem: {
                tableName: '',
                tableDesc: '',
                system: '',
                parameter: '',
                searchColumn: '',
                eidtColumns: '',
                loadModel: '',
                loadPath: ''
            },
            defaultItem: {
                tableName: '',
                tableDesc: '',
                system: '',
                parameter: '',
                searchColumn: '',
                eidtColumns: '',
                loadModel: '',
                loadPath: ''
            },
            backValue: {},
            search: '',
            show: true,
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
            modelClick(val){
                if('P' == val){
                    this.editedItem.loadPath = 'tableListManage';
                }
                if('S' == val){
                    this.editedItem.loadPath = '';
                }
            },
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
                        temp["value"] = data[i].systemName
                        that.system.push(temp)
                    }
                });
            },
            addClick() {
                this.show = false
                this.editedItem = []
                this.disabled = "false"
                this.eidtColumns = []
                this.searchColumn = []
            },
            editItem (item) {
                let that = this
                that.show = true
                that.editedIndex = this.desserts.indexOf(item)
                let changeItem = Object.assign({}, item)
                that.editedItem['loadModel'] = changeItem.loadModel
                that.editedItem['loadPath'] = changeItem.loadPath
                that.editedItem['tableName'] = changeItem.tableName
                that.editedItem['tableDesc'] = changeItem.tableDesc
                that.editedItem['system'] = changeItem.system
                that.editedItem['parameter'] = changeItem.parameter
                if(changeItem.searchColumn != null && changeItem.searchColumn != ""){
                    let searchColumns = changeItem.searchColumn.split(",")
                    that.editedItem['searchColumn'] = searchColumns
                }else{
                    that.editedItem['searchColumn'] = []
                }
                if(changeItem.eidtColumns != null && changeItem.eidtColumns != ""){
                    let eidtColumnss = changeItem.eidtColumns.split(",")
                    that.editedItem['eidtColumns'] = eidtColumnss
                }else{
                    that.editedItem['eidtColumns'] = []
                }
                that.getSearchColumn()
                that.dialog = true
                that.disabled = "true";
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
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
                let error = this.getError()
                if(error == false){
                    let changeItem = {}
                    if(this.editedItem.eidtColumns != null){
                        let eidtColumnss = ""
                        for(let i=0; i<this.editedItem.eidtColumns.length; i++){
                            if(eidtColumnss == ""){
                                eidtColumnss = this.editedItem.eidtColumns[i]
                            }else{
                                eidtColumnss = eidtColumnss +","+ this.editedItem.eidtColumns[i]
                            }
                        }
                        changeItem['eidtColumns'] = eidtColumnss
                    }
                    if(this.editedItem.searchColumn != null){
                        let searchColumns = ""
                        for(let i=0; i<this.editedItem.searchColumn.length; i++){
                            if(searchColumns == ""){
                                searchColumns = this.editedItem.searchColumn[i]
                            }else{
                                searchColumns = searchColumns +","+ this.editedItem.searchColumn[i]
                            }
                        }
                        changeItem['searchColumn'] = searchColumns
                    }
                    changeItem['tableName'] = this.editedItem.tableName
                    changeItem['tableDesc'] = this.editedItem.tableDesc
                    changeItem['system'] = this.editedItem.system
                    changeItem['parameter'] = this.editedItem.parameter
                    changeItem['loadModel'] = this.editedItem.loadModel
                    changeItem['loadPath'] = this.editedItem.loadPath
                    if (this.editedIndex > -1) {
                        Object.assign(this.desserts[this.editedIndex], changeItem)
                    } else {
                        changeItem['eidtColumns'] = "ALL"
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
                            this.sweetAlert('success',"保存成功!")
                        }
                    })
                    this.close()
                }

            },
            getError(){
                let error = false
                if(this.editedItem.tableName == "" || this.editedItem.tableName == undefined){
                    this.sweetAlert('info', "交易ID不能为空!")
                    error = true
                } else if(this.editedItem.tableDesc == "" || this.editedItem.tableDesc == undefined){
                    this.sweetAlert('info', "交易名称不能为空!")
                    error = true
                } else if(this.editedItem.system == "" || this.editedItem.system == undefined){
                    this.sweetAlert('info', "所属系统不能为空!")
                    error = true
                } else if(this.show != true){
                    for(let i=0; i<this.desserts.length; i++){
                        if(this.editedItem.tableName == this.desserts[i].tableName){
                            this.sweetAlert('info', "交易ID不能重复!")
                            error = true
                            break
                        }
                    }
                }
                if(this.show == true){
                    if(this.editedItem.searchColumn.length > 2){
                        this.sweetAlert('info', "检索条件不得超过两个!")
                        error = true
                    }
                }
                return error
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
            //获取检索条件的选项
            getSearchColumn() {
                let that = this
                getParamTable(that.editedItem.tableName).then(function (response) {
                    let dataInfo = []
                    that.searchColumn = []
                    that.eidtColumns = []
                    let temp={}
                    temp["key"] = "ALL"
                    temp["value"] = "全部显示"
                    dataInfo = response.data.data.column;
                    that.eidtColumns.push(temp)
                    for(let i=0; i< dataInfo.length; i++){
                        let temp={}
                        temp["key"] = dataInfo[i].code
                        temp["value"] = dataInfo[i].title
                        that.searchColumn.push(temp)
                        that.eidtColumns.push(temp)
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