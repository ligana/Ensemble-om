<template>
    <v-card class="ml-2">
    <v-layout wrap>
        <v-flex xs12 sm6 m6>
            <dc-select :isMultiSelect="false" v-model="selectedProdInt.eventType" :options="eventOption" labelDesc="事件类型"></dc-select>
        </v-flex>
        <v-flex xs12 sm6 m6>
            <dc-select :isMultiSelect="false" v-model="selectedProdInt.intType" :options="intOption" labelDesc="利率代码"></dc-select>
        </v-flex>
        <v-flex xs12 sm6 m6>
            <dc-select :isMultiSelect="false" v-model="selectedProdMartix.periodFreq" :options="freqOption" labelDesc="周期"></dc-select>
        </v-flex>
        <v-flex xs12 sm6 m6>
            <dc-text labelDesc="固定利率" v-model="selectedProdBase.intBasisRate"></dc-text>
        </v-flex>
    </v-layout>
    </v-card>
</template>

<script>
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getAllDefines } from '@/api/url/prodInfo';
    import { getProdClassList } from '@/api/url/prodInfo';
    import DcSelect from '@/components/widgets/DcMultiselect'
    import DcText from "@/components/widgets/DcTextField";
    import {getParamTable} from "@/api/url/prodInfo";
    import {getProdType} from '@/api/url/prodInfo';
    import columnInfo from  '@/views/prodFactory/prodInfo/columnInfo';

    export default {
        components: {DcSelect,DcText},
        props: {
            fiexInfo: String,
            fixedIndex: String,
            prodDatas: String
        },
        data: () => ({
            fixedData: [],
            index: 0,
            selectedProdInt: {},
            selectedProdMartix: {},
            selectedProdBase: {},
            eventOption: {
                tableName: "MB_EVENT_DEFAULT_TYPE",
                columnCode: "EVENT_DEFAULT_TYPE",
                columnDesc: "EVENT_DEFAULT_DESC"
            },
            intOption: {
                tableName: "IRL_INT_TYPE",
                columnCode: "INT_TAX_TYPE",
                columnDesc: "INT_TAX_TYPE_DESC"
            },
            freqOption: {
                columnCode: "PERIOD_FREQ",
                columnDesc: "PERIOD_FREQ_DESC",
                tableName: "FM_PERIOD_FREQ"
            }
        }),
        watch: {
            fiexInfo (val) {
                this.fixedInfoChange(val)
            },
            fixedIndex (index) {
                this.indexChange(index)
            }
        },
        methods: {
            fixedInfoChange(val) {
                this.fixedData = val;
                this.index = this._props.fixedIndex;
                let indexs = this._props.fixedIndex;
                if(val!== undefined&&val.length>0){
                this.selectedProdInt = val[indexs][0];
                this.selectedProdMartix = val[indexs][1];
                this.selectedProdBase = val[indexs][2];
                }
            },
            indexChange(index){
                this.index = index
                this.selectedProdInt = {};
                this.selectedProdMartix = {};
                this.selectedProdBase = {};
                if(this.fixedData.length) {
                    this.selectedProdInt = this.fixedData[index][0];
                    this.selectedProdMartix = this.fixedData[index][1];
                    this.selectedProdBase = this.fixedData[index][2];
                }
            }
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }
</style>