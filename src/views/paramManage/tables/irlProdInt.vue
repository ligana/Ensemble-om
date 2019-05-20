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
                                    <dc-multiselect-table
                                            :isKey="headers[0].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[0].isNull"
                                            :labelDesc="headers[0].title"
                                            v-model="editedItem.prodType"
                                            :options="headers[0].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[1].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[1].isNull"
                                            :labelDesc="headers[1].title"
                                            v-model="editedItem.eventType"
                                            :options="headers[1].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[2].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[2].isNull"
                                            :labelDesc="headers[2].title"
                                            v-model="editedItem.intType"
                                            :options="headers[2].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[3].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[3].isNull"
                                            :labelDesc="headers[3].title"
                                            v-model="editedItem.intClass"
                                            :options="headers[3].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[4].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[4].isNull"
                                            :labelDesc="headers[4].title"
                                            v-model="editedItem.taxType"
                                            :options="headers[4].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[5].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[5].isNull"
                                            :labelDesc="headers[5].title"
                                            v-model="editedItem.rateAmtId"
                                            :options="headers[5].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[6].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[6].isNull"
                                            :labelDesc="headers[6].title"
                                            v-model="editedItem.intAmtId"
                                            :options="headers[6].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[7].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[7].isNull"
                                            :labelDesc="headers[7].title"
                                            v-model="editedItem.recalMethod"
                                            :options="headers[7].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
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
                                    <dc-multiselect-table
                                            :isKey="headers[10].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[10].isNull"
                                            :labelDesc="headers[10].title"
                                            v-model="editedItem.intDaysType"
                                            :options="headers[10].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[11].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[11].isNull"
                                            :labelDesc="headers[11].title"
                                            v-model="editedItem.intCalcBal"
                                            :options="headers[11].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[12].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[12].isNull"
                                            :labelDesc="headers[12].title"
                                            v-model="editedItem.intApplType"
                                            :options="headers[12].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[13].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[13].isNull"
                                            :labelDesc="headers[13].title"
                                            v-model="editedItem.rollFreq"
                                            :options="headers[13].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
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
                                            :isNumber="headers[15].attrType"
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
                                    <dc-multiselect-table
                                            :isKey="headers[17].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[17].isNull"
                                            :labelDesc="headers[17].title"
                                            v-model="editedItem.intRateInd"
                                            :options="headers[17].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[18].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[18].isNull"
                                            :labelDesc="headers[18].title"
                                            v-model="editedItem.monthBasis"
                                            :options="headers[18].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
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
                                    <dc-multiselect-table
                                            :isKey="headers[23].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[23].isNull"
                                            :labelDesc="headers[23].title"
                                            v-model="editedItem.acctRateEffect"
                                            :options="headers[23].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[24].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[24].isNull"
                                            :labelDesc="headers[24].title"
                                            v-model="editedItem.roundDown"
                                            :options="headers[24].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
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
    import { getAttrInfo } from "@/api/url/prodInfo";
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
                { dataIndex: 'RECAL_METHOD',title: '重算过去利息',lengths: "1",isNull: "true",valueScore: [{value: "取历史计提后再按模型计算", key: "I"},{value: "取历史利率计算", key: "H"},{value: "重新按模型计算", key: "N"}]},
                { dataIndex: 'COMPANY',title: '法人代码',lengths: "20",isNull: "false",valueScore: [{value: "DCITS-神州信息", key: "DCITS"}]},
                { dataIndex: 'INT_START',title: '计息起始日期取值方法',lengths: "1",isNull: "false"},
                { dataIndex: 'INT_DAYS_TYPE',title: '靠档天数计算方式',lengths: "1",isNull: "false"},
                { dataIndex: 'INT_CALC_BAL',title: '利息计算方法',lengths: "3",isNull: "false"},
                { dataIndex: 'INT_APPL_TYPE',title: '利率启用方式',lengths: "1",isNull: "false"},
                { dataIndex: 'ROLL_FREQ',title: '利率变更周期',lengths: "2",isNull: "false"},
                { dataIndex: 'ROLL_DAY',title: '利率变更日',lengths: "2",isNull: "false"},
                { dataIndex: 'MIN_RATE',title: '最小利率',lengths: "15",isNull: "false",attrType: "DOUBLE"},
                { dataIndex: 'MAX_RATE',title: '最大利率',lengths: "15",isNull: "false"},
                { dataIndex: 'INT_RATE_IND',title: '利率靠档标志',lengths: "1",isNull: "false"},
                { dataIndex: 'MONTH_BASIS',title: '月基准',lengths: "3",isNull: "false"},
                { dataIndex: 'GROUP_RULE_TYPE',title: '分组规则关系',lengths: "2",isNull: "true"},
                { dataIndex: 'SPLIT_ID',title: '首个分段ID',lengths: "10",key: "true",isNull: "true"},
                { dataIndex: 'SPLIT_TYPE',title: '分段类型',lengths: "3",isNull: "false"},
                { dataIndex: 'RULEID',title: '规则ID',lengths: "50",key: "true",isNull: "true"},
                { dataIndex: 'ACCT_RATE_EFFECT',title: '使用分户利率标志',lengths: "1",isNull: "false",valueScore: [{value: "是", key: "Y"},{value: "否", key: "N"}]},
                { dataIndex: 'ROUND_DOWN',title: '是否截位标志',lengths: "1",isNull: "false",valueScore: [{value: "是", key: "Y"},{value: "否", key: "N"}]},
            ],
            prodType: {columnCode: "PROD_TYPE", columnDesc: "PROD_DESC", tableName: "MB_PROD_TYPE"},
            eventType: {columnCode: "EVENT_DEFAULT_TYPE", columnDesc: "EVENT_DEFAULT_DESC", tableName: "MB_EVENT_DEFAULT_TYPE"},
            subType: {columnCode: "INT_TAX_TYPE", columnDesc: "INT_TAX_TYPE_DESC", tableName: "IRL_INT_TYPE"},
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
                minRate: undefined,
                maxRate: undefined,
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
                let data = getAttrInfo()
                getParamTable(tableName).then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                })

                getPkListColumnRf(this.prodType).then(function (response) {
                    that.headers[0].valueScore = response.data.data
                })
                getPkListColumnRf(this.eventType).then(function (response) {
                    that.headers[1].valueScore = response.data.data
                })
                getPkListColumnRf(this.subType).then(function (response) {
                    that.headers[2].valueScore = response.data.data
                })
                that.headers[3].valueScore = data["INT_CLASS"].valueScore
                getPkListColumnRf(this.subType).then(function (response) {
                    that.headers[4].valueScore = response.data.data
                })
                getPkListColumnRf(data[that.headers[5].dataIndex].valueScore).then(function (response) {
                    that.headers[5].valueScore = response.data.data
                })
                getPkListColumnRf(data[that.headers[6].dataIndex].valueScore).then(function (response) {
                    that.headers[6].valueScore = response.data.data
                })
                that.headers[10].valueScore = data[that.headers[10].dataIndex].valueScore
                that.headers[11].valueScore = data[that.headers[11].dataIndex].valueScore
                that.headers[12].valueScore = data[that.headers[12].dataIndex].valueScore
                getPkListColumnRf(data[that.headers[13].dataIndex].valueScore).then(function (response) {
                    that.headers[13].valueScore = response.data.data
                })
                that.headers[17].valueScore = data[that.headers[17].dataIndex].valueScore
                that.headers[18].valueScore = data[that.headers[18].dataIndex].valueScore
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
                this.editedItem.maxRate = obj.MAX_RATE==null?null:obj.MAX_RATE.toString()
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
                if(!this.limit(obj)){
                    return
                }
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
            limit(editSelected){
                for(let i=0; i<this.headers.length; i++){
                    if(this.headers[i].isNull!=undefined && this.headers[i].isNull != null&&this.headers[i].isNull !="null"&&this.headers[i].isNull =="true"){
                        if(editSelected[this.headers[i].dataIndex] == []){
                            this.sweetAlert('error',"带*号的字段不能为空!")
                            return false
                        }
                    }
                }
                if(this.addorchange) {
                    for (let j = 0; j < this.sourceData.length; j++) {
                        let str = []
                        for (let m = 0; m < this.headers.length; m++) {
                            if (this.headers[m].key != undefined && this.headers[m].key != null && this.headers[m].key != "null" && this.headers[m].key == "true") {
                                if (editSelected[this.headers[m].dataIndex] != this.sourceData[j][this.headers[m].dataIndex]) {
                                    break
                                }
                                str.push(this.headers[m].title)
                            }
                            if (m == (this.headers.length - 1)) {
                                this.sweetAlert('error', str + "与第[" + (j + 1) + "]条重复！")
                                return false
                            }
                        }
                    }
                }
                return true
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