<template>
<<<<<<< HEAD
    <v-card>
        <v-toolbar dark>
            <v-toolbar-title>交易模块管理</v-toolbar-title>
            <v-spacer></v-spacer>
=======
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>模块管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    clearable
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
>>>>>>> master
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">添加</v-btn>
                <v-card class="popups">
                    <v-card-title>
                        <span>{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.moduleId" label="模块ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.moduleId" label="模块ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-select v-model="editedItem.systemId" label="所属系统" :items="system" item-text="value" item-value="key" disabled></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-select v-model="editedItem.systemId" label="所属系统" :items="system" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.moduleName" label="模块名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.moduleDesc" label="模块描述"></v-text-field>
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
                <td>{{ props.item.moduleId }}</td>
                <td>{{ props.item.systemId }}</td>
                <td>{{ props.item.moduleName }}</td>
                <td>{{ props.item.moduleDesc }}</td>
                <td>
                    <v-tooltip bottom color="#3C73E6" style="margin-left: -20px">
                        <v-btn flat icon slot="activator">
                            <v-icon small @click="editItem(props.item)" color="#3C73E6">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -20px">
                        <v-btn flat icon slot="activator">
                            <v-icon small @click="deleteItem(props.item)" color="red">delete</v-icon>
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
    import columnInfo from '@/views/prodFactory/prodInfo/columnInfo'

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            tab: [],
            system: [],
            module: [],
            headers: [
                { text: '模块ID',sortable: false,value: 'moduleId'},
                { text: '系统ID',sortable: false,value: 'systemId'},
                { text: '模块名称',sortable: false,value: 'moduleName' },
                { text: '模块描述',sortable: false,value: 'moduleDesc' },
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "moduleId"
                },
                {
                    key: "true",
                    dataIndex: "systemId"
                }
            ],
            editedIndex: -1,
            // title: "",
            editedItem: {
                moduleId: '',
                systemId: '',
                moduleName: '',
                moduleDesc: ''
            },
            defaultItem: {
                moduleId: '',
                systemId: '',
                moduleName: '',
                moduleDesc: ''
            },
            backValue: {},
            search: ''
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增模块信息' : '修改模块信息'
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
                getSysTable("OM_MODULE_ORG").then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            initRfData() {
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
                let confirms = confirm('Are you sure you want to delete this item?')
                if(confirms == true){
                    this.desserts.splice(index, 1)
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_MODULE_ORG"
                    this.backValue.keySet = "MODULE_ID,SYSTEM_ID"
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
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                //保存数据落库
                this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                this.backValue.userName = sessionStorage.getItem("userId")
                this.backValue.tableName = "OM_MODULE_ORG"
                this.backValue.keySet = "MODULE_ID,SYSTEM_ID"
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