<template>
    <v-layout row wrap>
        <v-flex md6 lg6>
            <dc-text-field labelDesc="产品代码" v-model="prodType.prodType"></dc-text-field>
        </v-flex>
        <v-flex md6 lg6>
            <dc-text-field labelDesc="产品简称" v-model="prodType.prodAbbr"></dc-text-field>
        </v-flex>
        <v-flex md6 lg6>
            <dc-text-field labelDesc="产品描述" v-model="prodType.prodDesc"></dc-text-field>
        </v-flex>
        <v-flex md6 lg6>
            <dc-text-field labelDesc="产品描述信息" v-model="prodType.prodRateDesc"></dc-text-field>
        </v-flex>
        <v-flex md6 lg6>
            <dc-multiselect :options="sourceModuleOption" :disablePower="disablePower" labelDesc="业务模块" :isMultiSelect="false" v-model="prodType.sourceModule" class="dcMulti"></dc-multiselect>
        </v-flex>
        <v-flex md6 lg6>
            <dc-multiselect :options="prodClassOption" :disablePower="disablePower" labelDesc="产品分类" :isMultiSelect="false" v-model="prodType.prodClass" class="dcMulti"></dc-multiselect>
        </v-flex>
        <v-flex md6 lg6>
            <dc-multiselect :options="prodRangeOption" :disablePower="baseProdRange" labelDesc="产品属性" :isMultiSelect="false" v-model="prodType.prodRange" class="dcMulti"></dc-multiselect>
        </v-flex>
        <v-flex md6 lg6>
            <dc-switch v-model="prodType.prodGroup" :disablePower="disablePower" labelDesc="组合产品"></dc-switch>
        </v-flex>
        <v-flex md6 lg6>
            <dc-multiselect :options="statusOption" :disablePower="disablePower" labelDesc="产品状态" :isMultiSelect="false" v-model="prodType.status" class="dcMulti"></dc-multiselect>
        </v-flex>
    </v-layout>
</template>
<script>
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTextField from "@/components/widgets/DcTextField";
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        components: {DcMultiselect,DcSwitch,DcTextField},
        props: {
            prodType: String,
            tags: String,
            showEdit: {
                type: String,
                default: false
            },
            disablePower: {
                type: Boolean,
                default: false
            },
            baseProdRange: Boolean,
        },
        data: () => ({

            prodRangeOption: [
                {
                    "key": "S",
                    "value": "可售产品"
                },
                {
                    "key": "B",
                    "value": "基础产品"
                }
            ],
            statusOption: [
                {
                    "key": "A",
                    "value": "启用"
                },
                {
                    "key": "C",
                    "value": "废弃"
                }
            ],
            sourceModuleOption: [],
            prodClassOption: [],
            baseProdTypeOption: []
        }),
        mounted() {
            this.initRefData();
        },
        methods: {
            initRefData() {
                let that = this
                getParamTable("MB_PROD_CLASS").then(function (response) {
                    let prodClass = response.data.data.columnInfo;
                    for(let i=0; i<prodClass.length; i++){
                        if(prodClass[i].PROD_CLASS_LEVEL == '2'){
                            let temp = {}
                            temp["key"] = prodClass[i].PROD_CLASS;
                            temp["value"] = prodClass[i].PROD_CLASS_DESC;
                            that.prodClassOption.push(temp)
                        }
                        if(prodClass[i].PROD_CLASS_LEVEL == '1'){
                            let temps = {}
                            temps["key"] = prodClass[i].PROD_CLASS;
                            temps["value"] = prodClass[i].PROD_CLASS_DESC;
                            that.sourceModuleOption.push(temps)
                        }
                    }
                });
                getParamTable("MB_PROD_TYPE").then(function (response) {
                    let prodType = response.data.data.columnInfo;
                    for(let i=0; i<prodType.length; i++){
                        if(prodType[i].PROD_RANGE == 'B'){
                            let temp = {}
                            temp["key"] = prodType[i].PROD_TYPE;
                            temp["value"] = prodType[i].PROD_DESC;
                            that.baseProdTypeOption.push(temp)
                        }
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }
</style>