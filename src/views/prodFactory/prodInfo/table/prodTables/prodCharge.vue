<template>
    <v-layout class="pt-1" v-show="prodChargeInfo.length">
        <v-flex md3 lg3 class="ml-3">
            <v-card>
                <v-list>
                    <v-list-tile v-for="item in titleList" :key="item.key" @click="chipClick(item)" :class="item.class">
                        <v-list-tile-content>
                            <v-list-tile-title style="font-size: medium">{{ item.key }}-{{ item.lable }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex md9 lg9>
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
            prodChargeInfo: [],
            irlFeeType: [],
            selectInfo: {},
            keySet: {
                prodType: "prodType",
                feeType: "feeType"
            }
        }),
        watch: {
            prodData (val) {
                this.getProdChargeInfo(val)
                this.initTitle()
            }
        },
        mounted: function() {
            console.log("test")
        },
        methods: {
            getProdChargeInfo(val) {
                let that = this
                //获取基本信息
                if(val!=undefined&&val.prodType!=undefined){
                    that.prodChargeInfo = val.rbProdCharge
                }
            },
            initTitle() {
                //加载列表信息
                let that = this
                that.titleList = []
                //获取费用信息
                getParamTable("IRL_FEE_TYPE").then(function (response) {
                    that.irlFeeType = response.data.data.columnInfo;
                    for(let index in that.prodChargeInfo){
                        let temp = {}
                        temp["key"] = that.prodChargeInfo[index].feeType
                        for(let key in response.data.data.columnInfo){
                            if(that.prodChargeInfo[index].feeType == response.data.data.columnInfo[key].FEE_TYPE){
                                temp["lable"] = response.data.data.columnInfo[key].FEE_DESC
                                break;
                            }
                        }
                        temp["class"] = ""
                        that.titleList.push(temp)
                    }
                });
                //初始化第一条参数
                if(that.prodChargeInfo.length) {
                    that.selectInfo = that.prodChargeInfo[0]
                }
            },
            chipClick(val){
                for(let i=0; i<this.titleList.length; i++){
                    this.titleList[i].class = ""
                }
                val.class = "select"
                let feeType = val.key
                this.selectInfo = {}
                for(let index in this.prodChargeInfo){
                    if(this.prodChargeInfo[index].feeType === feeType){
                        this.selectInfo = this.prodChargeInfo[index]
                        break
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .prodList {
        color: #00b0ff;
        margin-left: -10px;
    }
    .title {
        color: white;margin-left: auto;margin-right: auto;margin-top: 1px;margin-bottom: auto
    }
    .select{
        background-color:gainsboro!important;
    }
</style>