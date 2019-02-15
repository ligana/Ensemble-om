<template>

    <v-layout class="pt-4 father" >
        <v-flex md3 lg3 class="ml-4">
            <v-flex xs12>
                
                <v-card class="top">
                    <!--<v-card-media src="/static/bg/18.jpg" style="height: 150px">-->
                    <!--<v-card-title class="pb-0" style="font-size: xx-large">-->
                    <!--<h2 class="title">{{title}}</h2>-->
                    <!--<h2 class="title" style="color: white">{{titleSum}}</h2>-->
                    <!--</v-card-title>-->
                    <!--</v-card-media>-->
                    <v-layout style="height: 64px;background-color: #F4F5F9!important;">
                        <!--<v-flex md1 lg1>-->
                        <!--<v-icon style="margin-top: 20px;color: blue;">call_split</v-icon>-->
                        <!--</v-flex>-->
                        <v-flex md11 lg11>
                            <v-select :items="typeClass" hide-details v-model="selectValue" label="请选择分类"
                                      item-text="value" color="write" item-value="key" single-line>
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
           
            <v-flex xs12 class="scroll" style="">
                <v-card style="height: 400px; max-height: 400px;">
                    <v-list class="hidden_scroll">
                        <v-list-tile v-for="(item,index) in checkedClass" :key="index"
                                     @click="chipClick(item,index)" :class="activeClass == index ? 'active':''">

                            <v-list-tile-content>
                                <v-list-tile-title style="font-size: medium">{{ item.lable }}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <div>{{item.sum}}</div>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-flex>
        <v-flex md9 lg9 class="pl-4">
           
            <prod-list-cmb :items="prodListDtl" class="product"></prod-list-cmb>
        </v-flex>
    </v-layout>
</template>

<script>
    /* eslint-disable complexity */

    import prodListCmb from '../tableFlow/prodListCmb';

    import {getAllProdList} from '@/api/url/prodInfo';
    import {getAllDefines} from '@/api/url/prodInfo';
    import {getProdClassList} from '@/api/url/prodInfo';

    import {
        getProdType
    } from '@/api/url/prodInfo'

    export default {
        components: {
            prodListCmb,
        },
        data: () => ({
            activeClass: -1,
            titleSum: "",
            title: "",
            selectValue: "",
            checkedTypeKey: "",
            checkedClass: [],
            window: 0,
            panel: [false, true, true],
            items: [],
            prodListDtl: [],
            typeClass: [
                {
                    key: "sourceModule",
                    value: "业务模块分类"
                },
                {
                    key: "prodRange",
                    value: "产品属性分类"
                },
                {
                    key: "status",
                    value: "产品状态分类"
                },
                {
                    key: "baseProdType",
                    value: "基础产品分类"
                }
            ],
            files: [
                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'sourceModule',
                    lable: '业务模块分类'
                },

                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'prodRange',
                    lable: '产品属性分类'
                },
                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'status',
                    lable: '产品状态分类'
                },
                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'baseProdType',
                    lable: '基础产品分类'
                }
            ],

        }),
        watch: {
            selectValue: {
       
                handler(val) {
                    this.selectClick(val)
                }
            },
        },
        created() {
            //查询所有产品信息
            this.getAllProdInfo()

        },
     
        mounted: function () {
            this.selectValue = "sourceModule"
        },
        methods: {
            //获取所有prod_type prod_define prod_class产品信息
         
            getAllProdInfo() {
                //获取所有prodType
                var _this = this
                getAllProdList().then(response => {
                 
                    _this.prodTypeList = response.data.data
                    _this.prodListDtl = response.data.data
                    _this.title = "产品总数"
                    _this.titleSum = response.data.data.length

                });
                //获取所有prodClass
                getProdClassList().then(response => {
                    this.prodClassList = response.data.data

                    for (let i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].prodClassLevel === "1") {
                            let sum = 0;
                            let prodClass = response.data.data[i].prodClass;
                            for (let index in _this.prodTypeList) {
                                if (_this.prodTypeList[index].sourceModule == prodClass) {
                                    sum++
                                }
                            }
                            let obj = {}
                            obj["key"] = i
                            obj["value"] = response.data.data[i].prodClass
                            obj["sum"] = sum;
                            obj["lable"] = response.data.data[i].prodClassDesc
                            this.checkedClass.push(obj)
                        }
                    }
                });
            },
        
            chipClick(val, index) {
                this.activeClass = index;
                this.title = val.lable
                this.prodListDtl = []
                this.prodTemp = []
                let key = this.checkedTypeKey
                //加载产品列表
               
                if (key === "baseProdType" || key === "prodRange" || key === "status" || key === "sourceModule") {
                    for (let l = 0; l < this.prodTypeList.length; l++) {
                        if (this.prodTypeList[l][key] === val.value) {
                            this.prodTemp.push(this.prodTypeList[l])
                        }
                    }
                }
               
                this.titleSum = this.prodTemp.length + ""
                this.prodListDtl = this.prodTemp

            },
        
            selectClick(val) {
                let key = val
                this.checkedTypeKey = key
                this.checkedClass = []
             
                if (key === "sourceModule") {
                    //从prodClass中获取所有一级目录
               
                    for (let i = 0; i < this.prodClassList.length; i++) {
                        if (this.prodClassList[i].prodClassLevel === "1") {
                            let sum = 0;
                            let prodClass = this.prodClassList[i].prodClass;
                            for (let index in this.prodTypeList) {
                                if (this.prodTypeList[index].sourceModule == prodClass) {
                                    sum++
                                }
                            }
                            console.log(sum, "clickqqq");
                            let obj = {}
                            obj["key"] = i
                            obj["sum"] = sum;
                            obj["value"] = this.prodClassList[i].prodClass
                            obj["lable"] = this.prodClassList[i].prodClassDesc
                            this.checkedClass.push(obj)
                        }
                    }
                }
              
                if (key === "baseProdType") {
                    let key = key
              
                    for (let k = 0; k < this.prodTypeList.length; k++) {
                        if (this.prodTypeList[k].prodRange === "B" && !this.findIn(this.checkedClass, this.prodTypeList[k][key])) {
                            let sum = 0;
                            let prodType = this.prodTypeList[k].prodType
                            console.log(prodType, "clickqprodType");
                            for (let index in this.prodTypeList) {
                                if (this.prodTypeList[index].baseProdType == prodType) {
                                    sum++
                                }
                            }
                            let objBaseType = {}
                            objBaseType["key"] = k
                            objBaseType["sum"] = sum
                            objBaseType["value"] = this.prodTypeList[k].prodType
                            objBaseType["lable"] = this.prodTypeList[k].prodDesc
                            this.checkedClass.push(objBaseType)
                        }
                    }
                }
               
                //属性分类
                if (key === "prodRange") {
                    let key1 = key
                 
                    for (let w = 0; w < this.prodTypeList.length; w++) {
                        if (!this.findIn(this.checkedClass, this.prodTypeList[w][key1])) {
                            let sum = 0;
                            let prodRange = this.prodTypeList[w].prodRange
                            console.log(prodRange, "clickqprodType");
                            for (let index in this.prodTypeList) {
                                if (this.prodTypeList[index].prodRange == prodRange) {
                                    sum++
                                }
                            }
                          
                            let objprodRange = {}
                            objprodRange["key1"] = w
                            objprodRange["sum"] = sum
                            objprodRange["value"] = this.prodTypeList[w].prodRange
                            if (this.prodTypeList[w][key1] == "B") {
                                objprodRange["lable"] = "基础产品"
                            }
                         
                            if (this.prodTypeList[w][key1] == "S") {
                                objprodRange["lable"] = "可售产品"
                            }
                          
                            this.checkedClass.push(objprodRange)
                        }
                    }
                }
                //状态分类
                if (key === "status") {
                    let key2 = key
                    for (let X = 0; X < this.prodTypeList.length; X++) {
                        if (!this.findIn(this.checkedClass, this.prodTypeList[X][key2])) {
                            let sum = 0;
                            let status = this.prodTypeList[X].status
                            console.log(status, "clickqprodType");
                            for (let index in this.prodTypeList) {
                                if (this.prodTypeList[index].status == status) {
                                    sum++
                                }
                            }
                    
                            let objstatus = {}
                            objstatus["key2"] = X
                            objstatus["sum"] = sum
                            objstatus["value"] = this.prodTypeList[X].status
                            if (this.prodTypeList[X][key2] == "A") {
                                objstatus["lable"] = "有效产品"
                            }
                            if (this.prodTypeList[X][key2] == "C") {
                                objstatus["lable"] = "封存产品"
                            }
                            this.checkedClass.push(objstatus)
                        }
                    }
                }

            },
            //判断已存在
          
            findIn(val, key) {
                for (let m = 0; m < val.length; m++) {
                    if (key === val[m].value) {
                        return true
                    }
                }
                return false

            },
        }
    }
