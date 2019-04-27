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
                                        <v-flex md11 ml-11 class="auto">
                                            <dc-treeview v-if="keyData.columnType == 'tree'" :disablePower="disablePower" v-model="prodDefines[keyData.key].attrValue" :options="keyData.valueScore" :labelDesc="keyData.columnDesc"></dc-treeview>
                                        </v-flex>
                                    </v-flex>
                                    <v-flex md12 lg12 v-else>
                                        <dc-text-field :showEdit="showEdit" v-if="keyData.columnType == 'input'"
                                                       class="primary&#45;&#45;text mx-1 dcText" :label="keyData.columnDesc"
                                                       name="title" :labelDesc="keyData.columnDesc" :isNumber="keyData.attrType" :disablePower="disablePower" v-model="prodDefines[keyData.key]" single-line
                                                       hide-details></dc-text-field>
                                        <dc-multiselect :showEdit="showEdit" v-if="keyData.columnType == 'select'" :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"
                                                        :options="keyData.valueScore" class="dcMulti" :isMultiSelect=keyData.isMultiSelect></dc-multiselect>
                                        <dc-switch :showEdit="showEdit" v-if="keyData.columnType == 'switch'" :disablePower="disablePower" :labelDesc="keyData.columnDesc"
                                                   v-model="prodDefines[keyData.key]"></dc-switch>
                                        <dc-date class="dcDate" :showEdit="showEdit" v-if="keyData.columnType == 'date'" :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="prodDefines[keyData.key]"></dc-date>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </draggable>
                        <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg6>
                            <v-layout row wrap>
                                <v-flex md12 lg12>
                                    <dc-part :disablePower="disablePower" :showEdit="showEdit" v-if="keyData.columnType == 'PART'" :data="keyData"></dc-part>
                                </v-flex>
                            </v-layout>
                        </v-flex>
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
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTextField from "@/components/widgets/DcTextField";
    import DcDate from '@/components/widgets/DcDate';
    import DcPart from "@/components/widgets/DcPartTable";
    import {saveColumn} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import draggable from 'vuedraggable'
    import DcTreeview from "@/components/widgets/DcTreeview";
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        components: {DcPart,DcMultiselect, DcSwitch, DcTreeSelect,DcDate,DcTextField,draggable,DcTreeview},
        props: {
            prodType: String,
            prodDefines: String,
            prodMapping: String,
            tags: String,
            prodTypeCode: String,
            attrColumnInfo: Object,
            showEdit: {
                type: String,
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
            prodClassOption: [],
            baseProdTypeOption: {
                columnCode: "PROD_TYPE",
                columnDesc: "PROD_DESC",
                tableName: "MB_PROD_TYPE"
            }
        }),
        watch: {
            prodDefines: {
                handler(newProdDefines,oldProdDefines) {
                    this.addAttr(newProdDefines,oldProdDefines);
                },
            },
            //指标组件内部属性进行深度监听
            dataSource: {
                handler(newData) {
                    for(let index in newData){
                        if(newData[index].columnType == "PART"){
                            this.dealPartReback(newData[index]);
                        }
                    }
                },
                immediate: true,
                deep: true
            }
        },
        mounted() {
            this.initRefData();
            this.init(this._props.prodDefines);
        },
        methods: {
            addAttr(newDef,oldDef) {
                let temp = [];
                for(const keyNew in newDef) {
                    let flag = true;
                    for (const keyOld in oldDef) {
                        if (keyNew === keyOld) {
                            flag = false;
                        }
                    }
                    if (flag && newDef[keyNew].assembleType == 'ATTR') {
                        const dataSource = this.copy(this._props.attrColumnInfo, {});
                        let column = dataSource[keyNew];
                        if (column != undefined && column != 'undefined' && this._props.tags == newDef[keyNew].pageCode) {
                            column['key'] = keyNew
                            column['pageSeqNo'] = newDef[keyNew].pageSeqNo
                            column['pageCode'] = newDef[keyNew].pageCode
                            this.dataSource.push(column)
                        }
                    }
                    if(flag && newDef[keyNew].assembleType == 'PART'){
                        temp.push(newDef[keyNew]);
                    }
                }
                //新增参数存在指标的时候  加载新增的指标控件
                if(temp.length){
                    this.init(newDef);
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
                            temp["value"] = prodClass[i].PROD_CLASS_DESC;
                            that.prodClassOption.push(temp)
                        }
                    }
                });
            },
            getdata (evt) {
                console.log(evt.draggedContext.element.id)
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
                    let key = dataSource[index].key;
                    this._props.attrColumnInfo[key].pageSeqNo = parseInt(index)+1;
                }
                this.saveColumn();
                //拖动后改变column数组
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
                    }
                    if(this._props.tags == prodData[index].pageCode && prodData[index].assembleType == 'ATTR') {
                        columnList.push(column)
                    }
                    //指标信息时候  进行分组处理
                    if(this._props.tags == prodData[index].pageCode && prodData[index].assembleType == 'PART'){
                        let temp = {};
                        let attr = index.split('-')[1];
                        let columnPart = dataSource[attr];
                        let findIn = false;
                        //组装已存在指标属性信息
                        for(let i in columnList){
                            if(columnList[i].partId != undefined && columnList[i].partId == prodData[index].assembleId){
                                columnPart['attrValue'] = prodData[index].attrValue;
                                columnPart['key'] = prodData[index].attrType;
                                columnList[i].children.push(columnPart);
                                findIn = true;
                            }
                        }
                        //组装未组装的租表信息
                        if(!findIn || !columnList.length){
                            columnPart['attrValue'] = prodData[index].attrValue;
                            columnPart['key'] = prodData[index].attrType;
                            temp["partId"] = prodData[index].assembleId;
                            temp["columnType"] = "PART";
                            temp["children"] = [];
                            temp["children"].push(columnPart);
                            columnList.push(temp);
                        }
                    }
                }
                this.dataSource = columnList

            },
            dealPartReback(val){
                //指标数据修改回调
                let partId = val.partId;
                let child = val.children;
                for (let newIndex in child) {
                    let assembleId = partId + '-' + child[newIndex].key;
                    for (let index in this._props.prodDefines) {
                        if(index == assembleId){
                            this._props.prodDefines[index].attrValue = child[newIndex].attrValue;
                        }
                    }
                }
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
    .auto {
        margin-left: auto;
        margin-right: auto;
    }
</style>