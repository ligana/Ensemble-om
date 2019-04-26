
<template>
    <div >
        <v-layout row wrap>
            <v-flex md9 lg9 class="border">
                <v-layout row wrap style="margin-bottom: -4%">
                    <v-icon class="iconClass">settings</v-icon>
                    <v-subheader class="descClass">{{partDesc}}部件</v-subheader>
                </v-layout>
                <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg12 style="margin-top: 0%">
                     <v-flex md12 lg12>
                         <dc-text-field v-if="keyData.columnType == 'input'"
                                        class="primary--text mx-1 dcText" :label="keyData.columnDesc"
                                        name="title" :labelDesc="keyData.columnDesc" :isNumber="keyData.attrType" :disablePower="disablePower" v-model="keyData.attrValue" single-line
                                        hide-details></dc-text-field>
                         <dc-multiselect v-if="keyData.columnType == 'select'" :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="keyData.attrValue"
                                         :options="keyData.valueScore" class="dcMulti" :isMultiSelect=keyData.isMultiSelect></dc-multiselect>
                         <dc-switch v-if="keyData.columnType == 'switch'" :disablePower="disablePower" :labelDesc="keyData.columnDesc"
                                    v-model="keyData.attrValue" style="margin-top: -4%"></dc-switch>
                         <dc-date class="dcDate" v-if="keyData.columnType == 'date'" :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="keyData.attrValue"></dc-date>
                     </v-flex>
                 </v-flex>
            </v-flex>
            <v-flex md2 lg2 style="margin-left: 0%; margin-top: 5%">
                <dc-navbar v-if="showEdit == true" v-model="optionPermissions"></dc-navbar>
                <i v-if="baseAttr=='BASE'" class="material-icons baseIcon small">
                    call_merge
                </i>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import DcMultiselect from '@/components/widgets/DcMultiselectPart'
    import DcSwitch from "@/components/widgets/DcSwitchPart";
    import DcTextField from "@/components/widgets/DcTextPart";
    import DcDate from '@/components/widgets/DcDatePart'
    import DcNavbar from './DcNavbar'
    import {getPartDesc} from "@/api/url/prodInfo";

    export default {
        components: {DcNavbar, DcMultiselect, DcSwitch,DcDate,DcTextField},
        props: {
            data: String,
            tags: String,
            prodTypeCode: String,
            attrColumnInfo: Object,
            baseAttr: {
                type: String,
                default: "SOLD"
            },
            showEdit: {
                type: String,
                default: false
            },
            disablePower: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                flag: true,
                partIcon: "expand_more",
                dataSource: {},
                optionPermissions: '',
                partId: '',
                partDesc: "",
                test: "",
            };
        },
        created() {
            //控件加载处理
            this.initPartInfo();

        },
//        mounted() {
//            this.initPartInfo();
//        },
        methods: {
            initPartInfo() {
                let that = this;
                //partDesc加载 待后台处理完整之后增加
                that.partDesc = getPartDesc(that._props.data.partId).partDesc;
                that.partId = that._props.data.partId;
                that.dataSource = that._props.data.children;
            },
            titleClick() {
                this.flag = this.flag==true?false:true;
                this.partIcon = this.partIcon == "expand_more"?"arrow_forward_ios":"expand_more";
            }
        }
    };
</script>
<style scoped>
    .dcMulti {
        margin-top: -1%;
    }
    .dcDate {
        margin-bottom: 10px;
    }
    .dcText {
        margin-bottom: 10px;
    }
    .cardClass1 {
        margin-left: 10%; margin-right: 5%; margin-top: 2%; width: 89%;
        border-right-style: solid;
        border-right-width: 1px;

    }
    .classTitleClass {
        height: 50px;
        /*background-color: #BBDEFB*/
    }
    .descClass {
        margin-left: 0%; margin-top: -5px;
        margin-bottom: -10%;
        color: #1565C0;
        padding: 16px;

    }
    .baseIcon {
        padding-top: 15px;
        /*color: #ff110e;*/
    }
    .border {
        border-right-style: dashed;border-right-width: 1px;border-right-color: #1565C0;
        border-left-style: dashed;border-left-width: 1px;border-left-color: #1565C0;
        border-bottom-style: dashed;border-bottom-width: 1px;border-bottom-color: #1565C0;
        border-top-style: dashed; border-top-width: 1px;border-top-color: #1565C0;
        margin-left: 8%;
        margin-top: 6%;
        /*margin-bottom: 50%;*/
    }
    .iconClass {
        margin-left: 2%;
        margin-top: 2%;
        color: #1565C0;
    }
</style>