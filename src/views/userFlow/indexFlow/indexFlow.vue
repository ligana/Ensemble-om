<template>
    <div>
        <v-card>
            <v-layout row wrap>
                <v-flex lg2 sm2 style="text-align: center;">
                    <img src="/static/user/MyUser.png" class="imgUserIndexFlow">
                </v-flex>
                <v-flex lg7 sm7>
                    <span class="userSpan1">admin,欢迎进入SmartEnsemble-OM,祝你开心每一天!</span>
                    <span class="userSpan2">神州数码 | 神州信息 - OM系统管理员</span>
                </v-flex>
                <v-flex lg3 sm3>
                    <div class="userDiv1">
                        <p>交易数</p>
                        <p class="userP1" style="width: 50px;">210</p>
                    </div>
                    <div class="userDiv1 userDiv2">
                        <p>我的发布数</p>
                        <p class="userP1" style="width: 50px;">45</p>
                    </div>
                    <div class="userDiv1 userDiv2">
                        <p>我收藏的产品</p>
                        <p class="userP1" style="width: 50px;">20</p>
                    </div>
                </v-flex>
            </v-layout>
        </v-card>
        <v-layout row>
            <v-flex xs9 sm9 class="userCard1">
                <v-card>
                    <v-toolbar color="white">
                        <v-toolbar-side-icon></v-toolbar-side-icon>
                        <v-toolbar-title>正在进行中项目</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text style="text-align: center;">
                        <template>
                            <v-layout row wrap>
                                <v-flex xs4 sm4 class="userDiv3">
                                    <v-card>
                                        <v-card-media
                                                src="/static/prod/desert.jpg"
                                                height="50px"
                                        ></v-card-media>
                                        <v-card-title primary-title>
                                            <div>
                                                <h3 class="headline mb-0">待复核产品</h3>
                                                <span class="grey--text">个人活期存款产品(修改)</span>
                                                <br>
                                                <span class="grey--text">提交录入人为:param</span>
                                            </div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                                <v-flex xs4 sm4 class="userDiv3">
                                    <v-card>
                                        <v-card-media
                                                src="/static/prod/desert.jpg"
                                                height="50px"
                                        ></v-card-media>
                                        <v-card-title primary-title>
                                            <div>
                                                <h3 class="headline mb-0">待发布产品</h3>
                                                <span class="grey--text">无</span><br><span class="grey--text">无</span>
                                            </div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                                <v-flex xs4 sm4 class="userDiv3">
                                    <v-card>
                                        <v-card-media
                                                src="/static/prod/desert.jpg"
                                                height="50px"
                                        ></v-card-media>
                                        <v-card-title primary-title>
                                            <div>
                                                <h3 class="headline">已发布产品</h3>
                                                <span class="grey--text">已发布产品</span><br><span class="grey--text">用户发布产品数量：100</span>
                                            </div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </template>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs3 sm3 class="userCard1">
                <v-card>
                    <v-toolbar color="white">
                        <v-toolbar-side-icon></v-toolbar-side-icon>
                        <v-toolbar-title>快捷导航</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text style="text-align: center;">
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {}
        }
    }
</script>
<style scoped>
    .imgUserIndexFlow {
        width: 100px;
        display: inline-block;
    }

    .userCard1 {
        padding: 20px;
    }

    .userSpan1 {
        font-size: 26px;
        display: inline-block;
        padding-top: 10px;
    }

    .userSpan2 {
        display: inline-block;
        padding-top: 5px;
    }

    .userDiv1 {
        float: left;
        text-align: center;
        margin-top: 10px;
    }

    .userDiv3 {
        padding: 10px;
    }

    .userDiv2 {
        padding-left: 40px;
    }

    .userP1 {
        font-size: 25px;
        display: inline-block;
    }
</style>