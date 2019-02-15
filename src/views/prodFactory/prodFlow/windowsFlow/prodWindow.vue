<template>
    <div>
        <v-card class="card radiusDc fathercard" >
            <v-toolbar color="#F4F5F9" dark scroll-off-screen style="height: 64px; color: #58595E; border-bottom: 1px solid rgba(0,0,0,.12)"
                       scroll-target="#scrolling-techniques" flat>
                <!--<v-icon style="color: #01579B">call_split</v-icon>-->
                <v-toolbar-title>筛选</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom color="primary lighten-2">
                    <v-btn flat icon="refresh" slot="activator" @click="resetClick">
                        <v-icon color="primary lighten-2">refresh</v-icon>
                    </v-btn>
                    <span>重置</span>
                </v-tooltip>
            </v-toolbar>
            <!--<v-divider class="elevation-2" style="margin-top: 0px"></v-divider>-->

            <v-card-text>
                <v-layout class="layoutTitle">
                    <v-subheader class="primary--text subheading">所属模块：</v-subheader>
                    <!--<v-container>-->
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="sourceModelArr" label="存款产品" value="RB"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="sourceModelArr" label="贷款产品" value="CL"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="sourceModelArr" label="内部账产品" value="GL"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="sourceModelArr" label="货币市场类" value="MM"></v-checkbox>
                            </v-flex>
                        </v-layout>
                    <!--</v-container>-->
                </v-layout>
                <!--<v-divider class="elevation-0" style=""></v-divider>-->
                <v-layout class="layoutTitle">
                    <v-subheader class="primary--text subheading">适用币种：</v-subheader>

                        <v-layout row wrap>
                            <v-flex xs12 sm6 md2 style="height: 30px; line-height: 30px;">
                                <v-checkbox v-model="ccyTypeArr" label="人民币" value="CNY"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="港币" value="HKD"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="美元" value="USD"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="澳大利亚元" value="AUD"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="加拿大元" value="CAD"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="瑞士法郎" value="CHF"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="欧元" value="EUR"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="英镑" value="GBP"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="日元" value="JPY"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="ccyTypeArr" label="新加坡元" value="SGD"></v-checkbox>
                            </v-flex>
                        </v-layout>

                </v-layout>
                <!--<v-divider class="elevation-0" style="margin-top: -20px;margin-bottom: 15px"></v-divider>-->

                <!--<v-layout class="layoutTitle">-->
                <!--<v-subheader class="primary&#45;&#45;text subheading">产品期限：</v-subheader>-->
                <!--<v-checkbox v-model="freqArr" label="7天(含)以下" value="1"></v-checkbox>-->
                <!--<v-checkbox v-model="freqArr" label="7天-14天(含)" value="2"></v-checkbox>-->
                <!--<v-checkbox v-model="freqArr" label="15天-30天(含)" value="3"></v-checkbox>-->
                <!--<v-checkbox v-model="freqArr" label="31天-90天(含)" value="4"></v-checkbox>-->
                <!--<v-checkbox v-model="freqArr" label="91天-180天(含)" value="5"></v-checkbox>-->
                <!--<v-checkbox v-model="freqArr" label="181天-365天(含)" value="6"></v-checkbox>-->
                <!--<v-checkbox v-model="freqArr" label="1年以上" value="7"></v-checkbox>-->
                <!--</v-layout>-->
                <!--<v-divider v-if="showFlag" class="elevation-0" style="margin-top: -20px;margin-bottom: 15px"></v-divider>-->

                <v-layout class="layoutTitle">
                    <v-subheader class="primary--text subheading">所属机构：</v-subheader>

                        <v-layout row wrap>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="branchArr" label="全行" value="ALL"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="branchArr" label="西安分行" value="1000"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="branchArr" label="北京分行" value="2000"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="branchArr" label="兰州分行" value="3000"></v-checkbox>
                            </v-flex>
                        </v-layout>

                </v-layout>
                <!--<v-divider v-if="showFlag" class="elevation-0"-->
                           <!--style="margin-top: -20px;margin-bottom: 15px"></v-divider>-->

                <v-layout class="layoutTitle" v-if="showFlag">
                    <v-subheader class="primary--text subheading">产品状态：</v-subheader>

                        <v-layout row wrap>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="statusArr" label="可售" value="A"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="statusArr" label="停售" value="C"></v-checkbox>
                            </v-flex>
                        </v-layout>

                </v-layout>
                <!--<v-divider v-if="showFlag" class="elevation-0"-->
                           <!--style="margin-top: -20px;margin-bottom: 15px"></v-divider>-->

                <v-layout class="layoutTitle" v-if="showFlag">
                    <v-subheader class="primary--text subheading">产品属性：</v-subheader>

                        <v-layout row wrap>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="perArr" label="基础产品" value="B"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                                <v-checkbox v-model="perArr" label="可售产品" value="S"></v-checkbox>
                            </v-flex>
                        </v-layout>

                </v-layout>
            </v-card-text>
        </v-card>
        <v-btn class="showClass" style="background-color: white" @click="showCilck">{{showDesc}}</v-btn>
        <v-card class="card1 radiusDc">
            <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                <!--<v-icon>menu</v-icon>-->
                <v-toolbar-title>产品列表</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <a-spin tip="请稍等..." size="medium" :spinning="spinning">
                    <v-list three-line class="listClass">
                        <template v-for="(item, index) in searchTagProdList">
                            <v-layout style="margin-top: 10px">
                                <v-flex md2 lg2>
                                    <v-layout>
                                        <v-card class="radiusDc headClass">
                                            <v-toolbar color="green" flat class="toolbarClass">
                                                <td style="margin-top: -25%; color: white">{{item.prodType}}</td>
                                            </v-toolbar>
                                            <v-card-text>
                                                {{item.prodDesc}}
                                            </v-card-text>
                                        </v-card>
                                    </v-layout>
                                </v-flex>
                                <v-flex md9 lg9>
                                    <v-layout>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">产品属性：{{item.prodRange}}</v-subheader>
                                        </v-flex>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">产品状态：{{item.status}}</v-subheader>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">基础产品：{{item.baseProdType}}</v-subheader>
                                        </v-flex>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">币种：{{item.ccy}}</v-subheader>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">所属模块：{{item.sourceModel}}</v-subheader>
                                        </v-flex>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">所属机构：{{item.prodBranch}}</v-subheader>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">生效日期：{{item.prodStartDate}}</v-subheader>
                                        </v-flex>
                                        <v-flex md6 lg6>
                                            <v-subheader class="subClass">失效日期：{{item.prodEndDate}}</v-subheader>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex md1 lg1>
                                    <v-btn color="success" round class="editClass" @click="editClick(item)">编辑查看>>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <v-divider class="elevation-2" style="margin-top: 10px"></v-divider>
                        </template>
                    </v-list>
                </a-spin>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {getAllProdList} from '@/api/url/prodInfo';
    import {getAllDefines} from '@/api/url/prodInfo';
    import {getProdClassList} from '@/api/url/prodInfo';

    import {
        getProdType
    } from '@/api/url/prodInfo'

    export default {
        data: () => ({
            perArr: [],
            statusArr: [],
            branchArr: [],
            freqArr: [],
            ccyTypeArr: [],
            sourceModelArr: [],
            prodListDtl: [],
            prodTypeArr: [],
            prodDefineArr: [],
            spinning: true,
            showFlag: false,
            showDesc: "展开",
            //通过条件筛选后的产品信息
            searchTagProdList: [],
            allProdArr: []
        }),
        watch: {
            sourceModelArr: {
                handler() {
                    this.selectChange();
                }
            },
            ccyTypeArr: {
                handler() {
                    this.selectChange();
                }
            },
            branchArr: {
                handler() {
                    this.selectChange();
                }
            },
            statusArr: {
                handler() {
                    this.selectChange();
                }
            },
            perArr: {
                handler() {
                    this.selectChange();
                }
            }
        },
        mounted() {
            this.getAllProdInfo()
        },
        methods: {
            getAllProdInfo() {
                let that = this
                that.spinning = true
                //获取所有prodType
                getAllProdList().then(response => {
                    that.prodListDtl = response.data.data
                    that.prodTypeArr = response.data.data
                });
                //获取所有prodDefine
                getAllDefines().then(response => {
                    that.prodDefineArr = response.data.data
                    for (let i = 0; i < that.prodTypeArr.length; i++) {
                        let temp = {}
                        temp['prodType'] = that.prodTypeArr[i].prodType
                        temp['prodDesc'] = that.prodTypeArr[i].prodDesc
                        temp['prodRange'] = that.prodTypeArr[i].prodRange == 'B' ? '基础产品' : '可售产品'
                        temp['status'] = that.prodTypeArr[i].status == 'A' ? '可售' : '封存'
                        temp['prodClass'] = that.prodTypeArr[i].prodClass
                        temp['baseProdType'] = that.prodTypeArr[i].baseProdType
                        temp['sourceModel'] = that.getValue(that.prodTypeArr[i].sourceModule);
                        for (let j = 0; j < that.prodDefineArr.length; j++) {
                            if (that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "CCY") {
                                temp['ccy'] = that.prodDefineArr[j].attrValue
                            }
                            if (that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "PROD_BRANCH") {
                                temp['prodBranch'] = that.prodDefineArr[j].attrValue
                            }
                            if (that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "PROD_START_DATE") {
                                temp['prodStartDate'] = that.prodDefineArr[j].attrValue
                            }
                            if (that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "PROD_END_DATE") {
                                temp['prodEndDate'] = that.prodDefineArr[j].attrValue
                            }
                        }
                        if (temp != {}) {
                            that.searchTagProdList.push(temp)
                            that.allProdArr.push(temp)
                        }
                    }
                    that.spinning = false

                });
            },
            showCilck() {
                this.showFlag = !this.showFlag;
                if (this.showFlag) {
                    this.showDesc = "收起"
                } else {
                    this.showDesc = "展开"
                }
            },
            resetClick() {
                let that = this
                this.perArr = [];
                this.statusArr = [];
                this.branchArr = [];
                this.freqArr = [];
                this.ccyTypeArr = [];
                this.sourceModelArr = [];
                that.searchTagProdList = that.allProdArr
            },
            selectChange() {
                let that = this
                let targArr = []
                //加工过滤条件
                let selectList = that.dealSelect();
                if (selectList == null) {
                    that.searchTagProdList = that.allProdArr
                } else {
                    //通过条件 过滤数据
                    for (let k = 0; k < that.allProdArr.length; k++) {
                        let flag = 0
                        //flag注释： 0-初始数据  1-不存在  2-存在
                        for (let key in selectList) {
                            if (key == 'sourceModel' && (flag == 0 || flag == 2)) {
                                //判断是否存在
                                flag = that.findInArr(that.allProdArr[k].sourceModel, selectList, key)
                            }
                            if (key == 'ccy' && (flag == 0 || flag == 2)) {
                                flag = that.findInArr(that.allProdArr[k].ccy, selectList, key)
                            }
                            if (key == 'prodBranch' && (flag == 0 || flag == 2)) {
                                flag = that.findInArr(that.allProdArr[k].prodBranch, selectList, key)
                            }
                            if (key == 'status' && (flag == 0 || flag == 2)) {
                                flag = that.findInArr(that.allProdArr[k].status, selectList, key)
                            }
                            if (key == 'prodRange' && (flag == 0 || flag == 2)) {
                                flag = that.findInArr(that.allProdArr[k].prodRange, selectList, key)
                            }
                        }
                        if (flag == 2) {
                            targArr.push(that.allProdArr[k])
                        }
                    }
                    that.searchTagProdList = []
                    that.searchTagProdList = targArr
                }

            },
            findInArr(val, select, key) {
                let that = this
                let ret = 1
                //判断是否存在
                for (let j = 0; j < select[key].length; j++) {
                    if (key == 'sourceModel' || key == 'prodRange' || key == 'status') {
                        if (that.getValue(select[key][j]) == val) {
                            ret = 2
                            break
                        }
                    } else if (select[key][j] == val) {
                        ret = 2
                        break
                    }
                }
                return ret
            },
            dealSelect() {
                let that = this
                let ret = {}
                let flag = false
                if (that.sourceModelArr.length) {
                    flag = true
                    ret['sourceModel'] = that.sourceModelArr
                }
                if (that.ccyTypeArr.length) {
                    flag = true
                    ret['ccy'] = that.ccyTypeArr
                }
                if (that.branchArr.length) {
                    flag = true
                    ret['prodBranch'] = that.branchArr
                }
                if (that.statusArr.length) {
                    flag = true
                    ret['status'] = that.statusArr
                }
                if (that.perArr.length) {
                    flag = true
                    ret['prodRange'] = that.perArr
                }
                if (!flag) {
                    return null
                } else {
                    return ret
                }
            },
            editClick(val) {
                //点击查看详情 跳转到产品展示界面
                let prodType = val.prodType
                let prodClass = val.prodClass
                let prodRange = val.prodRange
                let sourceModule = val.sourceModel
                if (prodRange == '基础产品' && sourceModule == "存款") {
                    //跳转到存款基础产品界面
                    this.$router.push({ name: "RbBaseProds", hash: prodType});
                }
                if (prodRange == '可售产品' && sourceModule == "存款") {
                    //跳转到存款可售产品界面
                    this.$router.push({ name: "RbSoldProds", hash: prodType});

                }
                if (prodRange == '基础产品' && sourceModule == "贷款") {
                    //跳转到贷款基础产品界面
                    this.$router.push({ name: "ClBaseProds",hash: prodType});

                }
                if (prodRange == '可售产品' && sourceModule == "贷款") {
                    //跳转到贷款可售产品界面
                    this.$router.push({ name: "ClSoldProds",hash: prodType});

                }
            },
            getValue(val) {
                let ret = ""
                if (val == 'RB') {
                    ret = '存款'
                }
                if (val == 'CL') {
                    ret = '贷款'
                }
                if (val == 'GL') {
                    ret = '内部账'
                }
                if (val == 'MM') {
                    ret = '货币市场'
                }
                if (val == 'A') {
                    ret = '可售'
                }
                if (val == 'C') {
                    ret = '封存'
                }
                if (val == 'B') {
                    ret = '基础产品'
                }
                if (val == 'S') {
                    ret = '可售产品'
                }
                return ret;
            }
        }
    }
