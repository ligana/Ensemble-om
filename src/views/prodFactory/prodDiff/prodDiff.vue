<template>
    <div>
        <v-card class="PD">
            <v-toolbar flat >
                <v-layout style="color: #58595E!important;" class="deepskyblue">
                    <div class="header">
                        <v-switch v-model="ex11" label="隐藏未修改参数" color="success" value="Y" hide-details class="prodDiffSwitch"></v-switch>
                    </div>
                    <div class="header">
                        <v-toolbar-title>NEW</v-toolbar-title>
                    </div>
                    <div class="header">
                        <v-toolbar-title>OLD</v-toolbar-title>
                    </div>
                </v-layout>
            </v-toolbar>

            <v-card-text class="pa-0">
                <v-layout row wrap class="diffListF">
                    <div v-for="(prodList, index1) in prodDiffData" class="diffList">
                        <v-list dense>
                            <template v-for="(item, index) in prodList.items">
                                <v-divider v-if="item.divider" :inset="item.inset"></v-divider>
                                <v-list-tile avatar v-else :class="{'tbColor':item.diff}">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                    </v-list-tile-content>
                                    <v-tooltip bottom color="lighten-1" v-if="prodRange == 'B' && item.isBase == true">
                                        <v-btn round color="blue" dark style="height: 100%;font-size: small;" slot="activator">
                                            影响范围
                                        </v-btn>
                                        <span >
                                            <v-list style="background-color: #3C73E6!important;padding: 5px; margin: -5px -8px" >
                                              <template v-for="(item, index) in baseEffectProd">
                                                    <v-list-tile-title v-html="item.prodType+'--  '+item.prodDesc" style="color: white; font-size: small"></v-list-tile-title>
                                              </template>
                                            </v-list>
                                        </span>
                                    </v-tooltip>
                                    <v-tooltip bottom color="orange" v-if="item.perm !== undefined">
                                        <v-btn flat icon="edit" slot="activator">
                                            <v-icon :color="item.color">{{item.perm}}</v-icon>
                                        </v-btn>
                                        <span>{{item.desc}}</span>
                                    </v-tooltip>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </div>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

    import {getColumnDesc} from '@/utils/columnDesc'
    import DcSwitch from "@/components/widgets/DcSwitch";

    export default {
        components: {DcSwitch},
        props: ['prodData'],
        data() {
            return {
                ex11: "",
                onlyDiff: 'Y',
                ee: "ww",
                prodRange: "",
                show: 0,
                optPerm: {
                    E: {
                        icon: "edit",
                        color: "blue",
                        desc: "可编辑"
                    },
                    N: {
                        icon: "no_sim",
                        color: "orange",
                        desc: "不可编辑"
                    },
                    V: {
                        icon: "visibility_off",
                        color: "green",
                        desc: "不可见"
                    },
                    D: {
                        icon: "delete",
                        color: "red",
                        desc: "删除"
                    }
                },
                baseEffectProd: {},
                prodDiffData: [
                    {
                        prodType: "",
                        items: [
                            {
                                title: "产品代码"
                            },
                            {divider: true, inset: true},
                            {
                                title: "产品名称"
                            },
                            {divider: true, inset: true},
                            {
                                title: "产品状态"
                            },
                            {divider: true, inset: true},
                            {
                                title: "产品类别"
                            },
                            {divider: true, inset: true},
                            {
                                title: "产品结构"
                            },
                            {divider: true, inset: true},
                            {
                                title: "余额类型"
                            },
                            {divider: true, inset: true},
                            {
                                title: "账户计息标志"
                            },
                            {divider: true, inset: true},
                            {
                                title: "利润中心"
                            },
                            {divider: true, inset: true},
                            {
                                title: "生效日期"
                            },
                            {divider: true, inset: true},
                            {
                                title: "失效日期"
                            }
                        ]
                    }
                ]
            };
        },
        computed: {
            randomColor() {
                let item = Math.floor(Math.random() * this.colors.length);
                return this.colors[item];
            }
        },
        watch: {
            ex11(val) {
                if (val == this.onlyDiff) {
                    let prodList = this.prodDiffData;
                    let newListSub = [];
                    for (const item in prodList) {
                        let newList = [];
                        for (const items in prodList[item].items) {
                            if (prodList[item].items[items].diff == true) {
                                newList.push({divider: true, inset: true});
                                newList.push(prodList[item].items[items]);

                            }
                        }
                        if (newList.length > 0) {
                            const data = {prodType: prodList[item].prodType};
                            data.items = newList;
                            newListSub.push(data);
                        }
                    }
                    this.prodDiffData = newListSub;
                } else {
                    this.queryDespositProdData();
                }
            },
            prodData(val) {
                this.queryDespositProdData()
            }
        },
        methods: {
            queryDespositProdData() {
                let data = this.$props.prodData;
                this.assemblingDiff(data);
            },
            assemblingDiff(prodService) {
                const prodDefines = prodService.prodDefines;
                let prodDiff = prodService.diff;
                const prodType = prodService.prodType;
                const baseEffectProd = prodService.baseEffectProd
                if (baseEffectProd !== undefined) {
                    this.baseEffectProd = prodService.baseEffectProd
                    this.prodRange = baseEffectProd[prodType].prodRange
                }
                if (prodDiff == undefined) {
                    prodDiff = {};
                }
                let columnDesc = [];
                let columnNew = [];
                let columnOld = [];
                //产品本身下参数固定组
                //产品下属性组合
                if (prodDefines != undefined && JSON.stringify(prodDefines) != "{}") {
                    for (let index in prodDefines) {
                        if (prodDefines[index].assembleType != "EVENT") {
                            let prodDefine = prodDefines[index];
                            let attrKey = prodDefine.attrKey;
                            let attrValue = prodDefine.attrValue;
                            if (attrKey == undefined) {
                                attrKey = index;
                                attrValue = prodDefine.attrValue;
                            }
                            let diff = prodDiff[attrKey];
                            let optPerm = ""
                            if (diff !== undefined) {
                                diff = prodDiff[attrKey].attrValue
                                optPerm = prodDiff[attrKey].optionPermissions
                            }
                            if (diff == null || diff == undefined) {
                                diff = attrValue;
                            }
                            const keyDesc = getColumnDesc(attrKey);
                            if (diff != attrValue) {
                                columnOld.push({title: attrValue, diff: true});
                                columnNew.push({title: diff, diff: true});
                                if (this.prodRange === "B") {
                                    columnDesc.push({title: keyDesc, diff: true, isBase: true});
                                } else {
                                    columnDesc.push({title: keyDesc, diff: true});
                                }
                            } else {
                                columnOld.push({title: attrValue});
                                columnNew.push({title: diff});
                                columnDesc.push({title: keyDesc});
                            }
                            //参数状态位处理
                            if (optPerm !== "" && optPerm !== prodDefine.optionPermissions) {
                                let oldPerm = optPerm
                                let newPerm = prodDefine.optionPermissions
                                columnNew.push({
                                    title: attrValue,
                                    diff: true,
                                    perm: this.optPerm[oldPerm].icon,
                                    color: this.optPerm[oldPerm].color,
                                    desc: this.optPerm[oldPerm].desc
                                });
                                columnOld.push({
                                    title: diff,
                                    diff: true,
                                    perm: this.optPerm[newPerm].icon,
                                    color: this.optPerm[newPerm].color,
                                    desc: this.optPerm[newPerm].desc
                                });
                                if (this.prodRange === "B") {
                                    columnDesc.push({title: keyDesc, diff: true, isBase: true});
                                } else {
                                    columnDesc.push({title: keyDesc, diff: true});
                                }
                            }
                            columnDesc.push({divider: true, inset: true});
                            columnOld.push({divider: true, inset: true});
                            columnNew.push({divider: true, inset: true});
                        }
                    }
                    //源参数不为空时候 增加参数处理
                    for (let newKey in prodDiff) {
                        if (prodDefines[newKey] == undefined) {
                            let descNew = getColumnDesc(newKey.substring(newKey.lastIndexOf('.') + 1));
                            columnDesc.push({title: descNew});
                            columnDesc.push({divider: true, inset: true});
                            columnNew.push({title: prodDiff[newKey].attrValue});
                            columnNew.push({divider: true, inset: true});
                        }
                    }
                } else {
                    for (let index in prodDiff) {
                        let desc = getColumnDesc(index.substring(index.lastIndexOf('.') + 1));
                        columnDesc.push({title: desc});
                        columnDesc.push({divider: true, inset: true});
                        columnNew.push({title: prodDiff[index].attrValue});
                        columnNew.push({divider: true, inset: true});
                    }
                }
                let diffList = [];
                let columnDescList = {prodType: '', items: columnDesc};
                let columnNewList = {prodType: '', items: columnNew};
                let columnOldList = {prodType: '', items: columnOld};
                diffList.push(columnDescList);
                diffList.push(columnNewList);
                diffList.push(columnOldList);
                this.prodDiffData = diffList;
            }
        }
    };
