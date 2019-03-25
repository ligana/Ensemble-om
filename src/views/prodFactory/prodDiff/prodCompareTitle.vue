<<<<<<< HEAD
<template>
  <div>
    <v-card md20 lg20 style="margin-top: 1%">
      <!--存款产品-->
      <v-card-text v-show="module=='RB'">
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffListRb" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffListRb" :key="i">
              <prod-comp v-if="i=='基本信息'" :data ="prodTypeData" tag = "TYPE"></prod-comp>
              <prod-comp v-if="i=='产品属性'" :data ="prodDefineData" tag = "DEFINE"></prod-comp>
              <prod-comp v-if="i=='开户定义'" :data ="prodEventData" tag = "OPEN"></prod-comp>
              <prod-comp v-if="i=='存入定义'" :data ="prodEventData" tag = "CRET"></prod-comp>
              <prod-comp v-if="i=='支取定义'" :data ="prodEventData" tag = "DEBT"></prod-comp>
              <prod-comp v-if="i=='销户定义'" :data ="prodEventData" tag = "CLOSE"></prod-comp>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
      <!--贷款产品-->
      <v-card-text v-show="module=='CL'">
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffListCl" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffListCl" :key="i">
              <prod-comp v-if="i=='基本信息'" :data ="prodTypeData" tag = "TYPE"></prod-comp>
              <prod-comp v-if="i=='产品属性'" :data ="prodDefineData" tag = "DEFINE"></prod-comp>
              <prod-comp v-if="i=='开户定义'" :data ="prodEventData" tag = "OPEN"></prod-comp>
              <prod-comp v-if="i=='放款定义'" :data ="prodEventData" tag = "DRW"></prod-comp>
              <prod-comp v-if="i=='贴息定义'" :data ="prodEventData" tag = "DISC"></prod-comp>
              <prod-comp v-if="i=='还款定义'" :data ="prodEventData" tag = "REC"></prod-comp>
              <prod-comp v-if="i=='到期定义'" :data ="prodEventData" tag = "DUE"></prod-comp>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
      <!--内部账产品-->
      <v-card-text v-show="module=='GL'">
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffListGL" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffListGL" :key="i">
              <prod-comp v-if="i=='基本信息'" :data ="prodTypeData" tag = "TYPE"></prod-comp>
              <prod-comp v-if="i=='产品属性'" :data ="prodDefineData" tag = "DEFINE"></prod-comp>
              <prod-comp v-if="i=='开户定义'" :data ="prodEventData" tag = "OPEN"></prod-comp>
              <prod-comp v-if="i=='销户定义'" :data ="prodEventData" tag = "CLOSE"></prod-comp>
              <prod-comp v-if="i=='贷记事件'" :data ="prodEventData" tag = "CRET"></prod-comp>
              <prod-comp v-if="i=='借记事件'" :data ="prodEventData" tag = "DEBT"></prod-comp>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
    import {getColumnDesc} from '@/utils/columnDesc'
    import {getProdCompareDiff} from "@/api/url/prodInfo";
    import prodComp from '@/views/prodFactory/prodDiff/prodCompareDiff';

    export default {
        components: {
            prodComp
        },
        data() {
            return {
                module: 'RB',
                diffListRb: ["基本信息","产品属性","开户定义","存入定义","支取定义","销户定义"],
                diffListCl: ["基本信息","产品属性","开户定义","放款定义","贴息定义","还款定义","到期定义"],
                diffListGL: ["基本信息","产品属性","开户定义","销户定义","贷记事件","借记事件"],
                prodTypeList: [],
                prodTypeData: {},
                prodDefineData: {},
                prodEventData: {}
            }
        },
        created: function () {
            let prodTypeList = this.$route.params.prodTypeList;
            this.module = this.$route.params.sourceModule;
            this.initData(prodTypeList);
        },
        methods: {
            initData(val){
                let that = this;
                getProdCompareDiff(val).then(response => {
                    that.prodList = response.data.data;
                    this.getProdTypeInfo(response.data.data);
                    this.getAttrInfo(response.data.data);
                });
            },
            getProdTypeInfo(val){
                //产品基本信息参数
                let prodData = val;
                let data = [];
                let prodTypeColumn = []
                for(let prodCode in prodData){
                    for(let index in prodData[prodCode]){
                        if(index == "prodType"){
                            if(!this.findIn(this.prodTypeList,prodCode)) {
                                let tempType = {};
                                tempType['prodType'] = prodCode;
                                tempType['prodDesc'] = prodData[prodCode][index].prodDesc;
                                this.prodTypeList.push(tempType);
                            }
                            for(let key in prodData[prodCode][index]){
                                if(!this.findIn(prodTypeColumn,key)){
                                    let temp = {};
                                    temp['columnCode'] = key;
                                    const keyDesc = getColumnDesc(key);
                                    temp['columnDesc'] = keyDesc;
                                    prodTypeColumn.push(temp);
                                }
                            }
                        }
                    }
                    let temps = {};
                    temps[prodCode] = prodData[prodCode].prodType;
                    data.push(temps);
                }
                this.prodTypeData = {prodType: this.prodTypeList,column: prodTypeColumn,data: data};
            },
            getAttrInfo(val){
              //产品参数信息 事件参数
                let prodData = val;
                let prodDefineColumn = [];
                let prodEventColumn = [];
                for(let prodCode in prodData){
                    for(let index in prodData[prodCode]){
                        if(index == "prodDefine"){
                            //参数信息
                            for(let attr in prodData[prodCode][index]){
                                if (prodData[prodCode][index][attr].assembleType == "ATTR" && !this.findIn(prodDefineColumn,prodData[prodCode][index][attr].assembleId)) {
                                    let tempAttr = {};
                                    tempAttr['columnCode'] = prodData[prodCode][index][attr].assembleId;
                                    const attrDesc = getColumnDesc(prodData[prodCode][index][attr].assembleId);
                                    tempAttr['columnDesc'] = attrDesc;
                                    prodDefineColumn.push(tempAttr);
                                }
                            }
                        }
                        if(index != "prodDefine" && index != "prodType"){
                            //事件参数
                            for(let eventAttr in prodData[prodCode][index]){
                                if(!this.findIn(prodEventColumn,prodData[prodCode][index][eventAttr].assembleId)){
                                    let tempEvent = {};
                                    tempEvent['columnCode'] = prodData[prodCode][index][eventAttr].assembleId;
                                    const attrEventDesc = getColumnDesc(prodData[prodCode][index][eventAttr].assembleId);
                                    tempEvent['columnDesc'] = attrEventDesc;
                                    tempEvent['eventType'] = index.split("_")[0];
                                    prodEventColumn.push(tempEvent);
                                }
                            }
                        }
                    }
                }
                //数据组装
                this.prodDefineData = {prodType: this.prodTypeList, column: prodDefineColumn, data: prodData};
                this.prodEventData = {prodType: this.prodTypeList, column: prodEventColumn, data: prodData};
            },
            //存在性检查
            findIn(val,key){
                for(let index in val){
                    if(val[index].columnCode != undefined && val[index].columnCode != null && val[index].columnCode == key){
                        return true;
                    }
                    if(val[index].prodType != undefined && val[index].prodType != null && val[index].prodType == key){
                        return true;
                    }
                }
                return false;
            }
        }
    }