</script>
<style scoped>
    .prodList {
        color: #00b0ff;
        margin-left: -10px;
    }

    .title {
       
        color: white;
        margin-left: auto;
        margin-right: auto;
        margin-top: 1px;
        margin-bottom: auto
    }

    .father >>> .white {
        background-color: #F4F5F9 !important;
        box-shadow: none;
        border: 1px solid rgba(0, 0, 0, .12) !important;
        border-bottom: 0px solid rgba(0, 0, 0, .12) !important;
        border-radius: 0px !important;
    }

    .father >>> .radiusDc {
        box-shadow: none !important;
        border-radius: 0px !important;
    }

    .father >>> .theme--light.v-text-field--solo .v-input__slot {
        border: 1px solid rgba(0, 0, 0, .12);
    }

    .father >>> .v-btn--floating.v-btn--small {
        height: 35px;
        width: 35px;
    }

    .father >>> .v-input--selection-controls .v-input__slot {
        margin-bottom: 0px;
    }

    .father >>> .v-select {
        margin-top: 0;
        padding: 15px 0px 15px 15px;
        height: 64px;
        line-height: 64px !important;
    }

   .father div.v-menu__content {
        top: 199px !important;
    }

    .father >>> .v-text-field > .v-input__control > .v-input__slot:after {
        border-style: none !important;
    }

   .father >>> .v-text-field > .v-input__control > .v-input__slot:before {
        border-style: none !important;
    }

    .father >>> .top {
        border: 1px solid #D6D6D6;
        box-shadow: none;
    }

    .father .scroll {
        borde: 1px solid #D3D3D3;
        border-right: 1px solid #D3D3D3;
        border-bottom: 1px solid #D3D3D3;
        border-top: none;
        position: relative;
        overflow: hidden;
    }

    .father .hidden_scroll {
        position: absolute;
        left: 0;
        top: 0;
        right: -17px;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .active {
        background-color: #3C73E6 !important;
        color: #fff;
    }

    .father >>> .v-list .v-list__tile--link:hover {
        background-color: rgba(0, 0, 0, 0) !important;
        color: rgba(0, 0, 0, 0.85) !important;;
    }

    .father >>> .v-list__tile__content {
        padding-left: 20px;
    }

    .father .product >>> .v-card__text > .elevation-1 {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
        border-top: 0px solid #ccc !important;
    }
</style>