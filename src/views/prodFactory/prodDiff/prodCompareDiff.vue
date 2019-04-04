<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-layout style="color: #42A5F5!important">
          <v-flex xs12 md2 lg2 style="margin-top: 5px">
            <v-switch v-model="switchValue" label="隐藏相同项" color="#42A5F5" value="Y" hide-details></v-switch>
          </v-flex>
          <v-flex xs12 md10 lg10>
            <v-layout>
              <v-toolbar-title v-for="i in prodTypeList" :key="i.prodType" :class="titleClass">
                {{i.prodType}}-{{i.prodDesc}}
              </v-toolbar-title>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-card-text style="padding: 0;border-bottom: 1px solid #000">
        <v-layout row wrap>
          <div v-for="(prodList, index1) in tempArr" :class="diffList">
            <v-list dense>
              <template v-for="(item, index) in prodList.item">
                <v-divider></v-divider>
                <v-list-tile :class="{'tbColor':item.diff}">
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.columnDesc">{{item.columnDesc}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </div>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
    import {getColumnDesc} from '@/utils/columnDesc'
    import {getProdCompareDiff} from "@/api/url/prodInfo";
    export default {
        props: {
            data: String,
            tag: String
        },
        data() {
            return {
                switchValue: "",
                diffList: 'diffList2',
                titleClass: 'titleClass2',
                tag: '',
                prodList: [],
                prodInfo: [],
                prodTypeList: [],
                prodCompList: [],
                prodDiffList: [],
                tempArr: []
            }
        },
        watch: {
            data: {
                handler(val) {
                    this.init(val);
                },
            },
            switchValue(val){
                console.log(val);
                this.switchClick(val);
            }
        },
        mounted: function () {
            this.tag = this._props.tag;
        },
        methods: {
            init(val){
                this.prodInfo = val;
                //初始化对比产品信息
                this.prodTypeList = val.prodType;
                this.initCompData(val);
                //加载所有对比信息到展示界面
                this.tempArr = this.prodCompList;
                //差异数据增加样式
                this.diffDataAddStyle();
                let length = val.prodType.length;
                let classType = "diffList" + length.toString();
                let titleType = "titleClass"+ length.toString();
                this.diffList = classType;
                this.titleClass = titleType;
            },
            initCompData(val){
                let prodData = val.data;
                let tag = this._props.tag;
                let columnInfo = val.column;
                if(tag == "TYPE"){
                    //参数描述列数据组装
                    this.prodCompList.push({item: columnInfo});
                    //组装prodTypes对比数据信息
                    for(let index in prodData){
                        let prodArr = []
                        for(let code in prodData[index]){
                            for(let key in prodData[index][code]){
                                let temp = {};
                                temp["columnCode"] = key;
                                temp["columnDesc"] = prodData[index][code][key];
                                prodArr.push(temp);
                            }
                        }
                        this.prodCompList.push({item: prodArr});
                    }
                }
                if(tag == "DEFINE"){
                    //参数描述列数据组装
                    this.prodCompList.push({item: columnInfo});
                    //组织define参数差异数据
                    for (let attrCode in prodData) {
                        this.initAttrData(prodData, columnInfo,attrCode);
                    }
                }
                if(tag != null && tag != "" && tag !="TYPE" && tag != "DEFINE"){
                    //参数描述列数据组装
                    let tempCol = [];
                    for(let col in columnInfo){
                        if(columnInfo[col].eventType == tag){
                            tempCol.push(columnInfo[col]);
                        }
                    }
                    this.prodCompList.push({item: tempCol});
                    //组织事件参数
                    for(let prodCode in prodData){
                        this.initEventData(prodData,tempCol,prodCode,tag);
                    }
                }
                //组装差异数据集合
                this.getDiffInfo(this.prodCompList);
            },
            //事件参数差异数据组装
            initEventData(prodData,columnInfo,prodCode,tag){
                let eventArr = [];
                for(let column in columnInfo){
                    for(let index in prodData[prodCode]){
                        //事件匹配
                        if(index.split("_")[0] == tag){
                            //判断该产品是否存在此参数
                            if(!this.findIn(prodData[prodCode][index],columnInfo[column].columnCode)){
                                let temp = {};
                                temp["columnCode"] = columnInfo[column].columnCode;
                                temp["columnDesc"] = "产品无此参数";
                                eventArr.push(temp);
                                continue;
                            }
                            for(let i in prodData[prodCode][index]){
                                if(prodData[prodCode][index][i].assembleId == columnInfo[column].columnCode){
                                    let temps = {};
                                    temps["columnCode"] = columnInfo[column].columnCode;
                                    temps["columnDesc"] = prodData[prodCode][index][i].attrValue == null?"":prodData[prodCode][index][i].attrValue;
                                    eventArr.push(temps);
                                }
                            }
                        }
                    }
                }
                this.prodCompList.push({item: eventArr});
            },
            //define参数数据组装
            initAttrData(prodData,columnInfo,attrCode){
                let arr = [];
                for(let attrKey in columnInfo) {
                    for (let attrIndex in prodData[attrCode]) {
                        if(attrIndex == "prodDefine" && !this.findIn(prodData[attrCode][attrIndex],columnInfo[attrKey].columnCode)){
                            let temps = {};
                            temps["columnCode"] = columnInfo[attrKey].columnCode;
                            temps["columnDesc"] = "产品无此参数";
                            arr.push(temps);
                            continue;
                        }
                        for(let i in prodData[attrCode][attrIndex]) {
                            if (attrIndex == "prodDefine" && prodData[attrCode][attrIndex][i].assembleId == columnInfo[attrKey].columnCode && prodData[attrCode][attrIndex][i].assembleType != "EVENT") {
                                let temp = {};
                                temp["columnCode"] = columnInfo[attrKey].columnCode;
                                temp["columnDesc"] = prodData[attrCode][attrIndex][i].attrValue == null?"":prodData[attrCode][attrIndex][i].attrValue;
                                arr.push(temp);
                            }
                        }
                    }
                }
                this.prodCompList.push({item: arr});
            },
            //组装差异数据集合
            getDiffInfo(val){
                let compList = val;
                let column = [];
                //产品参数
                if(compList.length){
                    column = compList[0];
                }
                //产品参数值
                for (let code in compList) {
                    if (code != 0) {
                        let tempArr = [];
                        let colArr = [];
                        for(let col in column.item){
                            if(this.compDiff(compList,column.item[col])) {
                                tempArr.push(compList[code].item[col]);
                                colArr.push(column.item[col]);
                            }
                        }
                        //加载一次参数描述列
                        if(!this.prodDiffList.length){
                            this.prodDiffList.push({item: colArr});
                        }
                        //产品参数值加载
                        this.prodDiffList.push({item: tempArr});
                    }
                }
            },
            //隐藏相同项 点击事件
            switchClick(val){
                if(val == "Y"){
                    //只显示不同参数
                    this.tempArr = this.prodDiffList;
                }else{
                    //参数全展示
                    this.tempArr = this.prodCompList;
                }
            },
            //比较相同参数，不同产品对应的参数值是否相同
            compDiff(data,col){
                let value = "";
                for(let index in data){
                    if(index != 0){
                        for(let key in data[index].item){
                            if(data[index].item[key].columnCode == col.columnCode && index == 1){
                                value = data[index].item[key].columnDesc;
                            }
                            if(data[index].item[key].columnCode == col.columnCode && index != 1 && value != data[index].item[key].columnDesc){
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
            //差异数据增加样式
            diffDataAddStyle(){
              let allProdList = this.prodCompList;
              let diffProdList = this.prodDiffList;
              for(let index in diffProdList[0].item){
                  let key  = diffProdList[0].item[index].columnCode;
                  for(let index2 in allProdList){
                      for(let index3 in allProdList[index2].item){
                          if(allProdList[index2].item[index3].columnCode == key){
                              allProdList[index2].item[index3]["diff"] = true;
                              break;
                          }
                      }
                  }
              }
            },
            //判断key 是否存在于data数据集合
            findIn(data,key){
                for(let index in data){
                    if(data[index].assembleType != "EVENT" && data[index].assembleId == key){
                        return true;
                    }
                }
                return false;
            }
        }
    }
</script>

<style scoped>
  .diffList2 {
    width: 33.333333333333333%;
    border-right-style: solid;
    border-right-width: 1px;
    border-color: rgba(40, 24, 31, 0.21);
    text-align: center;
    font-size: large;
  }
  .diffList3 {
    width: 25%;
    border-right-style: solid;
    border-right-width: 2px;
    border-color: rgba(40, 24, 31, 0.21);
    text-align: center;
    font-size: large;
  }
  .diffList4 {
    width: 20%;
    border-right-style: solid;
    border-right-width: 1px;
    border-color: rgba(40, 24, 31, 0.21);
    text-align: center;
    font-size: large;
  }
  .diffList5 {
    width: 16.66666666%;
    border-right-style: solid;
    border-right-width: 1px;
    border-color: rgba(40, 24, 31, 0.21);
    text-align: center;
    font-size: large;
  }
  .titleClass2 {
    width: 50%;
    margin-left: 20%;
    text-align: center;
    font-size: medium;
    margin-top: 1%;

  }
  .titleClass3 {
    width: 33%;
    text-align: center;
    margin-left: 10%;
    font-size: medium;
    margin-top: 1%;

  }
  .titleClass4 {
    width: 25%;
    margin-left: 1%;
    text-align: center;
    font-size: medium;
    margin-top: 1%;

  }
  .titleClass5 {
    width: 20%;
    text-align: center;
    font-size: medium;
    margin-top: 1%;

  }
  .tbColor {
    background-color: #e3f2fd;
  }
</style>