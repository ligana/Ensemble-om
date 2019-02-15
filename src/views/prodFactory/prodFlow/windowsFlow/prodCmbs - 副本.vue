<template>
    <v-layout class="pt-4" id="father">
        <v-flex md3 lg3 class="ml-4">
            <v-flex xs12>
                <v-card class="elevation-4 radiusDc">

                    <v-card-media src="/static/bg/18.jpg" style="height: 150px">
                        <v-card-title class="pb-0" style="font-size: xx-large">
                            <h2 class="title">{{title}}</h2>
                            <h2 class="title" style="color: white">{{titleSum}}</h2>
                        </v-card-title>
                    </v-card-media>
                    <v-layout style="margin-top: -9px">
                        <!--<v-flex md1 lg1>-->
                            <!--<v-icon style="margin-top: 20px;color: blue;">call_split</v-icon>-->
                        <!--</v-flex>-->
                        <v-flex md11 lg11>
                            <v-select :items="typeClass" hide-details v-model="selectValue" label="请选择分类" item-text="value" color="write" item-value="key" single-line>
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs12 class="mt-2 pb-4">
                <v-card style="height: 400px; max-height: 400px;overflow-y: scroll" class="elevation-4 radiusDc">
                    <v-list>
                        <v-list-tile v-for="item in checkedClass" :key="item.title" @click="chipClick(item)" :class="item.class">
                            <v-list-tile-action>
                                <h2 class="title" style="color: red">{{titleSum}}</h2>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title style="font-size: medium">{{ item.lable }}</v-list-tile-title>
                            </v-list-tile-content>

                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-flex>
        <v-flex md9 lg9 class="pl-4">
            <prod-list-cmb :items="prodListDtl"></prod-list-cmb>
        </v-flex>
    </v-layout>
</template>

<script>
    import prodListCmb from '../tableFlow/prodListCmb';
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getAllDefines } from '@/api/url/prodInfo';
    import { getProdClassList } from '@/api/url/prodInfo';

    import {
        getProdType
    } from '@/api/url/prodInfo'
    export default {
        components: {
            prodListCmb,
        },
        data: () => ({
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
            prodTypeList: {},
            prodClassList: {},
            prodDefinesList: {},
            prodTemp: []
        }),
        watch: {
            selectValue: {
                handler(val){
                    this.selectClick(val)
                }
            },
        },
        created() {
            //查询所有产品信息
            this.getAllProdInfo()
        },
        mounted: function() {
            this.selectValue = "sourceModule"
        },
        methods: {
            //获取所有prod_type prod_define prod_class产品信息
            getAllProdInfo(){
                //获取所有prodType
                getAllProdList().then(response => {
                    this.prodTypeList = response.data.data
                    this.prodListDtl = response.data.data
                    this.title = "产品总数"
                    this.titleSum = response.data.data.length
                });
                //获取所有prodDefines
                getAllDefines().then(response => {
                    this.prodDefinesList = response.data.data
                });
                //获取所有prodClass
                getProdClassList().then(response => {
                    console.log(response,9999);
                    this.prodClassList = response.data.data
                    for(let i=0; i<response.data.data.length; i++){
                        if(response.data.data[i].prodClassLevel === "1") {
                            let obj = {}
                            obj["key"] = i
                            obj["value"] = response.data.data[i].prodClass
                            obj["lable"] = response.data.data[i].prodClassDesc
                            this.checkedClass.push(obj)
                        }
                    }
                });
            },
            chipClick(val) {
                this.title = val.lable
                this.prodListDtl = []
                this.prodTemp = []
                let key = this.checkedTypeKey
                //加载产品列表
                if(key === "baseProdType" || key === "prodRange" || key === "status" || key === "sourceModule"){
                    for(let l=0; l<this.prodTypeList.length; l++){
                        if(this.prodTypeList[l][key] === val.value){
                            this.prodTemp.push(this.prodTypeList[l])
                        }
                    }
                }
                this.titleSum = this.prodTemp.length+""
                this.prodListDtl = this.prodTemp

            },
            selectClick(val){
                let key = val
                this.checkedTypeKey = key
                this.checkedClass = []
                if(key === "sourceModule"){
                    //从prodClass中获取所有一级目录
                    for(let i=0; i<this.prodClassList.length; i++){
                        if(this.prodClassList[i].prodClassLevel === "1") {
                            let obj = {}
                            obj["key"] = i
                            obj["value"] = this.prodClassList[i].prodClass
                            obj["lable"] = this.prodClassList[i].prodClassDesc
                            this.checkedClass.push(obj)
                        }
                    }
                }
                if(key === "baseProdType"){
                    let key = key
                    for(let k=0; k<this.prodTypeList.length; k++){
                        if(this.prodTypeList[k].prodRange === "B" && !this.findIn(this.checkedClass,this.prodTypeList[k][key])){
                            let objBaseType = {}
                            objBaseType["key"] = k
                            objBaseType["value"] = this.prodTypeList[k].prodType
                            objBaseType["lable"] = this.prodTypeList[k].prodDesc
                            this.checkedClass.push(objBaseType)
                        }
                    }
                }
                if(key === "prodRange" || key === "status"){
                    let key1 = key
                    let tempList = this.prodTypeList
                    for(let j=0; j<tempList.length; j++){
                        if(!this.findIn(this.checkedClass,tempList[j][key1])) {
                            let objType = {key: "",value: "",lable: ""}
                            objType.key = j
                            objType.value = tempList[j][key1]
                            if (tempList[j][key1] == "B") {
                                objType.lable = "基础产品"
                            }
                            if (tempList[j][key1] == "S") {
                                objType.lable = "可售产品"
                            }
                            if (tempList[j][key1] == "A") {
                                objType.lable = "有效产品"
                            }
                            if (tempList[j][key1] == "C") {
                                objType.lable = "封存产品"
                            }
                            this.checkedClass.push(objType)
                        }
                    }
                }
            },
            //判断已存在
            findIn(val,key) {
                for(let m=0; m<val.length; m++){
                    if(key === val[m].value){
                        return true
                    }
                }
                return false
            }
        }
    }
</script>
<style scoped>
    .prodList {
        color: #00b0ff;
        margin-left: -10px;
    }
    .title {
        color: white;margin-left: auto;margin-right: auto;margin-top: 1px;margin-bottom: auto
    }
    #father >>> .white {
        background-color: #F4F5F9!important;
    }
    #father >>> .theme--light.v-text-field--solo .v-input__slot {
        border: 1px solid rgba(0,0,0,.12);
    }
    #father >>> .v-btn--floating.v-btn--small {
        height: 35px;
        width: 35px;
    }
    #father >>> .v-input--selection-controls .v-input__slot {
        margin-bottom:0px;
    }
</style>