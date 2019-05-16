<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-icon>widgets</v-icon>
            <v-toolbar-title>利率税率类型表-[IRL_INT_TYPE]</v-toolbar-title>
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
                                            v-model="editedItem.intTaxType"
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
                                    <dc-multiselect-table
                                            :isKey="headers[2].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[2].isNull"
                                            :labelDesc="headers[2].title"
                                            v-model="editedItem.prodGrp"
                                            :options="headers[2].valueScore"
                                            class="dcMulti"
                                            :isMultiSelect=false
                                    ></dc-multiselect-table>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <dc-text-field-table
                                            v-model="editedItem.intTaxTypeDesc"
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
                                            v-model="editedItem.rateLadder"
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
                                            v-model="editedItem.IntTaxFlag"
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
                                    <dc-multiselect-table
                                            :isKey="headers[4].key"
                                            :childPd="childPd"
                                            :isNotNull="headers[4].isNull"
                                            :labelDesc="headers[4].title"
                                            v-model="editedItem.company"
                                            :options="headers[4].valueScore"
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
                                            v-model="editedItem.taxLadder"
                                            :options="headers[6].valueScore"
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
                { dataIndex: 'INT_TAX_TYPE',title: '利率税率类型',key: "true",lengths: "3",isNull: "true"},
                { dataIndex: 'INT_TAX_TYPE_DESC',title: '利率税率类型描述',lengths: "50",isNull: "true"},
                { dataIndex: 'PROD_GRP',title: '产品组',lengths: "20",isNull: "true",valueScore: [{value: "资产", key: "CL"},{value: "总账", key: "GL"},{value: "货币市场", key: "MM"},{value: "负债", key: "RB"}]},
                { dataIndex: 'RATE_LADDER',title: '利息计算模型',lengths: "1",isNull: "true",valueScore: []},
                { dataIndex: 'COMPANY',title: '法人代码',lengths: "66",isNull: "false",valueScore: [{value: "DCITS-神州信息", key: "DCITS"}]},
                { dataIndex: 'INT_TAX_FLAG',title: '利率类型税率类型标志',lengths: "3",isNull: "true"},
                { dataIndex: 'TAX_LADDER',title: '税率计算模型',lengths: "1",isNull: "false",valueScore: [{value: "增值税", key: "A"},{value: "个人所得税", key: "B"}]},

            ],
            /*rateLadder: {columnCode: "FIELD_VALUE", columnDesc: "DOMAIN", tableName: "FM_REF_CODE"},*/
            dessert: {
                INT_TAX_TYPE: "",
                INT_TAX_TYPE_DESC: "",
                PROD_GRP: "",
                RATE_LADDER: "",
                COMPANY: "",
                INT_TAX_FLAG: "",
                TAX_LADDER: ""
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
                intTaxType: "",
                intTaxTypeDesc: "",
                prodGrp: "",
                rateLadder: "",
                company: "",
                IntTaxFlag: "",
                taxLadder: ""
            },
            defaultItem: {
                intTaxType: "",
                intTaxTypeDesc: "",
                prodGrp: "",
                rateLadder: "",
                company: "",
                IntTaxFlag: "",
                taxLadder: ""
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
                return this.editedIndex === -1 ? '新增利率税率类型' : '修改利率税率类型'
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
/*                getPkListColumnRf(this.rateLadder).then(function (response) {
                    that.headers[3].valueScore = response.data.data
                })*/
            },

            editItem () {
                let obj = this.selected
                if(this.selected.INT_TAX_TYPE == undefined){
                    this.sweetAlert('info',"请选择一条数据!")
                    return
                }
                this.editedItem.intTaxType = obj.INT_TAX_TYPE
                this.editedItem.intTaxTypeDesc = obj.INT_TAX_TYPE_DESC
                this.editedItem.prodGrp = obj.PROD_GRP
                this.editedItem.rateLadder = obj.RATE_LADDER
                this.editedItem.IntTaxFlag = obj.INT_TAX_FLAG
                this.editedItem.company = obj.COMPANY
                this.editedItem.taxLadder = obj.TAX_LADDER
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
                obj.INT_TAX_TYPE = this.editedItem.intTaxType
                obj.INT_TAX_TYPE_DESC = this.editedItem.intTaxTypeDesc
                obj.PROD_GRP = this.editedItem.prodGrp
                obj.RATE_LADDER = this.editedItem.rateLadder
                obj.INT_TAX_FLAG = this.editedItem.IntTaxFlag
                obj.COMPANY = this.editedItem.company
                obj.TAX_LADDER = this.editedItem.taxLadder
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
                for(let j=0; j<this.sourceData.length; j++){
                    let str = []
                    for(let m=0; m<this.headers.length; m++){
                        if(this.headers[m].key!=undefined && this.headers[m].key != null&&this.headers[m].key !="null"&&this.headers[m].key =="true"){
                            if(editSelected[this.headers[m].dataIndex] != this.sourceData[j][this.headers[m].dataIndex]){
                                break
                            }
                            str.push(this.headers[m].title)
                        }
                        if(m==(this.headers.length-1)){
                            this.sweetAlert('error',str+"与第["+(j+1)+"]条重复！")
                            return false
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