<template>
<div>
  <v-card>
    <v-card-text class="pa-0">
      <v-switch
              v-model="ex11"
              label="隐藏相同项"
              color="success"
              value="onlyDiff"
              hide-details
              class="prodDiffSwitch"
      ></v-switch>
      <v-dialog v-model="dialog" class="prodDiffButton" max-width="1000px">
      <v-btn fab dark small color="cyan" slot="activator" @click="addTd">
        <v-icon dark>add</v-icon>
      </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">添加对比</span>
          </v-card-title>
          <v-card-text>
            <search-list-smart v-on:listenToSearch="showSearch"></search-list-smart>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-layout row wrap>
        <div v-for="(prodList, index1) in prodDiffData" class="diffList">
      <v-list dense>
      <template v-for="(item, index) in prodList.items">
        <v-btn class="diffIdButton" color="red" v-if="index==0&&index1!=0" dark @click="deleteTd(prodList.prodType)">
          {{prodList.prodType}}<v-icon dark >block</v-icon>
        </v-btn>
        <div class="diffEg" v-if="index==0&&index1==0" dark>
        </div>
        <v-divider
                v-if="item.divider"
                :inset="item.inset"
                :key="index"
        ></v-divider>
        <v-list-tile
                :key="item.title"
                avatar
                v-else
                :class="{'tbColor':item.diff}"
        >
            <v-list-tile-content>
               <v-list-tile-title v-html="item.title"></v-list-tile-title>
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
    import {getDiffProd} from '@/api/prod';
    import searchListSmart from '@/views/prodFactory/prodFlow/searchFlow/searchListSmart';
    export default {
        components: {searchListSmart},
        data () {
            return {
                ex11: '',
                dialog: false,
                prodCodeList: [],
                onlyDiff: false,
                prodDiffData: [{
                    prodType: '',
                    items: [
                        {
                            title: '产品代码'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品名称'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品状态'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品类别'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品结构'
                        },
                        {divider: true, inset: true},
                        {
                            title: '余额类型'
                        }
                    ]
                    }
                ]
            };
        },
        computed: {
            randomColor () {
                let item = Math.floor(Math.random() * this.colors.length);
                return this.colors[item];
            },
        },
        watch: {
            ex11(val){
                if(val=='onlyDiff'){
                    let prodList=this.prodDiffData;
                    let newListSub=[]
                    for(const item in prodList){
                        let newList=[]
                        for(const items in prodList[item].items){
                            if(prodList[item].items[items].diff==true){
                                newList.push(prodList[item].items[items-1]);
                                newList.push(prodList[item].items[items]);
                            }
                        }
                        if(newList.length>0){
                            let data={'prodType': prodList[item].prodType}
                            data.items=newList;
                            newListSub.push(data)
                        }
                    }
                    this.prodDiffData=newListSub
                }
                else{
                    this.queryDespositProdData()
                }
            }
        },
        mounted: function() {
            this.prodCodeList=this.$route.params.prodCodeList;
            if(this.prodCodeList==undefined||this.prodCodeList.length<=0){
                this.prodCodeList=['111001','11100']
            }
            this.queryDespositProdData()
        },
        methods: {
            queryDespositProdData() {
                getDiffProd(this.prodCodeList).then(response => {
                    this.prodDiffData = response.data.prodCompare
                })
            },
            showSearch (prodType){
                if(this.prodCodeList==undefined||this.prodCodeList.length<=0) {
                    this.prodCodeList=this.unique1(prodType)
                }else{
                this.prodCodeList=this.concatArr(this.prodCodeList,prodType)
                }
                this.queryDespositProdData()
                this.dialog=false
            },
            deleteTd (prodType) {
                let newIndex=0
                for (let i = 1; i < this.prodDiffData.length; i++) {
                    if(this.prodDiffData[i].prodType==prodType){
                        newIndex=i
                    }
                }
                this.prodDiffData.splice(newIndex,1);
                this.prodCodeList.splice(newIndex-1,1);
            },
            unique1(arr){
                let hash=[];
                for (let i = 0; i < arr.length; i++) {
                    if(hash.indexOf(arr[i])==-1){
                        hash.push(arr[i]);
                    }
                }
                return hash;
            },
            concatArr(arr1, arr2){
                let arr = arr1.concat(arr2);
                arr = this.unique1(arr);//再引用上面的任意一个去重方法
                return arr;
            },
        }
    };
</script>
<style scoped>
   .layout.wrap {
       padding: 0 20px;
   }
  .diffList{
    width:20%;
    /*text-align:center;*/
    border-top: 1px solid  rgba(40, 24, 31, 0.21);
    border-right: 1px solid  rgba(40, 24, 31, 0.21);
  }
  .diffList[data-v-4e9f81d9]:nth-child(1){
      border-left: 1px solid #ccc;
  }
.tbColor{
  background-color: #E3F2FD;
}
  .diffList .v-divider--inset:not(.v-divider--vertical){
    margin-left:0px;
    max-width:888px;
  }
  .prodDiffSwitch {
    display:inline-block;
    margin-left: 40px;
  }
  .prodDiffButton {
    float: right;

  }
  .diffIdButton {
    text-align: center;
  }
  .diffEg{
    height:48px;
  }
  </style>