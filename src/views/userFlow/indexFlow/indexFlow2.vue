<template>
    <div class="pt-4 father">
        <v-layout align-center justify-space-between row fill-height class="v-card">
            <v-flex lg8 sm7 class="wecome">
                <span class="headline text-xs-center">admin,你好,</span>
                <span class="title text-xs-center">欢迎进入XXX银行产品工厂</span>
            </v-flex>
            <v-flex lg4 sm5 class="statistics_box">
                <v-layout row wrap>
                    <v-flex d-flex>
                        <div class="statistics">
                            <span class="title">交易数</span>
                            <span class="title color1">210</span>
                        </div>
                    </v-flex>
                    <v-flex d-flex>
                        <div class="statistics">
                            <span class="title">我的发布</span>
                            <span class="title color2">45</span>
                        </div>
                    </v-flex>
                    <v-flex d-flex>
                        <div class="statistics">
                            <span class="title">我的收藏</span>
                            <span class="title color3">15</span>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row pt-4>
            <v-flex xs9 sm9 pt-2>
                <v-widget title="我的任务" class="v-widget">
                <div slot="widget-content">
                    <user-work-tags></user-work-tags>
                </div>
                </v-widget>
            </v-flex>
            <v-flex xs3 sm3 pt-2 pl-4>
                <v-widget title="快捷导航" class="v-widget">
                    <div slot="widget-content">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" avatar @click="keyboardClick(item)">
                                <v-list-tile-action>
                                    <v-icon v-if="item.icon" color="red">star</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </div>
                </v-widget>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import VWidget from "@/components/VWidget";
    import userWorkTags from "@/views/userFlow/userWork/userWorkTags";
    import {getPkList} from "@/server/pkList";

    export default {
        components: {
            userWorkTags,
            VWidget
        },
        data() {
            return {
                items: [
                    {
                        icon: true,
                        title: "对私存款产品",
                        value: "rbPrivate",
                        avatar: "/static/prod/prod2.jpg"
                    },
                    {
                        icon: true,
                        title: "对公贷款产品",
                        value: "clPublic",
                        avatar: "/static/prod/prod2.jpg"
                    },
                    {
                        icon: true,
                        title: "参数管理入口",
                        value: "paramMag",
                        avatar: "/static/prod/prod2.jpg"
                    },
                    {
                        icon: true,
                        title: "产品目录",
                        value: "prodList",
                        avatar: "/static/prod/prod2.jpg"
                    }
                ]
            };
        },
        methods: {
            keyboardClick(item) {
                var key = item.value;
                if (key === "rbPrivate") {
                    this.$router.push({
                        name: "prod/rbPrivateProd",
                        params: {prodClassCmp: "RB100", prodCodeCmp: "111001"}
                    });
                }
                if (key === "clPublic") {
                    this.$router.push({
                        name: "prod/clPublicProd",
                        params: {prodClassCmp: "CL100", prodCodeCmp: "220001"}
                    });
                }
                if (key === 'paramMag') {
                    getPkList(key).then(response => {
                        console.log(response);
                    });
                }
                if (key === "prodList") {
                    this.$router.push({name: "prodCmb"});
                }
            }
        }
    };
</script>
<style scoped>
    /*.imgUserIndexFlow {*/
        /*width: 100px;*/
        /*display: inline-block;*/
    /*}*/

    /*.indexFlowTitle {*/
        /*padding: 10px;*/
    /*}*/
    .father .v-card {
        background-color: #fff;
    }
    .wecome {
        padding:10px 0 10px 30px;
    }

    .wecome span {
        font-size: 14px !important;
        font-weight: 600;
    }

    .statistics_box {
        text-align: center;
    }

    .color1 {
        background-color: #35CCAE;
        color: #fff;
    }

    .color2 {
        background-color: #FFB254;
        color: #fff;
    }

    .color3 {
        background-color: #EC5E5F;
        color: #fff;
    }
    .statistics_box span {
        border-radius: 4px;
        margin-left: -5px;
        padding: 5px 10px;
        display: inline-block;
        font-size: 14px !important;
        min-width: 40px !important;
    }
</style>