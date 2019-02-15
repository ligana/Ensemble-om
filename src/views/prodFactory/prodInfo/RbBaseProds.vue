<template >
    <a-spin tip="Loading..." size="large" :spinning="spinning" class="RB">
        <v-layout row wrap class="app-container pt-4">
            <v-flex lg9 sm9 class="v-card" style=" border:1px solid #DCE1E7!important;">
                <v-toolbar color="primary lighten-2" dark tabs>
                    <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
                    <v-toolbar-title class="white--text">{{prodCode}}-{{prodDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom color="orange">
                        <v-btn flat icon="edit" slot="activator" @click="editClick" :color="editColor" style=" color: #3C73E6">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <span>{{editDesc}}</span>
                    </v-tooltip>
                    <v-tooltip bottom color="orange">
                        <v-btn flat icon="refresh" slot="activator" @click="refreshClick" style=" color: #3C73E6">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <span>刷新</span>
                    </v-tooltip>
                </v-toolbar>
                <!--定期产品界面展示-->
                <v-tabs v-if="isT" slot="extension" v-model="activeName" grow show-arrows>
                    <v-tab v-for="n in prodInfoT" :key="n.pageCode">
                        {{ n.text}}
                    </v-tab>
                    <v-tabs-items v-model="activeName" class="white elevation-2 textProd">
                        <v-tab-item v-for="i in prodInfoT" :key="i.pageCode">
                            <base-desc :showEdit="showEdit" v-if="i.pageCode=='DESC'" :prodType="prodData.prodType" tags="DESC"></base-desc>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='BASE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodMapping="prodMapping" :prodDefines="prodData.prodDefines" :disablePower="disablePower" tags="BASE"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CONTROL'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="CONTROL" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='APPLY'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="APPLY" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='INT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="INT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='OPEN'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="OPEN" tags="OPEN" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CRET'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="CRET" tags="CRET" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='DEBT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="DEBT" tags="DEBT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CLOSE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="CLOSE" tags="CLOSE" :disablePower="disablePower"></base-prod>
                            <prod-int v-if="i.pageCode=='RATEINFO'" v-bind:prodData="prodData"></prod-int>
                            <prod-charge v-if="i.pageCode=='CHARGE'" v-bind:prodData="prodData"></prod-charge>
                            <prod-accounting v-if="i.pageCode=='ACCOUNTING'" v-bind:prodData="prodData"></prod-accounting>
                        </v-tab-item>
                    </v-tabs-items>
                </v-tabs>
                <!--非定期界面展示-->
                <v-tabs v-else slot="extension" v-model="activeName" grow show-arrows>
                    <v-tab v-for="n in prodInfo" :key="n.pageCode">
                        {{ n.text}}
                    </v-tab>
                    <v-tabs-items v-model="activeName" class="white elevation-2 textProd">
                        <v-tab-item v-for="i in prodInfo" :key="i.pageCode">
                            <base-desc :showEdit="showEdit" v-if="i.pageCode=='DESC'" :prodType="prodData.prodType" tags="DESC"></base-desc>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='BASE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodMapping="prodMapping" :prodDefines="prodData.prodDefines" :disablePower="disablePower" tags="BASE"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CONTROL'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="CONTROL" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='APPLY'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="APPLY" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='INT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="INT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='SHIFT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="SHIFT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='OPEN'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="OPEN" tags="OPEN" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CRET'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="CRET" tags="CRET" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='DEBT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="DEBT" tags="DEBT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CLOSE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="CLOSE" tags="CLOSE" :disablePower="disablePower"></base-prod>
                            <prod-int v-if="i.pageCode=='RATEINFO'" v-bind:prodData="prodData"></prod-int>
                            <prod-charge v-if="i.pageCode=='CHARGE'" v-bind:prodData="prodData"></prod-charge>
                            <prod-accounting v-if="i.pageCode=='ACCOUNTING'" v-bind:prodData="prodData"></prod-accounting>
                        </v-tab-item>
                    </v-tabs-items>
                </v-tabs>

            </v-flex>
            <v-flex lg3 sm3 class="v-card pl-3">
                <v-card class="">
                    <v-card-text class="boartop_box">
                        <down-action v-if="pendFlag==0" v-bind:editShow="editShow" v-on:listenToCopy="listenToCopy"
                                     v-on:saveProd="saveProd" v-on:tempProd="tempProd"></down-action>
                        <pending-form v-if="pendFlag==1"></pending-form>
                    </v-card-text>
                </v-card>
                <v-window v-model="onboarding" :class="depositTree" class="">
                    <v-card-actions v-if="windowShow == 3" class="" >
                        <v-item-group v-model="onboarding" style="margin-left: 30%;">
                            <v-item v-for="n in length" :key="`btn-${n}`" >
                                <v-btn slot-scope="{ active, toggle }" :input-value="active" icon @click="toggle">
                                    <v-icon color="orange">home</v-icon>
                                </v-btn>
                            </v-item>
                        </v-item-group>
                    </v-card-actions>
                    <v-window-item v-for="n in length" :key="`card-${n}`" class="">
                        <prod-list-form v-if="n == 2 || windowShow == 0" v-bind:prodClass="prodClass"
                                        v-on:listenToProdList="listenToProdList"></prod-list-form>
                        <dc-treeAttr v-if="n == 1 && windowShow != 0" v-model="tree" :options="treeOptions"
                                     labelDesc="产品参数" style="background-color: #ff0405;"></dc-treeAttr>
                    </v-window-item>
                </v-window>
            </v-flex>
        </v-layout>
    </a-spin>
</template>

<script>
    import {
        getProdType
    } from '@/api/url/prodInfo'
    import {
        getAttrInfo
    } from '@/api/url/prodInfo'
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import VWidget from '@/components/VWidget';
    import { getProdData } from "@/api/url/prodInfo";
    import { getProdDataAsync } from "@/api/url/prodInfo";
    import {filterChangeData} from "@/server/filterChangeData";
    import {getCheckFlowList} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import downAction from '@/views/prodFactory/prodInfo/btn/downAction';
    import columnInfo from './columnInfo'
    import PendingForm from '@/views/prodFactory/prodInfo/btn/PendingForm';
    import BaseProd from './baseProd/BaseProd'
    import BaseDesc from './baseProd/BaseDesc'
    import ProdCharge from './table/prodTables/prodCharge';
    import ProdAccounting from './table/prodTables/prodRbAccounting';
    import ProdInt from './table/prodTables/prodInt';

    import ProdListForm from './form/ProdListForm';
    import DcTreeAttr from "@/components/widgets/DcTreeAttr";
    import {getParamTable} from "@/api/url/prodInfo";
    import {getCommonList} from "@/api/url/prodInfo";


    export default {
        name: 'RbBaseProds',
        components: {
            VWidget,
            BaseProd,
            ProdAccounting,
            downAction,
            ProdListForm,
            PendingForm,
            columnInfo,
            DcTreeAttr,
            ProdCharge,
            ProdInt,
            BaseDesc

        },
        data() {
            return {
                isT: false,
                listLoading: true,
                dialog: false,
                showCopy: '',
                spinning: true,
                length: 2,
                onboarding: 0,
                prodRange: '',
                prodCode: '',
                windowShow: 0,
                prodDesc: '',
                showAdd: false,
                editShow: false,
                depositTree: '',
                pendFlag: 0,
                prodClass: '',
                activeName: null,
                eventList: {},
                showEdit: false,
                attrColumnInfo: [],
                baseAttr: true,
                addColumnsRef: [],
                addColumnInfos: [],
                prodMapping: {
                    irlProdType: '',
                    glProdMappingType: ''
                },
                prodInfo: [
                    {icon: 'account_balance', text: '基本描述', pageCode: 'DESC'},
                    {icon: 'account_balance', text: '产品信息', pageCode: 'BASE'},
                    {icon: 'filter_vintage', text: '控制信息', pageCode: 'CONTROL'},
                    {icon: 'filter_vintage', text: '适用范围', pageCode: 'APPLY'},
                    {icon: 'filter_vintage', text: '利息信息', pageCode: 'INT'},
                    {icon: 'filter_vintage', text: '形态转移', pageCode: 'SHIFT'},
                    {icon: 'filter_vintage', text: '开户定义', pageCode: 'OPEN'},
                    {icon: 'filter_vintage', text: '存入定义', pageCode: 'CRET'},
                    {icon: 'filter_vintage', text: '支取定义', pageCode: 'DEBT'},
                    {icon: 'filter_vintage', text: '销户定义', pageCode: 'CLOSE'},
                    {icon: 'filter_vintage', text: '收费定义', pageCode: 'CHARGE'},
                    {icon: 'filter_vintage', text: '利率信息', pageCode: 'RATEINFO'},
                    {icon: 'filter_vintage', text: '核算信息', pageCode: 'ACCOUNTING'}
                ],
                prodInfoT: [
                    {icon: 'account_balance', text: '基本描述', pageCode: 'DESC'},
                    {icon: 'account_balance', text: '产品信息', pageCode: 'BASE'},
                    {icon: 'filter_vintage', text: '控制信息', pageCode: 'CONTROL'},
                    {icon: 'filter_vintage', text: '适用范围',pageCode: 'APPLY'},
                    {icon: 'filter_vintage', text: '利息信息', pageCode: 'INT'},
                    {icon: 'filter_vintage', text: '开户定义', pageCode: 'OPEN'},
                    {icon: 'filter_vintage', text: '存入定义', pageCode: 'CRET'},
                    {icon: 'filter_vintage', text: '支取定义', pageCode: 'DEBT'},
                    {icon: 'filter_vintage', text: '销户定义', pageCode: 'CLOSE'},
                    {icon: 'filter_vintage', text: '收费定义', pageCode: 'CHARGE'},
                    {icon: 'filter_vintage', text: '利率信息', pageCode: 'RATEINFO'},
                    {icon: 'filter_vintage', text: '核算信息', pageCode: 'ACCOUNTING'}
                ],
                tagList: [],
                files: [{
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: '',
                    lable: ''
                }],
                folders: [],
                rateList: {},
                OPEN: {},
                CLOSE: {},
                CRET: {},
                DEBT: {},
                prodData: {
                    prodType: ''
                },
                sourceProdData: {},
                targetData: {},
                treeOptions: [],
                tree: [],
                editColor: "write",
                disablePower: true,
                editDesc: "编辑模式",
                powerButton: false,
                proditem: [
                    {
                        tranName: '',
                        color: '',
                        icon: '',
                        timeLabel: ''
                    }
                ],
            }
        },
        watch: {
            //监听参数增加界面返回数据
            tree: {
                handler(msg) {
                    if (msg !== undefined) {
                        this.useAddClick(msg);
                    }
                }
            }
        },

        created () {
            //通过产品类型  获取产品属性为定期产品或者活期产品   定期产品：隐藏形态转移，收费定义页签
            if(this.$route.hash !== "" && this.$route.hash !== null && this.$route.hash !== undefined) {
                //点击主菜单产品组时 获取产品组代码
                const response = getProdData(this.$route.hash);
                if(response.prodDefines.ACCT_TYPE!=undefined && response.prodDefines.ACCT_TYPE != null && response.prodDefines.ACCT_TYPE.attrValue == "T") {
                    this.isT = true;
                }else{
                    this.isT = false
                }
            }
            if(this.$route.params.prodType !== "" && this.$route.params.prodType !== null && this.$route.params.prodType !== undefined) {
                const response = getProdData(this.$route.params.prodType);
                if(response.prodDefines.ACCT_TYPE!=undefined && response.prodDefines.ACCT_TYPE != null && response.prodDefines.ACCT_TYPE.attrValue == "T") {
                    this.isT = true;
                }else{
                    this.isT = false
                }
            }
        },
        mounted (){
            this.initColumnInfo();

            // 监听这个dom的scroll事件
            window.addEventListener('scroll', () => {
                const height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (height >= 176) {
                    this.depositTree = 'depositTreeFixed'
                } else {
                    this.depositTree = ''
                }

            }, true)
            this.queryProdFlow();
            //组织树形组件备选数据
            //组织树形组件备选数据
            let that = this
            getParamTable("MB_ATTR_CLASS").then(function (response) {
                let attrClass = response.data.data.columnInfo;
                getParamTable("MB_ATTR_TYPE").then(function (response) {
                    let attrType = response.data.data.columnInfo;
                    for (let q = 0; q < attrClass.length; q++) {
                        for (let w = 0; w < attrType.length; w++) {
                            if (attrType[w].ATTR_CLASS === attrClass[q].ATTR_CLASS) {
                                let temp = {}
                                temp["key"] = attrType[w].ATTR_KEY
                                temp["columnDesc"] = attrType[w].ATTR_DESC
                                temp["parentCode"] = attrClass[q].ATTR_CLASS
                                temp["parentDesc"] = attrClass[q].ATTR_CLASS_DESC
                                that.treeOptions.push(temp)
                            }
                        }
                    }
                });
            });
            //初始化产品信息

            if(this.$route.hash !== "" && this.$route.hash !== null && this.$route.hash !== undefined) {
                //点击主菜单产品组时 获取产品组代码
                const response= getProdData(this.$route.hash);
                    //初始化产品基础参数
                    this.prodRange = response.prodType.prodRange;
                    this.prodCode = response.prodType.prodType
                    this.prodDesc = response.prodType.prodDesc
                    this.$store.dispatch('setProdType',this.prodCode)
                    this.$store.dispatch('setProdDesc',this.prodDesc)
                    const reProd  = response
                    this.prodData= reProd;
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                    this.initEventAttr(reProd)
                    this.prodClass= this.prodData.prodType.prodClass;
                    this.powerByLevel(this.prodClass);
                    this.spinning= false;
                    //组装产品映射信息
                    if(response.glProdMappings[0] != undefined) {
                        this.prodMapping.glProdMappingType = response.glProdMappings[0].mappingType
                    }
                    if(response.irlProdTypes[0] != undefined) {
                        this.prodMapping.irlProdType = response.irlProdTypes[0].prodType
                    }
            }else if(this.$route.params.prodClassCmp !== "" && this.$route.params.prodClassCmp !== null){
                //通过全局搜索/产品目录  获取目标产品产品组代码
                this.prodClass = this.$route.params.prodClassCmp;
            }

            if(this.$route.params.prodType !== "" && this.$route.params.prodType !== null && this.$route.params.prodType !== undefined){
                const response= getProdData(this.$route.params.prodType);
                    //初始化产品基础参数
                    this.prodCode = response.prodType.prodType;
                    this.prodDesc = response.prodType.prodDesc
                    this.$store.dispatch('setProdType',this.prodCode)
                    this.$store.dispatch('setProdDesc',this.prodDesc)
                    const reProd  = response
                    this.prodData= reProd;
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                    this.initEventAttr(reProd)
                    this.prodClass= this.prodData.prodType.prodClass
                    this.prodRange= this.prodData.prodType.prodRange
                    this.powerByLevel(this.prodClass);
                    this.spinning= false;
                    //组装产品映射信息
                    if(response.glProdMappings[0] != undefined) {
                        this.prodMapping.glProdMappingType = response.glProdMappings[0].mappingType
                    }
                    if(response.irlProdTypes[0] != undefined) {
                        this.prodMapping.irlProdType = response.irlProdTypes[0].prodType
                    }

            }
        },
        methods: {
            initColumnInfo() {
                this.attrColumnInfo= getAttrInfo();
            },
            initEventAttr(reProd) {
                //初始化事件，指标参数
                let defineEvent = reProd.mbEventInfos
                for (let event in defineEvent) {
                    let eventType = event.split("_")[0]
                    this[eventType] = this.dealEventPart(reProd, eventType, this.prodCode)
                }
            },
            //流程检查是否存在需要处理的数据
            queryProdFlow() {
                getCommonList({"userId": sessionStorage.getItem("userId")}).then(response => {
                    this.proditem = response.data.data;
                    for (let i = 0; i < this.proditem.length; i++) {
                        if (this.proditem[i].tranId === this.$route.hash) {
                            this.pendFlag = 1
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'info',
                                title: "存在已保存数据，等待提交！",
                            })
                        }
                    }
                });
                getCheckFlowList().then(response => {
                    let length = response.data.data.length
                    for (let j = 0; j < length; j++) {
                        if (response.data.data[j].flowManage.tranId === "MB_PROD_TYPE" && response.data.data[j].flowManage.status === "2") {
                            this.pendFlag = 1
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'info',
                                title: "存在已提交数据，等待复核！",
                            })
                            break
                        }
                        if (response.data.data[j].flowManage.tranId === "MB_PROD_TYPE" && response.data.data[j].flowManage.status === "3") {
                            this.pendFlag = 1
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'info',
                                title: "存在已复核数据，等待发布！",
                            })
                            break
                        }
                    }
                });
            },
            //根据用户的权限等级设置权限
            powerByLevel(prodClass) {
                const level = sessionStorage.getItem("base" + prodClass)
                switch (level) {
                    case '1':
                        this.powerButton = true;
                        this.disablePower = false
                        break
                    case '2':

                        this.disablePower=false;

                }
            },
            //保存事件
            saveProd() {
                this.spinning = true
                this.targetData = filterChangeData(this.prodData, this.sourceProdData, this.showCopy)
                if (this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                } else {
                    this.targetData.optionType = "U"
                }
                this.targetData.option = "save";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if (response.status === 200) {
                        this.pendFlag = 1
                        this.$swal({
                            allowOutsideClick: false,
                            type: 'success',
                            title: "提交成功！",
                        })
                        this.spinning= false
                        let setTaskEvent= new Event("taskList");

                        window.dispatchEvent(setTaskEvent);
                    }
                })
            },
            //暂存事件
            tempProd() {
                this.targetData = filterChangeData(this.prodData, this.sourceProdData, this.showCopy)
                if (this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                } else {
                    this.targetData.optionType = "U"
                }
                this.targetData.option = "temp";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        this.$swal({
                            allowOutsideClick: false,
                            type: 'success',
                            title: "暂存成功！",
                        })
                    }
                })
            },
            //产品菜单列表监听
            listenToProdList(value) {
                this.prodCode = value.prodType
                this.prodData = {}
                getProdDataAsync(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData, this.sourceProdData)
                    this.initEventAttr(this.prodData)
                });
            },
            //对象浅复制
            copy(obj1, obj2) {
                var obj = obj2 || {};
                for (let name in obj1) {
                    if (typeof obj1[name] === "object" && obj1[name] !== null) {
                        obj[name] = (obj1[name].constructor === Array) ? [] : {};
                        this.copy(obj1[name], obj[name]);
                    } else {
                        obj[name] = obj1[name];
                    }
                }
                return obj;
            },
            //复制事件监听
            listenToCopy(data) {
                this.prodCode = data.prodType;
                this.prodDesc = data.prodDesc;
                this.prodData.prodType.prodType = data.prodType;
                this.prodData.prodType.prodDesc = data.prodDesc;
                const newData = this.copy(this.prodData, []);
                this.prodData = newData;
                if (!data.showCopy) {
                    this.showCopy = 'Y';
                } else {
                    this.showCopy = '';
                }
            },
            //刷新按钮事件
            refreshClick() {
                getProdDataAsync(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData, this.sourceProdData)
                });
            },
            //编辑事件触发
            editClick() {

                if(!this.powerButton){
                    this.$swal({
                        allowOutsideClick: false,
                        type: 'info',
                        title: "用户没有编辑基础产品权限",
                    })

                    return
                }
                this.editShow = this.editShow === true ? false : true
                this.windowShow = this.windowShow ? 0 : 1
                const edit = this.showEdit;
                this.showEdit = edit == false ? true : false;
//                const baseAttr = this.baseAttr
//                this.baseAttr=baseAttr==false?true:false;
                if (this.showAdd) {
                    this.showAdd = false
                    this.editDesc = "编辑模式"
                    this.editColor = "write"
                } else {
                    this.showAdd = true
                    this.editDesc = "退出编辑"
                    this.editColor = "orange"
                }
            },
            //增加参数处理事件
            useAddClick(val) {
                //获取当前界面key
                let addColumnPageCode = this.prodInfo[this.activeName].pageCode
                let addColumnData = this.copy(this.prodData, this.addData)
                let showFlag = 0
                for (let i = 0; i < val.length; i++) {
                    let columnKey = val[i].split("--")[0]
                    let columnDesc = val[i].split("--")[1]
                    //组装向mbProdDefine保存的数对象据
                    if(addColumnPageCode === "DESC" || addColumnPageCode === "CHARGE" || addColumnPageCode === "RATEINFO" || addColumnPageCode === "ACCOUNTING"){
                        showFlag = 1
                        this.$swal({
                            allowOutsideClick: false,
                            type: 'info',
                            title: "当前页签不允许增加参数！",
                        })
                    }
                    if(addColumnPageCode === "BASE" || addColumnPageCode === "CONTROL" || addColumnPageCode === "APPLY" || addColumnPageCode === "INT" || addColumnPageCode === "SHIFT") {

                        //获取新增参数pageSeqNo
                        let addColumnPageSeqNo = this.getDefinedMaxSeqNo(this.prodData, addColumnPageCode, "pageSeqNo") + i + 1
                        //获取新增参数SeqNo
                        let addColumnSeqNo = (parseInt(this.getDefinedMaxSeqNo(this.prodData, addColumnPageCode, "seqNo")) + i + 1) + ""
                        if (this.prodData.prodDefines[columnKey] !== undefined) {
                            //已经存在该条数据
                            showFlag = 1
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'info',
                                title: "产品已存在参数" + columnKey + "【" + columnDesc + "】",
                            })
                        } else {
                            addColumnData.prodDefines[columnKey] = {}
                            addColumnData.prodDefines[columnKey].prodType = this.prodCode
                            addColumnData.prodDefines[columnKey].seqNo = addColumnSeqNo
                            addColumnData.prodDefines[columnKey].pageCode = addColumnPageCode
                            addColumnData.prodDefines[columnKey].pageSeqNo = addColumnPageSeqNo
                            addColumnData.prodDefines[columnKey].attrKey = columnKey
                            addColumnData.prodDefines[columnKey].attrValue = ""
                            addColumnData.prodDefines[columnKey].status = "A"
                            addColumnData.prodDefines[columnKey].assembleType = "ATTR"
                            addColumnData.prodDefines[columnKey].assembleId = columnKey
                            addColumnData.prodDefines[columnKey].optionPermissions = "E"
                            //新增参数标识 newAttr
                            addColumnData.prodDefines[columnKey].newAttr = true
                        }
                    }
                    //组装向mbEventAttr保存的数据对象
                    if (addColumnPageCode === "OPEN" || addColumnPageCode === "CLOSE" || addColumnPageCode === "CRET" || addColumnPageCode === "DEBT") {
                        let eventType = addColumnPageCode + "_" + this.prodCode
                        //获取新增参数pageSeqNo
                        let PageSeqNo = this.getEventMaxSeqNo(this.prodData, addColumnPageCode, "pageSeqNo", eventType) + i + 1
                        //获取新增参数SeqNo
                        let SeqNo = (parseInt(this.getEventMaxSeqNo(this.prodData, addColumnPageCode, "seqNo", eventType)) + i + 1) + ""
                        if (this.prodData.mbEventInfos[eventType].mbEventAttrs[columnKey] !== undefined) {
                            //已经存在该条数据
                            showFlag = 1
                            this.$swal({
                                allowOutsideClick: false,
                                type: 'info',
                                title: "事件" + eventType +"已存在参数【" + columnDesc + "】",
                            })
                        }else{

                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey] = {}
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].eventType = eventType
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].seqNo = SeqNo
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].assembleType = "ATTR"
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].assembleId = columnKey
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].attrValue = ""
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].assembleRule = ""
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].perEffect = ""
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].pageCode = addColumnPageCode
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].pageSeqNo = PageSeqNo
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].optionPermissions = "E"

                            //新增参数标识 newAttr
                            addColumnData.mbEventInfos[eventType].mbEventAttrs[columnKey].newAttr = true
                        }
                    }
                }
                if (showFlag === 0) {
                    this.prodData = addColumnData
                    this.initEventAttr(this.prodData)
                    this.$swal({
                        allowOutsideClick: false,
                        type: 'success',
                        title: "产品增加参数成功！",
                    })
                    this.dialog = false
                }
            },
