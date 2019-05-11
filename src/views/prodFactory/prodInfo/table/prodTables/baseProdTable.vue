<template>
    <v-layout row wrap>
        <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg6>
            <v-layout row wrap>
                <v-flex md12 lg12 style="margin-right: -10%">
                    <dc-text-field :showEdit="showEdit" v-if="keyData.columnType == 'input'" :label="keyData.columnDesc"
                                   name="title" :labelDesc="keyData.columnDesc" v-model="tableData[keyData.key]" single-line hide-details>
                    </dc-text-field>
                    <dc-multiselect :showEdit="showEdit" v-if="keyData.columnType == 'select'" :disablePower="keyData.disable" :labelDesc="keyData.columnDesc" v-model="tableData[keyData.key]"
                                    :options="keyData.valueScore" class="dcMulti" :isMultiSelect=false></dc-multiselect>
                    <dc-switch :showEdit="showEdit" v-if="keyData.columnType == 'switch'" :labelDesc="keyData.columnDesc" v-model="tableData[keyData.key]"></dc-switch>
                    <dc-date :showEdit="showEdit" v-if="keyData.columnType == 'date'" :labelDesc="keyData.columnDesc" v-model="tableData[keyData.key]"></dc-date>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-layout row wrap v-if="tag != undefined">
            <v-flex md4 lg4>
                <v-subheader class="primary--text subheading" style="margin-left: 15%">首个分段ID:</v-subheader>
            </v-flex>
            <v-flex md2 lg2>
                <v-tooltip bottom color="orange">
                    <v-btn @click="showClick" slot="activator" color="blue" style="width: 120px; height: 30px; margin-top: 25%; margin-left: auto;margin-right: 0%">
                         {{tag}}
                    </v-btn>
                    <span>显示利率代码详情</span>
                </v-tooltip>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getAllDefines } from '@/api/url/prodInfo';
    import { getProdClassList } from '@/api/url/prodInfo';
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTextField from "@/components/widgets/DcTextField";
    import DcDate from '@/components/widgets/DcDate'
    import {getParamTable} from "@/api/url/prodInfo";

    import {
        getProdType
    } from '@/api/url/prodInfo'
    import {getAttrInfo} from '@/api/url/prodInfo'

    export default {
        components: {DcMultiselect, DcSwitch, DcTreeSelect,DcDate,DcTextField},
        props: {
            showEdit: {
                type: String,
                default: false
            },
            tableData: String,
            tag: String,
            keySet: String,
            disablePower: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            titleList: [],
            dataSource: {}
        }),
        watch: {
            tableData (val) {
                this.init(val)
            }
        },
        created() {
            console.log("ss")
        },
        mounted: function() {
            console.log("test")
        },
        methods: {
            init(val) {
                //主键集合 主键在展示时候置灰 不允许修改
                const keySet = this._props.keySet
                const columnInfos = getAttrInfo()
                let columnList = []
                for(let key in val){
                    //时间戳不在界面进行维护
                    if(key != "tranTime" && key != "tranTimestamp") {
                        //格式转换
                        let keys = key.replace(/([A-Z])/g, "_$1").toUpperCase();
                        let column = columnInfos[keys]
                        let disable = this.findInKey(key,keySet);
                        if (column != undefined && column != 'undefined') {
                            column["key"] = key
                            column["disable"] = disable
                            columnList.push(column)
                        }
                    }
                }
                this.dataSource = columnList
            },
            //主键匹配
            findInKey(key,keySet){
                for(let keys in keySet){
                    if(key === keys){
                        return true;
                    }
                }
                return false;
            },
            //点击显示利率代码详情
            showClick() {
                let tags = this.tag
                this.$emit('showClick')
            }
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }
</style>