<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-icon>widgets</v-icon>
            <v-toolbar-title>产品利率信息表-[IRL_PROD_INT]</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" width="1200px" persistent z-index="100">
                <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text style="padding-top: 0px">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.prodType"
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
                                    <dc-text-field-table
                                            v-model="editedItem.eventType"
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
                                            v-model="editedItem.intType"
                                            :counter="10"
                                            :isNotNull="headers[2].isNull"
                                            :isKey= "headers[2].key"
                                            :lengths= "headers[2].lengths"
                                            :label= "headers[2].title"
                                            :labelDesc= "headers[2].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intClass"
                                            :counter="10"
                                            :isNotNull="headers[3].isNull"
                                            :isKey= "headers[3].key"
                                            :lengths= "headers[3].lengths"
                                            :label= "headers[3].title"
                                            :labelDesc= "headers[3].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.taxType"
                                            :counter="10"
                                            :isNotNull="headers[4].isNull"
                                            :isKey= "headers[4].key"
                                            :lengths= "headers[4].lengths"
                                            :label= "headers[4].title"
                                            :labelDesc= "headers[4].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.rateAmtId"
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
                                            v-model="editedItem.intAmtId"
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
                                    <dc-text-field-table
                                            v-model="editedItem.recalMethod"
                                            :counter="10"
                                            :isNotNull="headers[7].isNull"
                                            :isKey= "headers[7].key"
                                            :lengths= "headers[7].lengths"
                                            :label= "headers[7].title"
                                            :labelDesc= "headers[7].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intStart"
                                            :counter="10"
                                            :isNotNull="headers[9].isNull"
                                            :isKey= "headers[9].key"
                                            :lengths= "headers[9].lengths"
                                            :label= "headers[9].title"
                                            :labelDesc= "headers[9].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intDaysType"
                                            :counter="10"
                                            :isNotNull="headers[10].isNull"
                                            :isKey= "headers[10].key"
                                            :lengths= "headers[10].lengths"
                                            :label= "headers[10].title"
                                            :labelDesc= "headers[10].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intCalcBal"
                                            :counter="10"
                                            :isNotNull="headers[11].isNull"
                                            :isKey= "headers[11].key"
                                            :lengths= "headers[11].lengths"
                                            :label= "headers[11].title"
                                            :labelDesc= "headers[11].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intApplType"
                                            :counter="10"
                                            :isNotNull="headers[12].isNull"
                                            :isKey= "headers[12].key"
                                            :lengths= "headers[12].lengths"
                                            :label= "headers[12].title"
                                            :labelDesc= "headers[12].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.rollFreq"
                                            :counter="10"
                                            :isNotNull="headers[13].isNull"
                                            :isKey= "headers[13].key"
                                            :lengths= "headers[13].lengths"
                                            :label= "headers[13].title"
                                            :labelDesc= "headers[13].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.rollDay"
                                            :counter="10"
                                            :isNotNull="headers[14].isNull"
                                            :isKey= "headers[14].key"
                                            :lengths= "headers[14].lengths"
                                            :label= "headers[14].title"
                                            :labelDesc= "headers[14].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.minRate"
                                            :counter="10"
                                            :isNotNull="headers[15].isNull"
                                            :isKey= "headers[15].key"
                                            :lengths= "headers[15].lengths"
                                            :label= "headers[15].title"
                                            :labelDesc= "headers[15].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.maxRate"
                                            :counter="10"
                                            :isNotNull="headers[16].isNull"
                                            :isKey= "headers[16].key"
                                            :lengths= "headers[16].lengths"
                                            :label= "headers[16].title"
                                            :labelDesc= "headers[16].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intRateInd"
                                            :counter="10"
                                            :isNotNull="headers[17].isNull"
                                            :isKey= "headers[17].key"
                                            :lengths= "headers[17].lengths"
                                            :label= "headers[17].title"
                                            :labelDesc= "headers[17].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.monthBasis"
                                            :counter="10"
                                            :isNotNull="headers[18].isNull"
                                            :isKey= "headers[18].key"
                                            :lengths= "headers[18].lengths"
                                            :label= "headers[18].title"
                                            :labelDesc= "headers[18].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.groupRuleType"
                                            :counter="10"
                                            :isNotNull="headers[19].isNull"
                                            :isKey= "headers[19].key"
                                            :lengths= "headers[19].lengths"
                                            :label= "headers[19].title"
                                            :labelDesc= "headers[19].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.splitId"
                                            :counter="10"
                                            :isNotNull="headers[20].isNull"
                                            :isKey= "headers[20].key"
                                            :lengths= "headers[20].lengths"
                                            :label= "headers[20].title"
                                            :labelDesc= "headers[20].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.splitType"
                                            :counter="10"
                                            :isNotNull="headers[21].isNull"
                                            :isKey= "headers[21].key"
                                            :lengths= "headers[21].lengths"
                                            :label= "headers[21].title"
                                            :labelDesc= "headers[21].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.ruleid"
                                            :counter="10"
                                            :isNotNull="headers[22].isNull"
                                            :isKey= "headers[22].key"
                                            :lengths= "headers[22].lengths"
                                            :label= "headers[22].title"
                                            :labelDesc= "headers[22].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.acctRateEffect"
                                            :counter="10"
                                            :isNotNull="headers[23].isNull"
                                            :isKey= "headers[23].key"
                                            :lengths= "headers[23].lengths"
                                            :label= "headers[23].title"
                                            :labelDesc= "headers[23].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.roundDown"
                                            :counter="10"
                                            :isNotNull="headers[24].isNull"
                                            :isKey= "headers[24].key"
                                            :lengths= "headers[24].lengths"
                                            :label= "headers[24].title"
                                            :labelDesc= "headers[24].title"
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
                { dataIndex: 'PROD_TYPE',title: '产品类型',key: "true",lengths: "50",isNull: "true"},
                { dataIndex: 'EVENT_TYPE',title: '事件类型',lengths: "50",key: "true",isNull: "true"},
                { dataIndex: 'INT_TYPE',title: '利率类型',lengths: "3",isNull: "false"},
                { dataIndex: 'INT_CLASS',title: '利息分类',lengths: "20",key: "true",isNull: "true"},
                { dataIndex: 'TAX_TYPE',title: '税率类型',lengths: "3",isNull: "false"},
                { dataIndex: 'RATE_AMT_ID',title: '利率计算金额编码',lengths: "30",isNull: "true"},
                { dataIndex: 'INT_AMT_ID',title: '利息计算金额编码',lengths: "30",isNull: "true"},
                { dataIndex: 'RECAL_METHOD',title: '重算利息方法',lengths: "1",isNull: "true"},
                { dataIndex: 'COMPANY',title: '法人代码',lengths: "20",isNull: "false",valueScore: [{value: "DCITS-神州信息", key: "DCITS"}]},
                { dataIndex: 'INT_START',title: '计息起始日期取值方法',lengths: "1",isNull: "false"},
                { dataIndex: 'INT_DAYS_TYPE',title: '靠档天数计算方式',lengths: "1",isNull: "false"},
                { dataIndex: 'INT_CALC_BAL',title: '利息计算方法',lengths: "3",isNull: "false"},
                { dataIndex: 'INT_APPL_TYPE',title: '利率启用方式',lengths: "1",isNull: "false"},
                { dataIndex: 'ROLL_FREQ',title: '利率变更周期',lengths: "2",isNull: "false"},
                { dataIndex: 'ROLL_DAY',title: '利率变更日',lengths: "2",isNull: "false"},
                { dataIndex: 'MIN_RATE',title: '最小利率',lengths: "15",isNull: "false"},
                { dataIndex: 'MAX_RATE',title: '最大利率',lengths: "15",isNull: "false"},
                { dataIndex: 'INT_RATE_IND',title: '利率靠档标志',lengths: "1",isNull: "false"},
                { dataIndex: 'MONTH_BASIS',title: '月基准',lengths: "3",isNull: "false"},
                { dataIndex: 'GROUP_RULE_TYPE',title: '分组规则关系',lengths: "2",isNull: "true"},
                { dataIndex: 'SPLIT_ID',title: '首个分段ID',lengths: "10",key: "true",isNull: "true"},
                { dataIndex: 'SPLIT_TYPE',title: '分段类型',lengths: "3",isNull: "false"},
                { dataIndex: 'RULEID',title: '规则ID',lengths: "50",key: "true",isNull: "true"},
                { dataIndex: 'ACCT_RATE_EFFECT',title: '使用分户利率标志',lengths: "1",isNull: "false"},
                { dataIndex: 'ROUND_DOWN',title: '是否截位标志',lengths: "1",isNull: "false"},
            ],
            dessert: {
                PROD_TYPE: "",
                EVENT_TYPE: "",
                INT_TYPE: "",
                INT_CLASS: "",
                TAX_TYPE: "",
                RATE_AMT_ID: "",
                INT_AMT_ID: "",
                RECAL_METHOD: "",
                COMPANY: "",
                INT_START: "",
                INT_DAYS_TYPE: "",
                INT_CALC_BAL: "",
                INT_APPL_TYPE: "",
                ROLL_FREQ: "",
                ROLL_DAY: "",
                MIN_RATE: "",
                MAX_RATE: "",
                INT_RATE_IND: "",
                MONTH_BASIS: "",
                GROUP_RULE_TYPE: "",
                SPLIT_ID: "",
                SPLIT_TYPE: "",
                RULEID: "",
                ACCT_RATE_EFFECT: "",
                ROUND_DOWN: "",
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
                prodType: "",
                eventType: "",
                intType: "",
                intClass: "",
                taxType: "",
                rateAmtId: "",
                intAmtId: "",
                recalMethod: "",
                company: "",
                intStart: "",
                intDaysType: "",
                intCalcBal: "",
                intApplType: "",
                rollFreq: "",
                rollDay: "",
                minRate: "",
                maxRate: "",
                intRateInd: "",
                monthBasis: "",
                groupRuleType: "",
                splitId: "",
                splitType: "",
                ruleid: "",
                acctRateEffect: "",
                roundDown: "",
            },
            defaultItem: {
                prodType: "",
                eventType: "",
                intType: "",
                intClass: "",
                taxType: "",
                rateAmtId: "",
                intAmtId: "",
                recalMethod: "",
                company: "",
                intStart: "",
                intDaysType: "",
                intCalcBal: "",
                intApplType: "",
                rollFreq: "",
                rollDay: "",
                minRate: "",
                maxRate: "",
                intRateInd: "",
                monthBasis: "",
                groupRuleType: "",
                splitId: "",
                splitType: "",
                ruleid: "",
                acctRateEffect: "",
                roundDown: "",
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
                return this.editedIndex === -1 ? '新增产品利率信息' : '修改产品利率信息'
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
            },

            editItem () {
                let obj = this.selected
                if(this.selected.PROD_TYPE == undefined){
                    this.sweetAlert('info',"请选择一条数据!")
                    return
                }
                this.editedItem.prodType = obj.PROD_TYPE
                this.editedItem.eventType = obj.EVENT_TYPE
                this.editedItem.intType = obj.INT_TYPE
                this.editedItem.intClass = obj.INT_CLASS
                this.editedItem.taxType = obj.TAX_TYPE
                this.editedItem.rateAmtId = obj.RATE_AMT_ID
                this.editedItem.intAmtId = obj.INT_AMT_ID
                this.editedItem.recalMethod = obj.RECAL_METHOD
                this.editedItem.company = obj.COMPANY
                this.editedItem.intStart = obj.INT_START
                this.editedItem.intDaysType = obj.INT_DAYS_TYPE
                this.editedItem.intCalcBal = obj.INT_CALC_BAL
                this.editedItem.intApplType = obj.INT_APPL_TYPE
                this.editedItem.rollFreq = obj.ROLL_FREQ
                this.editedItem.rollDay = obj.ROLL_DAY
                this.editedItem.minRate = obj.MIN_RATE
                this.editedItem.maxRate = obj.MAX_RATE
                this.editedItem.intRateInd = obj.INT_RATE_IND
                this.editedItem.monthBasis = obj.MONTH_BASIS
                this.editedItem.groupRuleType = obj.GROUP_RULE_TYPE
                this.editedItem.splitId = obj.SPLIT_ID
                this.editedItem.splitType = obj.SPLIT_TYPE
                this.editedItem.ruleid = obj.RULEID
                this.editedItem.acctRateEffect = obj.ACCT_RATE_EFFECT
                this.editedItem.roundDown = obj.ROUND_DOWN
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
                obj.PROD_TYPE = this.editedItem.prodType
                obj.EVENT_TYPE= this.editedItem.eventType
                obj.INT_TYPE= this.editedItem.intType
                obj.INT_CLASS= this.editedItem.intClass
                obj.TAX_TYPE= this.editedItem.taxType
                obj.RATE_AMT_ID= this.editedItem.rateAmtId
                obj.INT_AMT_ID= this.editedItem.intAmtId
                obj.RECAL_METHOD= this.editedItem.recalMethod
                obj.COMPANY= this.editedItem.company
                obj.INT_START= this.editedItem.intStart
                obj.INT_DAYS_TYPE= this.editedItem.intDaysType
                obj.INT_CALC_BAL= this.editedItem.intCalcBal
                obj.INT_APPL_TYPE= this.editedItem.intApplType
                obj.ROLL_FREQ= this.editedItem.rollFreq
                obj.ROLL_DAY= this.editedItem.rollDay
                obj.MIN_RATE= this.editedItem.minRate
                obj.MAX_RATE= this.editedItem.maxRate
                obj.INT_RATE_IND= this.editedItem.intRateInd
                obj.MONTH_BASIS= this.editedItem.monthBasis
                obj.GROUP_RULE_TYPE= this.editedItem.groupRuleType
                obj.SPLIT_ID= this.editedItem.splitId
                obj.SPLIT_TYPE= this.editedItem.splitType
                obj.RULEID= this.editedItem.ruleid
                obj.ACCT_RATE_EFFECT= this.editedItem.acctRateEffect
                obj.ROUND_DOWN= this.editedItem.roundDown
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