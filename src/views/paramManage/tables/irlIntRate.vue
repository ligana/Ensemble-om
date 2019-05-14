<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-icon>widgets</v-icon>
            <v-toolbar-title>利率税率信息表-[IRL_INT_RATE]</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" width="1000px" persistent z-index="100">
                <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text style="padding-top: 0px">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.irlSeqNo"
                                            :counter="10"
                                            :isNotNull="headers[0].isNull"
                                            :isKey= "headers[0].key"
                                            :lengths= "headers[0].lengths"
                                            :label= "headers[0].title"
                                            :labelDesc= "headers[0].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[2].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[2].isNull"
                                            :labelDesc="headers[2].title"
                                            v-model="editedItem.ccy"
                                            :options="headers[2].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.yearBasis"
                                            :counter="10"
                                            :isNotNull="headers[5].isNull"
                                            :isKey= "headers[5].key"
                                            :lengths= "headers[5].lengths"
                                            :label= "headers[5].title"
                                            :labelDesc= "headers[5].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intType"
                                            :counter="10"
                                            :isNotNull="headers[1].isNull"
                                            :isKey= "headers[1].key"
                                            :lengths= "headers[1].lengths"
                                            :label= "headers[1].title"
                                            :labelDesc= "headers[1].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.branch"
                                            :counter="10"
                                            :isNotNull="headers[6].isNull"
                                            :isKey= "headers[6].key"
                                            :lengths= "headers[6].lengths"
                                            :label= "headers[6].title"
                                            :labelDesc= "headers[6].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[8].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[8].isNull"
                                            :labelDesc="headers[8].title"
                                            v-model="editedItem.company"
                                            :options="headers[8].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-date class="dcDate"
                                             :disablePower="disablePower" :labelDesc="headers[3].title" v-model="editedItem.effectDate"
                                             :isNotNull="headers[3].isNull" :isKey= "headers[3].key"
                                    ></dc-date>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-date class="dcDate"
                                             :disablePower="disablePower" :labelDesc="headers[4].title" v-model="editedItem.endDate"
                                             :isNotNull="headers[4].key" :isKey= "headers[4].key"
                                    ></dc-date>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions style="margin-top: -1%">
                        <v-btn color="info" @click="close" class="bthStyle" style="margin-left: 6%">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="save" class="bthStyle" style="margin-right: 6%">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-card-text>
            <v-layout row wrap>
                <v-flex xd3 lg3>
                    <div>
                        <a-button type="primary" @click="addClick">新增</a-button>
                        <a-button type="primary" @click="editItem" class="ml-2">修改</a-button>
                        <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
                        <a-button v-if="notCommit" type="primary" @click="onSave" class="ml-2">提交</a-button>
                    </div>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-text class="pa-0">
            <a-table :customRow="customRow" :columns="headers" @change="changeTable" :dataSource="desserts">
            </a-table>
            <v-divider></v-divider>
        </v-card-text>
    </div>
