<template>
    <div class="pt-4">
        <v-dialog
                v-model="dialog"
                width="500"
                persistent
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>密码修改</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <form class="class2">
                    <v-text-field v-model="userId" label="用户ID" disabled= true required append-icon="person"></v-text-field>
                    <v-text-field v-model="password" label="原密码" :rules="[v => v==this.userpassword||'输入的原密码错误']" required append-icon="lock"></v-text-field>
                    <v-text-field v-model="newPassword" label="新密码" :rules="passwordErrors" required append-icon="lock"></v-text-field>
                    <v-text-field v-model="newPasswordEnd" label="再次输入新密码" :rules="[v => v==newPassword||'与上次输入新密码不一致']" required append-icon="info"></v-text-field>
                    <h6 style="color: orangered">
                        <v-icon style="color: orangered">info</v-icon>
                        修改成功后将重新登录
                    </h6>
                    <div align="center">
                        <v-btn @click="submit" style="width: 122px;color: white;background-color: #00b0ff" round>确   认</v-btn>
                        <v-btn @click="clear" style="width: 122px;color: white;background-color: #00b0ff" round>重   置</v-btn>
                    </div>
                </form>
            </v-card>
        </v-dialog>
        <v-layout>
<!--<<<<<<< HEAD-->
            <!--<v-flex md3 lg3 class="pl-5">-->
                <!--<v-flex xs12 class="pt-3">-->
                    <!--<v-card class="">-->
                        <!--<v-card-media src="/static/avatar/per1.jpg" class="class1">-->
                        <!--</v-card-media>-->
                        <!--<v-list style="margin-right: 10%;margin-left: 10%">-->
                            <!--<v-list-tile>-->
                                <!--<v-list-tile-content>-->
                                        <!--<v-list-tile-title style="font-size: x-large;margin-left: 4%; margin-right: 50%;color: #42A5F5;text-align: center">{{ userId }}||{{ name }}</v-list-tile-title>-->
                                <!--</v-list-tile-content>-->
                            <!--</v-list-tile>-->
                        <!--</v-list>-->
                    <!--</v-card>-->
                <!--</v-flex>-->
                <!--<v-flex xs12 class="mt-2 pb-2">-->
                    <!--<v-card style="height: 200%" class="">-->
                        <!--<v-list>-->
                            <!--<v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)" :class="item.class">-->
                                <!--<v-list-tile-action>-->
                                    <!--<v-icon :color="item.color">{{ item.icon }}</v-icon>-->
                                <!--</v-list-tile-action>-->
                                <!--<v-list-tile-content>-->
                                    <!--<v-list-tile-title style="font-size: medium">{{ item.title }}</v-list-tile-title>-->
                                <!--</v-list-tile-content>-->
                            <!--</v-list-tile>-->
                        <!--</v-list>-->
<!--=======-->
            <v-flex md4 lg4 class="pl-5">
                    <v-card height="400px" style="top: 10%">
                        <div style="width: 100%;position: relative;top: -20%" align="center">
                            <v-img src="/static/avatar/use-1.jpg" class="img" style="box-shadow: 0px 10px 5px #888888;"></v-img>
                        </div>
                        <div style="font-size: x-large;color: #42A5F5;text-align: center;position: relative;top: -10%">{{ userId }}||{{ userName }}</div>

                        <div style="font-size: x-large;color: #42A5F5;text-align: center">
                            <v-btn depressed large @click="changePassword">
                                修改密码
                            </v-btn>
                        </div>


