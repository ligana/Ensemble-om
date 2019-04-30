<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>系统管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    clearable
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
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
                                <v-flex xs12 sm12 md12 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.systemId" label="系统ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.systemId" label="系统ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.systemName" label="系统名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.systemDesc" label="系统描述"></v-text-field>
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
                <td>{{ props.item.systemId }}</td>
                <td>{{ props.item.systemName }}</td>
                <td>{{ props.item.systemDesc }}</td>
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

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            tab: [],
            headers: [
                { text: '系统ID',sortable: false,value: 'systemId'},
                { text: '系统名称',sortable: false,value: 'systemName'},
                { text: '系统描述',sortable: false,value: 'systemDesc' },
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "systemId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                systemId: '',
                systemName: '',
                systemDesc: ''
            },
            defaultItem: {
                systemId: '',
                systemName: '',
                systemDesc: ''
            },
            backValue: {},
            search: ''
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增系统信息' : '修改系统信息'
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
                getSysTable("OM_SYSTEM_ORG").then(function (response) {
                    that.desserts = response.data.data.columnInfo;
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
                let confirms = confirm('Are you sure you want to delete this item?')
                if(confirms == true){
                    this.desserts.splice(index, 1)
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_SYSTEM_ORG"
                    this.backValue.keySet = "SYSTEM_ID"
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
                this.backValue.tableName = "OM_SYSTEM_ORG"
                this.backValue.keySet = "SYSTEM_ID"
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