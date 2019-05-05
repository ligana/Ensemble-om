<template>
    <v-layout row class="pt-3">
        <v-card class="cardClass">
          <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>存款产品</v-toolbar-title>
          </v-toolbar>
          <v-list two-line subheader>
            <v-list-tile v-for="item in itemsRB" :key="item.title" avatar @click="nullClick">
              <v-list-tile-avatar>
                <v-tooltip bottom color="orange">
                  <v-btn flat icon="edit" slot="activator" @click="deleteClick(item)" :color="orgen">
                    <v-icon style="color: red">delete</v-icon>
                  </v-btn>
                  <span>移除</span>
                </v-tooltip>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title @click="listClick(item)">{{ item.prodType }}-{{item.prodDesc}}</v-list-tile-title>
                <v-list-tile-sub-title @click="listClick(item)">收藏日期:【{{ item.date }}】产品当前状态:【{{ item.status }}】</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      <v-card class="cardClass ml-4">
        <v-toolbar color="primary lighten-2" dark>
          <v-toolbar-title>内部账产品</v-toolbar-title>
        </v-toolbar>
        <v-list two-line subheader>
          <v-list-tile v-for="item in itemsGL" :key="item.title" avatar @click="nullClick">
            <v-list-tile-avatar>
              <v-tooltip bottom color="orange">
                <v-btn flat icon="edit" slot="activator" @click="deleteClick(item)" :color="orgen">
                  <v-icon style="color: red">delete</v-icon>
                </v-btn>
                <span>移除</span>
              </v-tooltip>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title @click="listClick(item)">{{ item.prodType }}-{{item.prodDesc}}</v-list-tile-title>
              <v-list-tile-sub-title @click="listClick(item)">收藏日期:【{{ item.date }}】 产品状态:【{{ item.status }}】</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-layout>
  </template>
<script>
    import {getUserCollectByUserId} from '@/api/url/prodInfo';
    import {saveCollectProd} from '@/api/url/prodInfo';
    export default {
        data () {
            return {
                itemsRB: [],
                itemsGL: []
            }
        },
        mounted (){
            this.getCollectInfo();
        },
        methods: {
            //获取用户收藏的产品信息
            getCollectInfo(){
              //获取用户收藏的所有产品信息
                this.itemsRB = [];
                this.itemsGL = [];
                let userId = sessionStorage.getItem("userId");
                getUserCollectByUserId(userId).then(response => {
                    let collectProd = response.data.data.collectList;
                    for(let index in collectProd){
                        let temp = {};
                        temp["prodType"] = collectProd[index].prodType;
                        temp["prodDesc"] = collectProd[index].prodDesc;
                        temp["prodRange"] = collectProd[index].prodRange;
                        temp["date"] = collectProd[index].collectDate;
                        temp["module"] = collectProd[index].sourceModule;
                        temp["status"] = this.getStatusDesc(collectProd[index].collectStatus);
                        let sourceModule = collectProd[index].sourceModule;
                        if("RB" == sourceModule){
                            //存款产品
                            this.itemsRB.push(temp);
                            continue;
                        }
                        if("GL" == sourceModule){
                            //内部账产品
                            this.itemsGL.push(temp);
                            continue;
                        }
                    }
                })
            },
            //描述信息映射
            getStatusDesc(status){
                if("A" == status){
                    return "A-活动";
                }
                if("C" == status){
                    return "C-废弃";
                }
                if("D" == status){
                    return "D-产品已删除";
                }
            },
            //路由到对应产品展示界面
            listClick(val){
                 if ("RB" == val.module && "B" == val.prodRange) {
                     this.$router.push({name: "BaseProdForm", hash: val.prodType});
                 }
                 if ("GL" == val.module && "B" == val.prodRange) {
                     this.$router.push({name: "BaseProdFormGl", hash: val.prodType});
                 }
                if ("RB" == val.module && "S" == val.prodRange) {
                    this.$router.push({name: "SoldProdForm", hash: val.prodType});
                }
                if ("GL" == val.module && "S" == val.prodRange) {
                    this.$router.push({name: "SoldProdFormGl", hash: val.prodType});
                }
            },
            //点击删除  移除收藏的产品
            deleteClick(val){
                let collect = {};
                collect["optType"] = "D";
                collect["userId"] = sessionStorage.getItem("userId");
                collect["prodType"] = val.prodType;
                collect["prodDesc"] = val.prodDesc;
                collect["sourceModule"] = val.module;
                collect["prodRange"] = val.prodRange;
                saveCollectProd(collect).then(response => {
                    if(response.status === 200) {
                        this.getCollectInfo(val);
                        this.delFlag = true;
                        this.sweetAlert('success', "取消收藏成功!")
                    }
                })
            },
            nullClick(){
                console.log("for click style");
            }
        }
    }
</script>
<style scoped>
  .cardClass {
    width: 50%;
    height: 580px;
  }
</style>