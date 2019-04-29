<template>
  <div>
    <v-layout row wrap>
      <v-flex md12 lg12>
        <v-toolbar dense class="chat-history-toolbar prodLists">
          <v-text-field solo clearable prepend-icon="search" style="height: 100%" label="请输入产品代码或描述" v-model="searchValue"></v-text-field>
        </v-toolbar>
        <v-list two-line subheader :class="depositTree" v-show="searchValue">
          <v-list-tile class="chat-list prodList" avatar v-for="item of list" :key="item.title" @click="handleClick(item)">
            <div v-show="isRB == true" style="width: 20%;height: 60%;padding-left: -20%">
              <img src="../../../../../static/prod/prodCun.png" height=100% >
            </div>
            <div v-show="isCL == true" style="width: 20%;height: 60%;padding-left: -20%">
              <img src="../../../../../static/prod/prodDai.png" height=100% >
            </div>
            <div v-show="isGL == true" style="width: 20%;height: 60%;padding-left: -20%">
              <img src="../../../../../static/prod/prodNei.png" height=100% >
            </div>
            <!--<div v-show="isMM == true" style="width: 20%;height: 60%;padding-left: -20%">-->
            <!--<img src="../../../../../static/prod/prodHuo.png" height=100% >-->
            <!--</div>-->
            <v-list-tile-avatar v-show="isRB == false && isCL == false && isGL == false && isMM == false">
              <v-icon :class="['amber white--text']">{{ 'call_to_action'}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.prodType }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.prodDesc }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <vue-perfect-scrollbar >
          <v-list two-line subheader :class="depositTree" v-show="!searchValue">
            <v-list-tile class="chat-list prodList" avatar v-for="(item, index ) in folders" :key="item.title" @click="handleClick(item)">
              <div v-show="isRB == true" style="width: 20%;height: 60%;padding-left: -20%">
                <img src="../../../../../static/prod/prodCun.png" height=100% >
              </div>
              <div v-show="isCL == true" style="width: 20%;height: 60%;padding-left: -20%">
                <img src="../../../../../static/prod/prodDai.png" height=100% >
              </div>
              <div v-show="isGL == true" style="width: 20%;height: 60%;padding-left: -20%">
                <img src="../../../../../static/prod/prodNei.png" height=100% >
              </div>
              <!--<div v-show="isMM == true" style="width: 20%;height: 60%;padding-left: -20%">-->
              <!--<img src="../../../../../static/prod/prodHuo.png" height=100% >-->
              <!--</div>-->
              <v-list-tile-content>
                <v-list-tile-title>{{ item.prodType }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.prodDesc }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </vue-perfect-scrollbar>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
    import {
        getProdType
    } from '@/api/url/prodInfo'
    import {
        getAllProdList
    } from '@/api/url/prodInfo'

    export default {

        props: ["prodType","prodRange"],
        data: () => ({
            isRB: false,
            isCL: false,
            isGL: false,
            isMM: false,
            folders: [],
            list: [],
            prodType: '',
            prod: '',
            depositTree: 'depositTree',
            searchValue: '',
        }),
        watch: {
            searchValue() {
                if(this.searchValue==''){
                    this.list=[]
                    return
                }
                this.list=[]
                for(let i=0; i<this.folders.length; i++){
                    if(this.folders[i].prodType.search(this.searchValue)!=-1 || this.folders[i].prodDesc.search(this.searchValue)!=-1){
                        this.list.push(this.folders[i])
                    }
                }
            }

        },
        mounted() {
            this.prod = this._props.prodType
            this.initProdList(this._props.prodType)
        },
        methods: {
            initProdList(val) {
                let that = this
                getAllProdList().then(response => {
                    that.folders = []
                    let prodType = that._props.prodType
                    let length = response.data.data.length
                    if(prodType == val){
                        for(let i = 0; i<length; i++){
                            if(response.data.data[i].prodType == val){
                                that.folders.push(response.data.data[i])
                            }
                            if(response.data.data[i].baseProdType == val){
                                that.folders.push(response.data.data[i])
                            }
                        }
                    }else{
                        for(let j = 0; j<length; j++){
                            if(response.data.data[j].baseProdType == val){
                                that.folders.push(response.data.data[j])
                            }
                        }
                    }
                    if(that.folders[0].sourceModule == "RB"){
                        that.isRB = true
                    }
                    if(that.folders[0].sourceModule == "CL"){
                        that.isCL = true
                    }
                    if(that.folders[0].sourceModule == "GL"){
                        that.isGL = true
                    }
                });
            },
            handleClick(value) {
                this.prodType = value.prodType
                this.initProdList(this.prod)
                this.$emit('listenToProdList',{'prodType': this.prodType})
            },
        }
    };
</script>
<style scoped>
  .top {
    padding-top: 8px;
  }
  .depositTree {
    height: calc(90vh - 24px);
    overflow-y: scroll;
  }
  .depositTreeFixed {
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>