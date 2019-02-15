<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid" v-for="(keyData ,key ,index) in editSelected" v-bind:key="key">
                <v-layout row wrap>
                    <v-flex md12 lg12>
                        <dc-dan-text-field
                                v-if="keyData.columnType=='input'"
                                v-model="keyData.value"
                                :counter="10"
                                :isKey="keyData.key"
                                :childPd="childPd"
                                :isNotNull="keyData.isNull"
                                :label="keyData.columnDesc"
                                :labelDesc="keyData.columnDesc"
                                required
                                v-on:changeNum="changeNumChild"
                        ></dc-dan-text-field>
                        <dc-dan-text-field
                                v-if="keyData.columnType == 'select' && keyData.valueScore.tableName == tableName"
                                v-model="keyData.value"
                                :counter="10"
                                :isKey="keyData.key"
                                :childPd="childPd"
                                :isNotNull="keyData.isNull"
                                :label="keyData.columnDesc"
                                :labelDesc="keyData.columnDesc"
                                required
                                v-on:changeNum="changeNumChild"
                        ></dc-dan-text-field>
                        <dc-dan-multiselect
                                v-if="keyData.columnType == 'select' && keyData.valueScore.tableName != tableName"
                                v-on:changeNum="changeNumChild"
                                :isKey="keyData.key"
                                :childPd="childPd"
                                :isNotNull="keyData.isNull"
                                :labelDesc="keyData.columnDesc"
                                v-model="keyData.value"
                                :options="keyData.valueScore"
                                class="dcMulti"
                                :isMultiSelect=keyData.isMultiSelect
                        ></dc-dan-multiselect>
                        <dc-switch v-if="keyData.columnType == 'switch'" :labelDesc="keyData.columnDesc"
                                   v-model="keyData.value"></dc-switch>
                    </v-flex>
                </v-layout>
            </v-form>
            <v-spacer></v-spacer>
            <v-flex mx-5>
                <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="submit"
                >
                    确认
                </v-btn>
                <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="close"
                >
                    取消
                </v-btn>
            </v-flex>
        </v-card-text>
    </v-card>
</template>
<script>
    import columnInfo from '@/views/prodFactory/prodInfo/columnInfo'
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import DcDanMultiselect from '@/components/widgets/DcDanMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcDanTextField from "@/components/widgets/DcDanTextField";
    import DcDate from '@/components/widgets/DcDate'
    export default {
        components: {DcDanMultiselect, DcSwitch, DcTreeSelect,DcDate,DcDanTextField},
        props: {
            childPd: String,
            selected: Object,
            columns: Object,
            tableName: String
        },
        data() {
            return {
                num: "",
                inputIsNull: false,
                inputNotNull: false,
                editSelected: {},
                tableName: ""
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
            changeNumChild(num) {
                this.num = num
            },
            changeNumFather(){
                this.$emit('changeNum',this.num,this.editSelected)
            },
            selectedAction() {
                const selected=this._props.selected;
                const columns=this._props.columns;
                this.tableName = this._props.tableName;
                let locSelected={}
                if(columns!= undefined){
                    for(const index in columns){
                        const key=columns[index].dataIndex
                        let value=selected[key]
                        if(value==undefined){
                            value=''
                        }
                        const dataSource = columnInfo;
                        let column = dataSource[key];
                        if (column != undefined && column != 'undefined'){
                            column['value']=value
                            column['key']=columns[index].key
                            column['isNull']=columns[index].isNull
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
            }
        }
    }
</script>
<style scoped>
.green--text.text--darken-1 {
   border: 1px solid;
}
</style>