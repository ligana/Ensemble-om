<template>
    <div>
        <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text style="margin-top: -2%">
                <v-form v-model="valid" v-for="(keyData ,key ,index) in editSelected" v-bind:key="key">
                    <v-layout row wrap>
                        <v-flex md12 lg12>
                            <dc-text-field-table
                                    v-if="keyData.columnType=='input'"
                                    v-model="keyData.value"
                                    :counter="10"
                                    :isKey="keyData.key"
                                    :lengths="keyData.lengths"
                                    :dataIndex="keyData.dataIndex"
                                    :childPd="childPd"
                                    :isNotNull="keyData.isNull"
                                    :label="keyData.columnDesc"
                                    :labelDesc="keyData.columnDesc"
                                    required
                                    v-on:changeNum="changeNumChild"
                            ></dc-text-field-table>
                            <dc-text-field-table
                                    v-if="keyData.columnType == 'select' && keyData.valueScore.tableName == tableName"
                                    v-model="keyData.value"
                                    :counter="10"
                                    :isKey="keyData.key"
                                    :lengths="keyData.lengths"
                                    :dataIndex="keyData.dataIndex"
                                    :childPd="childPd"
                                    :isNotNull="keyData.isNull"
                                    :label="keyData.columnDesc"
                                    :labelDesc="keyData.columnDesc"
                                    required
                                    v-on:changeNum="changeNumChild"
                            ></dc-text-field-table>
                            <dc-multiselect-table
                                    v-if="keyData.columnType == 'select' && keyData.valueScore.tableName != tableName"
                                    v-on:changeNum="changeNumChild"
                                    :isKey="keyData.key"
                                    :childPd="childPd"
                                    :isNotNull="keyData.isNull"
                                    :labelDesc="keyData.columnDesc"
                                    v-model="keyData.value"
                                    :options="keyData.valueScore"
                                    class="dcMulti"
                                    :isMultiSelect=false
                            ></dc-multiselect-table>
                            <dc-switch v-if="keyData.columnType == 'switch'" :labelDesc="keyData.columnDesc"
                                       v-model="keyData.value"></dc-switch>
                            <dc-date class="dcDate" :showEdit="showEdit" v-if="keyData.columnType == 'date'"
                                     :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="keyData.value"></dc-date>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="info" @click="submit" class="bthStyle" style="margin-left: 6%">保存</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="close" class="bthStyle" style="margin-right: 6%">取消</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import DcMultiselectTable from '@/components/widgets/DcMultiselectTable'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTextFieldTable from "@/components/widgets/DcTextFieldTable";
    import DcDate from '@/components/widgets/DcDate'
    import {getAttrInfo} from '@/api/url/prodInfo'
    export default {
        components: {DcMultiselectTable, DcSwitch, DcTreeSelect,DcDate,DcTextFieldTable},
        props: {
            childPd: String,
            selected: Object,
            columns: Object,
            tableName: String,
        },
        data() {
            return {
                num: "",
                inputIsNull: false,
                inputNotNull: false,
                editSelected: {},
                tableName: "",
                attr: {},
                dataType: [],
            }
        },
        computed: {
            formTitle () {
                return Object.keys(this.selected).length === 0 ? '新增'+this.tableName+'信息' : '修改'+this.tableName+'信息'
            }
        },
        watch: {
            selected: {
                handler(selected) {
                    this.selectedAction();
                }
            },
            num: {
                handler(newData) {
                    this.changeNumFather()
                }
            }
        },
        mounted: function() {
            this.selectedAction()
        },
        methods: {
            changeNumChild(num, numberToLang, dateFalse, labelDesc) {
                let text = {}
                text['desc'] = labelDesc
                text['numberToLang'] = numberToLang
                text['dateFalse'] = dateFalse
                if(this.dataType.length == 0){
                    this.dataType.push(text)
                }else{
                    let n = 0
                    for(let i=0; i<this.dataType.length; i++){
                        if(labelDesc == this.dataType[i].desc){
                            this.dataType[i].numberToLang = numberToLang
                            this.dataType[i].dateFalse = dateFalse
                        }else{
                            n++
                        }
                    }
                    if(n == this.dataType.length){
                        this.dataType.push(text)
                    }
                }
                this.num = num
            },
            changeNumFather(){
                this.$emit('changeNum',this.num,this.editSelected,this.dataType)
            },
            selectedAction() {
                this.attr = getAttrInfo()
                const selected=this._props.selected;
                const columns=this._props.columns;
                this.tableName = this._props.tableName;
                let locSelected={}
                if(columns!= undefined){
                    for(const index in columns){
                        const key=columns[index].code
                        let value=selected[key]
                        if(value==undefined){
                            value=''
                        }
                        let column = this.getAttr(key);
                        if (column != undefined && column != 'undefined'){
                            column['value']=value
                            column['key']=columns[index].key
                            column['isNull']=columns[index].isNull
                            column['lengths']=columns[index].lengths
                            column['dataIndex']=columns[index].dataIndex
                            locSelected[key]=column;
                        }
                    }
                    this.editSelected=locSelected;
                }
            },
            submit() {
                this.$emit("editAction",'submit',this.editSelected)
            },
            close() {
                this.$emit("editAction",'close')
            },
            getAttr(key){
                for(let n in this.attr){
                    if(n == key){
                        return this.attr[key]
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .bthStyle {
        color: #00b0ff;
        width: 120px;
    }
</style>