</script>
<style scoped>
    .card {
        margin: 40px 100px 0;
        height: auto;
        border-radius: 0px!important;
        box-shadow: none!important;
        border: 1px solid #D6D7DB!important;
    }

    .card1 {
        margin: 0 100px;
        height: auto;
        border-radius: 0px!important;
        box-shadow: none!important;
        border: 1px solid rgba(0,0,0,.12)!important;
        overflow: hidden;
    }

    .layoutTitle {
        /*margin-top: -2%;*/
        border-bottom: 1px solid rgba(0,0,0,.12);
    }

    .btnClass {
        height: 30px;
        width: 110px;
    }

    .subClass {
        margin-top: -3.5%
    }

    .editClass {
        height: 25px;
        margin-left: -42%;
        margin-top: 43%;
    }

    .headClass {
        height: 120px;
        width: 120px;
        margin-left: 15%;
    }

    .toolbarClass {
        height: 40px;
        width: 100%;
    }

    .listClass {
        overflow-y: scroll;
        max-height: 620px;
        width: 103%;
        padding-right: 1%;
    }

    .showClass {
        margin-left: 45%;
        background-color: white;
        width: 120px;
        margin-top: -1px;
        height: 30px;
    }

    .fathercard >>> .v-card__text {
       padding: 0 16px;
    }
    .fathercard >>> .v-input--selection-controls {
         margin-top: 0px;
         padding-top: 0px;

    }
    .fathercard >>> .v-subheader.primary--text.subheading {
        padding: 0;
    }
    .fathercard >>> .v-input--selection-controls .v-input__slot {
        margin-bottom: 0;
    }
    .fathercard >>> .flex {
        margin-top: 12px;
    }
    #fathercard >>> .theme--light.v-subheader {
        color: rgba(0,0,0,.54)!important;
    }
    .primary.lighten-2 {
        background-color: #F4F5F9!important;
        color: #58595E!important;
        border-bottom: 1px solid #D6D7DB!important;
    }

</style>