<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-icon>widgets</v-icon>
            <v-toolbar-title>规则信息表-[IRL_RULE_MESSAGE]</v-toolbar-title>
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
                                    <dc-text-field-table
                                            v-model="editedItem.ruleClass1"
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
                                            v-model="editedItem.ruleClass2"
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
                                            v-model="editedItem.ruleClass3"
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
                                            v-model="editedItem.ruleDesc"
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
                                            v-model="editedItem.ruleExpress"
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
                                            v-model="editedItem.intFloatType"
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
                                            v-model="editedItem.floatValue"
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
                                            v-model="editedItem.checkType"
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
                                            v-model="editedItem.userId"
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
                                            v-model="editedItem.createDate"
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
                                            v-model="editedItem.ruleStatus"
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
                                            v-model="editedItem.importMessage"
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
                                            v-model="editedItem.specialRuleProcess"
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
                                            v-model="editedItem.groupCcy"
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
                                            v-model="editedItem.ruleFlag"
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
                                            v-model="editedItem.groupType"
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
                                            v-model="editedItem.ruleWeight"
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
                                    <dc-date class="dcDate"
                                             :disablePower="disablePower" :labelDesc="headers[4].title" v-model="editedItem.startDateTime"
                                             :isNotNull="headers[4].key" :isKey= "headers[4].key"
                                    ></dc-date>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-date class="dcDate"
                                             :disablePower="disablePower" :labelDesc="headers[5].title" v-model="editedItem.endDateTime"
                                             :isNotNull="headers[5].key" :isKey= "headers[5].key"
                                    ></dc-date>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-multiselect-table
                                            :isKey="headers[17].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[17].isNull"
                                            :labelDesc="headers[17].title"
                                            v-model="editedItem.company"
                                            :options="headers[17].valueScore"
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
                { dataIndex: 'RULE_CLASS_1',title: '规则分类1',lengths: "20",key: "false",isNull: "true"},
                { dataIndex: 'RULE_CLASS_2',title: '规则分类2',lengths: "20",isNull: "false"},
                { dataIndex: 'RULE_CLASS_3',title: '规则分类3',lengths: "20",key: "false",isNull: "false"},
                { dataIndex: 'START_DATE_TIME',title: '生效日期',lengths: "17",isNull: "true"},
                { dataIndex: 'END_DATE_TIME',title: '失效日期',lengths: "17",isNull: "true"},
                { dataIndex: 'RULE_DESC',title: '规则描述',lengths: "256",isNull: "true"},
                { dataIndex: 'RULE_EXPRESS',title: '规则表达式',lengths: "2000",isNull: "true"},
                { dataIndex: 'INT_FLOAT_TYPE',title: '浮动类型',lengths: "2",isNull: "false"},
                { dataIndex: 'FLOAT_VALUE',title: '浮动值',lengths: "10",isNull: "false"},
                { dataIndex: 'CHECK_TYPE',title: '约束类型',lengths: "2",isNull: "false"},
                { dataIndex: 'USER_ID',title: '交易柜员',lengths: "30",isNull: "true"},
                { dataIndex: 'CREATE_DATE',title: '创建日期',lengths: "8",isNull: "true"},
                { dataIndex: 'RULE_STATUS',title: '规则状态',lengths: "1",isNull: "true"},
                { dataIndex: 'IMPORT_MESSAGE',title: '规则引用信息',lengths: "256",isNull: "false"},
                { dataIndex: 'SPECIAL_RULE_PROCESS',title: '特殊规则浮动信息',lengths: "512",isNull: "false"},
                { dataIndex: 'GROUP_CCY',title: '币种组',lengths: "10",isNull: "false"},
                { dataIndex: 'COMPANY',title: '法人代码',lengths: "20",valueScore: [{value: "DCITS-神州信息", key: "DCITS"}]},
                { dataIndex: 'RULE_FLAG',title: '规则标志',lengths: "1",isNull: "true"},
                { dataIndex: 'GROUP_TYPE',title: '规则分组类型',lengths: "20",isNull: "false"},
                { dataIndex: 'RULE_WEIGHT',title: '规则权重',lengths: "5",isNull: "false"},
            ],
            dessert: {
                IRL_SEQ_NO: "",
                RULE_CLASS_1: "",
                RULE_CLASS_2: "",
                RULE_CLASS_3: "",
                START_DATE_TIME: "",
                END_DATE_TIME: "",
                RULE_DESC: "",
                RULE_EXPRESS: "",
                INT_FLOAT_TYPE: "",
                FLOAT_VALUE: "",
                CHECK_TYPE: "",
                USER_ID: "",
                CREATE_DATE: "",
                RULE_STATUS: "",
                IMPORT_MESSAGE: "",
                SPECIAL_RULE_PROCESS: "",
                GROUP_CCY: "",
                COMPANY: "",
                RULE_FLAG: "",
                GROUP_TYPE: "",
                RULE_WEIGHT: "",
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
                ruleClass1: "",
                ruleClass2: "",
                ruleClass3: "",
                startDateTime: "",
                endDateTime: "",
                ruleDesc: "",
                ruleExpress: "",
                intFloatType: "",
                floatValue: "",
                checkType: "",
                userId: "",
                createDate: "",
                ruleStatus: "",
                importMessage: "",
                specialRuleProcess: "",
                groupCcy: "",
                company: "",
                ruleFlag: "",
                groupType: "",
                ruleWeight: "",
            },
            defaultItem: {
                irlSeqNo: "",
                ruleClass1: "",
                ruleClass2: "",
                ruleClass3: "",
                startDateTime: "",
                endDateTime: "",
                ruleDesc: "",
                ruleExpress: "",
                intFloatType: "",
                floatValue: "",
                checkType: "",
                userId: "",
                createDate: "",
                ruleStatus: "",
                importMessage: "",
                specialRuleProcess: "",
                groupCcy: "",
                company: "",
                ruleFlag: "",
                groupType: "",
                ruleWeight: "",
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
                return this.editedIndex === -1 ? '新增规则信息' : '修改规则信息'
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
                if(this.selected.INT_BASIS == undefined){
                    this.sweetAlert('info',"请选择一条数据!")
                    return
                }
                this.editedItem.intBasis = obj.INT_BASIS
                this.editedItem.intBasisDesc= obj.INT_BASIS_DESC
                this.editedItem.routerKey = obj.ROUTER_KEY
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