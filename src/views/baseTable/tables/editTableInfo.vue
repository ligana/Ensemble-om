<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid" v-for="(keyData ,key ,index) in editSelected" v-bind:key="key">
                <dc-text-field
                        v-if="keyData.columnType=='input'"
                        v-model="keyData.value"
                        :counter="10"
                        :label="keyData.columnDesc"
                        :labelDesc="keyData.columnDesc"
                        required
                        class="mx-5"
                ></dc-text-field>
                <dc-text-field
                        v-if="keyData.columnType == 'select' && keyData.valueScore.tableName == tableName"
                        v-model="keyData.value"
                        :counter="10"
                        :label="keyData.columnDesc"
                        :labelDesc="keyData.columnDesc"
                        required
                        class="mx-5"
                ></dc-text-field>
                <dc-multiselect v-if="keyData.columnType == 'select' && keyData.valueScore.tableName != tableName" :labelDesc="keyData.columnDesc" v-model="keyData.value"
                                :options="keyData.valueScore" class="dcMulti" :isMultiSelect=keyData.isMultiSelect></dc-multiselect>
                <dc-switch v-if="keyData.columnType == 'switch'" :labelDesc="keyData.columnDesc"
                           v-model="keyData.value"></dc-switch>
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
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTextField from "@/components/widgets/DcTextField";
    import DcDate from '@/components/widgets/DcDate'
    export default {
        components: {DcMultiselect, DcSwitch, DcTreeSelect,DcDate,DcTextField},
        props: {
            selected: Object,
            columns: Object,
            tableName: String
        },
        data() {
            return {
                editSelected: {},
                tableName: ""
            }
        },
        watch: {
            selected: {
                handler(selected) {
                    this.selectedAction();
                }
            }
        },
        mounted: function() {
            this.selectedAction()

        },
        methods: {
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