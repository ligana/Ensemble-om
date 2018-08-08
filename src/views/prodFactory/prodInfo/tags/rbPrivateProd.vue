<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">个人存款产品</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>apps</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-tabs color="primary lighten-1" slot="extension" v-model="activeName" grow centered icons-and-text>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="n in prodInfo" :key="n">
                            {{ n.text}}
                            <v-icon>{{n.icon}}</v-icon>
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in 12" :key="i" :id="'mobile-tabs-5-' + i">
                        <v-card>
                            <v-card-text>
                                <event-form v-if="i==1" v-bind:listValue="listValue"></event-form>
                                <accounting-plain v-if="i==3"></accounting-plain>
                                <acct-form v-if="i!=1 && i!=3" v-bind:listValue="listValue"></acct-form>
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
                    <v-text-field flat solo full-width clearable prepend-icon="search" class="top" label="Search" v-model="searchValue"></v-text-field>
                </v-toolbar>
                <vue-perfect-scrollbar class="depositTree">
                    <v-list two-line subheader>
                        <!--<v-subheader inset>个人活期产品</v-subheader>-->
                        <v-list-tile class="chat-list prodList" avatar v-for="(item, index ) in folders" :key="item.title" @click="handleClick(item)">
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
                searchValue: '',
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
                prodInfo: [{
                    icon: 'account_balance',
                    text: '基本信息'
                }, {
                    icon: 'filter_vintage',
                    text: '账户信息'
                }, {
                    icon: 'work',
                    text: '产品对象'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '风险信息'
                }, {
                    icon: 'work',
                    text: '开户定义'
                }, {
                    icon: 'work',
                    text: '存入定义'
                }, {
                    icon: 'work',
                    text: '支取定义'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '核算信息'
                }, {
                    icon: 'work',
                    text: '销户定义'
                }, {
                    icon: 'work',
                    text: '结息定义'
                }],
                files: [{
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: '',
                    lable: ''
                }],
                folders: []
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
                        if (prodCode === response.data.prodTypeForm[i].prodClass) {
                            this.folders.push(response.data.prodTypeForm[i])
                        }
                    }
                })
            },
            getProdBySearchValue(val) {
                if (val) {
                    let j = 1
                    for (let i = 1; i < this.folders.length; i++) {
                        if (this.folders[i].value.indexOf(val) == -1 || this.folders[i].label.indexOf(val) == -1) {
                            //                            this.folders[j].add()
                            //                            this.folders[i].selected = false
                        }
                    }
                    //                    this.folders.push(this.folders)
                }
            }
        },
        watch: {
            searchValue(val, oldval) {
                if (val !== oldval) {
                    this.getProdBySearchValue(val)
                }
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