</script>
<style scoped>
    .PD >>> .v-toolbar__content {
        padding: 0;
    }
    .PD >>> .success--text {
        color: #3C73E6 !important;
        caret-color: #3C73E6 !important;
    }
    .deepskyblue {
        display: flex;
        justify-content: flex-start;
        height: 64px;
        line-height: 64px;
    }
    .header {
        width: 33.333333333%;
        border: 1px solid  rgba(40, 24, 31, 0.21);
        border-top-width: 0px;
        padding-left: 20px;
        margin-right:1%;
    }
    .header:nth-child(1){
        border-left-width: 0px;
    }
    .header:nth-child(3){
        border-right-width: 0px;
        margin-right:0%;
    }
    .diffListF {
        display: flex;
        justify-content: flex-start;
    }
    .diffList {
        width: 32.66%;
        border-right: 1px solid rgba(40, 24, 31, 0.21);
        border-left: 1px solid rgba(40, 24, 31, 0.21);
        text-align: center;
        font-size: large;
        margin-right:1%;
    }
    .diffList:nth-child(1){
        border-left-width: 0px;
    }

    .tbColor {
        background-color: #e3f2fd;
    }

    .diffList .v-divider--inset:not(.v-divider--vertical) {
        margin-left: 0px;
        max-width: 888px;
    }

    .prodDiffSwitch {
        display: inline-block;
        margin-top: 4%;
    }

    .prodDiffButton {
        float: right;
    }

    .diffIdButton {
        text-align: center;
    }

    .diffEg {
        height: 48px;
    }

    .diffTitle {
        color: #BBDEFB;
    }
</style>