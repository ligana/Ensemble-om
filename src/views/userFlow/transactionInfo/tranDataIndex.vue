<template>
  <a-spin tip="Loading..." size="large" :spinning="spinning">
  <div class="ml-4 tranDataIndex">    <v-layout row wrap>
      <v-flex md8 lg8>
        <!--<tran-check-flow-info v-if="optKey==3"></tran-check-flow-info>-->
        <!--<tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>-->
        <!--复核流程信息-->
      
        <v-card class="mt-4 ">
          <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
           
            <!--<v-icon>call_split</v-icon>-->
            <v-toolbar-title>{{title}}</v-toolbar-title>
          </v-toolbar>
          
          <v-stepper v-model="e11" v-if="optKey == 3" style="height: 330px;">
            <v-stepper-header style="font-size: large">
              <v-divider></v-divider>
              <v-stepper-step editable :complete="e11 > 1" step="1">提交信息</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable :complete="e11 > 2" step="2">复核信息</v-stepper-step>
              <v-divider></v-divider>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-layout wrap>
                  <v-flex xs12 md2 lg2>
                    <v-subheader class="descClass">提交人:</v-subheader>
                  </v-flex>
                  <v-flex md10 lg10>
                    <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.userId" single-line hide-details>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 lg2>
                    <v-subheader class="descClass">提交时间:</v-subheader>
                  </v-flex>
                  <v-flex md10 lg10>
                    <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.tranTime" single-line hide-details>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 lg2>
                    <v-subheader class="descClass">提交原因:</v-subheader>
                  </v-flex>
                  <v-flex md10 lg10>
                    <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkFlowInfo.flowCommitInfo.remark" single-line hide-details>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 lg2>
                    <v-subheader class="descClass">备注信息:</v-subheader>
                  </v-flex>
                  <v-flex md10 lg10>
                    <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" single-line hide-details>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-layout wrap>
                  <v-flex xs12 md2 lg2>
                    <v-subheader class="descClass">复核人:</v-subheader>
                  </v-flex>
                  <v-flex md10 lg10>
                    <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.userId" single-line hide-details>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 lg2>
                    <v-subheader class="descClass">复核日期:</v-subheader>
                  </v-flex>
                  <v-flex md10 lg10>
                    <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="checkInfo.date" value="2018/09/07" single-line hide-details>
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12 md2 lg2>
                    <v-subheader class="descClass">复核意见:</v-subheader>
                  </v-flex>
                  <v-flex md10 lg10>
                    <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="checkInfo.remark" single-line hide-details>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

          <!--发布流程信息-->
         
          <v-stepper v-model="e1" style="color: white;height: 330px;" v-if="optKey == 4" >
            <v-stepper-header style="font-size: large">
              <v-stepper-step editable :complete="e1 > 1" step="1">提交信息</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable :complete="e1 > 2" step="2">复核信息</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable step="3">发布信息</v-stepper-step>
            </v-stepper-header>
            <v-stepper-content step="1">
              <v-layout wrap>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交人:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.userId" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交时间:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.tranTime" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">提交原因:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseFlowInfo.flowCommitInfo.remark" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">备注信息:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" single-line hide-details>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-layout wrap>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核人:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="releaseFlowInfo.flowCheckInfo.userId" name="title" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核时间:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" v-model="releaseFlowInfo.flowCheckInfo.tranTime" name="title" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">复核意见:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" disabled="false" label="" name="title" v-model="releaseFlowInfo.flowCheckInfo.remark" single-line hide-details>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-layout wrap>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">发布人:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.userId" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">发布时间:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" disabled="false" name="title" v-model="releaseInfo.date" value="2018/09/07" single-line hide-details>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="descClass">发布意见:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <v-text-field class="primary--text mx-1 textBox" label="" name="title" v-model="releaseInfo.remark" single-line hide-details>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-flex>
      <v-flex md4 lg4>
        <task-list-flex :seqNo="code" v-on:changeTranId="changeTranId" v-on:submitTask="submitTask" >
        </task-list-flex>

        <!--        <v-card class="ml-4 mt-4 elevation-4 radiusDc">
                  <v-card-media src="/static/avatar/prod1.jpg" style="margin-left: 29%;margin-right: 30%">
                  </v-card-media>
                  <v-layout>
                    <v-subheader class="showMsg" style="color: #00b0ff">产品代码:</v-subheader>
                    <v-subheader class="showMsg" style="color: #00b0ff">{{prodType}}</v-subheader>
                  </v-layout>
                  <v-layout>
                    <v-subheader style="font-size: x-large;font-style: inherit;margin-left: 5%;color: #00b0ff">产品名称:</v-subheader>
                    <v-subheader style="font-size: x-large;font-style: inherit;margin-left: 0%;color: #00b0ff">{{prodDesc}}</v-subheader>
                  </v-layout>
                  <v-layout>
                    <v-btn class="btnClass" color="primary lighten-2" dark large @click='confirmClick'>确 认</v-btn>
                  </v-layout>
                </v-card>-->
      </v-flex>
    </v-layout>
   
    <v-card class="difference">
      <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" class="elevation-4 mt-4" flat>
       
        <v-toolbar-side-icon @click="showClick" style="color: #46485B;"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">修改差异展示</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom color="blue">
          <v-btn flat icon="print" slot="activator">
           
            <v-icon class="mr-2" @click="printDown()" style="color: #46485B">print</v-icon>
          </v-btn>
          <span>打      印</span>
        </v-tooltip>
        <v-tooltip bottom color="blue">
          <v-btn flat icon="widgets" slot="activator">
            
            <v-icon @click="downLoad()" style="color: #46485B">widgets</v-icon>
          </v-btn>
          <span>导      出</span>
        </v-tooltip>

      </v-toolbar>
    </v-card>

    <v-card md20 lg20 v-show="showFlag==1" ref="print">
      <v-card-text v-show="RB">
        <v-tabs fixed-tabs v-if="isTable == false">
          <v-tab v-for="n in diffList" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffList" :key="i">
              <prod-diff v-if="i=='产品属性'" :prodData="prodDefineData"></prod-diff>
              <prod-diff v-if="i=='开户定义'" :prodData="prodEventOpen"></prod-diff>
              <prod-diff v-if="i=='销户定义'" :prodData="prodEventClose"></prod-diff>
              <prod-diff v-if="i=='存入定义'" :prodData="prodEventCret"></prod-diff>
              <prod-diff v-if="i=='支取定义'" :prodData="prodEventDebt"></prod-diff>
              <!--<prod-diff v-if="i=='利息信息'" :prodData="prodEventCycle"></prod-diff>-->
              <base-table v-if="i=='收费定义'" :prodCharge="prodCharge"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>

      </v-card-text>
      <v-card-text v-if="isTable == true">
        <v-tabs fixed-tabs v-if="isTable == true">
          <v-tab style="margin-left: 0px">{{diffTitles}}</v-tab>
          <v-tabs-items>
            <v-tab-item>
              <base-table :prodCharge="prodCharge"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
      <v-card-text v-show="CL">
        <v-tabs fixed-tabs v-if="isTable == false">
          <v-tab v-for="n in diffList2" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffList2" :key="i">
              <prod-diff v-if="i=='产品属性'" :prodData="prodDefineData"></prod-diff>
              <!--<prod-diff v-if="i=='利息信息'" :prodData="prodEventCycle"></prod-diff>-->
              <prod-diff v-if="i=='开户定义'" :prodData="prodEventOpen"></prod-diff>
              <prod-diff v-if="i=='放款定义'" :prodData="prodEventDrw"></prod-diff>
              <prod-diff v-if="i=='还款定义'" :prodData="prodEventRec"></prod-diff>
              <prod-diff v-if="i=='到期信息'" :prodData="prodEventDue"></prod-diff>
              <base-table v-if="i=='核算信息'" :prodCharge="prodAccounting"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
        
        <!--<v-tabs fixed-tabs v-if="isTable == true">-->
          <!--<v-tab style="margin-left: 0px">{{diffTitles}}</v-tab>-->
          <!--<v-tabs-items>-->
            <!--<v-tab-item>-->
              <!--<base-table :prodCharge="prodCharge"></base-table>-->
            <!--</v-tab-item>-->
          <!--</v-tabs-items>-->
        <!--</v-tabs>-->
      </v-card-text>
    </v-card>
    <!--</v-layout>-->
  </div>
  </a-spin>
