<template>
    <div class="pt-5 pl-4">
        <v-layout>
            <v-flex md3 lg3 class="pl-4">
                <v-flex xs12>
                    <v-card class="radiusDc">
                        <v-card-media class="card-media" height="64px">
                            <v-card-title class="card_header">
                                <v-layout>
                                    <td><h3 class="" style="font-size: 16px;">{{title}}</h3></td>
                                </v-layout>
                                <!--<v-layout>-->
                                    <td><h3 class="" style="">{{titleNum}}</h3></td>
                                <!--</v-layout>-->
                            </v-card-title>
                        </v-card-media>
                    </v-card>
                </v-flex>
                <v-flex xs12 class="PM">
                    <v-card style="height: 200%" class="PM">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)"
                                         :class="item.class">
                                <!--<v-list-tile-action>-->
                                    <!--<v-icon :color="item.color">{{ item.icon }}</v-icon>-->
                                <!--</v-list-tile-action>-->
                                <v-list-tile-content>
                                    <v-list-tile-title style="padding-left: 20px;">{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    <v-list-tile-title style="text-align: right">{{ item.number }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
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

    export default {
        components: {
            tableColumn,
            tableList,
            moduleManage,
            systemManage
        },
        data() {
            return {
                title: "",
                titleNum: "",
                action: 'model',
                items: [
                    {title: '交易属性管理', name: 'model', class: '', icon: 'widgets', color: "blue", number: ""},
                    {title: '交易系统管理', name: 'system', class: '', icon: 'settings', color: "blue", number: ""},
                    {title: '交易模块管理', name: 'module', class: '', icon: 'event', color: "blue", number: ""},
                    {title: '元数据管理', name: 'json', class: '', icon: 'menu', color: "blue", number: ""}
                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
            }
        },
        created() {
            // debugger
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
                            console.log(that.items[key].number, "response.data.data456789");
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
                            console.log(response.data.data, "response.data.data456789");
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
                    this.title = "交易数量"
                }
                if(item.name === "system"){
                    this.title = "系统数量"
                }
                if(item.name === "module"){
                    this.title = "模块数量"
                }
                if(item.name === "json"){
                    that.title = "字段数量"
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
    .windowTitle {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }

    .windowItem {
        border: 1px solid #a09ba269;
        background-color: white
    }

    .shrink :hover {
        background-color: #9E9E9E;
    }

    .selectedItem {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }

    .spanItem {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #757575;
    }

    .spanItemSelected {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #000000;
    }
    .selected {
        background-color: #3C73E6;
        color: #fff;
    }
    .radiusDc {
        box-shadow: none;
        border-radius: 0 !important;
    }

    .radiusDc h3 {
        margin-bottom: 0px;
    }

    .card_header {
        background-color: rgb(244, 245, 249);
        border: 1px solid #D6D6D6;
        box-shadow: none;
        height: 64px;
        border-bottom: none;
    }

    .card_header .v-card__title {
        padding: 22px 16px;
    }

    .PM {
        margin-top: 0px !important;
    }

    .PM .v-card {
        box-shadow: none;
        border: 1px solid #D6D6D6;
    }
    .PM >>> .v-list .v-list__tile--link:hover {
        color: black;
    }
    .PM .v-list {
        background-color: rgba(244, 245, 249, 0);
    }
    .TM .elevation-4 {
        box-shadow:none!important;
    }
    .TM >>> .primary.lighten-2 {
        background-color: rgb(244, 245, 249)!important;
        border: 1px solid #D6D6D6!important;;
        box-shadow: none!important;
        color: rgba(0, 0, 0, 0.85);
        border-bottom: none!important;
    }
    .TM >>> .v-btn__content td {
        color: #3C73E6!important;
    }
    .TM >>> .elevation-4 >.elevation-1 {
        box-shadow: none!important;
        border: 1px solid #D6D6D6!important;
    }

   
</style>
