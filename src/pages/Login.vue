<template>
    <v-app id="login" class="primary">
        <v-content>
            <!--<v-container fluid fill-height>-->
            <!--<v-layout align-center justify-center>-->
            <!--<v-flex xs12 sm8 md4 lg4>-->
            <div class="login_flex">
                <div class="img_box"> </div>
                <v-card class="elevation-1 pa-3">
                    <v-card-text>
                        <div class="logo_box">
                            <img src="/static/avatar/logo.png" alt="SmartEnsemble-om<" width="54" height="41">
                            <!--<h1 class="flex my-4 primary&#45;&#45;text">神州数码-产品工厂</h1>-->
                            <h2 class="_text">SmartEnsemble-om</h2>
                        </div>
                        <v-form ref="model">
                            <v-text-field append-icon="person" name="login" label="用户名" type="text"
                                          v-model="model.userId" ></v-text-field>
                            <v-text-field append-icon="lock" name="password" label="密码" id="password" type="password"
                                          v-model="model.password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn icon>
                            <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon color="red">fa fa-google fa-lg</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn block color="primary" @click="login" :loading="loading">登录</v-btn>
                    </v-card-actions>
                    <v-alert :value="alert" type="error" transition="scale-transition">
                        {{alertMsg}}
                    </v-alert>
                    <h1 class="h1_b">神州数码产品工厂</h1>
                </v-card>
            </div>
            <!--</v-flex>-->
            <!--</v-layout>-->
            <!--</v-container>-->
        </v-content>
    </v-app>
</template>

<script>
    //import { getMenu } from "@/api/menu";
    import {login} from "@/api/login";
    import {setToken} from "@/utils/auth";

    export default {
        data: () => ({
            alert: false,
            alertMsg: "",
            loading: false,
            model: {
                userId: "admin",
                password: "123456"
            }
        }),

        methods: {
            login() {
                login(this.model.userId, this.model.password)
                    .then(response => {
                        if (response.data.code !== "000000") {
                            this.loading = false;
                            this.alert = true;
                            this.alertMsg = response.data.msg;
                            this.model.password = null;
                        } else {
                            this.loading = true;
                            sessionStorage.setItem("userId", this.model.userId);
                            sessionStorage.setItem("userLevel", JSON.parse(response.data.data).omUser.userLevel);
                            //将用户产品权限放入
                            const levelList = JSON.parse(response.data.data).omProdPermDefList;
                            for (const index in levelList) {
                                const level = levelList[index];
                                sessionStorage.setItem("base" + level.modelType, level.baseProdLevel);
                                sessionStorage.setItem("sold" + level.modelType, level.soldProdLevel);
                            }
                            setToken(this.model.userId);
                            this.$router.push("/dashboard");
                        }
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        }
    };
</script>
<style scoped lang="css">
    #login {
        height: 0%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        z-index: 0;
    }
    .login_flex {
        display: flex;
        justify-content: space-around;
    }
    .img_box {
        height: 100vh;
        background: url("/static/avatar/leftimg.png");
        -webkit-background-size:100% 100%;
        background-size: 100% 100%;
        background-position: center center;

        flex: 7;
    }
    .elevation-1 {
        flex:3;
        padding:0 3%!important;
        position: relative;
    }
    .login_flex .h1_b {
        font:400 20px "Hiragino Sans GB - W6";
        color: #b7c1cf;
        position: absolute;
        left: 50%;
        bottom: 5%;
        transform: translateX(-50%);
    }
    .logo_box {
        display: flex;
        justify-content: space-around;
        padding: 80px 0;
    }
    .logo_box ._text {
        font: 400 28px "HiraginoSans-W6";
        color: #3c73e7;
    }
    .v-input:nth-child(2){
        margin-top: 25px;
    }
    .v-input >>> .v-input__slot{
        background-color: #F6F6F6;
        border-radius: 5px;
        border: 1px solid #ececec;
    }
    .v-input >>> .v-input__slot:before {
        border-style:none;
    }
    .v-input >>> .v-input__slot .v-text-field__slot .v-label{
        top: -3px!important;
        font:400 16px "HiraginoSans-W6";
        color: #7e7e7e;
    }
    .v-card__actions >>> .primary {
        background-color: #507AE4!important;
        border-radius: 20px;
        padding: 0 20px;
    }
</style>
