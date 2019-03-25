<template>
    <v-layout class="pt-1" v-show="prodAccounting.length">
        <v-flex md3 lg3 class="ml-3">
            <v-card class="pt-1 elevation-1 sort">
                <v-list>
                    <v-list-tile v-for="item in titleList" :key="item.key" @click="chipClick(item)">
                        <v-list-tile-content>
                            <v-list-tile-title style="font-size: medium">{{ item.key }}-{{ item.lable }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>

            <v-card class="mt-1">
                <v-list>
                    <v-list-tile v-for="item in titleListCheck" :key="item.key" @click="chipClickCheck(key)">
                        <v-list-tile-content>
                            <v-list-tile-title style="font-size: medium">{{item.desc}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
<<<<<<< HEAD
        <v-flex md9 lg9 class="sort_rightAll">
=======
        <v-flex md9 lg9 v-show="fixed == false">
>>>>>>> master
            <base-table :tableData="selectInfo" :keySet="keySet"></base-table>
        </v-flex>
        <v-flex md9 lg9 v-show="fixed == true" class="ml-2">
            <a-table :columns="columnsFixed" :dataSource="accountingFixed" bordered>
            </a-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getAllDefines } from '@/api/url/prodInfo';
    import { getProdClassList } from '@/api/url/prodInfo';
    import DcTextField from "@/components/widgets/DcTextField";
    import {getParamTable} from "@/api/url/prodInfo";
    import BaseTable from "./baseProdTable"
    import {
        getProdType
    } from '@/api/url/prodInfo'
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    export default {
        components: {DcTextField,BaseTable,DcMultiselect},
        props: {
            prodData: String,
            disablePower: {
                type: Boolean,
                default: true
            }
        },
        data: () => ({
            titleList: [],
            fixed: false,
            titleListCheck: [
                {
                    key: "checkSub",
                    desc: "需要进行总分核对的科目"
                }
            ],
            prodAccounting: [],
            mbAccountingStatus: [],
            selectInfo: {},
            keySet: {
                prodType: "prodType",
                accountingStatus: "accountingStatus"
            },
            columnsFixed: [
                {dataIndex: 'status', title: '核算状态'},
                {dataIndex: 'amtType', title: '金额类型'},
                {dataIndex: 'glCodeCol', title: '科目映射'},
            ],
            accountingFixed: [],
            eventOption: {
                tableName: "MB_PROD_TYPE",
                columnCode: "PROD_TYPE",
                columnDesc: "PROD_DESC"
            },
            statusOption: {
                columnCode: "ACCOUNTING_STATUS",
                columnDesc: "ACCOUNTING_STATUS_DESC",
                tableName: "MB_ACCOUNTING_STATUS"
            },
            profitOption: {
                columnCode: "PROFIT_CENTRE",
                columnDesc: "PROFIT_CENTRE_DESC",
                tableName: "FM_PROFIT_CENTRE"
            },
            glCodeLOption: {
                columnCode: "SUBJECT_CODE",
                columnDesc: "SUBJECT_DESC",
                tableName: "AC_SUBJECT"
            }
        }),
        watch: {
            prodData (val) {
                this.getProdAccounting(val)
                this.initTitle()
            }
        },
        mounted: function() {
            console.log("test")
        },
        methods: {
            getProdAccounting(val) {
                let that = this
                //获取基本信息
                if(val!=undefined&&val.prodType!=undefined){
                    that.prodAccounting = val.glProdAccounting
                }
                this.accountingFixed = val.glProdCodeMappings
            },
            initTitle() {
                //加载列表信息
                let that = this
                that.titleList = []
                //获取费用信息
                getParamTable("MB_ACCOUNTING_STATUS").then(function (response) {
                    that.mbAccountingStatus = response.data.data.columnInfo;
                    for(let index in that.prodAccounting){
                        let temp = {}
                        temp["key"] = that.prodAccounting[index].accountingStatus
                        if(that.prodAccounting[index].accountingStatus === "ALL"){
                            temp["lable"] = "全部"
                        }else {
                            for (let key in response.data.data.columnInfo) {
                                if (that.prodAccounting[index].accountingStatus == response.data.data.columnInfo[key].ACCOUNTING_STATUS) {
                                    temp["lable"] = response.data.data.columnInfo[key].ACCOUNTING_STATUS_DESC
                                    break;
                                }
                            }
                        }
                        that.titleList.push(temp)
                    }
                });
                //初始化第一条参数
                if(that.prodAccounting.length) {
                    that.selectInfo = that.prodAccounting[0]
                }
            },
            chipClick(val){
                this.fixed = false
                let feeType = val.key
                this.selectInfo = {}
                for(let index in this.prodAccounting){
                    if(this.prodAccounting[index].accountingStatus === feeType){
                        this.selectInfo = this.prodAccounting[index]
                        break
                    }
                }
            },
            chipClickCheck(val){
                this.fixed = true
                this.selectInfo = {}
            }
        }
    }
</script>
<style scoped>
<<<<<<< HEAD
    .sort .v-list > div{
        border: 1px solid #DCE1E7;
    }
    .sort_rightAll {
        margin:12px 6px;
        border: 1px solid #DCE1E7;
        padding-bottom: 10px;
    }

=======
    .prodList {
        color: #00b0ff;
        margin-left: -10px;
    }
    .title {
        color: white;margin-left: auto;margin-right: auto;margin-top: 1px;margin-bottom: auto
    }
    .dcMulti {
        margin-top: 10px;
    }
>>>>>>> master
</style>