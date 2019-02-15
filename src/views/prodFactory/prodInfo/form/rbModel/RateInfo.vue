<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-flex xs12 sm2 d-flex>
                <v-subheader class="primary--text subheading justify-start" style="padding: 0">是否使用固定利率*</v-subheader>
            </v-flex>
            <v-flex xs12 sm4>
                <dc-switch v-model="switchValue"></dc-switch>
            </v-flex>
        </v-toolbar>


        <v-card-text class="pa-0" v-if="switchFlag == 0">
            <a-table :customRow="customRow" :columns="columns" :dataSource="rateInfos" bordered>
            </a-table>
            <v-divider></v-divider>
        </v-card-text>
        <!--<v-card-text class="pa-0" v-if="switchFlag == 0">
            <div>
                <v-data-table
                :headers="headers"
                :items="projects"
                class="elevation-1"
                hide-actions
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.eventType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intClass | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intType | getColumnDesc}}</td>
                        <td class="text-xs-center" >{{ props.item.intTypeDesc | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intCalcBal | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.rateAmtId | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intAmtId | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.monthBasis | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.minRate}}</td>
                        <td class="text-xs-center">{{ props.item.maxRate}}</td>
                        <td class="text-xs-center">{{ props.item.intApplType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.rollFreq | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.rollDay}}</td>
                        <td class="text-xs-center">{{ props.item.intRateInd | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intDaysType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.taxType | getColumnDesc}}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
            </div>
        </v-card-text>-->

       <!-- <v-card-text class="pa-0" v-if="switchFlag == 1">
            <div>
                <v-data-table
                        :headers="headers2"
                        :items="projects"
                        class="elevation-1"
                        hide-actions
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.eventType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.fixedInt | getColumnDesc}}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
            </div>
        </v-card-text>-->
        <v-card-text class="pa-0" v-if="switchFlag == 1">
            <a-table :customRow="customRow" :columns="columns1" :dataSource="rateInfos" bordered>
            </a-table>
            <v-divider></v-divider>
        </v-card-text>



    </v-card>
</template>
<script>
    import DcSwitch from "@/components/widgets/DcSwitch";
    import {getRateInfo} from '@/api/table';
    import {getColumnDesc} from '@/utils/columnDesc'

    export default {
        components: { DcSwitch},
        filters: {
            getDescByKey: function (key) {
                return getColumnDesc(key)
            }
        },
        props: ["prodData"],
        data () {
            return {
                columns: [
                    {dataIndex: 'eventType', title: '事件类型',scopedSlots: { customRender: 'eventType' }},
                    {dataIndex: 'intClass', title: '利率分类'},
                    {dataIndex: 'intType', title: '利率代码'},
                    {dataIndex: 'intTypeDesc', title: '利率代码详细'},
                    {dataIndex: 'intCalcBal', title: '计息方式'},
                    {dataIndex: 'rateAmtId', title: '利率计算金额编码'},
                    {dataIndex: 'intAmtId', title: '利息计算金额编码'},
                    {dataIndex: 'monthBasis', title: '月基准'},
                    {dataIndex: 'minRate', title: '最小利率'},
                    {dataIndex: 'maxRate', title: '最大利率'},
                    {dataIndex: 'intApplType', title: '利率启用方式'},
                    {dataIndex: 'rollFreq', title: '利率变更周期'},
                    {dataIndex: 'rollDay', title: '下一利率变更日'},
                    {dataIndex: 'intRateInd', title: '靠档方式'},
                    {dataIndex: 'intDaysType', title: '靠档天数计算方式'},
                    {dataIndex: 'taxType', title: '税率类型'},
                ],
                columns1: [
                    {dataIndex: 'eventType', title: '事件类型',scopedSlots: { customRender: 'eventType' }},
                    {dataIndex: 'intType', title: '利率代码'},
                    {dataIndex: 'fixedInt', title: '固定利率值'},
            ],
                selected: [],
                switchFlag: 1,
                switchValue: "",
                headers: [
                    {text: '事件类型', value: 'eventType', align: 'center', width: 'xs1'},
                    {text: '利息分类', value: 'intClass', align: 'center', width: 'xs1'},
                    {text: '利率代码', value: 'intType', align: 'center', width: 'xs1'},
                    {text: '利率代码详细', value: 'intTypeDesc', align: 'center', width: 'xs1'},
                    {text: '计息方式', value: 'intCalcBal', align: 'center', width: 'xs1'},
                    {text: '利率计算金额编码', value: 'rateAmtId', align: 'center', width: 'xs1'},
                    {text: '利息计算金额编码', value: 'intAmtId', align: 'center', width: 'xs1'},
                    {text: '月基准', value: 'monthBasis', align: 'center', width: 'xs1'},
                    {text: '最小利率', value: 'minRate', align: 'center', width: 'xs1'},
                    {text: '最大利率', value: 'maxRate', align: 'center', width: 'xs1'},
                    {text: '利率启用方式', value: 'intApplType', align: 'center', width: 'xs1'},
                    {text: '利率变更周期', value: 'rollFreq', align: 'center', width: 'xs1'},
                    {text: '下一利率变更日', value: 'rollDay', align: 'center', width: 'xs1'},
                    {text: '靠档标志', value: 'intRateInd', align: 'center', width: 'xs1'},
                    {text: '靠档天数计算方式', value: 'intDaysType', align: 'center', width: 'xs1'},
                    {text: '税率类型', value: 'taxType', align: 'center', width: 'xs1'}
                ],
                headers2: [
                    {text: '事件类型', value: 'eventType', align: 'center', width: 'xs1'},
                    {text: '利率代码', value: 'intType', align: 'center', width: 'xs1'},
                    {text: '固定利率值', value: 'fixedInt', align: 'center', width: 'xs1'}
                ],
                rateInfos: [{
                    eventType: '',
                    intClass: '',
                    intType: '',
                    intTypeDesc: '',
                    intCalcBal: '',
                    rateAmtId: '',
                    intAmtId: '',
                    monthBasis: '',
                    minRate: '',
                    maxRate: '',
                    intApplType: '',
                    rollFreq: '',
                    rollDay: '',
                    intRateInd: '',
                    intDaysType: '',
                    taxType: ''
                }]
            };
        },
        watch: {
            prodData (val) {
                this.getChargeDefinesInfo(val)
            },
            switchValue(val){
                this.switchChange(val)
            }

        },
        mounted: function() {
            this.getChargeDefinesInfo(this._props.prodData)
        },
        methods: {
            getChargeDefinesInfo(val) {
                //初始化产品对应的信息
                this.rateInfos = val.irlProdInt
            },
            switchChange(val){
                console.log(val)
                if(val === "Y"){
                    this.switchFlag = 1
                }else{
                    this.switchFlag = 0
                }
            }
        }
    };
</script>
