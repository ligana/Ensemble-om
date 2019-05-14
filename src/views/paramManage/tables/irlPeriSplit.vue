<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-icon>widgets</v-icon>
            <v-toolbar-title>周期分段参数表-[IRL_PERI_SPLIT]</v-toolbar-title>
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
                                            v-model="editedItem.periSplitId"
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
                                                v-model="editedItem.periSeqNo"
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
                                                v-model="editedItem.period"
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
                                                v-model="editedItem.periodType"
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
                                                v-model="editedItem.periSplitMode"
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
                                                v-model="editedItem.recalDays"
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
                                                v-model="editedItem.recalMethod"
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
                                                v-model="editedItem.intType"
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
                                                v-model="editedItem.amtSplitId"
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
                                                v-model="editedItem.ruleId"
                                                :counter="10"
                                                :isNotNull="headers[9].isNull"
                                                :isKey= "headers[9].key"
                                                :lengths= "headers[9].lengths"
                                                :label= "headers[9].title"
                                                :labelDesc= "headers[9].title"
                                                required
                                        ></dc-text-field-table>
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
                { dataIndex: 'PERI_SPLIT_ID',title: '周期分段ID',key: "true",lengths: "10",isNull: "true"},
                { dataIndex: 'PERI_SEQ_NO',title: '序号',lengths: "5",key: "true",isNull: "true"},
                { dataIndex: 'PERIOD',title: '分段周期',lengths: "50",isNull: "false"},
                { dataIndex: 'PERIOD_TYPE',title: '分段周期类型',lengths: "1",isNull: "false"},
                { dataIndex: 'PERI_SPLIT_MODE',title: '分段模式',lengths: "1",isNull: "false"},
                { dataIndex: 'RECAL_DAYS',title: '重算天数',lengths: "5",isNull: "false"},
                { dataIndex: 'RECAL_METHOD',title: '重算过去利息',lengths: "1",isNull: "false"},
                { dataIndex: 'INT_TYPE',title: '利率类型',lengths: "3",isNull: "false"},
                { dataIndex: 'AMT_SPLIT_ID',title: '金额分段ID',lengths: "10",isNull: "false"},
                { dataIndex: 'RULE_ID',title: '规则ID',lengths: "500",isNull: "false"},
            ],
            dessert: {
                PERI_SPLIT_ID: "",
                PERI_SEQ_NO: "",
                PERIOD: "",
                PERIOD_TYPE: "",
                PERI_SPLIT_MODE: "",
                RECAL_DAYS: "",
                RECAL_METHOD: "",
                INT_TYPE: "",
                AMT_SPLIT_ID: "",
                RULE_ID: "",
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
                periSplitId: "",
                periSeqNo: "",
                period: "",
                periodType: "",
                periSplitMode: "",
                recalDays: "",
                recalMethod: "",
                intType: "",
                amtSplitId: "",
                ruleId: "",
            },
            defaultItem: {
                periSplitId: "",
                periSeqNo: "",
                period: "",
                periodType: "",
                periSplitMode: "",
                recalDays: "",
                recalMethod: "",
                intType: "",
                amtSplitId: "",
                ruleId: "",
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
                return this.editedIndex === -1 ? '新增周期分段参数' : '修改周期分段参数'
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
                if(this.selected.PERI_SPLIT_ID == undefined){
                    this.sweetAlert('info',"请选择一条数据!")
                    return
                }
                this.editedItem.periSplitId = obj.PERI_SPLIT_ID
                this.editedItem.periSeqNo = obj.PERI_SEQ_NO
                this.editedItem.period = obj.PERIOD
                this.editedItem.periodType = obj.PERIOD_TYPE
                this.editedItem.periSplitMode = obj.PERI_SPLIT_MODE
                this.editedItem.recalDays = obj.RECAL_DAYS
                this.editedItem.recalMethod = obj.RECAL_METHOD
                this.editedItem.intType = obj.INT_TYPE
                this.editedItem.amtSplitId = obj.AMT_SPLIT_ID
                this.editedItem.ruleId = obj.RULE_ID
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
                obj.PERI_SPLIT_ID = this.editedItem.periSplitId
                obj.PERI_SEQ_NO = this.editedItem.periSeqNo
                obj.PERIOD = this.editedItem.period
                obj.PERIOD_TYPE = this.editedItem.periodType
                obj.PERI_SPLIT_MODE = this.editedItem.periSplitMode
                obj.RECAL_DAYS = this.editedItem.recalDays
                obj.RECAL_METHOD = this.editedItem.recalMethod
                obj.INT_TYPE = this.editedItem.intType
                obj.AMT_SPLIT_ID = this.editedItem.amtSplitId
                obj.RULE_ID = this.editedItem.ruleId
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