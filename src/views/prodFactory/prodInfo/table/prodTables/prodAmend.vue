<template>
    <v-layout class="pt-1" v-show="prodAmendInfo.length">
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
    import {getChargeDefine} from '@/api/table';
    import toast from '@/utils/toast';
    import { getInitData } from "@/mock/init";
    import { getAttrType} from "@/api/url/prodInfo";
    import {removeByValue} from '@/utils/util'
    import {getParamTable} from "@/api/url/prodInfo";
    import BaseTable from "./baseProdTable"
    export default {
        components: {BaseTable},
        props: ["prodData"],
        data () {
            return {
                prodAmendInfo: [],
                titleList: [],
                selectInfo: {},
                keySet: {
                    prodType: "prodType"
                }
            };
        },
        watch: {
            prodData (val) {
                this.getProdAmendInfo(val);
                this.initTitle();
            }
        },
        methods: {
            //获取原始数据
            getProdAmendInfo(val) {
                let that = this
                //获取基本信息
                if(val!=undefined){
                    that.prodAmendInfo = val.rbProdAmendMaping
                }
            },
            initTitle() {
                //加载列表信息
                let that = this
                that.titleList = []
                //获取费用信息
                getParamTable("MB_PROD_TYPE").then(function (response) {
                    for(let index in that.prodAmendInfo){
                        let temp = {}
                        temp["key"] = that.prodAmendInfo[index].prodType
                        for(let key in response.data.data.columnInfo){
                            if(that.prodAmendInfo[index].prodType == response.data.data.columnInfo[key].PROD_TYPE){
                                temp["lable"] = response.data.data.columnInfo[key].PROD_DESC
                                break;
                            }
                        }
                        temp["class"] = ""
                        that.titleList.push(temp)
                    }
                });
                //初始化第一条参数
                if(that.prodAmendInfo.length) {
                    that.selectInfo = that.prodAmendInfo[0]
                }
            },
            chipClick(val){
                for(let i=0; i<this.titleList.length; i++){
                    this.titleList[i].class = ""
                }
                val.class = "select"
                let prodType = val.key
                this.selectInfo = {}
                for(let index in this.prodAmendInfo){
                    if(this.prodChargeInfo[index].prodType === prodType){
                        this.selectInfo = this.prodAmendInfo[index]
                        break
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 30px;
    }
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 70px;
    }
    .closeClass{
        color: white;
        margin-top: -2%;
    }
    .select{
        background-color:gainsboro!important;
    }
</style>