//            editClick() {
//                const edit=this.showEdit;
//                this.showEdit=edit==false?true:false;
//            },
            addClick() {
                this.addColumnPageDesc = this.prodInfo[this.activeName].text
                //获取所有参数定义的json文件（columnInfo.json）增加到待选数据集合
                for (let i in columnInfo) {
                    this.addColumnsRef.push(i + '--' + columnInfo[i].columnDesc)
                }
            },
            //获取mbProdDefine最大seqNo val:目标集合 pageCode：当前所属界面标志
            getDefinedMaxSeqNo(val, pageCode, key) {
                //获取界面元素数组
                let SeqNoArr = []
                let keys = key
                for (let i in val.prodDefines) {
                    if (keys === "pageSeqNo" && val.prodDefines[i].pageCode === pageCode && val.prodDefines[i][keys] !== null && val.prodDefines[i][keys] !== '') {
                        SeqNoArr.push(val.prodDefines[i][keys])
                    } else if (keys === "seqNo" && val.prodDefines[i].prodType === this.prodCode) {
                        SeqNoArr.push(val.prodDefines[i][keys])
                    }
                }
                //获取seqNoArr数组最大数据
                let maxSeqNo = SeqNoArr[0]
                for (let j = 1; j < SeqNoArr.length; j++) {
                    if (maxSeqNo < SeqNoArr[j]) {
                        maxSeqNo = SeqNoArr[j]
                    }
                }
                return maxSeqNo
            },
            //获取mbEventAttr最大seqNo val:目标集合 pageCode：当前所属界面标志
            getEventMaxSeqNo(val, pageCode, key, eventType) {
                //获取界面元素数组
                let SeqNoArr = []
                let keys = key
                for (let i in val.mbEventInfos[eventType].mbEventAttrs) {
                    if (keys === "pageSeqNo" && val.mbEventInfos[eventType].mbEventAttrs[i].pageCode === pageCode && val.mbEventInfos[eventType].mbEventAttrs[i][keys] !== null && val.mbEventInfos[eventType].mbEventAttrs[i][keys] !== '') {
                        SeqNoArr.push(parseInt(val.mbEventInfos[eventType].mbEventAttrs[i][keys]))
                    } else if (keys === "seqNo") {
                        for (let x in val.mbEventInfos) {
                            if (x === eventType) {
                                SeqNoArr.push(parseInt(val.mbEventInfos[eventType].mbEventAttrs[i][keys]))
                            }
                        }
                    }
                }
                //获取seqNoArr数组最大数据
                let maxSeqNo = SeqNoArr[0]
                for (let y = 1; y < SeqNoArr.length; y++) {
                    if (maxSeqNo < SeqNoArr[y]) {
                        maxSeqNo = SeqNoArr[y]
                    }
                }
                return maxSeqNo
            },
            //处理event part参数 data： 目标集合 eventType：事件类型 prodCode：产品类型   将参数组织成{{key:"",value: ""},{key:"",value: ""},...}结构
            dealEventPart(data, eventType, prodCode) {
                let eventTypes = eventType + '_' + prodCode
                const event = data.mbEventInfos[eventTypes]
                let events = {}
                for (const index in event.mbEventAttrs) {
                    events[index] = event.mbEventAttrs[index]
                }
                return events
            }
        }
    }
