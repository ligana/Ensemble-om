<template>
    <div class="pt-4">
        <v-layout>
            <v-flex md3 lg3 class="pl-5">
                <v-flex xs12 class="pt-3">
                    <v-card class="">
                        <v-card-media src="/static/avatar/per1.jpg" class="class1">
                        </v-card-media>
                        <v-list style="margin-right: 10%;margin-left: 10%">
                            <v-list-tile>
                                <v-list-tile-content>
                                        <v-list-tile-title style="font-size: x-large;margin-left: 4%; margin-right: 50%;color: #42A5F5">{{ userId }}||{{ name }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
                <v-flex xs12 class="mt-2 pb-2">
                    <v-card style="height: 200%" class="">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)" :class="item.class">
                                <v-list-tile-action>
                                    <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title style="font-size: medium">{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md10 lg10 class="pl-4 pb-4">
                    <user-info v-if="action=='userInfo'"></user-info>
                    <user-password v-else></user-password>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import UserInfo from './userInfo'
    import UserPassword from './userPassword'
    import {getSysInfoByUser} from "@/api/url/prodInfo";

    export default {
        components: {
            UserInfo,
            UserPassword
        },
        data() {
            return {
                drawer: true,
                desserts: [],
                userId: '',
                name: '',
                items: [
                    {title: '个人信息管理', name: 'userInfo', icon: 'person', class: '',color: "blue"},
                    {title: '密码管理', name: 'userPassword', icon: 'lock', class: '', color: "red"},
                    {title: '扩展页签1', name: 'test1', icon: 'settings', class: '',color: "blue"}
                    ],
                right: null,
                action: 'userInfo'
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
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.userInfo
                    for(let i=0; i<that.desserts.length; i++){
                        if(userId==that.desserts[i].userId){
                            that.userId=that.desserts[i].userId
                            that.name=that.desserts[i].userName
                        }
                    }
                });
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
            }
        }
    }
</script>
<style scoped>
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
        color: #383B4D;;
    }
</style>