</template>
<script>
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import { getPkListColumnRf } from "@/api/url/prodInfo";
    import {saveTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getParamTable} from "@/api/url/prodInfo";
    import DcTextFieldTable from "@/components/widgets/DcTextFieldTable";
    import DcDate from '@/components/widgets/DcDate'
    import DcMultiselectTable from '@/components/widgets/DcMultiselectTable'
    import {remove} from '@/utils/util'
    export default {
        components: {
            DcTextFieldTable,
            DcDate,DcMultiselectTable
        },
        props: ["title"],
        data: () => ({
            notCommit: "true",
            disabled: false,
            dialog: false,
            headers: [
                { dataIndex: 'IRL_SEQ_NO',title: '序号',key: "true",lengths: "50",isNull: "true"},
                { dataIndex: 'INT_TYPE',title: '利率类型',key: "true",lengths: "3",isNull: "true"},
                { dataIndex: 'CCY',title: '币种',lengths: "3",isNull: "true",valueScore: []},
                { dataIndex: 'EFFECT_DATE',title: '生效日期',lengths: "8",isNull: "true"},
                { dataIndex: 'END_DATE',title: '失效日期',lengths: "8",isNull: "false"},
                { dataIndex: 'YEAR_BASIS',title: '年基准天数',lengths: "3",isNull: "true"},
                { dataIndex: 'BRANCH',title: '机构代码',lengths: "20",isNull: "true"},
                { dataIndex: 'LAST_CHG_RUN_DATE',title: '最后修改日期',lengths: "8",isNull: "false"},
                { dataIndex: 'COMPANY',title: '法人代码',lengths: "20",isNull: "false",valueScore: [{value: "DCITS-神州信息", key: "DCITS"}]},
            ],
            ccyType: {columnCode: "CCY", columnDesc: "CCY_DESC", tableName: "FM_CURRENCY"},
            dessert: {
                IRL_SEQ_NO: "",
                INT_TYPE: "",
                CCY: "",
                EFFECT_DATE: "",
                END_DATE: "",
                YEAR_BASIS: "",
                BRANCH: "",
                LAST_CHG_RUN_DATE: "",
                COMPANY: "",
            },
            desserts: [],
            menu: [],
            menu2: [],
            systemId: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "envId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                irlSeqNo: "",
                intType: "",
                ccy: "",
                effectDate: "",
                endDate: "",
                yearBasis: "",
                branch: "",
                lastChgRunDate: "",
                company: "",
            },
            defaultItem: {
                irlSeqNo: "",
                intType: "",
                ccy: "",
                effectDate: "",
                endDate: "",
                yearBasis: "",
                branch: "",
                lastChgRunDate: "",
                company: "",
            },
            backValue: {},
            backValueRole: {},
            tableName: '',
            selected: {},
            tbd: {},
            addorchange: true
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增利率税率信息' : '修改利率税率信息'
            }
        },
        /*           watch: {
         dialog (val) {
         val || this.close()
         }
         },*/
        mounted: function () {
            this.initTableInfo()
        },
        methods: {
            initTableInfo() {
                this.tableName = this.$route.hash
                this.getBasisRate(this.tableName);
            },
            getBasisRate (tableName) {
                let that = this;
                getParamTable(tableName).then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                })
                getPkListColumnRf(this.ccyType).then(function (response) {
                    that.headers[2].valueScore = response.data.data
                })
            },

            editItem () {
                let obj = this.selected
                if(this.selected.IRL_SEQ_NO == undefined){
                    this.sweetAlert('info',"请选择一条数据!")
                    return
                }
                this.editedItem.irlSeqNo = obj.IRL_SEQ_NO
                this.editedItem.intType = obj.INT_TYPE
                this.editedItem.ccy = obj.CCY
                this.editedItem.effectDate = obj.EFFECT_DATE
                this.editedItem.endDate = obj.END_DATE
                this.editedItem.yearBasis = obj.YEAR_BASIS
                this.editedItem.branch = obj.BRANCH
                this.editedItem.company = obj.COMPANY
                this.dialog = true
                this.disabled = "true"
                this.addorchange = false
                this.editedIndex = this.desserts.indexOf(this.selected)
            },
            addClick() {
                this.addorchange = true
                this.dialog = true
                this.disabled = false
            },
            onDelete () {
                this.tbd.style = '';
                remove(this.desserts, this.selected)
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                const obj = this.dessert
                obj.INT_BASIS = this.editedItem.intBasis
                obj.INT_BASIS_DESC = this.editedItem.intBasisDesc
                obj.ROUTER_KEY = this.editedItem.routerKey
                obj.COMPANY = this.editedItem.company
                obj.IRL_SEQ_NO = this.editedItem.irlSeqNo
                obj.INT_TYPE = this.editedItem.intType
                obj.CCY = this.editedItem.ccy
                obj.EFFECT_DATE = this.editedItem.effectDate
                obj.END_DATE = this.editedItem.endDate
                obj.YEAR_BASIS = this.editedItem.yearBasis
                obj.BRANCH = this.editedItem.branch
                obj.COMPANY = this.editedItem.company
                var date = new Date();
                var month = (""+(date.getMonth()+1)).length == 1? "0"+(date.getMonth()+1):""+(date.getMonth()+1)
                var day = (""+date.getDate()).length == 1? "0"+(date.getDate()):""+(date.getDate())
                obj.LAST_CHG_RUN_DATE = date.getFullYear()+""+month+""+day
                if(this.addorchange){
                    this.desserts.splice(0, 0, obj)
                    this.dessert = {}
                }else {
                    let index = this.editedIndex
                    this.desserts[index] = obj
                    this.dessert={}
                }
                this.close()
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
            customRow(record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
            //点击
            clickRow(record, event) {
                var tr = event.currentTarget;
                var tbd = tr.parentNode;
                for (const i in tbd.childNodes) {
                    if (!isNaN(i)) {
                        if (tr == tbd.childNodes[i]) {
                            tbd.childNodes[i].style = 'background-color: #e6f7ff';
                            this.tbd = tbd.childNodes[i]
                        } else {
                            tbd.childNodes[i].style = '';
                        }
                    }
                }
                this.selected = record;
            },
            onSave() {
                this.backValue.data = filterTableChangeData(this.headers, this.desserts,this.sourceData)
                this.backValue.tableName = this.tableName
                this.backValue.tableDesc= this.$route.params.tableDesc
                this.backValue.option = "save"
                this.backValue.userName = sessionStorage.getItem("userId")
                if(this.backValue.data.length==0){
                    this.sweetAlert('info',"未做任何修改,提交失败!")
                }else{
                    saveTable(this.backValue).then(response => {
                        if (response.status === 200) {
                            this.notCommit = false;
                            this.sweetAlert('success',"保存成功!")
                            //保存成功后隐藏提交按钮  不允许再进行参数修改提交
//                        this.$router.push({ name: "paramManageCif", params: { tableName: this.tableName} });
//                        this.$store.dispatch("delVisitedViews", this.$route);
//                        this.$router.push({ name: "paramManageCif", params: { tableName: this.tableName} });
                            let setTaskEvent= new Event("taskList");
                            window.dispatchEvent(setTaskEvent);
                        }
                    });
                }
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