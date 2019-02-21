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
        </v-flex>
        <v-flex md9 lg9 class="sort_rightAll">
            <base-table :tableData="selectInfo" :keySet="keySet"></base-table>
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
    export default {
        components: {DcTextField,BaseTable},
        props: ["prodData"],
        data: () => ({
            titleList: [],
            prodAccounting: [],
            mbAccountingStatus: [],
            selectInfo: {},
            keySet: {
                prodType: "prodType",
                accountingStatus: "accountingStatus"
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
            }
        }
    }
</script>
<style scoped>
    .sort .v-list > div{
        border: 1px solid #DCE1E7;
    }
    .sort_rightAll {
        margin:12px 6px;
        border: 1px solid #DCE1E7;
        padding-bottom: 10px;
    }

</style>