</template>
<script>
    import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
    import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'

    import { getDiffList } from "@/api/url/prodInfo";
    import { getDiffTable } from "@/api/url/prodInfo";
    import {PrintInfo} from '@/utils/print/print'
    import {getColumnDesc_} from '@/utils/columnDesc'
    import {getColumnDesc} from '@/utils/columnDesc'
    import { getModuleByFlowCode } from "@/api/url/prodInfo";
    import DcTextField from '@/components/widgets/DcTextField'
    import TaskListFlex from '@/views/propertyManage/taskListFlex'
    import { getProdData } from "@/api/prod";
    import download2 from '@/utils/download2';
    import toast from '@/utils/toast';
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    import {
        tranFlowRelease
    } from '@/api/url/prodInfo';
    export default {
        components: {
            prodDiff,
            baseTable,
            TaskListFlex,
            getColumnDesc_,
            DcTextField
        },
        props: ["prodData"],
        data (){
            return {
                sourceModule: [],
                spinning: false,
                RB: false,
                CL: false,
                e1: 3,
                releaseFlowInfo: [],
                temp: [],
                title: "",
                releaseInfo: {
                    mainSeqNo: '',
                    date: '',
                    isApproved: 'Y',
                    userId: '',
                    remark: '',
                    optType: '4'//发布
                },
                e11: 2,
                diffTitles: "",
                checkFlowInfo: [],
                confirmInfo: [],
                checkInfo: {
                    mainSeqNo: '',
                    date: '',
                    isApproved: 'Y',
                    userId: '',
                    remark: '',
                    optType: '3' //复核
                },
                code: '',
                optKey: 0,
                showFlag: 0,
                optValue: '',
                optDesc: '',
                prodData: {},
                isTable: false,
                prodCharge: {},
                prodDefineData: {},
                prodEventOpen: {},
                prodEventClose: {},
                prodEventCret: {},
                prodEventCycle: {},
                prodEventDebt: {},
                diffList: ["产品属性","开户定义","销户定义","存入定义","支取定义","收费定义"],
                prodEventDrw: {},
                prodEventRec: {},
                prodEventDur: {},
                prodAccounting: {},
                diffList2: ["产品属性","开户定义","放款定义","还款定义","到期信息","核算定义"],
                prodGroup: [{
                    key: 'Y',
                    value: 'Y-是'
                }],
                prodClass: [{
                    key: 'RB100',
                    value: 'RB100-A'
                }],
                prodRange: [{
                    key: '',
                    value: ''
                }],
                status: [{
                    key: '',
                    value: ''
                }],
                baseProdType: [{
                    key: '',
                    value: ''
                }],
                prodType: [{
                    key: '',
                    value: ''
                }],
               
                tranId: '',
                tranType: ''
            }
        },
        created() {
            //交易单号
            this.code = this.$route.params.code
            this.setOptKey(this.$route.params.optValue)
        },
        mounted() {
            //获取当前操作日期
            this.getDate()
            //初始化流程信息
            this.initFlowInfo(this.$route.params)
        },
        methods: {
            initFlowInfo(val) {
                if(this.optKey === 3){
                    this.checkInfo.mainSeqNo = val.code
                    this.checkInfo.userId = sessionStorage.getItem("userId")
                    for(let i=0; i<val.flowInfo.length; i++) {
                        this.tranId = val.flowInfo[i].flowManage.tranId;

                        if(val.flowInfo[i].flowManage.tranId === "MB_PROD_TYPE"){
                            this.isTable = false
                        }else{
                            this.isTable = true
                        }
                        if(val.flowInfo[i].flowManage.mainSeqNo === this.checkInfo.mainSeqNo){
                            this.checkFlowInfo = val.flowInfo[i]
                        }
                    }
                }
                if(this.optKey === 4){
                    this.releaseInfo.mainSeqNo = val.code;
                    this.releaseInfo.userId = sessionStorage.getItem("userId")
                    for(let i=0; i<val.flowInfo.length; i++) {
                        this.tranId = val.flowInfo[i].flowManage.tranId;

                        if(val.flowInfo[i].flowManage.tranId === "MB_PROD_TYPE"){
                            this.isTable = false
                        }else{
                            this.isTable = true
                        }
                        if (val.flowInfo[i].flowManage.mainSeqNo === this.releaseInfo.mainSeqNo) {
                            this.releaseFlowInfo = val.flowInfo[i]
                        }
                    }
                }
            },
            downLoad() {
                this.releaseInfo['downLoad']=false;
                tranFlowRelease(this.releaseInfo).then(response => {
                    if (response.status === 200) {
                        toast.success("sql导出成功！");
                        let date = new Date();
                        let fileName = ""
                        fileName = date.getFullYear().toString()+(date.getMonth()+1).toString()+ date.getDate().toString()+"_"+this.releaseFlowInfo.flowManage.tranId.toString();
                        download2.download(response.data.data.sql, fileName, "text/plain");
                    }
                })
            },
            changeTranId(tranId,tranType){
                this.RB=false;
                this.CL=false;
                this.showFlag = 0
                this.tranType = tranType
                this.tranId = tranId
                if(tranType=='0'){
                    this.isTable = false
                    this.getDiffProdData(tranId);
                }else{
                    this.isTable = true
                    this.getDiffTableData(tranId);
                }
            },
            getDate() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;//js中是从0开始所以要加1
                var day = date.getDate();
                this.releaseInfo.date = year+'/'+month+'/'+day;
                this.checkInfo.date = year+'/'+month+'/'+day;
            },
            submitTask(isApproved) {
                this.confirmClick(isApproved)
            },
            //提交事件
            confirmClick(isApproved) {

                if(this.optKey === 3){
                    this.confirmInfo = this.checkInfo;
                    this.confirmInfo.isApproved = isApproved
                    tranFlowInfo(this.confirmInfo).then(response => {
                        if(response.status === 200 && this.confirmInfo.isApproved === "Y") {
                            toast.success("复核成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            toast.success("驳回成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                            let setTaskEvent= new Event("taskList");
                            window.dispatchEvent(setTaskEvent);
                        }
                    })
                }
                if(this.optKey === 4){
                    this.spinning=true
                    this.releaseInfo['downLoad']=true;
                    this.confirmInfo = this.releaseInfo
                    this.confirmInfo.isApproved = isApproved
                    tranFlowRelease(this.confirmInfo).then(response => {
                        if(response.status === 200 && this.confirmInfo.isApproved === "Y") {

                            toast.success("发布成功！");
                            this.spinning=false
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            toast.success("驳回成功！");
                            this.$router.push({ name: 'userIndexFlow'});
                            let setTaskEvent= new Event("taskList");
                            window.dispatchEvent(setTaskEvent);
                        }
                    })
                }
            },
            //展开/隐藏差异信息列表
            showClick() {
                this.showFlag = this.showFlag ===0?1:0
              
              
                if(!this.isTable || this.tranType == '0') {
                    //产品差异获取数据处理
                  
                    this.getDiffProdData(this.tranId);
                }
                
                if(this.isTable|| this.tranType == '1'){
                    //单表差异获取数据组装
              
                    this.getDiffTableData(this.tranId);
                }
            },
            setOptKey(val) {
                if(val === "复核") {
                    this.optKey = 3
                    this.optDesc = "复核"
                    this.title = "交易复核流程"
                }
                if(val === "发布") {
                    this.optKey = 4
                    this.optDesc = "发布"
                    this.title = "交易发布流程"
                }
            },
            printDown () {
                PrintInfo(this.$refs.print)
            },
            getDiffTableData() {
                //通过交易主单号 获取单表差异信息
               
                var data={'mainSeqNo': this.code,"tranId": this.tranId};
                getDiffTable(data).then(response => {
                    console.log(response);
                    
                    this.diffTitles = this.tranId
                    let tableDiffInfo = response.data.data.tableInfo
                    //获取单表列描述
                    let heards=[];
                    let assembleColumns=[];
                    if(tableDiffInfo[0] !== undefined){
                        let column = {}
                        if(tableDiffInfo[0].dmlType == 'I'){
                            column = tableDiffInfo[0].newData
                        }else{
                            column = tableDiffInfo[0].oldData
                        }
                        for(const keys in column){
                            let head={};
                            head["text"]=getColumnDesc(keys);
                            head["value"]=keys;
                            heards.push(head);
                        }
                        //区分数据操作类型
                        let opt={};
                        opt["text"]="操作类型";
                        opt["value"]= tableDiffInfo[0].dmlType
                        heards.push(opt);
                    }
                    //组装差异数据
                    for(let i in tableDiffInfo){
                        //新增参数
                        let optTypeDesc = ""
                        if(tableDiffInfo[i].dmlType === "I"){
                            optTypeDesc = "新增"
                        }
                        if(tableDiffInfo[i].dmlType === "D"){
                            optTypeDesc = "删除"
                        }
                        if(tableDiffInfo[i].dmlType === "U"){
                            optTypeDesc = "修改"
                        }
                        if(tableDiffInfo[i].dmlType == 'I'){
                            tableDiffInfo[i].newData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].newData)
                        }else if(tableDiffInfo[i].dmlType == 'D'){
                            //删除数据
                            tableDiffInfo[i].oldData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].oldData)
                        }else if(tableDiffInfo[i].dmlType == 'U'){
                            //修改数据
                            for (let col in tableDiffInfo[i].newData) {
                                let newCol = tableDiffInfo[i].newData[col]
                                let oldCol = tableDiffInfo[i].oldData[col]
                                if(newCol !== oldCol){
                                    tableDiffInfo[i].newData[col] = oldCol + ">" + newCol
                                }
                            }
                            tableDiffInfo[i].newData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].newData)
                        }
                    }

                    const column = {"headers": heards,"column": assembleColumns}
                    this.prodCharge= column;
                });
            },
            getDiffProdData(tranId){
                //通过交易主单号 获取产品差异信息
                let data={'mainSeqNo': this.code,'tranId': tranId};
               
                getModuleByFlowCode(this.code).then(response => {
                    for(let tId in response.data.data){
                        if(tranId == tId){
                            this.sourceModule = response.data.data[tId].SOURCE_MODULE
                        }
                    }
                    getDiffList(data).then(response => {
                        this.prodData = response.data.data;
                        if (this.sourceModule == "RB") {
                            this.RB = true
                            this.assembleProdDefine();
                            this.assembleEvent();
                            //将收费定义的差异组装
                            this.assembleProdCharge();
                        }
                        if (this.sourceModule == "CL") {
                            this.CL = true
                            this.assembleProdDefine();
                            this.assembleCLEvent();
                            //将收费定义的差异组装
                            this.assembleAccounting();
                        }
                        this.prodGroup = this.prodData.mbProdType.prodGroup
                        this.prodClass = this.prodData.mbProdType.prodClass
                        this.prodDesc = this.prodData.mbProdType.prodDesc
                        this.prodType = this.prodData.mbProdType.prodGroup
                        this.status = this.prodData.mbProdType.status
                        this.baseProdType = this.prodData.mbProdType.baseProdType
                        this.prodRange = this.prodData.mbProdType.prodRange
                        this.prodType = this.prodData.mbProdType.prodType
                    });
                })
            },
            assembleProdDefine() {
                const prodDefine=this.prodData.prodDefine;
                const prodDefineDiff=this.prodData.diff.prodDefine;
                const prodType=this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                const prodDefineData={"prodDefines": prodDefine,"diff": prodDefineDiff,"prodType": prodType,"baseEffectProd": baseEffectProd};
                this.prodDefineData=prodDefineData;
            },
            assembleEvent(){
                const prodEvent=this.prodData.prodEvent;
                const prodEventDiff=this.prodData.diff.mbProdEvent;
                const prodType=this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                //区分差异
                const openDiff={}
                const closeDiff={}
                const cycleDiff={}
                const debtDiff={}
                const cretDiff={}
                for(const diffKey in prodEventDiff){
                    const key=diffKey.substring(diffKey.indexOf('.')+1);
                    if(diffKey.indexOf('OPEN')>=0){
                        openDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('CLOSE')>=0){
                        closeDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('CRET')>=0){
                        cretDiff[key]=prodEventDiff[diffKey];
                    }
//                    if(diffKey.indexOf('CYCLE')>=0){
//                        cycleDiff[key]=prodEventDiff[diffKey];
//                    }
                    if(diffKey.indexOf('DEBT')>=0){
                        debtDiff[key]=prodEventDiff[diffKey];
                    }
                }
                for(const keyD in prodEvent){
                    const openEvent={"prodDefines": prodEvent[keyD],"prodType": prodType}
                    if(keyD.indexOf('OPEN')>=0){
                        openEvent["diff"]=openDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventOpen=openEvent;
                    }else if(keyD.indexOf('CLOSE')>=0){
                        openEvent["diff"]=closeDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventClose= openEvent
                    }else if(keyD.indexOf('CRET')>=0){
                        openEvent["diff"]=cretDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventCret= openEvent
                    }
//                    else if(keyD.indexOf('CYCLE')>=0){
//                        openEvent["diff"]=cycleDiff
//                        openEvent["baseEffectProd"]=baseEffectProd
//                        this.prodEventCycle= openEvent
//                    }
                    else if(keyD.indexOf('DEBT')>=0){
                        openEvent["diff"]=debtDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventDebt= openEvent
                    }
                }
                if(JSON.stringify(prodEvent)=='{}' || JSON.stringify(prodEvent) == undefined){
                    let diffEvent={"prodType": prodType}
                    let diffEventClose={"prodType": prodType}
//                    let diffEventCycle={"prodType": prodType}
                    let diffEventCret={"prodType": prodType}
                    let diffEventDebt={"prodType": prodType}
                    diffEvent["diff"]=openDiff
                    this.prodEventOpen=diffEvent;
                    diffEventClose["diff"]=closeDiff
                    this.prodEventClose= diffEventClose;
//                    diffEventCycle["diff"]=cycleDiff
//                    this.prodEventCycle= diffEventCycle
                    diffEventCret["diff"]=cretDiff
                    this.prodEventCret= diffEventCret;
                    diffEventDebt["diff"]=debtDiff
                    this.prodEventDebt= diffEventDebt;
                }
            },
            assembleProdCharge(){
                const prodInfo=this.prodData.mbProdCharge;
                const prodChargeDiff=this.prodData.diff.mbProdCharge;
                let assembleColumns=[];
                let heards=[];
                for(const key in prodInfo[0]){
                    let head={};
                    head["text"]=getColumnDesc_(key);
                    head["value"]=key;
                    heards.push(head);
                }
                for(const prodCharge in prodInfo){
                    const chargeColumn= prodInfo[prodCharge];
                    const keyAndValue="{\"FEE_TYPE\":\""+chargeColumn.feeType+"\",\"PROD_TYPE\":\""+
                        chargeColumn.prodType+"\"}";
                    const diff=prodChargeDiff[keyAndValue];
                    if(diff== undefined){
                        assembleColumns.push(chargeColumn)
                    }else{
                        for(const col in chargeColumn){
                            let chargeCol=chargeColumn[col];
                            let diffCol=diff[col];
                            if(chargeCol!=diffCol){
                                chargeColumn[col]= chargeCol+'>'+diffCol
                            }
                        }
                        assembleColumns.push(chargeColumn)
                    }
                }
                if(heards.size==0){
                    for(const key in prodChargeDiff[0]){
                        let head={};
                        head["text"]=getColumnDesc_(key);
                        head["value"]=key;
                        heards.push(head);
                    }
                }
                for(const index in prodChargeDiff){
                    const prodCharge= prodChargeDiff[index];
                    const dmlType=prodCharge.dmlType;
                    let diffData={}
                    if(dmlType == 'I'){
                        const keyAndValue=index;
                        for(const num in heards){
                            const value=heards[num].value
                            diffData[value]=prodCharge[value];
                        }
                        assembleColumns.push(diffData)
                    }
                }
                const reColumn = {"headers": heards,"column": assembleColumns}
                this.prodCharge= reColumn;
            },

            assembleCLEvent(){
                const prodEvent=this.prodData.prodEvent;
                const prodEventDiff=this.prodData.diff.mbProdEvent;
                const prodType=this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                //区分差异
                const cycleDiff={}
                const openDiff={}
                const drwDiff={}
                const recDiff={}
                const dueDiff={}
                for(const diffKey in prodEventDiff){
                    const key=diffKey.substring(diffKey.indexOf('.')+1);
//                    if(diffKey.indexOf('CYCLE')>=0){
//                        cycleDiff[key]=prodEventDiff[diffKey];
//                    }
                    if(diffKey.indexOf('OPEN')>=0){
                        openDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('DRW')>=0){
                        drwDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('REC')>=0){
                        recDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('DUE')>=0){
                        dueDiff[key]=prodEventDiff[diffKey];
                    }
                }
                for(const key in prodEvent){
                    const openEvent={"prodDefines": prodEvent[key],"prodType": prodType}
                    if(key.indexOf('OPEN')>=0){
                        openEvent["diff"]=openDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventOpen=openEvent;
                    }
//                    else if(key.indexOf('CYCLE')>=0){
//                        openEvent["diff"]=cycleDiff
//                        openEvent["baseEffectProd"]=baseEffectProd
//                        this.prodEventCycle= openEvent
//                    }
                    else if(key.indexOf('DRW')>=0){
                        openEvent["diff"]=drwDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventDrw= openEvent
                    }else if(key.indexOf('REC')>=0){
                        openEvent["diff"]=recDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventRec= openEvent
                    }else if(key.indexOf('DUE')>=0){
                        openEvent["diff"]=dueDiff
                        openEvent["baseEffectProd"]=baseEffectProd
                        this.prodEventDue= openEvent
                    }
                }
                if(JSON.stringify(prodEvent)=='{}' || JSON.stringify(prodEvent) == undefined){
                    let diffEvent={"prodType": prodType}
//                    let diffEventCycle={"prodType": prodType}
                    let diffEventDrw={"prodType": prodType}
                    let diffEventRec={"prodType": prodType}
                    let diffEventDue={"prodType": prodType}
                    diffEvent["diff"]=openDiff
                    this.prodEventOpen=diffEvent;
//                    diffEventCycle["diff"]=cycleDiff
//                    this.prodEventCycle= diffEventCycle;
                    diffEventDrw["diff"]=drwDiff
                    this.prodEventDrw= diffEventDrw
                    diffEventRec["diff"]=recDiff
                    this.prodEventRec= diffEventRec
                    diffEventDue["diff"]=dueDiff
                    this.prodEventDue= diffEventDue
                }
            },
            assembleAccounting(){
                const prodInfo=this.prodData.mbProdCharge;
                const prodChargeDiff=this.prodData.diff.mbProdCharge;
                let assembleColumns=[];
                let heards=[];
                for(const key in prodInfo[0]){
                    let head={};
                    head["text"]=getColumnDesc_(key);
                    head["value"]=key;
                    heards.push(head);
                }
                for(const prodCharge in prodInfo){
                    const chargeColumn= prodInfo[prodCharge];
                    const keyAndValue="{\"FEE_TYPE\":\""+chargeColumn.feeType+"\",\"PROD_TYPE\":\""+
                        chargeColumn.prodType+"\"}";
                    const diff=prodChargeDiff[keyAndValue];
                    if(diff== undefined){
                        assembleColumns.push(chargeColumn)
                    }else{
                        for(const col in chargeColumn){
                            let chargeCol=chargeColumn[col];
                            let diffCol=diff[col];
                            if(chargeCol!=diffCol){
                                chargeColumn[col]= chargeCol+'>'+diffCol
                            }
                        }
                        assembleColumns.push(chargeColumn)
                    }
                }
                if(heards.size==0){
                    for(const key in prodChargeDiff[0]){
                        let head={};
                        head["text"]=getColumnDesc_(key);
                        head["value"]=key;
                        heards.push(head);
                    }
                }
                for(const index in prodChargeDiff){
                    const prodCharge= prodChargeDiff[index];
                    const dmlType=prodCharge.dmlType;
                    let diffData={}
                    if(dmlType == 'I'){
                        const keyAndValue=index;
                        for(const num in heards){
                            const value=heards[num].value
                            diffData[value]=prodCharge[value];
                        }
                        assembleColumns.push(diffData)
                    }
                }
                const reColumn = {"headers": heards,"column": assembleColumns}
                this.prodCharge= reColumn;
            },
        }
    }