</script>

<style scoped>
  .diffTitle {
    font-size: large;
  }
=======
<template>
  <div>
    <v-card md20 lg20 style="margin-top: 1%">
      <!--存款产品-->
      <v-card-text v-show="module=='RB'">
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffListRb" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffListRb" :key="i">
              <prod-comp v-if="i=='基本信息'" :data ="prodTypeData" tag = "TYPE"></prod-comp>
              <prod-comp v-if="i=='产品属性'" :data ="prodDefineData" tag = "DEFINE"></prod-comp>
              <prod-comp v-if="i=='开户定义'" :data ="prodEventData" tag = "OPEN"></prod-comp>
              <prod-comp v-if="i=='存入定义'" :data ="prodEventData" tag = "CRET"></prod-comp>
              <prod-comp v-if="i=='支取定义'" :data ="prodEventData" tag = "DEBT"></prod-comp>
              <prod-comp v-if="i=='销户定义'" :data ="prodEventData" tag = "CLOSE"></prod-comp>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
      <!--贷款产品-->
      <v-card-text v-show="module=='CL'">
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffListCl" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffListCl" :key="i">
              <prod-comp v-if="i=='基本信息'" :data ="prodTypeData" tag = "TYPE"></prod-comp>
              <prod-comp v-if="i=='产品属性'" :data ="prodDefineData" tag = "DEFINE"></prod-comp>
              <prod-comp v-if="i=='开户定义'" :data ="prodEventData" tag = "OPEN"></prod-comp>
              <prod-comp v-if="i=='放款定义'" :data ="prodEventData" tag = "DRW"></prod-comp>
              <prod-comp v-if="i=='贴息定义'" :data ="prodEventData" tag = "DISC"></prod-comp>
              <prod-comp v-if="i=='还款定义'" :data ="prodEventData" tag = "REC"></prod-comp>
              <prod-comp v-if="i=='到期定义'" :data ="prodEventData" tag = "DUE"></prod-comp>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
      <!--内部账产品-->
      <v-card-text v-show="module=='GL'">
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffListGL" :key="n" class="diffTitle">{{n}}</v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item v-for="i in diffListGL" :key="i">
              <prod-comp v-if="i=='基本信息'" :data ="prodTypeData" tag = "TYPE"></prod-comp>
              <prod-comp v-if="i=='产品属性'" :data ="prodDefineData" tag = "DEFINE"></prod-comp>
              <prod-comp v-if="i=='开户定义'" :data ="prodEventData" tag = "OPEN"></prod-comp>
              <prod-comp v-if="i=='销户定义'" :data ="prodEventData" tag = "CLOSE"></prod-comp>
              <prod-comp v-if="i=='贷记事件'" :data ="prodEventData" tag = "CRET"></prod-comp>
              <prod-comp v-if="i=='借记事件'" :data ="prodEventData" tag = "DEBT"></prod-comp>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
    import {getColumnDesc} from '@/utils/columnDesc'
    import {getProdCompareDiff} from "@/api/url/prodInfo";
    import prodComp from '@/views/prodFactory/prodDiff/prodCompareDiff';

    export default {
        components: {
            prodComp
        },
        data() {
            return {
                module: 'RB',
                diffListRb: ["基本信息","产品属性","开户定义","存入定义","支取定义","销户定义"],
                diffListCl: ["基本信息","产品属性","开户定义","放款定义","贴息定义","还款定义","到期定义"],
                diffListGL: ["基本信息","产品属性","开户定义","销户定义","贷记事件","借记事件"],
                prodTypeList: [],
                prodTypeData: {},
                prodDefineData: {},
                prodEventData: {}
            }
        },
        created: function () {
            let prodTypeList = this.$route.params.prodTypeList;
            this.module = this.$route.params.sourceModule;
            this.initData(prodTypeList);
        },
        methods: {
            initData(val){
                let that = this;
                getProdCompareDiff(val).then(response => {
                    that.prodList = response.data.data;
                    this.getProdTypeInfo(response.data.data);
                    this.getAttrInfo(response.data.data);
                });
            },
            getProdTypeInfo(val){
                //产品基本信息参数
                let prodData = val;
                let data = [];
                let prodTypeColumn = []
                for(let prodCode in prodData){
                    for(let index in prodData[prodCode]){
                        if(index == "prodType"){
                            if(!this.findIn(this.prodTypeList,prodCode)) {
                                let tempType = {};
                                tempType['prodType'] = prodCode;
                                tempType['prodDesc'] = prodData[prodCode][index].prodDesc;
                                this.prodTypeList.push(tempType);
                            }
                            for(let key in prodData[prodCode][index]){
                                if(!this.findIn(prodTypeColumn,key)){
                                    let temp = {};
                                    temp['columnCode'] = key;
                                    const keyDesc = getColumnDesc(key);
                                    temp['columnDesc'] = keyDesc;
                                    prodTypeColumn.push(temp);
                                }
                            }
                        }
                    }
                    let temps = {};
                    temps[prodCode] = prodData[prodCode].prodType;
                    data.push(temps);
                }
                this.prodTypeData = {prodType: this.prodTypeList,column: prodTypeColumn,data: data};
            },
            getAttrInfo(val){
              //产品参数信息 事件参数
                let prodData = val;
                let prodDefineColumn = [];
                let prodEventColumn = [];
                for(let prodCode in prodData){
                    for(let index in prodData[prodCode]){
                        if(index == "prodDefine"){
                            //参数信息  （去除event定义数据）
                            for(let attr in prodData[prodCode][index]){
                                if (prodData[prodCode][index][attr].assembleType == "ATTR" && !this.findIn(prodDefineColumn,prodData[prodCode][index][attr].assembleId)) {
                                    let tempAttr = {};
                                    tempAttr['columnCode'] = prodData[prodCode][index][attr].assembleId;
                                    const attrDesc = getColumnDesc(prodData[prodCode][index][attr].assembleId);
                                    tempAttr['columnDesc'] = attrDesc;
                                    prodDefineColumn.push(tempAttr);
                                }
                            }
                        }
                        if(index != "prodDefine" && index != "prodType"){
                            //事件参数(去除参数类型为part的参数)
                            for(let eventAttr in prodData[prodCode][index]){
                                if(prodData[prodCode][index][eventAttr].assembleType == "ATTR" && !this.findIn(prodEventColumn,prodData[prodCode][index][eventAttr].assembleId)){
                                    let tempEvent = {};
                                    tempEvent['columnCode'] = prodData[prodCode][index][eventAttr].assembleId;
                                    const attrEventDesc = getColumnDesc(prodData[prodCode][index][eventAttr].assembleId);
                                    tempEvent['columnDesc'] = attrEventDesc;
                                    tempEvent['eventType'] = index.split("_")[0];
                                    prodEventColumn.push(tempEvent);
                                }
                            }
                        }
                    }
                }
                //数据组装
                this.prodDefineData = {prodType: this.prodTypeList, column: prodDefineColumn, data: prodData};
                this.prodEventData = {prodType: this.prodTypeList, column: prodEventColumn, data: prodData};
            },
            //存在性检查
            findIn(val,key){
                for(let index in val){
                    if(val[index].columnCode != undefined && val[index].columnCode != null && val[index].columnCode == key){
                        return true;
                    }
                    if(val[index].prodType != undefined && val[index].prodType != null && val[index].prodType == key){
                        return true;
                    }
                }
                return false;
            }
        }
    }
</script>

<style scoped>
  .diffTitle {
    font-size: large;
  }
>>>>>>> master
</style>