<template>
    <v-container fluid pr-5 pt-0>
        <v-flex xs12 md12 lg12>
            <div slot="widget-content">
                <v-container fluid pt-1>
                    <v-layout row wrap>
                        <draggable v-model="dataSource" :move="getdata" @update="datadragEnd" class="layout row wrap">
                            <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg6>
                                <v-layout row wrap>
                                    <v-flex md8 lg4 v-if="keyData.columnType == 'tree'">
                                    </v-flex>
                                    <v-flex md12 lg12 v-if="keyData.columnType == 'tree'">
                                        <dc-treeview v-if="keyData.columnType == 'tree'" v-model="prodDefines[keyData.key].attrValue" :disablePower="disablePower" :options="keyData.valueScore"></dc-treeview>
                                    </v-flex>
                                    <v-flex md12 lg12 v-else>
                                        <dc-text-field :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'input'"
                                                       class="primary&#45;&#45;text mx-1 dcText" :label="keyData.columnDesc"
                                                       name="title" :labelDesc="keyData.columnDesc" :disablePower="disablePower" v-model="prodDefines[keyData.key]" single-line
                                                       hide-details></dc-text-field>
                                        <dc-multiselect :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'select'" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"
                                                        :options="keyData.valueScore" class="dcMulti" :disablePower="disablePower" :isMultiSelect=keyData.isMultiSelect></dc-multiselect>
                                        <dc-switch :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'switch'" :disablePower="disablePower" :labelDesc="keyData.columnDesc"
                                                   v-model="prodDefines[keyData.key]"></dc-switch>
                                        <dc-date class="dcDate" :baseAttr="prodDefines[keyData.key].group" v-if="keyData.columnType == 'date'" :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"></dc-date>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </draggable>
                    </v-layout>
                    <v-layout row wrap v-if="prodMapping!= undefined ">
                        <v-flex md6 lg6>
                            <dc-multiselect :isMultiSelect="false" v-model="prodMapping.irlProdType" :options="baseProdTypeOption" labelDesc="定价工厂映射产品" :disablePower="true"></dc-multiselect>
                        </v-flex>
                        <v-flex md6 lg6>
                            <dc-multiselect :isMultiSelect="false" v-model="prodMapping.glProdMappingType" :options="baseProdTypeOption" labelDesc="核算映射产品" :disablePower="true"></dc-multiselect>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
    </v-container>
</template>
<script>
    import columnInfo from '../columnInfo'
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTreeview from "@/components/widgets/DcTreeview";

    import DcTextField from "@/components/widgets/DcTextField";
    import DcDate from '@/components/widgets/DcDate'
    import {saveColumn} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import draggable from 'vuedraggable'
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        components: {columnInfo, DcMultiselect, DcSwitch, DcTreeSelect,DcDate,DcTextField,draggable,DcTreeview},
        props: {
            prodType: String,
            prodDefines: Object,
            tags: String,
            prodTypeCode: String,
            prodMapping: Object,
            attrColumnInfo: Object,
            baseAttr: {
                type: Boolean,
                default: false
            },
            disablePower: {
                type: Boolean,
                default: true
            }
        },
        data: () => ({
            dataSource: {},
            valueData: [],
            sourceModuleOption: [
                {
                    "key": "RB",
                    "value": "存款类"
                },
                {
                    "key": "CL",
                    "value": "贷款类"
                },
                {
                    "key": "GL",
                    "value": "内部账类"
                },
                {
                    "key": "MM",
                    "value": "货币市场类"
                }
            ],
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
            baseProdTypeOption: {
                columnCode: "PROD_TYPE",
                columnDesc: "PROD_DESC",
                tableName: "MB_PROD_TYPE"
            },
            prodClassOption: []
        }),
        watch: {
            prodDefines: {
                handler(newProdDefines,oldProdDefines) {
                    this.addAttr(newProdDefines,oldProdDefines);
                },
            },
        },
        mounted() {
            this.initRefData();
            this.init(this._props.prodDefines);
        },
        methods: {
            addAttr(newDef,oldDef) {
                for(const keyNew in newDef) {
                    let flag = true;
                    for (const keyOld in oldDef) {
                        if (keyNew === keyOld) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        const dataSource = this.copy(this._props.attrColumnInfo, {});
                        let column = dataSource[keyNew];
                        if (column != undefined && column != 'undefined' && this._props.tags == newDef[keyNew].pageCode) {
                            column['key'] = keyNew
                            column['pageSeqNo'] = newDef[keyNew].pageSeqNo
                            column['pageCode'] = newDef[keyNew].pageCode
                            this.dataSource.push(column)
                        }
                    }
                }
            },
            initRefData() {
                let that = this
                getParamTable("MB_PROD_CLASS").then(function (response) {
                    let prodClass = response.data.data.columnInfo;
                    for(let i=0; i<prodClass.length; i++){
                        if(prodClass[i].PROD_CLASS_LEVEL == '2'){
                            let temp = {}
                            temp["key"] = prodClass[i].PROD_CLASS;
                            temp["value"] =prodClass[i].PROD_CLASS_DESC;
                            that.prodClassOption.push(temp)
                        }
                    }
                });
            },
            getdata (evt) {
                const oldKey=evt.draggedContext.element.key;
                const newKey=evt.relatedContext.element.key;
                if(this.prodDefines[oldKey].group=='BASE'||this.prodDefines[newKey].group=='BASE'){
                    return false;
                }
            },
            saveColumn (){
                saveColumn({column: this.dataSource,prodType: this._props.prodTypeCode,tags: this._props.tags}).then(response => {
                    if(response.status === 200) {
                        toast.success("顺序编辑完成！");
                    }
                });
            },
            datadragEnd (evt) {
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                const oldIndex=evt.oldIndex;
                const newIndex=evt.newIndex;
                let dataSourceEnd=[]
                let dataSource=this.dataSource
                for(const index in dataSource){
                    dataSource[index].pageSeqNo=parseInt(index)+1;
                }
                this.saveColumn();
                //拖动后改变column数组
                console.log(this.tags)
            },
            //对象浅复制
            copy(obj1,obj2) {
                let obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
            init(prodData) {
                let columnList=[]
                //通过后台的产品有关信息查数据字典
                for(const index in prodData) {
                    const dataSource = this.copy(this._props.attrColumnInfo,{});
                    let column = dataSource[index];
                    if (column != undefined && column != 'undefined' && this._props.tags == prodData[index].pageCode) {
                        column['key'] = index
                        column['pageSeqNo'] = prodData[index].pageSeqNo
                        column['pageCode'] = prodData[index].pageCode
                        columnList.push(column)
                    }
                }
                this.dataSource = columnList

            }
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }
    .dcDate {
        margin-bottom: 10px;
    }
    .dcText {
        margin-bottom: 10px;
    }
</style>