</script>
<style scoped>
  .diffTitle {
    font-size: large;
  }
  .imgUserIndexFlow {
    width: 100px;
    display: inline-block;
    margin-left: 40%
  }
  .showMsg {
    font-size: x-large;
    font-style: inherit;
    margin-left: 5%;
    margin-top: 4%;
  }
  .descClass {
   
    color: #A1A1A1;
    font-size: large;
    font-style: inherit;
    margin-right: 0px;
   
    margin-top: 10px;
    margin-left: 10%
  }
  .textBox {
   
    margin-top: 10px;
      padding-top: 0px;
      border-bottom: 1px solid #DDE2E8!important;
  }
  .btnClass {
    margin-top: 5%;
    margin-left: 28%;
    margin-bottom: 3%;
    width: 50%;
    font-size: large;
  }
  .primary.lighten-2  {
      background-color: #F4F5F8 !important;
      color: #58595E!important;
      border-bottom: 1px solid #D6D7DB!important;
  }
    .tranDataIndex >>> .theme--light.v-card {
        background-color: #F4F5F8 !important;
        color: #58595E!important;
        border: 1px solid #D6D7DB!important;
        box-shadow: none!important;
    }
  .tranDataIndex >>> .radiusDc {
      border-radius:0px!important;
      box-shadow: none!important;
      /*border: 1px solid #D6D7DB!important;*/
      /*border-bottom: none;*/
  }
  .tranDataIndex >>> .theme--light .v-toolbar__content {
      height: 64px!important;
      line-height: 64px;
  }
  .tranDataIndex >>> .changeColor {
      border-bottom: 1px solid rgba(0,0,0,.12);
      background-color: #fff!important;
  }
  .tranDataIndex >>> .theme--light .v-toolbar__content h4 {
      margin-bottom: 0;
  }
  .tranDataIndex >>> .theme--light.v-stepper .v-stepper__step__step {
      background-color: #3399FF!important;
  }
  .tranDataIndex >>> .theme--light.v-text-field.v-input--is-disabled .v-input__slot:before {
      border: none;
  }
  .tranDataIndex >>> .v-text-field>.v-input__control>.v-input__slot:before {
      border: none;
  }
  .white--text {
      color: #46485B!important;
  }
  .tranDataIndex >>> .v-btn:not(.v-btn--outline).primary {
      background-color: #3C73E6!important;
  }
  .tranDataIndex >>>  .v-stepper__header {
      box-shadow:none!important;
      border-bottom: 1px solid #D0D1D5!important;
  }

  .tranDataIndex >>> .theme--light.v-stepper {
      box-shadow: none;
  }
  .tranDataIndex >>> .difference.theme--light.v-card {
      border: none!important;
  }
  .tranDataIndex >>> .difference .primary {
      box-shadow: none!important;
      border: 1px solid #D0D1D5!important;
  }
</style>