<template>
    <div>
        <div class="card fathercard">
            <v-widget title="筛选" class="v-widget">
                <v-btn icon flat slot="widget-header-action" @click="resetClick">
                    <v-icon color="primary lighten-2">refresh</v-icon>
                </v-btn>
                <span>重置</span>
                <div slot="widget-content">
                    <!--<v-card-text>-->
                    <v-layout class="layoutTitle">
                        <v-subheader class="primary--text subheading">所属模块：</v-subheader>
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
                    <!--</v-card-text>-->
                </div>
            </v-widget>
            <v-btn class="showClass" style="background-color: white" @click="showCilck">{{showDesc}}</v-btn>
        </div>

        <v-card class="card">
            <v-toolbar dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                <v-toolbar-title>产品列表</v-toolbar-title>
                <v-spacer></v-spacer>
                <!--<div class="search_box">-->
                    <!--<v-text-field height="40" flat placeholder="请输入产品类型" v-model="search" clearable color="#757575"></v-text-field>-->
                    <!--<v-btn color="info" @click="searchProduct(search)">搜索</v-btn>-->
                <!--</div>-->
                <v-text-field
                        class="search_box"
                        clearable
                        v-model="search"
                        prepend-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </v-toolbar>
            <v-card-text>
                <a-spin tip="请稍等..." size="medium" :spinning="spinning" style="overflow: hidden">
                    <v-list three-line class="listClass">
                        <template v-for="(item, index) in searchTagProdList">
                            <v-layout class="list_p" :id="item.prodType">
                                <v-flex class="left" md2 lg2>
                                    <v-layout>
                                        <v-card class="radiusDc headClass">
                                            <v-toolbar class="toolbarClass">
                                                {{item.prodType}}
                                            </v-toolbar>
                                            <v-card-text>
                                                {{item.prodDesc}}
                                            </v-card-text>
                                        </v-card>
                                    </v-layout>
                                </v-flex>
                                <v-flex class="content" md8 lg8>
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
                                <v-flex class="right" md2 lg2>
                                    <v-btn color="#7B82EE" round class="editClass" @click="editClick(item)">编辑查看>></v-btn>
                                </v-flex>
                            </v-layout>
                            <v-divider ></v-divider>
                        </template>
                    </v-list>
                </a-spin>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getAllDefines } from '@/api/url/prodInfo';
    import { getProdClassList } from '@/api/url/prodInfo';
    import VWidget from "@/components/VWidget";
    import {
        getProdType
    } from '@/api/url/prodInfo'
    export default {
        components: {
            VWidget,
        },
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
            allProdArr: [],
            search: ""
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
            getAllProdInfo(){
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
                    for(let i=0; i<that.prodTypeArr.length; i++){
                        let temp = {}
                        temp['prodType'] = that.prodTypeArr[i].prodType
                        temp['prodDesc'] = that.prodTypeArr[i].prodDesc
                        temp['prodRange'] = that.prodTypeArr[i].prodRange =='B'?'基础产品':'可售产品'
                        temp['status'] = that.prodTypeArr[i].status == 'A'?'可售':'封存'
                        temp['prodClass'] = that.prodTypeArr[i].prodClass
                        temp['baseProdType'] = that.prodTypeArr[i].baseProdType
                        temp['sourceModel'] = that.getValue(that.prodTypeArr[i].sourceModule);
                        for(let j=0; j<that.prodDefineArr.length; j++){
                            if(that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "CCY"){
                                temp['ccy'] = that.prodDefineArr[j].attrValue
                            }
                            if(that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "PROD_BRANCH"){
                                temp['prodBranch'] = that.prodDefineArr[j].attrValue
                            }
                            if(that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "PROD_START_DATE"){
                                temp['prodStartDate'] = that.prodDefineArr[j].attrValue
                            }
                            if(that.prodDefineArr[j].prodType == that.prodTypeArr[i].prodType && that.prodDefineArr[j].assembleId == "PROD_END_DATE"){
                                temp['prodEndDate'] = that.prodDefineArr[j].attrValue
                            }
                        }
                        if(temp != {}) {
                            that.searchTagProdList.push(temp)
                            that.allProdArr.push(temp)
                        }
                    }
                    that.spinning = false
                });
            },
            showCilck() {
                this.showFlag = !this.showFlag;
                if(this.showFlag){
                    this.showDesc = "收起"
                }else{
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
                if(selectList == null){
                    that.searchTagProdList = that.allProdArr
                }else {
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
            findInArr(val,select,key) {
                let that = this
                let ret = 1
                //判断是否存在
                for(let j=0; j<select[key].length; j++){
                    if(key == 'sourceModel' || key =='prodRange' || key == 'status') {
                        if (that.getValue(select[key][j]) == val) {
                            ret = 2
                            break
                        }
                    }else if (select[key][j] == val) {
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
                if(that.sourceModelArr.length){
                    flag =true
                    ret['sourceModel'] = that.sourceModelArr
                }
                if(that.ccyTypeArr.length){
                    flag =true
                    ret['ccy'] = that.ccyTypeArr
                }
                if(that.branchArr.length){
                    flag =true
                    ret['prodBranch'] = that.branchArr
                }
                if(that.statusArr.length){
                    flag =true
                    ret['status'] = that.statusArr
                }
                if(that.perArr.length){
                    flag =true
                    ret['prodRange'] = that.perArr
                }
                if(!flag){
                    return null
                }else{
                    return ret
                }
            },
            editClick(val){
                //点击查看详情 跳转到产品展示界面
                let prodType = val.prodType
                let prodClass= val.prodClass
                let prodRange = val.prodRange
                let sourceModule = val.sourceModel
                if(prodRange == "基础产品" && sourceModule == "存款") {
                    this.$router.push({name: "BaseProdForm", hash: prodType});
                }
                if(prodRange == "基础产品" && sourceModule == "贷款") {
                    this.$router.push({name: "BaseProdFormCl", hash: prodType});
                }
                if(prodRange == "基础产品" && sourceModule == "内部账") {
                    this.$router.push({name: "BaseProdFormGl", hash: prodType});
                }
                if(prodRange == "可售产品" && sourceModule == "存款"){
                    this.$router.push({name: "SoldProdForm", hash: prodType});
                }
                if(prodRange == "可售产品" && sourceModule == "贷款"){
                    this.$router.push({name: "SoldProdFormCl", hash: prodType});
                }
                if(prodRange == "可售产品" && sourceModule == "内部账"){
                    this.$router.push({name: "SoldProdFormGl", hash: prodType});
                }
            },
            getValue(val){
                let ret = ""
                if(val == 'RB'){
                    ret = '存款'
                }
                if(val == 'CL'){
                    ret = '贷款'
                }
                if(val == 'GL'){
                    ret = '内部账'
                }
                if(val == 'MM'){
                    ret = '货币市场'
                }
                if(val == 'A'){
                    ret = '可售'
                }
                if(val == 'C'){
                    ret = '封存'
                }
                if(val == 'B'){
                    ret = '基础产品'
                }
                if(val == 'S'){
                    ret = '可售产品'
                }
                return ret;
            },
            searchProduct(val){
                for(let i=0; i<this.searchTagProdList.length; i++){
                    if(val == this.searchTagProdList[i].prodType){
                        if(i == 0){
                            i++
                        }
                        let hash = "#"+this.searchTagProdList[i-1].prodType
                        window.location.hash = hash
                        break
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .card {
        margin: 40px 100px 0;
    }
    .card .search_box {
        height: 40px;
        padding-top: 2px;
    }
    .card .search_box >>> .v-input__prepend-outer {
        margin-top: 8px;
    }
    .card .search_box >>> .theme--dark.v-icon {
        color: #7b82ee;
    }
    .card .search_box >>> .theme--dark.v-label {
        color: #737373;
        top: 8px;
    }
    .card .search_box >>> .v-input__slot {
        background-color: #fff;
        border-radius: 3px;
    }
    .card .search_box >>> .v-input__slot:before {
        border-color: #1e19bb !important;
    }
    .card .search_box >>> .v-input__slot .v-text-field__slot input {
        color: #000;
        padding: 8px 10px;
    }
    .layoutTitle {
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .editClass {
        color: #fff;
    }
    .headClass {
        height: 120px;
        width: 150px;
        min-width: 130px;
        margin-left: 20%;
        margin-top: 4%;
        text-align: center;
    }
    .toolbarClass {
        height: 40px !important;
        background-color: rgb(123, 130, 238) !important;
    }
    .toolbarClass >>> .v-toolbar__content {
        height: 40px !important;
        line-height: 40px;
        margin-top: 0px;
        color: #fff;
    }
    .listClass {
        overflow-y: scroll;
        max-height: 620px;
        width: 103%;
        padding-right: 2%;
    }
    .listClass .list_p {
        padding: 20px 0;
    }
    .content .subClass {
        height: 34px;
        padding-left: 30%;
    }
    .listClass .list_p .right {
        margin-left: 6%;
        margin-top: 3%;
    }
    .listClass .mt14 {
        margin-top: 14px
    }
    .showClass {
        margin-left: 45%;
        background-color: white!important;
        width: 120px;
        margin-top: -1px;
        height: 30px;
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
</style>