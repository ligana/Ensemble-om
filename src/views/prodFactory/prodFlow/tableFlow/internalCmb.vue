<template>
  <div class="app-container">
    <v-layout row wrap>
      <v-flex lg3 sm3 class="v-card">
        <vue-perfect-scrollbar class="depositTree">
          <v-list two-line subheader>
            <v-subheader inset>我的理财产品</v-subheader>
            <v-list-tile class="prodList" v-for="item in files" :key="item.title" avatar @click="handleClick">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.value }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.label }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-subheader inset>内部账产品</v-subheader>
            <v-list-tile class="chat-list prodList" avatar v-for="(item) in glFolders" :key="item.title" @click="handleClick(item)">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.value }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.label }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </vue-perfect-scrollbar>
      </v-flex>
      <v-flex lg9 sm9 class="v-card">
        <prod-list-cmb :items="prodListDtl"></prod-list-cmb>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  getDepositProdListTow
  import {
    getDepositProdListTow
  } from '@/api/prod';
  getDepositDtl
  import {
    getDepositDtl
  } from '@/api/prod';
  import {
      getProdClass
  } from '@/api/prod';
  import {
      getProdType
  } from '@/api/prod';
  import VWidget from '@/components/VWidget';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import prodListCmb from './prodListCmb';
  export default {
    name: 'depositCmb',
    components: {
      VWidget,
      VuePerfectScrollbar,
      prodListCmb
    },
    data() {
      return {
        listLoading: true,
          prodClass: '',
        prodListDtl: [],
        depositProd: {
          prodcode: '100002',
          version: '1.0'
        },
        listValue: '',
        activeName: 'basic',
        eventForm: {
          ccy: []
        },
        acctForm: {},
        prodInfo: ['基本信息', '账户信息', '核算信息'],
        files: [{
            icon: 'assignment',
            iconClass: 'blue white--text',
            value: '我收藏的理财产品',
            lable: '我收藏的理财产品'
          },
          {
            icon: 'assignment',
            iconClass: 'blue white--text',
            value: '我评论的理财产品',
            lable: '我评论的理财产品'
          }
        ],
        folders: [],
        clFolders: [],
        glFolders: []
      }
    },
    created() {
      this.depositProd = {
        prodcode: this.$route.params.prodType,
        version: '1.0'
      }
    },
    methods: {
      submitForm() {},
      draftForm() {},
      queryProdInfo() {},
      selectByProd() {
      },
      handleClick(prodList) {
          //渲染产品信息列表时，先清空原有产品信息
          this.prodListDtl = []
          this.prodclass =  prodList.value
          this.getProdType(this.prodclass)
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      queryDespositProdData() {
        getDepositProdListTow().then(response => {
          this.folders = response.data.prodListTwo
          this.queryDespositDtl(this.folders[0].value,this.folders[0].label)
        })
      },
      queryDespositDtl(prodCode,prodType) {
        getDepositDtl({'prodCode':prodCode,'prodType':prodType}).then(response => {
          this.prodListDtl = response.data
        })
      },
        //初始化加载菜单列表
        getProdClassData() {
            getProdClass().then(response => {
                for (let i=0; i<response.data.prodClassForm.length; i++)
                {
                   if('GL'=== response.data.prodClassForm[i].parentProdClass){
                        this.glFolders.push(response.data.prodClassForm[i])
                    }
                }
            })
        },
        //通过点击菜单目录，显示相关联的所有产品信息
        getProdType(val) {
            getProdType(val).then(response => {
                let length = response.data.prodTypeForm.length
                for (let i = 0; i < length; i++) {
                    if (val === response.data.prodTypeForm[i].prodClass) {
                        this.prodListDtl.push(response.data.prodTypeForm[i])
                    }
                }
            })
        }
    },
    mounted: function() {
        this.getProdClassData()
        this.prodclass = 'GL100'
        this.getProdType(this.prodclass)
    }
  }
</script>

<style scoped>
  .top {
    padding-top: 8px;
  }
  .depositTree {
    height: calc(100vh - 48px);
  }
</style>

