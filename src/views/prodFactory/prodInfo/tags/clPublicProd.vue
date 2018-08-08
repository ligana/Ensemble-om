<template>
  <div class="app-container">
    <v-layout row wrap>
      <v-flex lg9 sm9 class="v-card">
        <v-toolbar color="indigo lighten-1" dark tabs>
          <v-tabs
                  color="indigo lighten-1"
                  slot="extension"
                  v-model="activeName"
                  grow
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="n in prodInfo" :key="n">
              {{n}}
            </v-tab>
          </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="activeName" class="white elevation-1">
          <v-tab-item
                  v-for="i in 3"
                  :key="i"
                  :id="'mobile-tabs-5-' + i"
          >
            <v-card>
              <v-card-text>
                <event-form v-if="i==1" v-bind:listValue="listValue"></event-form>
                <accounting-plain v-if="i==3"></accounting-plain>
                <acct-form v-if="i==2" v-bind:listValue="listValue"></acct-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>

      <v-flex lg3 sm3 class="v-card">
        <v-card>
          <v-card-text>
            <down-action></down-action>
          </v-card-text>
        </v-card>
        <v-toolbar dense class="chat-history-toolbar prodLists">
          <v-text-field flat solo full-width clearable prepend-icon="search" class="top" label="Search"></v-text-field>
        </v-toolbar>
        <vue-perfect-scrollbar class="depositTree">
          <v-list two-line subheader>
            <v-list-tile class="chat-list prodList" avatar v-for="(item, index) in folders" :key="item.title" @click="handleClick(item)">
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
    </v-layout>
  </div>
</template>

<script>
    // import queryheader from './components/queryheader'
    import {
        getProdType
    } from '@/api/prod'
    import EventForm from '../form/EventFormPord';
    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import accountingPlain from '../table/accountingPlain'
    import AcctForm from '../form/AcctFormPord';
    import downAction from '../btn/downAction'
    export default {
        name: 'deposit',
        components: {
            accountingPlain,
            EventForm,
            VWidget,
            AcctForm,
            VuePerfectScrollbar,
            downAction
        },
        data() {
            return {
                listLoading: true,
                depositProd: {
                    prodcode: '',
                    version: ''
                },
                listValue: '',
                prodCode: '',
                activeName: 'basic',
                eventForm: {
                    ccy: []
                },
                acctForm: {},
                prodInfo: ['基本信息','账户信息','核算信息'],
                files: [
                    { icon: 'assignment', iconClass: 'blue white--text', value: '', lable: '' }
                ],
                folders: [
                 ]
            }
        },
        created() {
            this.depositProd = { prodcode: this.$route.params.prodType, version: '1.0' }
        },
        methods: {
            submitForm() {
            },
            draftForm() {
            },
            queryProdInfo() {
                console.log('start query prod info')

            },
            selectByProd() {
                // this.$bus.$emit('prodType', this.depositProd.prodtype)
                // console.log(this.depositProd.prodtype)
            },
            handleClick(value) {
                console.log(value)
                var listValue = value.value
                this.listValue = listValue
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
            queryDespositProdData(prodCode) {
                getProdType().then(response => {
                    let length = response.data.prodTypeForm.length
                    for (let i = 0; i < length; i++) {
                    if (prodCode === response.data.prodTypeForm[i].prodClass){
//                        response.data.rbProdTypeForm[i].selected = false
                        this.folders.push(response.data.prodTypeForm[i])
                    }
                }
            })
            }
        },
        mounted: function() {
            window.getApp.$emit('APP_DRAWER_TOGGLED');
            this.prodCode = this.$route.hash
            this.queryDespositProdData(this.prodCode)

        }
    }
</script>

<style scoped>
  .top {
    padding-top: 8px;
  }
  .depositTree {
    height: calc(90vh - 48px);
  }
  /*  .prodList {
      border-top-style: solid;border-top-width: 1px;border-color: rgba(40, 24, 31, 0.21);
    }
    .prodLists {
      border-bottom-style: solid;border-bottom-width: 3px;border-color: rgba(183, 172, 177, 0.6);
    }*/
</style>

