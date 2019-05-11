<template>
    <v-layout class="pt-1" v-show="prodInt.length">
        <v-flex md3 lg3 class="flex">
            <v-switch class="switchClass" v-model="switchValue" :label="switchValue == true?'使用固定利率值':'不使用固定利率值'"></v-switch>
            <v-divider></v-divider>
            <!-- 不使用固定利率列表信息-->
            <v-list v-show="!switchValue">
                <v-list-tile v-for="item in titleList" :key="item.key" @click="chipClick(item)" :class="item.class">
                    <v-list-tile-content>
                        <v-list-tile-title style="font-size: medium">{{ item.key }}-{{ item.lable }},{{ item.key1 }}-{{ item.lable1 }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <!-- 使用固定利率列表信息-->
            <v-list v-show="switchValue && fixedInfo.length">
                <v-list-tile v-for="item in FixeditleList" :key="item.key" @click="fixedChipClick(item)" :class="item.class">
                    <v-list-tile-content>
                        <v-list-tile-title style="font-size: medium">{{ item.key }}-{{ item.lable }},{{ item.key1 }}-{{ item.lable1 }}</v-list-tile-title>
                        <v-list-tile-sub-title></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-flex>
        <!-- 不使用固定利率展示-->
        <v-flex md9 lg9 v-show="!switchValue">
            <base-table :tableData="selectInfo" :keySet="keySet" :tag="tag" v-on:showClick="showClick"></base-table>
        </v-flex>
        <!-- 使用固定利率界面-->
        <v-flex md9 lg9 v-show="switchValue">
            <prod-fixed :fiexInfo="fixedInfo" :fixedIndex="fixedIndex"></prod-fixed>
        </v-flex>
        <!--利率代码详情弹出框-->
        <v-dialog v-model="dialog" width="800">
            <v-toolbar color="primary lighten-2" style="height: 50px">
                <v-toolbar-title class="white--text" style="margin-top: -2%">利率代码详情</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon class="mr-2 closeClass" @click="close()">close</v-icon>
            </v-toolbar>
            <v-card>
                <v-card-text class="pa-0">
                <a-table :columns="irlCodeColumn" :dataSource="irlCodeInfo" bordered>
                </a-table>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getAllDefines } from '@/api/url/prodInfo';
    import { getProdClassList } from '@/api/url/prodInfo';
    import DcTextField from "@/components/widgets/DcTextField";
    import {getParamTable} from "@/api/url/prodInfo";
    import BaseTable from "./baseProdTable"
    import ProdFixed from "./prodIntFixed"
    import DcSelect from '@/components/widgets/DcMultiselect'

    import {
        getProdType
    } from '@/api/url/prodInfo'
    export default {
        components: {DcTextField,BaseTable,ProdFixed,DcSelect},
        props: ["prodData"],
        data: () => ({
            fixedInfo: [],
            fixedIndex: 0,
            switchValue: false,
            titleList: [],
            FixeditleList: [],
            eventTypeInfo: [],
            periodFreqInfo: [],
            intClass: [
                {
                    key: 'INT',
                    desc: "正常利息"
                },
                {
                    key: 'ODP',
                    desc: "罚息"
                },
                {
                    key: 'ODI',
                    desc: "复利"
                },
                {
                    key: 'ODODP',
                    desc: "罚息的复利"
                },
                {
                    key: 'ODODI',
                    desc: "复利的复利"
                },
                {
                    key: 'ODF',
                    desc: "透支利息"
                },
                {
                    key: 'PDUE',
                    desc: "超期利息"
                },
                {
                    key: "INTPRE",
                    desc: "前付息"
                }
            ],
            keySet: {
                prodType: "prodType",
                eventType: "eventType",
                intClass: "intClass",
                splitId: "splitId",
                ruleid: "ruleid"
            },
            fixedKeySet: {
                eventType: "eventType"
            },
            irlCodeInfo: [],
            selectInfo: {},
            fixedSelectInfo: {},
            tag: "",
            dialog: false,
            irlCodeColumn: [
                {dataIndex: 'depositDate', title: '存期',scopedSlots: { customRender: 'eventType' },width: 100},
                {dataIndex: 'amt', title: '金额',width: 100},
                {dataIndex: 'intType', title: '利率类型',width: 100},
                {dataIndex: 'baseIntValue', title: '基准利率值',width: 130},
                {dataIndex: 'floatPer', title: '浮动百分比',width: 130},
                {dataIndex: 'prodIntValue', title: '产品利率值',width: 130},
                {dataIndex: 'ccy', title: '币种',width: 80},
                {dataIndex: 'branch', title: '机构',width: 80}
            ],
            prodInt: [],
            fixedInfos: [],
            irlPeriSplit: [],
            irlAmtSplit: [],
            irlIntType: [],
            irlIntRate: [],
            irlIntMatrix: [],
            irlBasisRate: [],
            ccy: [],
            branch: [],
            legalPerson: '',
            intOption: {
                tableName: "IRL_INT_TYPE",
                columnCode: "INT_TAX_TYPE",
                columnDesc: "INT_TAX_TYPE_DESC"
            }
        }),
        watch: {
            prodData (val) {
                this.getProdIntInfo(val)
                this.getFixedIntRate(val)
                this.initTitle()
            },
            switchValue(val){
                this.switchChange(val)
            }
        },
        mounted: function() {
            console.log("test")
        },
        methods: {
            getProdIntInfo(val) {
                let that = this
                //获取基本信息
                if(val!=undefined&&val.prodType!=undefined){
                    that.prodInt = val.irlProdInt;
                    that.irlPeriSplit = val.irlProdIntInfos.irlPeriSplitList;
                    that.irlAmtSplit = val.irlProdIntInfos.irlAmtSplitList;
                    that.irlIntType = val.irlProdIntInfos.irlIntTypeList;
                    that.irlIntRate = val.irlProdIntInfos.irlIntRateList;
                    that.irlBasisRate = val.irlBasisRateList;
                    that.irlIntMatrix = val.irlIntMatrices;
                    //获取产品适用币种，机构信息,法人信息
                    if(val.prodDefines.CCY != null && val.prodDefines.CCY != undefined) {
                        that.ccy = val.prodDefines.CCY.attrValue.split(",");
                    }
                    if(val.prodDefines.PROD_BRANCH != null && val.prodDefines.PROD_BRANCH != undefined) {
                        that.branch = val.prodDefines.PROD_BRANCH.attrValue.split(",");
                    }
                    if(val.prodDefines.LEGAL_PERSON != undefined && val.prodDefines.LEGAL_PERSON != "" && val.prodDefines.LEGAL_PERSON != null) {
                        that.legalPerson = val.prodDefines.LEGAL_PERSON.attrValue
                    }
                }
            },
            //获取事件对应利率 且利率计算模型为F-固定利率模型的利率值
            getFixedIntRate(val){
                let prodInt = val.irlProdInt;
                let intType = val.irlProdIntInfos.irlIntTypeList;
                let intMartix = val.irlIntMatrices;
                this.FixeditleList = []
                this.fixedInfo = []
                for(let prodIntIndex in prodInt){
                    for(let intTypeIndex in intType){
                        //匹配事件对应利率类型 && 利率税率类型标志为INT-利率 && 利率的利息计算模型为“F-固定利率模型”
                        if(prodInt[prodIntIndex].intType === intType[intTypeIndex].intTaxType && intType[intTypeIndex].intTaxFlag === "INT" && intType[intTypeIndex].rateLadder === "F"){
                            this.getFixedIntRateTemp(prodInt,prodIntIndex,intType,intMartix);
                            break;
                        }
                    }
                }
            },
            //降低getFixedIntRate方法深度
            getFixedIntRateTemp(prodInt,prodIntIndex,intType,intMartix){
                let irlIntRateFixedArr = [];
                //通过利率类型，产品币种，机构获取irl_int_rate表该利率类型最新利率值对应的irl_seq_no
                irlIntRateFixedArr = this.getIrlIntMatrix(prodInt[prodIntIndex].intType);
                //通过irl_seq_no联合irl_int_martix表，irl_basis_rate表 获取基准利率值
                for(let irlIndex in irlIntRateFixedArr) {
                    for (let matrixIndex in intMartix) {
                        if (intMartix[matrixIndex].irlSeqNo === irlIntRateFixedArr[irlIndex].irlSeqNo && intMartix[matrixIndex].company === this.legalPerson) {
                            let fixedArr = []
                            let index = this.fixedInfo.length
                            let tempTitle = {}
                            //采用基础浮动利率 获取基准利率值,组装irl_base_rate数据
                            let baseRate = this.getUpRateValue(intMartix[matrixIndex].intBasis,irlIntRateFixedArr[irlIndex].ccy);
                           //数组组装
                            fixedArr.push(prodInt[prodIntIndex]);
                            fixedArr.push(intMartix[matrixIndex]);
                            fixedArr.push(baseRate);
                            fixedArr.push(index);
                            this.fixedInfo.push(fixedArr);
                            //组织列表数据  事件类型
                            tempTitle["index"] = index
                            //组织列表数据  事件类型
                            tempTitle["key"] = prodInt[prodIntIndex].eventType
                            getParamTable("MB_EVENT_DEFAULT_TYPE").then(function (response) {
                                for(let eventKey in response.data.data.columnInfo){
                                    if(prodInt[prodIntIndex].eventType == response.data.data.columnInfo[eventKey].EVENT_DEFAULT_TYPE){
                                        tempTitle["lable"] = response.data.data.columnInfo[eventKey].EVENT_DEFAULT_DESC
                                    }
                                }
                            });
                            //组织列表数据 存期
                            tempTitle["key1"] = intMartix[matrixIndex].periodFreq
                            //获取存期信息
                            getParamTable("FM_PERIOD_FREQ").then(function (response) {
                                for(let freqKey in response.data.data.columnInfo){
                                    if(intMartix[matrixIndex].periodFreq == response.data.data.columnInfo[freqKey].PERIOD_FREQ){
                                        tempTitle["lable1"] = response.data.data.columnInfo[freqKey].PERIOD_FREQ_DESC
                                    }
                                }
                            });
                            tempTitle["class"] = ""
                            this.FixeditleList.push(tempTitle)
                        }
                    }
                }
            },
            initTitle() {
                //初始化选择列表信息（不使用固定利率信息）
                let that = this
                that.titleList = []
                //获取事件类型信息
                getParamTable("MB_EVENT_DEFAULT_TYPE").then(function (response) {
                    that.eventTypeInfo = response.data.data.columnInfo;
                    for(let index in that.prodInt){
                        let temp ={}
                        //多主键，事件类型组装
                        temp["key"] = that.prodInt[index].eventType;
                        for(let key in response.data.data.columnInfo){
                            if(that.prodInt[index].eventType == response.data.data.columnInfo[key].EVENT_DEFAULT_TYPE){
                                temp["lable"] = response.data.data.columnInfo[key].EVENT_DEFAULT_DESC;
                                break
                            }
                        }
                        //多主键，利息分类组装
                        for(let intKey in that.intClass){
                            if(that.prodInt[index].intClass == that.intClass[intKey].key){
                                temp["key1"] = that.intClass[intKey].key;
                                temp["lable1"] = that.intClass[intKey].desc;
                                temp["class"] = ""
                            }
                        }
                        that.titleList.push(temp)
                    }
                });
                if(that.prodInt.length){
                    that.selectInfo = that.prodInt[0]
                    that.tag = that.prodInt[0].splitId;
                }
            },
            chipClick(val) {
                //点击列表信息触发事件
                this.selectInfo = {}
                this.tag = "";
                let eventType = val.key
                let intClass = val.key1
                for(let i=0; i<this.titleList.length; i++){
                    this.titleList[i].class = ""
                }
                val.class = "select"
                for(let index in this.prodInt){
                    if(eventType == this.prodInt[index].eventType && intClass == this.prodInt[index].intClass){
                        this.selectInfo = this.prodInt[index]
                        this.tag = this.prodInt[index].splitId
                        break;
                    }
                }
            },
            fixedChipClick(val){
                //使用固定利率时候  点击列表事件
                for(let i=0; i<this.FixeditleList.length; i++){
                    this.FixeditleList[i].class = ""
                }
                val.class = "select"
                this.fixedIndex = val.index
            },
            //查看利率详细信息，弹出框关闭事件
            close() {
                this.dialog = false
            },
            showClick() {
                //点击显示利率代码详情回调事件
                let val = this.selectInfo
                this.irlCodeInfo = [];
                let irlIntRateArr = [];
                let intType = val.intType;
                irlIntRateArr = this.getIrlIntMatrix(intType);
                // 通过irlIntRateArr集合，逐条通过irlSeqNo 获取irlIntMatrix利率信息矩阵信息
                for(let irlIndex in irlIntRateArr) {
                    for (let matrixIndex in this.irlIntMatrix) {
                        if (this.irlIntMatrix[matrixIndex].irlSeqNo === irlIntRateArr[irlIndex].irlSeqNo && irlIntRateArr[irlIndex].company === this.legalPerson) {
                            let temp = {}
                            temp["depositDate"] = this.irlIntMatrix[matrixIndex].periodFreq
                            temp["amt"] = this.irlIntMatrix[matrixIndex].matrixAmt;
                            temp["intType"] = intType;
                            let floatPer = this.irlIntMatrix[matrixIndex].spreadPercent;
                            temp["floatPer"] = floatPer;
                            if(this.irlIntMatrix[matrixIndex].intBasis == null || this.irlIntMatrix[matrixIndex].intBasis == ""){
                                //采用固定利率信息
                                temp["baseIntValue"] = "";
                                temp["prodIntValue"] = this.irlIntMatrix[matrixIndex].actualRate;
                            }else{
                                //采用基础浮动利率 获取基准利率值
                                let baseIntValue = this.getUpRateValue(this.irlIntMatrix[matrixIndex].intBasis,irlIntRateArr[irlIndex].ccy).intBasisRate
                                temp["baseIntValue"] = baseIntValue;
                                //计算实际利率 = 基准利率*（1+（浮动/100)）保留小数点后8位
                                temp["prodIntValue"] = this.calculateActualRate(baseIntValue,floatPer);
                            }
                            temp["ccy"] = irlIntRateArr[irlIndex].ccy;
                            temp["branch"] = irlIntRateArr[irlIndex].branch;
                            this.irlCodeInfo.push(temp);
                        }
                    }
                }
                this.dialog = true
            },
            //计算实际利率 = 基准利率*（1+（浮动值/100）） 保留小数点后8位
            calculateActualRate(intBasisRate,floatPer){
                return (parseFloat(intBasisRate)*(1+(parseFloat(floatPer)/100))).toFixed(8)
            },
            //通过基准利率类型，产品币种 ，获取最新基准利率
            getUpRateValue(intBasis,ccy){
                let tempBasis = [];
                if(this.irlBasisRate.length == 1){
                    return this.irlBasisRate[0]
                }
                for(let basisIndex=0; basisIndex<this.irlBasisRate.length-1; basisIndex++){
                    if(this.irlBasisRate[basisIndex].intBasis == intBasis && this.irlBasisRate[basisIndex].ccy == ccy){
                        if(parseInt(this.irlBasisRate[basisIndex].effectDate)<parseInt(this.irlBasisRate[basisIndex+1].effectDate)){
                            tempBasis = []
                            tempBasis.push(this.irlBasisRate[basisIndex+1]);
                        }else{
                            tempBasis = []
                            tempBasis.push(this.irlBasisRate[basisIndex]);
                        }
                    }
                }
                return tempBasis[0];
            },
            //通过利率类型，产品适用币种，产品适用机构，获取最新利率矩阵信息
            getIrlIntMatrix(intType){
                let irlIntRateTemp = []
                for(let intRateIndex in this.irlIntRate){
                    if(this.irlIntRate[intRateIndex].intType === intType && this.findIn(this.ccy,this.irlIntRate[intRateIndex].ccy) && this.findIn(this.branch,this.irlIntRate[intRateIndex].branch)){
                        let flag = true
                        for(let k in irlIntRateTemp){
                            if(irlIntRateTemp[k].intType == this.irlIntRate[intRateIndex].intType && irlIntRateTemp[k].ccy == this.irlIntRate[intRateIndex].ccy && irlIntRateTemp[k].branch == this.irlIntRate[intRateIndex].branch){
                                if(parseInt(irlIntRateTemp[k].effectDate)>parseInt(this.irlIntRate[intRateIndex].effectDate)){
                                    flag = false
                                }
                                if(parseInt(irlIntRateTemp[k].effectDate)<=parseInt(this.irlIntRate[intRateIndex].effectDate)){
                                    delete irlIntRateTemp[k];
                                }
                            }
                        }
                        if(flag) {
                            irlIntRateTemp.push(this.irlIntRate[intRateIndex]);
                        }
                    }
                }
                return irlIntRateTemp;
            },
            //数据匹配
            findIn(val,key){
                for(let ind in val){
                    if(val[ind] === "ALL"){
                        return true;
                    }
                    if(val[ind] === key){
                        return true;
                    }
                }
                return false;
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
            //删除对象数组指定对象
            removeArr(_arr, _obj) {
                let length = _arr.length;
                for (let i = 0; i < length; i++) {
                    if (_arr[i] == _obj) {
                        if (i == 0) {
                            _arr.shift(); //删除并返回数组的第一个元素
                            return _arr;
                        }
                        else if (i == length - 1) {
                            _arr.pop();  //删除并返回数组的最后一个元素
                            return _arr;
                        }
                        else {
                            _arr.splice(i, 1); //删除下标为i的元素
                            return _arr;
                        }
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .switchClass{
        margin-left: 15%;
    }
    .closeClass{
        color: white;
        margin-top: -2%;
    }
    .select{
        background-color:gainsboro!important;
    }
    .flex {
        border-right-style: solid;border-right-width: 1px;border-right-color: #ccc5c5;
    }
</style>