<!--&gt;>>>>>> master-->
                    </v-card>
            </v-flex>
            <v-flex md10 lg10 class="pl-4 pb-4">
                <user-info v-on:changeName="changeName" v-if="action=='userInfo'"></user-info>
                <user-password v-if="action=='userPassword'"></user-password>
                <user-role v-if="action=='userRole'"></user-role>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import UserInfo from './userInfo'
    import UserPassword from './userPassword'
    import UserRole from './userRole'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import {getSysUserInfoByUser} from "@/api/url/prodInfo";

    export default {
        components: {
            UserInfo,
            UserPassword,
            UserRole
        },
        data() {
            return {
                dialog: false,
                drawer: true,
                desserts: [],
                userId: '',
                name: '',
                right: null,
                action: 'userInfo',
                user: [],
                userRole: [],
                userName: '',
                userpassword: '',
                password: '',
                newPassword: '',
                newPasswordEnd: '',
                passwordErrors: [
                    v => v.length>=6||'密码长度必须大于6位',
                    v => v.length<=16||'密码最大长度不能超过16',
                ],
                keySet: [
                    {
                        key: "true",
                        dataIndex: "userId"
                    }
                ],
                sourceData: [],
                backValue: {},
            }
        },
        created () {
            this.initialize()
        },
        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                //获取角色信息
                getSysUserInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.userInfo
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                    that.user = response.data.data.userInfo
                    that.userRole = response.data.data.roleInfo
                    for(let i=0; i<that.desserts.length; i++){
                        if(userId==that.desserts[i].userId){
                            that.userId=that.desserts[i].userId
                            that.name=that.desserts[i].userName
                            that.userName=that.name
                            that.userpassword=that.desserts[i].password
                        }
                    }
                });
            },
            changeName(name) {
                this.userName = name
            },
            changePassword() {
                this.dialog = true
            },
            actionTag(item) {
                this.action = item.name;
                item.class="selected";
                for(const index in this.items){
                   if(this.items[index].name != item.name) {
                       this.items[index].class="";
                   }
                }
                this.initialize()
            },
            submit () {
                if(this.password==''||this.newPassword==''||this.newPasswordEnd==''||this.newPasswordEnd!=this.newPassword){
                    this.sweetAlert('error',"密码修改失败!")
                }else{
                    for(let i=0; i<this.desserts.length; i++){
                        if(this.userId==this.desserts[i].userId){
                            this.desserts[i].password=this.newPassword
                        }
                    }
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.sourceData = this.copy(this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_USER"
                    this.backValue.keySet = "USER_ID"
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            this.sweetAlert('success',"密码修改成功!")
                            window.location.href='http://localhost:8080/#/'
                        }
                    })
                }
            },
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
            clear () {
                this.password= ''
                this.newPassword= ''
                this.newPasswordEnd= ''
            },
        }
    }
</script>
<!--<<<<<<< HEAD-->
<style scoped>
/*=======*/
/*<style>*/
    /*.img{*/
        /*height: 150px;*/
        /*width: 150px;*/
        /*border-radius:50%;*/
        /*-webkit-border-radius:50%;*/
        /*-moz-border-radius:50%;*/
        /*margin-top: 15px;*/
    /*}*/
    /*.message{*/
        /*font-size: x-large;*/
        /*margin-bottom: 5px;*/
        /*position: relative;*/
        /*left: 20%;*/
    /*}*/
/*>>>>>>> master*/
/*<style>*/
    /*.img{*/
        /*height: 150px;*/
        /*width: 150px;*/
        /*border-radius:50%;*/
        /*-webkit-border-radius:50%;*/
        /*-moz-border-radius:50%;*/
        /*margin-top: 15px;*/
    /*}*/
    /*.message{*/
        /*font-size: x-large;*/
        /*margin-bottom: 5px;*/
        /*position: relative;*/
        /*left: 20%;*/
    /*}*/
/*>>>>>>> master*/
    .selected {
        background-color: #e8e8e8;
    }
    .class1 {
        width: 100%;height: 100%;margin-top: -5%;
    }
    .class2 {
        color: blue;font-size: x-large
    }
    .class3 {
        font-size: large; color: deepskyblue; margin-left: 5px
    }
    .pt-4 .v-card {
        box-shadow: none;
        border: 1px solid #E0E4EA;
    }
    .pt-4 .layout .elevation-4{
        box-shadow: none!important;
        border: 1px solid #E0E4EA;
    }
    .pt-4 .layout .v-toolbar {
        box-shadow: none;
        background-color: #F4F5F8!important;
        border-bottom: 1px solid #E0E4EA!important;
        color: #383B4D;
    }
    .pt-4 .v-toolbar__content .theme--dark{
        color: #383B4D;
    }
</style>