</script>


<style scoped >
    .addClass {
        color: white;
        margin-left: 20%;
        font-size: large;
    }

    .addBtn {
        margin-top: -10px;
        width: 160px
    }

    .depositTreeFixed {
        position: fixed;
        top: 63px;
        overflow-y: scroll;
        height: 100%;
        width: 24%;
    }
    .textProd {

        min-height: calc(90vh - 24px);
        padding-bottom: 120px;
    }

    .RB >>> .v-tabs__container {
        border-bottom: 1px solid #DCE1E7;
        background-color: #fff!important;

    }
    .RB >>> .v-tabs__wrapper {
        padding-top: 0px;
        height: 48px!important;
    }
    .RB >>> .v-tabs__item:hover {
        color: #3C73E6 !important;
    }

    .RB >>> .v-tabs__item--active {
        box-shadow: none !important;
        color: #3C73E6 !important;
        background-color: #fff;
        font-weight: bold;
        height: 48px !important;
        border-radius: 0px;
        border-bottom: 2px solid #3C73E6;
    }
    .RB >>> .primary--text {
        color: #3C73E6!important;
    }
    .RB >>> .theme--light.v-label {
        color: #B7B7B7;
    }
    .RB >>> .v-card__text {
        padding: 16px!important;
        background: #F4F5F8;
        border: 1px solid #DCE1E7;
        border-bottom: none;
    }
    .RB >>> .v-card {
        box-shadow: none!important;
    }
    .RB >>>.primary.lighten-2 {
        background-color: #F4F5F8!important;
        border-bottom:1px solid #DCE1E7!important;
        box-shadow: none!important;

    }
    .RB >>> .primary.lighten-2 .white--text {
        color: #2C2F43!important;
    }
    .RB >>> .success {
        background-color: #D9DEE5!important;
        color: #4b4c55!important;
    }
    .RB >>> .success > .v-ripple__container {
        background-color: rgba(60,115,230,.5) !important;
    }
    .RB >>> .text-xs-center {
        margin-top: 10px;
    }

</style>