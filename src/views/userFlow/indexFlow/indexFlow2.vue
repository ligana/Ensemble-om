<template>
    <div class="pt-4 father" >
        <v-card class=" radiusDc" style="height: 50px;">
            <v-layout align-center justify-space-between row fill-height>
                <!--<v-flex lg2 sm2 pl-3>-->
                <!--<img src="/static/user/MyUser.png" class="imgUserIndexFlow">-->
                <!--</v-flex>-->
                <v-flex lg7 sm7 class="wecome">
                    <!--<v-layout>-->
                    <!--<v-flex lg7 sm7 pb-3>-->
                    <!--<span class="headline text-xs-center">admin,你好,欢迎进入</span>-->
                    <!--</v-flex>-->
                    <!--</v-layout>-->
                    <!--<v-layout>-->
                    <!--<v-flex lg7 sm7>-->
                    <span class="headline text-xs-center">admin,你好,</span>
                    <span class="title text-xs-center">欢迎进入XXX银行产品工厂</span>
                    <!--</v-flex>-->
                    <!--</v-layout>-->
                </v-flex>
                <v-flex lg4 sm6 class="statistics_box">
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
        </v-card>
        <v-layout row pt-4>
            <v-flex xs9 sm9 pt-2>
                <v-card class=" radiusDc">
                    <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques"
                               class="" flat>
                        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
                        <v-toolbar-title>我的任务</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!--<v-btn icon>-->
                            <!--<v-icon>more_vert</v-icon>-->
                        <!--</v-btn>-->
                    </v-toolbar>
                    <v-card-text class="py-1">
                        <user-work-tags></user-work-tags>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs3 sm3 pt-2 pl-4>
                <v-card class="elevation-2 radiusDc">
                    <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques"
                               class="" flat>
                        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
                        <v-toolbar-title>快捷导航</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!--<v-btn icon>-->
                            <!--<v-icon>more_vert</v-icon>-->
                        <!--</v-btn>-->
                    </v-toolbar>
                    <v-card-text style="text-align: center; " class="py-1">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" avatar @click="keyboardClick(item)">

                                <v-list-tile-action>
                                    <v-icon v-if="item.icon" color="red">star</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                </v-list-tile-content>
                                <!-- <v-list-tile-action style="min-width: 0; ">
                                  <v-chip label color="pink" text-color="white">
                                    <v-icon left color="white">start</v-icon>编辑
                                  </v-chip>
                                </v-list-tile-action> -->
                            </v-list-tile>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import userWorkTags from "@/views/userFlow/userWork/userWorkTags";
    import {getPkList} from "@/server/pkList";

    export default {
        components: {
            userWorkTags
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
    .imgUserIndexFlow {
        width: 100px;
        display: inline-block;
    }

    .indexFlowTitle {
        padding: 10px;
    }
    .wecome {
        padding-left: 30px;
    }
    .wecome span{
        font-size: 14px!important;
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
        background-color:  #EC5E5F;
        color: #fff;
    }

    .statistics_box span{
        border-radius: 4px;
        margin-left: -5px;
        padding: 5px 10px;
        display: inline-block;
        font-size: 14px!important;
        min-width: 40px!important;
    }
    .father >>> .primary.lighten-2 {
        background-color: #F4F5F8 !important;
        color: #414456;
        border-bottom: 1px solid #E0E4EA!important;
    }
    .father >>> .theme--light.v-card {
        background-color: #fff;
        border-radius: 0px!important;
        box-shadow: none!important;
        border: 1px solid #E0E4EA;
        /*height: 40px;*/
    }
    .father >>> .v-tabs__container {
        background-color: #fff!important;
    }
    .father >>> .v-tabs__item--active {
        color: #4B7EE8 !important;
        background-color: #fff;
        font-weight: bold;
        height: 48px !important;
        border-radius: 0px;
        box-shadow: none;
        border-bottom: 2px solid #4B7EE8;

    }
    .father >>> .v-toolbar__content {
        height: 50px!important;
    }
    .father >>> .v-tabs__wrapper {
        padding-top: 0;
        height: 49px;
        border-bottom: 1px solid #cfd4d9;
    }

</style>