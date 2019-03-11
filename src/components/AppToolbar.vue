<template>
    <v-toolbar class="styleOmUi_Color1" fixed dark app>
        <img v-bind:src="computeLogo" height="36" alt="产品工厂">
        <v-toolbar-title class="ml-0 pl-1">
            <span class="hidden-sm-and-down pr-3">{{titleName}}</span>
            <v-toolbar-side-icon v-if="dcSwitch" @click.stop="handleDrawerToggle" class="ml-3"></v-toolbar-side-icon>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch v-model="dcSwitch" @change="switchChange" class="pt-4 pr-2" style="flex:none"></v-switch>
        <v-icon @click="showSearchAction" class="material-icons">search</v-icon>

        <v-card :class="searchDc">
            <v-autocomplete :items="prodList" placeholder="请输入要查询的产品类型或描述" class="primary--text px-5 pt-2"
                            @change="prodListClick" clearable flat solo-inverted></v-autocomplete>
        </v-card>
        <v-btn icon @click="handleFullScreen()">
            <v-icon>fullscreen</v-icon>
        </v-btn>
        <v-menu v-model="taskMenu" :close-on-content-click="false" offset-y origin="center center" class="elelvation-1"
                :nudge-bottom="14" transition="scale-transition">
            <v-btn icon flat slot="activator">
                <v-badge color="red" overlap>
                    <span slot="badge">{{taskSize}}</span>
                    <v-icon medium>notifications</v-icon>
                </v-badge>
            </v-btn>
            <div class="tList">
                <task-list :taskMenu="taskMenu" v-on:getTaskList="getTaskList"></task-list>
            </div>
        </v-menu>
        <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
            <v-btn icon large flat slot="activator">
                <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list class="pa-0">
                <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null"
                             :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled"
                             :target="item.target" rel="noopener" :key="index">
                    <v-list-tile-action v-if="item.icon">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content style="margin-left: -20px">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>
<script>
    import TaskList from "@/views/propertyManage/taskList";
    import Util from "@/util";
    import {getToken} from "@/utils/auth";
    import {getProdType} from "@/api/prod";
    import {
        getAllProdList
    } from '@/api/url/prodInfo'
    import config from '@/config'
    import Layout from "./media/Layout";

    export default {
        name: "app-toolbar",
        components: {
            Layout,
            TaskList
        },
        data: () => ({
            sourceProdList: [],
            prodList: [],
            prodCode: "",
            dcSwitch: true,
            searchDc: 'searchDcNone',
            titleName: config.name,
            taskSize: '0',
            taskMenu: false,
            prodClass: "",
            prodListSplit: [],
            items: [
                {
                    icon: "account_circle",
                    href: "#",
                    title: "个人设置",
                    click: e => {
                        window.getApp.$emit("APP_USER_INFO_MANAGEMENT");
                    }
                },
                {
                    icon: "settings",
                    href: "#",
                    title: "系统管理",
                    click: e => {
                        window.getApp.$emit("APP_SYSTEM_MANAGEMENT");
                    }
                },
                {
                    icon: "settings_applications",
                    href: "#",
                    title: "权限管理",
                    click: e => {
                        window.getApp.$emit("APP_PERM_PERMISSIONS");
                    }
                },
                {
                    icon: "power_settings_new",
                    href: "#",
                    title: "退出",
                    click: e => {
                        window.getApp.$emit("APP_LOGOUT");
                    }
                }
            ]
        }),

        computed: {
            toolbarColor() {
                return this.$vuetify.options.extra.mainNav;
            },
            computeLogo() {
                return "/static/prod/dcLog1.png";
            },
        },
        mounted() {
            if (getToken()) {
                this.getInitProdList();
            }

        },
        methods: {
            handleDrawerToggle() {
                window.getApp.$emit("APP_DRAWER_TOGGLED");
            },
            prodListClick(val) {
                this.prodListSplit = val.split("-");
                this.prodCode = this.prodListSplit[0];
                for (let i = 0; i < this.sourceProdList.length; i++) {
                    if (this.prodCode === this.sourceProdList[i].prodType) {
                        this.prodClass = this.sourceProdList[i].prodClass
                        this.sourceModule = this.sourceProdList[i].sourceModule
                        this.prodRange = this.sourceProdList[i].prodRange
                        break
                    }
                }
                if(this.prodRange == "S" && this.sourceModule == "RB"){
                    this.$router.push({
                        name: "SoldProdForm",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                }
                if(this.prodRange == "B" && this.sourceModule == "RB"){
                    this.$router.push({
                        name: "BaseProdForm",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                }
                if(this.prodRange == "S" && this.sourceModule == "CL"){
                    this.$router.push({
                        name: "SoldProdFormCl",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                }
                if(this.prodRange == "B" && this.sourceModule == "CL"){
                    this.$router.push({
                        name: "BaseProdFormCl",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                }
                if(this.prodRange == "S" && this.sourceModule == "GL"){
                    this.$router.push({
                        name: "SoldProdFormGl",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                }
                if(this.prodRange == "B" && this.sourceModule == "GL"){
                    this.$router.push({
                        name: "BaseProdFormGl",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                }
            },
            handleFullScreen() {
                Util.toggleFullScreen();
            },
            switchChange() {
                this.$emit("menuSwitch");
                window.getApp.$emit('APP_DRAWER_TOGGLED');
            },
            showSearchAction() {
                this.searchDc = 'searchDc';
                document.getElementsByTagName("main")[0].addEventListener("click", this.showSearchNon);

            },
            getTaskList(size) {
                this.taskSize = size;
            },
            showSearchNon() {
                this.searchDc = 'searchDcNone';
                document.getElementsByTagName("main")[0].removeEventListener("click", this.showSearchNon);
            },
            getInitProdList() {
                getAllProdList().then(response => {
                    for (let i = 0; i < response.data.data.length; i++) {
                        this.sourceProdList.push(response.data.data[i])
                        this.prodList.push(
                            response.data.data[i].prodType +
                            "-" +
                            response.data.data[i].prodDesc
                        );
                    }
                });
            },
            closeMenu() {
                this.taskMenu = false;
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .searchDc {
        width 100%
        position fixed
        transition: all 0.7s
        height auto
        top 0
        left 0
        z-index 8
    }
    .searchDcNone {
        position absolute
        top -65px
        transition: all 0.7s
        width 100%
        left 0
        z-index 1
    }
    .v-menu {
        width 50px
    }
    .tList {
        margin auto
        width 450px
        max-height 500px
    }

</style>
