<template>
  <div class="difference">
    <v-card md20 lg20 ref="print">
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
    </v-card>
  </div>
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
    props: ['prodData','sendTranId','sendTranType','seqNo'],

    data (){
        return {
            sourceModule: [],
            spinning: false,
            RB: false,
            CL: false,
            releaseFlowInfo: [],
            temp: [],
            title: "",
            diffTitles: "",
            checkFlowInfo: [],
            confirmInfo: [],
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
            tranId: ''
        }
    },
  computed: {
    randomColor() {
      let item = Math.floor(Math.random() * this.colors.length);
      return this.colors[item];
    }
  },
  watch: {
      sendTranId: {
          handler(val,oldVal)
          {
              if(val!=oldVal){
                  this.$nextTick(() => {
                      this.changeTranId(this.sendTranId,this.sendTranType)
                  })
              }
          }
      },
      seqNo: {
          handler(val,oldVal)
          {
              if(val!=oldVal){
                  this.$nextTick(() => {
                      this.changeTranId(this.sendTranId,this.sendTranType)
                  })
              }
          }
      },
   },
  methods: {
      printDown () {
          PrintInfo(this.$refs.print)
      },
      changeTranId(tranId,tranType){
          this.RB = false;
          this.CL = false;
          this.isTable = false
          if(tranType=='0'){
              this.isTable = false
              this.getDiffProdData(tranId);
          }else{
              this.isTable = true
              this.getDiffTableData(tranId);
          }
      },
      getDiffTableData(tranId) {
          //通过交易主单号 获取单表差异信息
          var data={'mainSeqNo': this.seqNo,"tranId": tranId};
          getDiffTable(data).then(response => {
              console.log(response);
              this.diffTitles = tranId
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
          let data={'mainSeqNo': this.seqNo,'tranId': tranId};
          getModuleByFlowCode(this.seqNo).then(response => {
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
};
</script>
<style scoped>
    .difference >>> .v-tabs__item--active{
        color: #4B7EE8 !important;
        background-color: #F4F4F4;
        font-weight: bold;
        height: 48px !important;
        border-radius: 0px;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-bottom: 2px solid #4B7EE8;
    }
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