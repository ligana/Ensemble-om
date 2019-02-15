<template>
<<<<<<< HEAD
  <a-spin tip="Loading..." size="large" :spinning="spinning">
    <div class="ml-4">
      <v-layout row wrap>
        <v-flex md8 lg8>
          <!--<tran-check-flow-info v-if="optKey==3"></tran-check-flow-info>-->
          <!--<tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>-->
          <!--复核流程信息-->
          <prod-review v-on:setCheckInfo="setCheckInfo" v-on:setReleaseInfo="setReleaseInfo" v-on:setReleaseFlowInfo="setReleaseFlowInfo"></prod-review>
        </v-flex>
        <v-flex md4 lg4>
          <task-list-flex :seqNo="code" v-on:sendType="setTranType" v-on:submitTask="submitTask" >
          </task-list-flex>
=======
  <div class="ml-4" id="tranDataIndex">
    <v-layout row wrap>
      <v-flex md8 lg8>
        <!--<tran-check-flow-info v-if="optKey==3"></tran-check-flow-info>-->
        <!--<tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>-->
        <!--复核流程信息-->
        <v-card class="mt-4 ">
          <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
            <!--<v-icon>call_split</v-icon>-->
            <v-toolbar-title>{{title}}</v-toolbar-title>
          </v-toolbar>
          <v-stepper v-model="e11" v-if="optKey == 3">
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
>>>>>>> styleUi2.0

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
      <v-card class="elevation-2 radiusDc">
        <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" class="elevation-4 mt-4" flat>
          <v-toolbar-side-icon @click="showClick"></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">修改差异展示</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom color="blue">
            <v-btn flat icon="print" slot="activator">
              <v-icon class="mr-2" @click="printDown()" style="color: white">print</v-icon>
            </v-btn>
            <span>打      印</span>
          </v-tooltip>
          <v-tooltip bottom color="blue">
            <v-btn flat icon="widgets" slot="activator">
              <v-icon @click="downLoad()" style="color: white">widgets</v-icon>
            </v-btn>
            <span>导      出</span>
          </v-tooltip>

<<<<<<< HEAD
        </v-toolbar>
      </v-card>
      <div v-show="showFlag==1">
        <prod-diff-table :sendTranId="tranId" :sendTranType="tranType" :seqNo="code" ref="prodDiffTable"></prod-diff-table>
      </div>
    </div>
  </a-spin>
=======
          <!--发布流程信息-->
          <v-stepper v-model="e1" style="color: white" v-if="optKey == 4">
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
        <v-tabs fixed-tabs v-if="isTable == true">
          <v-tab style="margin-left: 0px">{{diffTitles}}</v-tab>
          <v-tabs-items>
            <v-tab-item>
              <base-table :prodCharge="prodCharge"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
    <!--</v-layout>-->
  </div>
>>>>>>> styleUi2.0
</template>
<script>
    import prodDiffTable from '@/views/prodFactory/prodDiff/prodDiffTable'
    import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'
    import prodReview from '@/views/prodFactory/prodFlow/prodFlow/prodReview'
    import {PrintInfo} from '@/utils/print/print'
    import DcTextField from '@/components/widgets/DcTextField'
    import TaskListFlex from '@/views/propertyManage/taskListFlex'
    import download2 from '@/utils/download2';
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    import {
        tranFlowRelease
    } from '@/api/url/prodInfo';
    export default {
        components: {
            prodReview,
            baseTable,
            TaskListFlex,
            DcTextField,
            prodDiffTable
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
        methods: {
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
            showClick() {
                this.showFlag = this.showFlag ===0?1:0
            },
            printDown () {
                this.$refs.prodDiffTable.printDown()
            },
            downLoad() {
                this.releaseInfo['downLoad']=false;
                tranFlowRelease(this.releaseInfo).then(response => {
                    if (response.status === 200) {
                        let date = new Date();
                        let fileName = ""
                        fileName = date.getFullYear().toString()+(date.getMonth()+1).toString()+ date.getDate().toString()+"_"+this.releaseFlowInfo.flowManage.tranId.toString();
                        download2.download(response.data.data.sql, fileName, "text/plain");
                        this.$swal({
                            allowOutsideClick: false,
                            type: 'success',
                            title: "sql导出成功！",
                        })
                    }
                })
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
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'success',
                                title: "复核成功！",
                            })
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'success',
                                title: "驳回成功！",
                            })
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
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'success',
                                title: "发布成功！",
                            })
                            this.spinning=false
                            this.$router.push({ name: 'userIndexFlow'});
                        }
                        if(response.status === 200 && this.confirmInfo.isApproved === "N") {
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'success',
                                title: "驳回成功！",
                            })
                            this.$router.push({ name: 'userIndexFlow'});
                            let setTaskEvent= new Event("taskList");
                            window.dispatchEvent(setTaskEvent);
                        }
                    })
                }
            },
            setTranType(tranType,tranId){
                this.tranType=tranType
                this.tranId=tranId
                this.showFlag=0
            },
            setCheckInfo(checkInfo){
                this.checkInfo = checkInfo
            },
            setReleaseInfo(releaseInfo){
                this.releaseInfo = releaseInfo
            },
            setReleaseFlowInfo(releaseFlowInfo){
                this.releaseFlowInfo = releaseFlowInfo
            }
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
    #tranDataIndex >>> .theme--light.v-card {
        background-color: #F4F5F8 !important;
        color: #58595E!important;
        border: 1px solid #D6D7DB!important;
        box-shadow: none!important;
    }
  #tranDataIndex >>> .radiusDc {
      border-radius:0px!important;
      box-shadow: none!important;
      /*border: 1px solid #D6D7DB!important;*/
      /*border-bottom: none;*/
  }
  #tranDataIndex >>> .theme--light .v-toolbar__content {
      height: 64px!important;
      line-height: 64px;
  }
  #tranDataIndex >>> .changeColor {
      border-bottom: 1px solid rgba(0,0,0,.12);
      background-color: #fff!important;
  }
  #tranDataIndex >>> .theme--light .v-toolbar__content h4 {
      margin-bottom: 0;
  }
  #tranDataIndex >>> .theme--light.v-stepper .v-stepper__step__step {
      background-color: #3399FF!important;
  }
  #tranDataIndex >>> .theme--light.v-text-field.v-input--is-disabled .v-input__slot:before {
      border: none;
  }
  #tranDataIndex >>> .v-text-field>.v-input__control>.v-input__slot:before {
      border: none;
  }
  .white--text {
      color: #46485B!important;
  }
  #tranDataIndex >>> .v-btn:not(.v-btn--outline).primary {
      background-color: #3C73E6!important;
  }
  #tranDataIndex >>>  .v-stepper__header {
      box-shadow:none!important;
      border-bottom: 1px solid #D0D1D5!important;
  }

  #tranDataIndex >>> .theme--light.v-stepper {
      box-shadow: none;
  }
  #tranDataIndex >>> .difference.theme--light.v-card {
      border: none!important;
  }
  #tranDataIndex >>> .difference .primary {
      box-shadow: none!important;
      border: 1px solid #D0D1D5!important;
  }
</style>