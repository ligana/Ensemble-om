<template>
  <div>
    <v-layout row wrap>
      <v-flex md12 lg12>
        <v-toolbar dense class="chat-history-toolbar prodLists">
          <v-text-field prepend-icon="search" label="请输入产品代码或描述" v-model="searchValue"></v-text-field>
        </v-toolbar>
        <v-list two-line subheader :class="depositTree" v-show="searchValue">
          <v-list-tile class="chat-list prodList" avatar v-for="item of list" :key="item.title" @click="handleClick(item)">
            <v-list-tile-avatar>
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
              <v-list-tile-avatar>
                <v-icon :class="['amber white--text']">{{ 'call_to_action'}}</v-icon>
              </v-list-tile-avatar>
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
                            if(response.data.data[j].prodType == val){
                                that.folders.push(response.data.data[j])
                            }
                        }
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

  .chat-history-toolbar {
    /*padding: 5px 0;*/
    box-shadow: none;
  }

  .input {
    border-top: none;
    border: 1px solid #DCE1E7;
  }

  .input >>> .v-input__slot {
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 2px 0 0 2px !important;
  }

  .input .search {
    box-shadow: none;
    margin: 0;
    height: 48px;
    border-left: none;
    border: 1px solid #3C73E6;
    background-color: #3C73E6!important;
    color: #fff;
    border-radius: 0 2px 2px 0;
  }
</style>