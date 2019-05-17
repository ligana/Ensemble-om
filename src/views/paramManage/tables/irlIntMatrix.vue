<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-icon>widgets</v-icon>
            <v-toolbar-title>利率税率阶梯表-[IRL_INT_MATRIX]</v-toolbar-title>
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
                                            v-model="editedItem.matrixNo"
                                            :counter="10"
                                            :isNotNull="headers[0].isNull"
                                            :isKey= "headers[0].key"
                                            :lengths= "headers[0].lengths"
                                            :label= "headers[0].title"
                                            :labelDesc= "headers[0].title"
                                            :disabled="disabled"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.irlSeqNo"
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
                                            v-model="editedItem.matrixAmt"
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
                                    <dc-multiselect-table
                                            :isKey="headers[3].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[3].isNull"
                                            :labelDesc="headers[3].title"
                                            v-model="editedItem.periodFreq"
                                            :options="headers[3].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.dayNum"
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
                                    <dc-multiselect-table
                                            :isKey="headers[5].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[5].isNull"
                                            :labelDesc="headers[5].title"
                                            v-model="editedItem.intBasis"
                                            :options="headers[5].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.baseRate"
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
                                            v-model="editedItem.spreadRate"
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
                                            v-model="editedItem.spreadPercent"
                                            :counter="10"
                                            :isNotNull="headers[8].isNull"
                                            :isKey= "headers[8].key"
                                            :lengths= "headers[8].lengths"
                                            :label= "headers[8].title"
                                            :labelDesc= "headers[8].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.actualRate"
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
                                            v-model="editedItem.minRate"
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
                                            v-model="editedItem.maxRate"
                                            :counter="11"
                                            :isNotNull="headers[11].isNull"
                                            :isKey= "headers[11].key"
                                            :lengths= "headers[11].lengths"
                                            :label= "headers[11].title"
                                            :labelDesc= "headers[11].title"
                                            required
                                    ></dc-text-field-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[12].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[12].isNull"
                                            :labelDesc="headers[12].title"
                                            v-model="editedItem.subIntType"
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
                                            v-model="editedItem.isOver"
                                            :options="headers[13].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[14].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[14].isNull"
                                            :labelDesc="headers[14].title"
                                            v-model="editedItem.company"
                                            :options="headers[14].valueScore"
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
    import {saveTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getParamTable} from "@/api/url/prodInfo";
    import DcTextFieldTable from "@/components/widgets/DcTextFieldTable";
    import DcDate from '@/components/widgets/DcDate'
    import DcMultiselectTable from '@/components/widgets/DcMultiselectTable'
    import {remove} from '@/utils/util'
    import { getPkListColumnRf } from "@/api/url/prodInfo";
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
                { dataIndex: 'MATRIX_NO',title: '阶梯序号',key: "true",lengths: "50",isNull: "true"},
                { dataIndex: 'IRL_SEQ_NO',title: '序号',lengths: "50",isNull: "true"},
                { dataIndex: 'MATRIX_AMT',title: '阶梯金额',lengths: "17",isNull: "true"},
                { dataIndex: 'PERIOD_FREQ',title: '结转频率',lengths: "2",isNull: "false",valueScore: []},
                { dataIndex: 'DAY_NUM',title: '每期天数',lengths: "5",isNull: "false"},
                { dataIndex: 'INT_BASIS',title: '基准利率类型',lengths: "2",isNull: "false",valueScore: []},
                { dataIndex: 'BASE_RATE',title: '基准利率',lengths: "15",isNull: "false"},
                { dataIndex: 'SPREAD_RATE',title: '浮动点数',lengths: "15",isNull: "false"},
                { dataIndex: 'SPREAD_PERCENT',title: '利率浮动百分比',lengths: "5",isNull: "false"},
                { dataIndex: 'ACTUAL_RATE',title: '实际利率',lengths: "15",isNull: "false"},
                { dataIndex: 'MIN_RATE',title: '最小利率',lengths: "15",isNull: "false"},
                { dataIndex: 'MAX_RATE',title: '最大利率',lengths: "15",isNull: "false"},
                { dataIndex: 'SUB_INT_TYPE',title: '子利率类型',lengths: "3",isNull: "false",valueScore: []},
                { dataIndex: 'IS_OVER',title: '利率终结标志',lengths: "1",isNull: "false",valueScore: [{value: "是", key: "Y"},{value: "否", key: "N"}]},
                { dataIndex: 'COMPANY',title: '法人代码',lengths: "20",isNull: "false",valueScore: [{value: "DCITS-神州信息", key: "DCITS"}]}
            ],
            freqType: {columnCode: "PERIOD_FREQ", columnDesc: "PERIOD_FREQ_DESC", tableName: "FM_PERIOD_FREQ"},
            basisType: {columnCode: "INT_BASIS", columnDesc: "INT_BASIS_DESC", tableName: "IRL_INT_BASIS"},
            subType: {columnCode: "INT_TAX_TYPE", columnDesc: "INT_TAX_TYPE_DESC", tableName: "IRL_INT_TYPE"},
            dessert: {
                MATRIX_NO: '',
                IRL_SEQ_NO: '',
                MATRIX_AMT: '',
                PERIOD_FREQ: '',
                DAY_NUM: '',
                INT_BASIS: '',
                BASE_RATE: '',
                SPREAD_RATE: '',
                SPREAD_PERCENT: '',
                ACTUAL_RATE: '',
                MIN_RATE: '',
                MAX_RATE: '',
                SUB_INT_TYPE: '',
                IS_OVER: '',
                COMPANY: ''
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
                matrixNo: '',
                irlSeqNo: '',
                matrixAmt: '',
                periodFreq: '',
                dayNum: '',
                intBasis: '',
                baseRate: '',
                spreadRate: '',
                spreadPercent: '',
                actualRate: '',
                minRate: '',
                maxRate: '',
                subIntType: '',
                isOver: '',
                company: ''
            },
            defaultItem: {
                matrixNo: '',
                irlSeqNo: '',
                matrixAmt: '',
                periodFreq: '',
                dayNum: '',
                intBasis: '',
                baseRate: '',
                spreadRate: '',
                spreadPercent: '',
                actualRate: '',
                minRate: '',
                maxRate: '',
                subIntType: '',
                isOver: '',
                company: ''
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
                return this.editedIndex === -1 ? '新增利率税率阶梯' : '修改利率税率阶梯'
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
                getPkListColumnRf(this.freqType).then(function (response) {
                    that.headers[3].valueScore = response.data.data
                })
                getPkListColumnRf(this.basisType).then(function (response) {
                    that.headers[5].valueScore = response.data.data
                })
                getPkListColumnRf(this.subType).then(function (response) {
                    that.headers[12].valueScore = response.data.data
                })

            },

            editItem () {
                let obj = this.selected
                if(this.selected.MATRIX_NO == undefined){
                    this.sweetAlert('info',"请选择一条数据!")
                    return
                }
                this.editedItem.matrixNo = obj.MATRIX_NO
                this.editedItem.irlSeqNo = obj.IRL_SEQ_NO
                this.editedItem.matrixAmt = obj.MATRIX_AMT==null?null:obj.MATRIX_AMT.toString()
                this.editedItem.periodFreq = obj.PERIOD_FREQ
                this.editedItem.dayNum = obj.DAY_NUM
                this.editedItem.intBasis =obj.INT_BASIS
                this.editedItem.baseRate = obj.BASE_RATE==null?null:obj.BASE_RATE.toString()
                this.editedItem.spreadRate = obj.SPREAD_RATE==null?null:obj.SPREAD_RATE.toString()
                this.editedItem.spreadPercent = obj.SPREAD_PERCENT==null?null:obj.SPREAD_PERCENT.toString()
                this.editedItem.actualRate = obj.ACTUAL_RATE==null?null:obj.ACTUAL_RATE.toString()
                this.editedItem.minRate = obj.MIN_RATE==null?null:obj.MIN_RATE.toString()
                this.editedItem.maxRate = obj.MAX_RATE==null?null:obj.MAX_RATE.toString()
                this.editedItem.subIntType =obj.SUB_INT_TYPE
                this.editedItem.isOver = obj.IS_OVER
                this.editedItem.company =obj.COMPANY
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
                obj.MATRIX_NO = this.editedItem.matrixNo
                obj.IRL_SEQ_NO = this.editedItem.irlSeqNo
                obj.MATRIX_AMT = this.editedItem.matrixAmt
                obj.PERIOD_FREQ = this.editedItem.periodFreq
                obj.DAY_NUM = this.editedItem.dayNum
                obj.INT_BASIS = this.editedItem.intBasis
                obj.BASE_RATE = this.editedItem.baseRate
                obj.SPREAD_RATE = this.editedItem.spreadRate
                obj.SPREAD_PERCENT = this.editedItem.spreadPercent
                obj.ACTUAL_RATE = this.editedItem.actualRate
                obj.MIN_RATE = this.editedItem.minRate
                obj.MAX_RATE = this.editedItem.maxRate
                obj.SUB_INT_TYPE = this.editedItem.subIntType
                obj.IS_OVER = this.editedItem.isOver
                obj.COMPANY = this.editedItem.company
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