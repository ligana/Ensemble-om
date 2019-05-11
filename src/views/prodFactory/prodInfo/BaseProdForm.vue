<template>
    <a-spin tip="Loading..." size="large" :spinning="spinning" class="RB">
        <v-layout row wrap class="app-container pt-3">
            <v-flex lg9 sm9 class="v-card" style=" border:1px solid #DCE1E7!important;">
                <v-toolbar color="primary lighten-2" dark tabs dense>
                    <v-toolbar-title class="white--text">{{prodCode}}-{{prodDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom color="orange">
                        <v-btn flat icon="edit" slot="activator" @click="editClick" :color="editColor">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <span>{{editDesc}}</span>
                    </v-tooltip>
                    <v-tooltip bottom color="orange">
                        <v-btn flat icon="refresh" slot="activator" @click="refreshClick" color="primary lighten-2">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <span>刷新</span>
                    </v-tooltip>
                    <v-tooltip bottom color="orange">
                        <v-btn flat icon="star" slot="activator" @click="collectClick" :color="collectColor">
                            <v-icon>star</v-icon>
                        </v-btn>
                        <span>{{collectDesc}}</span>
                    </v-tooltip>
                </v-toolbar>
                <v-dialog v-model="dialogStage" width="450" persistent z-index="100">
                    <v-card style="height: 200px; width: 450px">
                        <v-card-text>
                            <v-icon @click="dialogStage = false" style="margin-left: 95%">close</v-icon>
                            <h4 style="color: dodgerblue; margin-left: 10%; margin-top: 2%">跳转到【参数工厂--期次定义】界面</h4>
                            <v-btn color="success" @click="goParam" dark style="margin-left: 28%; margin-top: 10%; width: 180px; height: 40px">
                                确定
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <!--产品展示界面-->
                <v-tabs slot="extension" v-model="activeName" grow show-arrows>
                    <v-tab v-for="n in prodInfo" :key="n.pageCode" @click="tapClick(n.pageCode)" style="margin-top: -0%">
                        {{ n.text}}
                    </v-tab>
                    <v-tabs-items v-model="activeName" class="white textProd">
                        <v-tab-item v-for="i in prodInfo" :key="i.pageCode">
                            <base-desc :showEdit="showEdit" v-if="i.pageCode=='DESC'" :baseProdRange="baseProdRange" :prodType="prodData.prodType" tags="DESC"></base-desc>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='BASE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodMapping="prodMapping" :prodDefines="prodData.prodDefines" :disablePower="disablePower" tags="BASE"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CONTROL'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="CONTROL" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='SHIFT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="SHIFT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='APPLY'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="APPLY" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='INT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="INT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='RULE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="RULE" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='PRICE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="PRICE" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='LIMIT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="LIMIT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='OUT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="OUT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='IN'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="IN" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='OPEN'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="OPEN" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CRET'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="CRET" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='DEBT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="DEBT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CLOSE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="CLOSE" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='CYCLE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="CYCLE" :disablePower="disablePower"></base-prod>

                            <group-prod v-if="i.pageCode=='GROUP'" :prodTypeCode="prodData.prodType.prodType" tags="GROUP" v-bind:prodData="prodData"></group-prod>
                            <prod-int v-if="i.pageCode=='RATEINFO'" v-bind:prodData="prodData"></prod-int>
                            <prod-charge v-if="i.pageCode=='CHARGE'" v-bind:prodData="prodData"></prod-charge>
                            <prod-accounting v-if="i.pageCode=='ACCOUNTING'" v-bind:prodData="prodData"></prod-accounting>
                            <prod-cl-accounting v-if="i.pageCode=='CLACCOUNTING'" v-bind:prodData="prodData"></prod-cl-accounting>
                            <!--贷款特有事件-->
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='ACCT'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="ACCT" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='DISC'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="DISC" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='DRW'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="DRW" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='REC'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="REC" :disablePower="disablePower"></base-prod>
                            <base-prod :showEdit="showEdit" v-if="i.pageCode=='DUE'" :prodTypeCode="prodData.prodType.prodType" :attrColumnInfo="attrColumnInfo" :prodDefines="prodData.prodDefines" tags="DUE" :disablePower="disablePower"></base-prod>
                            <prod-amend v-if="i.pageCode=='AMEND'" v-bind:prodData="prodData"></prod-amend>
                        </v-tab-item>
                    </v-tabs-items>
                </v-tabs>
            </v-flex>
            <v-flex lg3 sm3 class="v-card pl-2">
                <v-card class="elevation-1">
                    <v-card-text>
                        <down-action v-if="pendFlag==0" v-bind:editShow="editShow" v-on:listenToCopy="listenToCopy" v-on:saveProd="saveProd"></down-action>
                        <pending-form v-if="pendFlag==1" v-bind:prodType="prodType" v-bind:mainSeqNo="mainSeqNo"></pending-form>
                    </v-card-text>
                </v-card>
                <v-window v-model="onboarding" :class="depositTree" class="pt-1">
                    <v-card-actions v-if="windowShow == 3" class="elevation-2">
                        <v-item-group v-model="onboarding" style="margin-left: 30%">
                            <v-item v-for="n in length" :key="`btn-${n}`">
                                <v-btn slot-scope="{ active, toggle }" :input-value="active" icon @click="toggle">
                                    <v-icon color="orange">home</v-icon>
                                </v-btn>
                            </v-item>
                        </v-item-group>
                    </v-card-actions>
                    <v-window-item v-for="n in length" :key="`card-${n}`" class="elevation-1">
                        <prod-list-form v-if="n == 2 || windowShow == 0" v-bind:prodType="prodType" v-on:listenToProdList="listenToProdList" v-bind:prodRange="prodRange"></prod-list-form>
                        <dc-treeAttr v-if="n == 1 && windowShow != 0" v-model="tree" :options="treeOptions" labelDesc="产品参数"></dc-treeAttr>
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
    import {
        checkProdInFlow
    } from '@/api/url/prodInfo';
    import {
        saveCollectProd
    } from '@/api/url/prodInfo';
    import GroupProd from './baseProd/GroupProd'

    import VWidget from '@/components/VWidget';
    import { getProdData } from "@/api/url/prodInfo";
    import { getUserCollectByUserId } from "@/api/url/prodInfo";

    import { getProdDataAsync } from "@/api/url/prodInfo";
    import {filterChangeData} from "@/server/filterChangeData";
    import toast from '@/utils/toast';
    import downAction from '@/views/prodFactory/prodInfo/btn/downAction';
    import prodPageInfo from './prodPageDefine'
    import PendingForm from '@/views/prodFactory/prodInfo/btn/PendingForm';
    import BaseProd from './baseProd/BaseProd'
    import BaseDesc from './baseProd/BaseDesc'
    import ProdCharge from './table/prodTables/prodCharge';
    import ProdAccounting from './table/prodTables/prodRbAccounting';
    import ProdClAccounting from './table/prodTables/prodAccounting';

    import ProdInt from './table/prodTables/prodInt';
    import ProdAmend from './table/prodTables/prodAmend';

    import ProdListForm from './form/ProdListForm';
    import DcTreeAttr from "@/components/widgets/DcTreeAttr";
    import {getParamTable} from "@/api/url/prodInfo";
    import {getCommonList} from "@/api/url/prodInfo";
    import {getProdPageDefine} from "@/api/url/prodInfo";
    import {findByPartType} from "@/api/url/prodInfo";
    export default {
        name: 'BaseProdForm',
        components: {
            VWidget,
            BaseProd,
            ProdAmend,
            ProdAccounting,
            downAction,
            ProdListForm,
            PendingForm,
            prodPageInfo,
            DcTreeAttr,
            ProdCharge,
            ProdInt,
            BaseDesc,
            GroupProd,
            ProdClAccounting
        },
        data () {
            return {
                dialogStage: false,
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
                pageClass: '',
                prodMapping: {
                    irlProdType: '',
                    glProdMappingType: ''
                },
                prodInfo: [],
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
                editColor: "primary lighten-2",
                collectColor: "primary lighten-2",
                collectDesc: "收藏",
                disablePower: true,
                editDesc: "编辑模式",
                powerButton: false,
                sourceModule: "",
                proditem: [
                    {
                        tranName: '',
                        color: '',
                        icon: '',
                        timeLabel: ''
                    }
                ],
                baseProdRange: true,
                mainSeqNo: ''
            }
        },
        watch: {
            //监听参数增加界面返回数据
            tree: {
                handler(msg) {
                    if(msg!== undefined){
                        this.useAddClick(msg);
                    }
                }
            }
        },
        created () {
            //通过产品类型  判断产品分类 路由产品展示页签
            if(this.$route.hash !== "" && this.$route.hash !== null && this.$route.hash !== undefined) {
                this.prodType = this.$route.hash;
                const response = getProdData(this.$route.hash);
                this.routPageByProd(response);
                this.prodInfo = getProdPageDefine(this.pageClass);
            }
            if(this.$route.params.prodType !== "" && this.$route.params.prodType !== null && this.$route.params.prodType !== undefined) {
                this.prodType = this.$route.params.prodType;
                const response = getProdData(this.$route.params.prodType);
                this.routPageByProd(response);
                this.prodInfo = getProdPageDefine(this.pageClass);
            }
        },
        mounted (){
            // 监听这个dom的scroll事件
            window.addEventListener('scroll', () => {
                const height= window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(height>=176){
                this.depositTree='depositTreeFixed'
            }else{
                this.depositTree=''
            }

        }, true)
            this.queryProdFlow();
            //组织树形组件备选数据
            let that = this
            getParamTable("MB_ATTR_CLASS").then(function (response) {
                let attrClass = response.data.data.columnInfo;
                getParamTable("MB_ATTR_TYPE").then(function (response) {
                    let attrType = response.data.data.columnInfo;
                    for(let q=0; q<attrClass.length; q++){
                        for(let w=0; w<attrType.length; w++){
                            if(attrType[w].ATTR_CLASS === attrClass[q].ATTR_CLASS){
                                let temp = {};
                                temp["key"] = attrType[w].ATTR_KEY;
                                temp["columnDesc"] = attrType[w].ATTR_DESC;
                                temp["parentCode"] = attrClass[q].ATTR_CLASS;
                                temp["parentDesc"] = attrClass[q].ATTR_CLASS_DESC;
                                that.treeOptions.push(temp);
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
                this.sourceModule = reProd.prodType.sourceModule;
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
                this.prodDesc = response.prodType.prodDesc;
                this.$store.dispatch('setProdType',this.prodCode)
                this.$store.dispatch('setProdDesc',this.prodDesc)
                const reProd  = response
                this.prodData= reProd;
                this.sourceModule = reProd.prodType.sourceModule;
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
            this.getCollectInfo();
        },
        methods: {
            //通过产品分类不同，加载显示不同产品页签
            routPageByProd(response) {
                this.initColumnInfo();
                this.prodData = response;
                let prodGroup = response.prodType.prodGroup;
                let sourceModule = response.prodType.sourceModule;
                //存款产品
                if(sourceModule == "RB") {
                    //组合产品（一本通类）
                    if (response.prodDefines.AGREEMENT_TYPE == undefined && prodGroup == "Y") {
                        this.pageClass = "RBPRODGROUP";
                        return;
                    }
                    //期次产品
                    if (response.prodDefines.FIXED_CALL != undefined && response.prodDefines.FIXED_CALL != null && response.prodDefines.FIXED_CALL.attrValue == "M") {
                        this.pageClass = "RBPRODFIXED";

                        return;
                    }
                    //协议产品（YHT一户通）
                    if (response.prodDefines.AGREEMENT_TYPE != undefined && response.prodDefines.AGREEMENT_TYPE != null && response.prodDefines.AGREEMENT_TYPE.attrValue == "YHT" && prodGroup == "Y") {
                        this.pageClass = "RBPRODYHT";
                        return;
                    }
                    //协议存款（资金池）
                    if (response.prodDefines.AGREEMENT_TYPE != undefined && response.prodDefines.AGREEMENT_TYPE != null && response.prodDefines.AGREEMENT_TYPE.attrValue == "PCP" && prodGroup == "Y") {
                        this.pageClass = "RBPRODPCP";
                        return;
                    }
                }
                this.routPageByProdTemp(sourceModule,response,prodGroup);
            },
            //通过产品路由页签信息
            routPageByProdTemp(sourceModule,response,prodGroup){
                //存款产品
                if(sourceModule == "RB") {
                    //协议存款（资金转移类）
                    if (response.prodDefines.AGREEMENT_TYPE != undefined && response.prodDefines.AGREEMENT_TYPE != null && prodGroup == "Y") {
                        let agreeType = response.prodDefines.AGREEMENT_TYPE.attrValue;
                        if (this.checkIs(agreeType)) {
                            //this.prodInfo = prodPageInfo.rbProdZJZY;
                            this.pageClass = "RBPRODZJZY";
                            return;
                        }
                    }
                    //定期产品
                    if (response.prodDefines.ACCT_TYPE != undefined && response.prodDefines.ACCT_TYPE != null && response.prodDefines.ACCT_TYPE.attrValue == "T") {
                        //this.prodInfo = prodPageInfo.rbProdT;
                        this.pageClass = "RBPRODT";
                        return;
                    }
                    //默认活期产品
                    //this.prodInfo = prodPageInfo.rbProdNotT;
                    this.pageClass = "RBPRODNOTT";
                    return;
                }
                if(sourceModule == "CL") {
                    //贷款组合产品
                    if (prodGroup == "Y") {
                        this.pageClass = "CLGROUPPROD";
                        return;
                    }
                    //贷款非组合产品
                    if (prodGroup != "Y") {
                        this.pageClass = "CLPRODPUBLISH";
                        return;
                    }
                }
                //内部账产品
                if(sourceModule == "GL"){
                    this.pageClass = "GLPRODPUBLISH";
                    return;
                }
            },
            //判断是否资金转移类产品
            checkIs(agreeType){
                if(agreeType != "PCP" && agreeType != "YHT") {
                    return true;
                }
                return false;
            },
            //数据取自他表的参数  点击后跳转到参数平台维护
            tapClick(val){
                let pageCode = val
                if(pageCode == "STAGE"){
                    //弹出跳转到参数平台提示
                    this.dialogStage = true;
                }
            },
            //跳转到参数工厂，进行期次定义维护
            goParam(){
                console.log("dd");
                this.$router.push({
                    name: 'tableInfo',
                    hash: "MB_STAGE_DEFINE"
                })
            },
            //初始化元数据
            initColumnInfo() {
                this.attrColumnInfo= getAttrInfo();
            },
            initEventAttr(reProd) {
                //初始化事件，指标参数
                let defineEvent = reProd.mbEventInfos
                for(let event in defineEvent){
                    let eventType = event.split("_")[0]
                    this[eventType] = this.dealEventPart(reProd,eventType,this.prodCode)
                }
            },
            //流程检查是否存在需要处理的数据
            queryProdFlow(){
                checkProdInFlow({"prodType": this.prodType}).then(response => {
                    let ret = response.data.data.ret;
                    let status = response.data.data.status;
                    this.mainSeqNo = response.data.data.mainSeqNo;
                    let desc = "";
                    if("1" == status){
                        desc = "产品已被编辑保存，请先操作提交或者清除！";
                    }
                    if("2" == status){
                        desc = "产品已被编辑提交，等待复核！";
                    }
                    if("3" == status){
                        desc = "产品已被复核，等待发布！";
                    }
                    if("6" == status){
                        desc = "产品编辑被驳回，请先操作提交或者清除!";
                    }
                    if(ret){
                        this.pendFlag = 1
                        this.sweetAlert('info',desc)
                    }
                });
            },
            //根据用户的权限等级设置权限
            powerByLevel(prodClass){
                const level=sessionStorage.getItem("base"+prodClass)
                switch (level) {
                    case '1':
                        this.powerButton=true;
                        this.disablePower=false
                        break
                    case '2':
                        this.disablePower=false;
                }
            },
            //保存事件
            saveProd() {
                this.spinning= true
                this.targetData = filterChangeData(this.prodData, this.sourceProdData,this.showCopy)
                if(this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                }else{
                    this.targetData.optionType = "U"
                }
                this.targetData.option = "save";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        this.pendFlag = 1
                        this.mainSeqNo = response.data.data.mainSeqNo;
                        this.sweetAlert('success',"提交成功!")
                        this.spinning= false
                        let setTaskEvent= new Event("taskList");
                        window.dispatchEvent(setTaskEvent);
                    }
                })
            },
            //产品菜单列表监听
            listenToProdList(value) {
                this.prodCode = value.prodType
                this.getCollectInfo();
                this.prodData = {}
                getProdDataAsync(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodDesc = response.data.data.prodType.prodDesc;
                    this.sourceModule = response.data.data.prodType.sourceModule;
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                    this.initEventAttr(this.prodData)
                });
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
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
            //复制事件监听
            listenToCopy(data) {
                this.baseProdRange = false
                this.prodCode=data.prodType;
                this.prodDesc = data.prodDesc;
                this.prodData.prodType.prodType=data.prodType;
                this.prodData.prodType.prodDesc=data.prodDesc;
                const newData=this.copy(this.prodData,[]);
                this.prodData=newData;
                if(!data.showCopy){
                    this.showCopy = 'Y';
                }else{
                    this.showCopy = '';
                }
            },
            //刷新按钮事件
            refreshClick() {
                getProdDataAsync(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
            },
            //编辑事件触发
            editClick() {
                if(!this.powerButton){
                    this.sweetAlert('info',"用户没有编辑基础产品权限!")
                    return
                }
                this.editShow = this.editShow === true?false:true
                this.windowShow = this.windowShow?0:1
                const edit=this.showEdit;
                this.showEdit=edit==false?true:false;
                if(this.showAdd){
                    this.showAdd = false
                    this.editDesc = "编辑模式"
                    this.editColor = "primary lighten-2"
                }else{
                    this.showAdd = true
                    this.editDesc = "退出编辑"
                    this.editColor = "orange"
                }
            },
            /**
             * @description 增加参数处理事件
             * @param val 新增参数集合  typeof(val) == Array
             * @param columnType: ATTR-参数  PART-指标
             * @param columnKey-参数/指标key  columnDesc-参数/指标描述
             */
            useAddClick(val) {
                let addColumnPageCode = this.prodInfo[this.activeName].pageCode
                let addColumnData = this.copy(this.prodData,this.addData)
                let showFlag = 0;
                let findInAttr = false;
                let findInPart = false;
                let eventId = this.getEventType(addColumnPageCode,this.prodCode);
                for(let i=0; i<val.length; i++){
                    let columnRange = val[i].split("--")[0];
                    let columnKey = val[i].split("--")[1];
                    let columnDesc = val[i].split("--")[2];
                    let addColumnPageSeqNo = this.getDefinedMaxSeqNo(this.prodData,addColumnPageCode)+i+1;
                    //组装向mbProdDefine保存的数对象据
                    if(addColumnPageCode === "DESC" || addColumnPageCode === "CHARGE" || addColumnPageCode === "RATEINFO" || addColumnPageCode === "ACCOUNTING" || addColumnPageCode == "PROD" || addColumnPageCode == "STAGE" || addColumnPageCode == "AMEND"){
                        showFlag = 1;
                        this.sweetAlert('info',"当前页签不允许增加参数!");
                        break;
                    }
                    //新增指标  数据处理  通过partId获取指标下参数，装载数据到prodData(标注：增加一个指标，prodData至少增加两条参数信息)
                    if(columnRange == "PART"){
                        //指标存在性检查
                        for(let attrIndex in this.prodData.mbProdDefine){
                            if(this.prodData.mbProdDefine[attrIndex].assembleType == 'PART' && this.prodData.mbProdDefine[attrIndex].assembleId.split('-')[0] == columnKey){
                                //指标信息已经存在
                                showFlag = 1;
                                findInPart = true;
                                this.sweetAlert('info',"产品已存在指标" + columnKey + "【" + columnDesc + "】");
                                break;
                            }
                        }
                        if(!findInPart) {
                            //指标时候  通过指标Id获取指标下参数
                            const response = findByPartType(columnKey);
                            let partAttrs = response.partAttrList;
                            let pageCodeP = 0;
                            for (let newPartIndex in partAttrs) {
                                let assembleId = columnKey + '-' + partAttrs[newPartIndex].attrKey;
                                addColumnData.prodDefines[assembleId] = {};
                                addColumnData.prodDefines[assembleId].prodType = this.prodCode;
                                addColumnData.prodDefines[assembleId].eventType = eventId;
                                addColumnData.prodDefines[assembleId].assembleType = "PART";
                                addColumnData.prodDefines[assembleId].assembleId = columnKey;
                                addColumnData.prodDefines[assembleId].attrKey = partAttrs[newPartIndex].attrKey;
                                addColumnData.prodDefines[assembleId].attrValue = "";
                                addColumnData.prodDefines[assembleId].status = "A";
                                addColumnData.prodDefines[assembleId].pageCode = addColumnPageCode;
                                addColumnData.prodDefines[assembleId].pageSeqNo = addColumnPageSeqNo + pageCodeP;
                                addColumnData.prodDefines[assembleId].optionPermissions = "E";
                                addColumnData.prodDefines[assembleId].newAttr = true;
                                pageCodeP++;
                            }
                        }
                    }
                    if(columnRange == "ATTR"){
                        //新增参数 数据处理  正常操作逻辑处理
                        let addColumnPageSeqNo = this.getDefinedMaxSeqNo(this.prodData,addColumnPageCode)+i+1;
                        //判断新增参数是否存在
                        if (this.prodData.prodDefines[columnKey] !== undefined) {
                            //已经存在该条数据
                            showFlag = 1;
                            findInAttr = true;
                            this.sweetAlert('info',"产品已存在参数" + columnKey + "【" + columnDesc + "】")
                        }
//                        for(let attrIndex in this.prodData.prodDefines){
//                            if(this.prodData.mbProdDefine[attrIndex].assembleType == 'ATTR' && this.prodData.prodDefines[attrIndex].assembleId == columnKey){
//                                //已经存在该条数据
//                                showFlag = 1;
//                                findInAttr = true;
//                                this.sweetAlert('info',"产品已存在参数" + columnKey + "【" + columnDesc + "】");
//                                break;
//                            }
//                        }
                        if(!findInAttr){
                            addColumnData.prodDefines[columnKey] = {}
                            addColumnData.prodDefines[columnKey].prodType = this.prodCode;
                            addColumnData.prodDefines[columnKey].eventType = eventId;
                            addColumnData.prodDefines[columnKey].assembleType = "ATTR";
                            addColumnData.prodDefines[columnKey].assembleId = columnKey;
                            addColumnData.prodDefines[columnKey].attrKey = columnKey;
                            addColumnData.prodDefines[columnKey].attrValue = "";
                            addColumnData.prodDefines[columnKey].status = "A";
                            addColumnData.prodDefines[columnKey].pageCode = addColumnPageCode;
                            addColumnData.prodDefines[columnKey].pageSeqNo = addColumnPageSeqNo;
                            addColumnData.prodDefines[columnKey].optionPermissions = "E";
                            addColumnData.prodDefines[columnKey].newAttr = true;
                        }
                    }
                }
                if(showFlag === 0) {
                    this.prodData = addColumnData
                    this.initEventAttr(this.prodData)
                    this.sweetAlert('success',"编辑成功!")
                    this.dialog = false
                }
            },
            getEventType(addColumnPageCode,prodType){
                let eventId = "";
                if(addColumnPageCode === "OPEN" || addColumnPageCode === "CLOSE"|| addColumnPageCode === "CRET" || addColumnPageCode === "DEBT" || addColumnPageCode === "DUE" || addColumnPageCode === "DRW" || addColumnPageCode === "REC") {
                    eventId = addColumnPageCode + "_" + prodType;
                }else{
                    eventId = "BASE_" + prodType;
                }
                return eventId;
            },
            addClick() {
                this.addColumnPageDesc = this.prodInfo[this.activeName].text
                //获取所有参数定义的json文件（columnInfo.json）增加到待选数据集合
                for(let i in this.attrColumnInfo){
                    this.addColumnsRef.push(i+'--'+this.attrColumnInfo[i].columnDesc)
                }
            },
            //获取mbProdDefine最大seqNo val:目标集合 pageCode：当前所属界面标志
            getDefinedMaxSeqNo(val,pageCode) {
                //获取界面元素数组
                let SeqNoArr = []
                let keys = "pageSeqNo";
                for(let i in val.prodDefines){
                    if(val.prodDefines[i].pageCode === pageCode && val.prodDefines[i][keys] !== null && val.prodDefines[i][keys] !== '') {
                        SeqNoArr.push(val.prodDefines[i][keys])
                    }
                }
                //获取seqNoArr数组最大数据
                let maxSeqNo = 0
                if(SeqNoArr.length) {
                    maxSeqNo = SeqNoArr[0];
                    for (let j = 1; j < SeqNoArr.length; j++) {
                        if (maxSeqNo < SeqNoArr[j]) {
                            maxSeqNo = SeqNoArr[j];
                        }
                    }
                }
                return maxSeqNo
            },
            //处理event part参数 data： 目标集合 eventType：事件类型 prodCode：产品类型   将参数组织成{{key:"",value: ""},{key:"",value: ""},...}结构
            dealEventPart(data,eventType,prodCode) {
                let eventTypes = eventType+'_'+prodCode
                const event=data.mbEventInfos[eventTypes]
                let events={}
                for(const index in event.mbEventAttrs){
                    events[index]=event.mbEventAttrs[index]
                }
                return events
            },
            //用户维度  检查用户是否收藏该产品
            getCollectInfo(){
                let userId = sessionStorage.getItem("userId");
                let that = this;
                let prodCode = that.prodCode;
                getUserCollectByUserId(userId).then(response => {
                    let data = response.data.data.collectList;
                    let flag = false;
                    for(let key in data){
                        if(data[key].prodType == prodCode){
                            that.collectColor = "orange lighten-1";
                            that.collectDesc = "取消收藏";
                            flag = true;
                            break;
                        }
                    }
                    if(!flag){
                        that.collectColor = "primary lighten-2";
                        that.collectDesc = "收藏";
                    }
                })
            },
            //点击收藏事件
            collectClick(){
                let optType = "";
                if(this.collectColor == "primary lighten-2"){
                    //收藏
                    optType = "I";
                }
                if(this.collectColor == "orange lighten-1"){
                    //取消收藏
                    optType = "D";
                }
                let collect = {};
                collect["optType"] = optType;
                collect["userId"] = sessionStorage.getItem("userId");
                collect["prodType"] = this.prodCode;
                collect["prodDesc"] = this.prodDesc;
                collect["sourceModule"] = this.sourceModule;
                collect["prodRange"] = this.prodRange;
                let color = this.collectColor;
                saveCollectProd(collect).then(response => {
                    if(response.status === 200) {
                        if(color == "orange lighten-1") {
                            this.collectColor = "primary lighten-2";
                            this.collectDesc = "收藏";
                            this.sweetAlert('success', "取消收藏成功!")
                        }
                        if(color == "primary lighten-2"){
                            this.collectColor = "orange lighten-1";
                            this.collectDesc = "取消收藏";
                            this.sweetAlert('success', "收藏成功!")
                        }
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .textProd{
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
        font-size: 17px;
    }
    .RB >>> .v-tabs__item {
        font-size: 17px;
    }
    .RB >>> .primary--text {
        color: #000000!important;
        font-size: 16px;
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
    .RB >>>.primary.lighten-2 {
        background-color: #F4F5F8!important;
        border-bottom:1px solid #DCE1E7!important;
        box-shadow: none!important;

    }
    .RB >>> .primary.lighten-2 .white--text {
        color: #2C2F43!important;
    }

</style>