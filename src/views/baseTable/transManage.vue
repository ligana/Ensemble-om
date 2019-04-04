<template>
    <div class="pt-4 pl-4">
        <v-layout>
            <v-flex md3 lg3 class="para">
                <v-widget :title="title" class="v-widget">
                    <div slot="widget-content" >
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)"
                                         :class="item.class">
                                <v-list-tile-content>
                                    <v-list-tile-title class="pl-4">{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    <v-list-tile-title class="pl-4 text-right">{{ item.number }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </div>
                </v-widget>
            </v-flex>
            <v-flex md10 lg10 class="pl-4 pb-4 pr-1 TM" >
                <table-list v-if="action == 'model'"></table-list>
                <table-column v-if="action == 'json'"></table-column>
                <system-manage v-if="action == 'system'"></system-manage>
                <module-manage v-if="action == 'module'"></module-manage>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import tableColumn from './tables/tableColumnManage'
    import tableList from './tables/tableListManage'
    import systemManage from './tables/systemManage'
    import moduleManage from './tables/moduleManage'
    import {getSysTable} from "@/api/url/prodInfo";
    import columnInfo from '@/views/prodFactory/prodInfo/columnInfo';
    import VWidget from "@/components/VWidget";
    export default {
        components: {
            tableColumn,
            tableList,
            moduleManage,
            systemManage,
            VWidget
        },
        data() {
            return {
                title: "",
                titleNum: "",
                action: 'model',
                items: [
                    {title: '交易属性管理',name: 'model', class: '',icon: 'widgets',color: "blue", number: ""},
                    {title: '系统管理',name: 'system', class: '',icon: 'settings',color: "blue", number: ""},
                    {title: '模块管理',name: 'module', class: '', icon: 'event',color: "blue", number: ""},
                    {title: '元数据管理',name: 'json', class: '', icon: 'menu',color: "blue", number: ""},
                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
            }
        },
        created() {
            this.getParaTable()
        },
        methods: {
            getParaTable() {
                //获取参数信息
                let that = this;
                for (let key in that.items) {
                    console.log(that.items[key].name, "namae");
                    if (that.items[key].name == "model") {
                        this.title = "交易数量"
                        getSysTable("OM_TABLE_LIST").then(function (response) {
                            that.items[key].number = response.data.data.columnInfo.length
                        });
                    }
                    if (that.items[key].name === "system") {
                        this.title = "系统数量"
                        getSysTable("OM_SYSTEM_ORG").then(function (response) {
                            that.items[key].number = response.data.data.columnInfo.length
                        });
                    }
                    if (that.items[key].name === "module") {
                        this.title = "模块数量"
                        getSysTable("OM_MODULE_ORG").then(function (response) {
                            that.items[key].number = response.data.data.columnInfo.length
                        });
                    }
                    if (that.items[key].name === "json") {
                        that.title = "字段数量"
                        let count = 0
                        const dataSource = columnInfo;
                        for (let i in dataSource) {
                            count++
                        }
                        that.items[key].number = count + ''
                    }

                }


            },
            actionTag(item) {
                let that = this
                if(item.name === "model"){
                    this.title = "交易属性管理"
                }
                if(item.name === "system"){
                    this.title = "系统管理"
                }
                if(item.name === "module"){
                    this.title = "模块管理"
                }
                if(item.name === "json"){
                    that.title = "元数据管理"
                }
                this.action = item.name;
                item.class="selected";
                for(const index in this.items){
                    if(this.items[index].name != item.name) {
                        this.items[index].class="";
                    }
                }
            },
            clickItem(index) {
                let userManagement = this.userManagement;
                for (const key in userManagement) {
                    if (key == 0) {
                        continue
                    }
                    if (userManagement[key].index == index) {

                        userManagement[key].classSpan = 'spanItemSelected'
                    } else {

                        userManagement[key].classSpan = 'spanItem'
                    }
                }

            }
        }
    }
</script>
<style scoped>
    .para >>> .v-card__text,
    .pmr >>> .v-card__text {
        padding: 0!important;
    }
    .para >>> .v-list .v-list__tile--link:hover {
        background-color: rgba(0, 0, 0, 0) !important;
        color: #870329 !important;
    }
    .selected {
        background-color: #3C73E6;
        color: #fff;
    }
    .para >>> .v-list__tile__title {
        transition:none;
    }
</style>
