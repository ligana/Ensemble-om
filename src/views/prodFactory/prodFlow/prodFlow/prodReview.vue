<template>
  <div class="ml-4">
        <!--<tran-check-flow-info v-if="optKey==3"></tran-check-flow-info>-->
        <!--<tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>-->
        <!--复核流程信息-->
        <v-card class="mt-4 elevation-4 radiusDc">
          <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
            <v-icon>call_split</v-icon>
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
                  <v-subheader class="descClass">发布系统:</v-subheader>
                </v-flex>
                <v-flex md10 lg10>
                  <multiselect v-model="releaseInfo.omorg" :options = "envInfo" placeholder="请选择..." :searchable="false" :close-on-select="false" :show-labels="false"
                               @tag="addTag" :taggable="true" :multiple="true" label="envDesc" track-by="envId">

                  </multiselect>
                </v-flex>
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
  </div>
</template>
<script>
    import prodDiffTable from '@/views/prodFactory/prodDiff/prodDiffTable'
    import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'
    import Multiselect from "vue-multiselect"
    import {PrintInfo} from '@/utils/print/print'
    import DcTextField from '@/components/widgets/DcTextField'
    import TaskListFlex from '@/views/propertyManage/taskListFlex'
    import download2 from '@/utils/download2';
    import toast from '@/utils/toast';
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    import {
        tranFlowRelease
    } from '@/api/url/prodInfo';
    import {
        getEnvAll
    } from '@/api/url/prodInfo';
    export default {
        components: {
            Multiselect,
            baseTable,
            TaskListFlex,
            DcTextField,
            prodDiffTable
        },
        props: ["prodData"],
        data (){
            return {

                envInfo: [],
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
                    omorg: [],
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
        watch: {
            'checkInfo.remark': {
                handler(val,oldval)
                {
                    if(val!=oldval){
                        this.$nextTick(() => {
                            this.$emit('setCheckInfo',this.checkInfo);
                        })
                    }
                },
            },
            'releaseInfo.remark': {
                handler(val,oldval)
                {
                    if(val!=oldval){
                        this.$nextTick(() => {
                            this.$emit('setReleaseInfo',this.releaseInfo);
                        })
                    }
                },
            }
        },
        created() {
            //交易单号
            this.code = this.$route.params.code
            this.setOptKey(this.$route.params.optValue)
            //获取当前操作日期
            this.getDate()
            //初始化流程信息
            this.initFlowInfo(this.$route.params)
            getEnvAll().then(response => {
                this.envInfo=response.data.data.envInfoAll
            })
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
                    this.$emit('setCheckInfo',this.checkInfo);
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
                    this.$emit('setReleaseInfo',this.releaseInfo);
                }
                this.$emit('setReleaseFlowInfo',this.releaseFlowInfo)
            },
            getDate() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;//js中是从0开始所以要加1
                var day = date.getDate();
                this.releaseInfo.date = year+'/'+month+'/'+day;
                this.checkInfo.date = year+'/'+month+'/'+day;
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
            addTag (newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                }
                this.options.push(tag)
                this.value.push(tag)
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