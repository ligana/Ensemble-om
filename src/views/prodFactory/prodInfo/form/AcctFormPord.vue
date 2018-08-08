<template>
    <v-container fluid grid-list-md>
        <v-card ref="form">
            <v-card-text>
                <!-- <v-form v-model="valid" ref="form" lazy-validation> -->
                <v-layout row wrap>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading float: right" >账户属性 *</span>
                        <v-select :items="acctAttrs" v-model="attrData" label="账户属性" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">账户类别 *</span>
                        <v-select :items="acctClasses" v-model="classData" label="账户类别" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-4 pt-4">多币种 *</span>
                        <v-select  class="primary--text mx-1" :items="muticcyflag" v-model="muticcyflagData" label="是否多币种" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">产品币种*</span>
                        <v-select class="primary--text mx-1" :items="ccytype" v-model="ccytypeData" label="币种" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">金额类型 *</span>
                        <v-select :items="amttype" v-model="amttypeData" label="金额类型" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">余额类型 *</span>
                        <v-select :items="baltype" v-model="baltypeData" label="余额类型" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                </v-layout>
                <!-- <v-layout row wrap>
                                <v-flex xs6 class="field-single-line">
                                    <span class="primary--text mx-3 pt-4 subheading">折算币种 *</span>
                                    <v-select :items="reducedccy" v-model="reducedccyData" label="折算币种" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                                </v-flex>
                            </v-layout> -->
                <v-layout row wrap>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">账户用途 *</span>
                        <v-select :items="acctusefor" v-model="acctuseforData" label="账户用途" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">介质类型 *</span>
                        <v-select :items="mediumtype" v-model="mediumtypeData" label="介质类型" item-text="prodDesc" item-value="prodCode" single-line></v-select>
                    </v-flex>
                </v-layout>
                <!-- </v-form> -->
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import {
        getInitData
    } from '@/api/prod'
    import {
        getProdData
    } from '@/api/prod'
    export default {
        props: ['listValue'],
        data: () => ({
            listValue: '',
            title: null,
            valid: true,
            date: null,
            startDateMenu: false,
            startDate: null,
            startTimeMenu: false,
            startTime: null,
            endDateMenu: false,
            endDate: null,
            endTimeMenu: false,
            endTime: null,
            modal: false,
            attrData: '',
            classData: '',
            muticcyflagData: '',
            ccytypeData: '',
            amttypeData: '',
            baltypeData: '',
            reducedccyData: '',
            acctuseforData: '',
            mediumtypeData: '',
            acctAttrs: [{
                prodCode: '',
                prodDesc: ''
            }],
            acctClasses: [{
                prodCode: '',
                prodDesc: ''
            }],
            muticcyflag: [{
                prodCode: '',
                prodDesc: ''
            }],
            ccytype: [{
                prodCode: '',
                prodDesc: ''
            }],
            amttype: [{
                prodCode: '',
                prodDesc: ''
            }],
            baltype: [{
                prodCode: '',
                prodDesc: ''
            }],
            reducedccy: [{
                prodCode: '',
                prodDesc: ''
            }],
            acctusefor: [{
                prodCode: '',
                prodDesc: ''
            }],
            mediumtype: [{
                prodCode: '',
                prodDesc: ''
            }]
        }),
        mounted() {
            this.initRefDate()
        },
        watch: {
            listValue(val, oldval) {
                if (val !== oldval) {
                    this.selectByProd()
                }
            }
        },
        methods: {
            selectByProd() {
                getProdData(this.listValue).then(response => {
                    this.attrData = response.data.acctFrom.attr
                    this.classData = response.data.acctFrom.class
                    this.muticcyflagData = response.data.acctFrom.muticcyflag
                    this.ccytypeData = response.data.acctFrom.ccytype
                    this.amttypeData = response.data.acctFrom.amttype
                    this.baltypeData = response.data.acctFrom.baltype
                    this.reducedccyData = response.data.acctFrom.reducedccy
                    this.acctuseforData = response.data.acctFrom.acctusefor
                    this.mediumtypeData = response.data.acctFrom.mediumtype
                })
            },
            closeDialog() {
                this.$parent.isActive = false;
            },
            initRefDate() {
                getInitData().then(response => {
                    console.log(response)
                    this.acctAttrs = response.data.paraDataRf.acctAttrs
                    this.acctClasses = response.data.paraDataVl.acctClasses
                    this.muticcyflag = response.data.paraDataVl.muticcyflag
                    this.ccytype = response.data.paraDataRf.ccytype
                    this.amttype = response.data.paraDataVl.amttype
                    this.baltype = response.data.paraDataVl.baltype
                    this.reducedccy = response.data.paraDataRf.reducedccy
                    this.acctusefor = response.data.paraDataRf.acctusefor
                    this.mediumtype = response.data.paraDataRf.mediumtype
                })
            }
        }
    };
</script>
