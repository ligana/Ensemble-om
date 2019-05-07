<template>
  <a-spin tip="Loading..." size="large" :spinning="spinning">
    <div class="ml-0 mt-3">
      <v-layout row wrap>
        <v-flex md8 lg8>
          <!--复核流程信息-->
          <prod-review v-on:setCheckInfo="setCheckInfo" v-on:setReleaseInfo="setReleaseInfo" v-on:setReleaseFlowInfo="setReleaseFlowInfo"></prod-review>
        </v-flex>
        <v-flex md4 lg4>
          <task-list-flex :seqNo="code" v-on:sendType="setTranType" v-on:submitTask="submitTask" >
          </task-list-flex>
        </v-flex>
      </v-layout>
      <v-card class="elevation-2 radiusDc">
        <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" class="elevation-4 mt-3" flat>
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

        </v-toolbar>
      </v-card>
      <div v-show="showFlag==1">
        <prod-diff-table :sendTranId="tranId" :sendTranType="tranType" :seqNo="code" ref="prodDiffTable"></prod-diff-table>
      </div>
    </div>
  </a-spin>
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
                        this.sweetAlert('success',"sql导出成功!")
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
                    if("" == this.checkInfo.remark){
                        this.sweetAlert('info',"请输入复核意见!")
                    }else {
                        this.confirmInfo.isApproved = isApproved
                        tranFlowInfo(this.confirmInfo).then(response => {
                        if(response.status === 200 && this.confirmInfo.isApproved === "Y"){
                            this.sweetAlert('success', "复核成功!")
                            this.$router.push({name: 'userIndexFlow'});
                        }
                        if (response.status === 200 && this.confirmInfo.isApproved === "N") {
                            this.sweetAlert('success', "驳回成功!")
                            this.$router.push({name: 'userIndexFlow'});
                            let setTaskEvent = new Event("taskList");
                            window.dispatchEvent(setTaskEvent);
                        }
                    });
                    }
                }
                if(this.optKey === 4){
                    this.spinning=true
                    this.releaseInfo['downLoad']=true;
                    this.confirmInfo = this.releaseInfo;
                    if("" == this.releaseInfo.remark){
                        this.sweetAlert('info',"请输入发布意见!")
                        this.spinning = false

                    }else{
                        this.confirmInfo.isApproved = isApproved
                        tranFlowRelease(this.confirmInfo).then(response => {
                          if(response.status === 200 && this.confirmInfo.isApproved === "Y"){
                             this.sweetAlert('success', "发布成功!")
                             this.spinning = false
                             this.$router.push({name: 'userIndexFlow'});
                          }
                          if (response.status === 200 && this.confirmInfo.isApproved === "N") {
                             this.sweetAlert('success', "驳回成功!")
                             this.$router.push({name: 'userIndexFlow'});
                             let setTaskEvent = new Event("taskList");
                             window.dispatchEvent(setTaskEvent);
                          }
                        this.spinning = false
                        });
                    }
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
<style src="vue-multiselect/dist/vue-multiselect.min.css" />
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
    color: #64b5f6;
    font-size: large;
    font-style: inherit;
    margin-right: 0px;
    margin-top: 10px;
    margin-left: 10%
  }
  .textBox {
    margin-top: 5px;
  }
  .btnClass {
    margin-top: 5%;
    margin-left: 28%;
    margin-bottom: 3%;
    width: 50%;
    font-size: large;
  }
</style>