<template>
    <div class="pt-5 pl-4">
        <v-layout>
            <v-flex md3 lg3 class="pl-4">
                <v-flex xs12>
                    <v-card class="radiusDc">
                        <v-card-media src="/static/bg/18.jpg" height="64px" class="elevation-4">
                            <v-card-title class="pb-0">
                                <v-layout>
                                    <td><h3 class="" style="color: white;margin-top: 0px">{{title}}</h3></td>
                                </v-layout>
                                <!--<v-layout>-->
                                    <!--<td><h1 class="" style="color: white;margin-top: 0px;margin-left: 0px">-->
                                        <!--{{titleNum}}</h1></td>-->
                                <!--</v-layout>-->
                            </v-card-title>
                        </v-card-media>
                    </v-card>
                </v-flex>
                <v-flex xs12 class="mt-3 pb-4">
                    <v-card style="height: 200%" class="elevation-4 radiusDc">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)"
                                         :class="item.class">
                                <!--<v-list-tile-action>-->
                                <!--<v-icon :color="item.color">{{ item.icon }}</v-icon>-->
                                <!--</v-list-tile-action>-->
                                <v-list-tile-content>
                                    <v-list-tile-title style="font-size: medium">{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    <v-list-tile-title style="font-size: medium">{{ item.number }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md10 lg10 class="pl-4 pb-4 pr-1">
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
    import columnInfo from '@/views/prodFactory/prodInfo/columnInfo'

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
            this.getParaTable()
        },
        methods: {
            getParaTable() {
                //获取参数信息
                let that = this;
                // getSysTable("OM_TABLE_LIST").then(function (response) {
                //     that.titleNum = response.data.data.columnInfo.length
                //     that.title = "交易数量"
                // });
                // console.log(that.items, "009900");
                // for(const key in that.items){
                //
                //
                // }
                for (let key in that.items) {
                    console.log(that.items[key].name, "namae");
                    if (that.items[key].name == "model") {
                        this.title = "交易数量"
                        getSysTable("OM_TABLE_LIST").then(function (response) {
                            console.log(response, "lkkkkkkkk");
                            that.items[key].number = response.data.data.columnInfo.length
                            console.log(that.items[key].number, "response.data.data456789");
                        });
                    }
                    if (that.items[key].name === "system") {
                        this.title = "系统数量"
                        getSysTable("OM_SYSTEM_ORG").then(function (response) {
                            console.log(response, "lkkkkkkkk");
                            that.items[key].number = response.data.data.columnInfo.length
                        });
                    }
                    if (that.items[key].name === "module") {
                        this.title = "模块数量"
                        getSysTable("OM_MODULE_ORG").then(function (response) {
                            console.log(response, "lkkkkkkkk");
                            that.items[key].number = response.data.data.columnInfo.length
                            console.log(response.data.data, "response.data.data456789");
                        });
                    }
                    if (that.items[key].name === "json") {
                        that.title = "字段数量"
                        let count = 0
                        const dataSource = columnInfo;
                        console.log(dataSource, "9999999");
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
                    // getSysTable("OM_TABLE_LIST").then(function (response) {
                    //     that.titleNum = response.data.data.columnInfo.length
                    //     console.log(response.data.data,"response.data.data456789");
                    // });
                }
                if(item.name === "system"){
                    this.title = "系统数量"
                    // getSysTable("OM_SYSTEM_ORG").then(function (response) {
                    //     that.titleNum = response.data.data.columnInfo.length
                    //     console.log(response.data.data,"response.data.data456789");
                    // });
                }
                if(item.name === "module"){
                    this.title = "模块数量"
                    // getSysTable("OM_MODULE_ORG").then(function (response) {
                    //     that.titleNum = response.data.data.columnInfo.length
                    //     console.log(response.data.data,"response.data.data456789");
                    // });
                }
                if(item.name === "json"){
                    that.title = "字段数量"
                    // let count = 0
                    // const dataSource = columnInfo;
                    // console.log(dataSource,"9999999");
                    // for(let i in dataSource){
                    //     count++
                    // }
                    // that.titleNum = count+''
                }
                console.log(that.titleNum);
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

    .titleItem {

    }
</style>
