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
            <v-flex md10 lg10 class="pl-4 pb-4 pr-1 pmr">
                <v-widget :title="titleE" class="v-widget">
                    <div slot="widget-content" >
                        <v-data-table :headers="headers" :items="desserts" class="table">
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.tableName }}</td>
                                <td>{{ props.item.tableDesc }}</td>
                                <td>{{ props.item.system }}</td>
                                <td>{{ props.item.modelId }}</td>
                                <td>{{ props.item.parameter }}</td>
                                <td v-if="props.item.icon == 'edit'">
                                    <v-btn depressed outline icon fab dark color="" small
                                           @click="routerTableInfo(props.item)">
                                        <v-icon>{{ props.item.icon }}</v-icon>
                                    </v-btn>
                                </td>
                                <td v-if="props.item.icon == 'person'">
                                    <v-chip style="background-color: #3C73E6;" text-color="white">
                                        待处理
                                    </v-chip>
                                </td>
                            </template>
                        </v-data-table>
                    </div>
                </v-widget>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import TableList from './tables/tableList'
    import {getTableList} from "@/api/url/prodInfo";
    import {getFlowList} from "@/api/url/prodInfo";
    import VWidget from "@/components/VWidget";

    export default {
        components: {
            TableList,
            VWidget
        },
        data() {
            return {
                title: "",
                titleE: "",
                titleNum: "",
                action: 'ensemble',
                mainFlowInfo: [],
                items: [
                    {title: '核心系统', name: 'ensemble', class: '', icon: 'settings', color: "blue", number: ""},
                    {title: '核算系统', name: 'accounting', class: '', icon: 'settings', color: "blue", number: ""},
                    {title: '利率市场化', name: 'price', class: '', icon: 'settings', color: "blue", number: ""},
                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
                dialog: false,
                headers: [
                    {text: '交易ID', sortable: false},
                    {text: '交易名称', sortable: false},
                    {text: '所属系统', sortable: false},
                    {text: '所属模块', sortable: false},
                    {text: '参数类型', sortable: false},
                    {text: 'Action', sortable: false}
                ],
                desserts: [
                    {
                        tableName: '',
                        tableDesc: '',
                        system: '',
                        modelId: '',
                        parameter: '',
                        icon: ''
                    }
                ],
                editedIndex: -1,
                defaultItem: {
                    tableName: '',
                    tableDesc: '',
                    system: '',
                    modelId: '',
                    parameter: ''
                }
            }
        },
        created() {
            this.getParaTable()
        },
        methods: {
            actionTag(item) {
                console.log(item.name, "item.name");
                this.action = item.name;
                let that = this;
                getFlowList().then(response => {
                    that.mainFlowInfo = response.data.data
                });
                getTableList(this.action).then(function (response) {
                    for (let i = 0; i < response.data.data.tableList.length; i++) {
                        let isCommit = false
                        for (let j = 0; j < that.mainFlowInfo.length; j++) {
                            if (response.data.data.tableList[i].tableName === that.mainFlowInfo[j].flowManage.tranId) {
                                response.data.data.tableList[i]["icon"] = "person"
                                isCommit = true
                                break
                            }
                        }
                        if (!isCommit) {
                            response.data.data.tableList[i]["icon"] = "edit"
                        }
                    }
                    that.desserts = response.data.data.tableList;

                    that.titleE = that.action
                    if (that.action === "ensemble") {
                        that.title = "核心系统"
                    }
                    if (that.action === "accounting") {
                        that.title = "核算系统"
                    }
                    if (that.action === "price") {
                        that.title = "利率市场化"
                    }
                    // that.titleNum = response.data.data.tableList.length

                });

                item.class = "selected";
                for (const index in this.items) {
                    if (this.items[index].name != item.name) {
                        this.items[index].class = "";
                    }
                }
            },

            getParaTable() {
                let that = this;
                getFlowList().then(response => {
                    that.mainFlowInfo = response.data.data
                });
                /*此处区分交易是否已提交等待复核发布
                    处理方法：重新查询待处理信息表，检查是否存在待处理单表交易
                    原因：交易展示界面重新查库加载 多次提交的情况下  前几次提交记录会丢失
                 */
                for (let key in that.items) {
                    let name = that.items[key].name;
                    console.log(name, "name");
                    if (name === "ensemble") {
                        that.title = "核心系统"
                        getTableList(name).then(function (response) {
                            console.log(response.data.data, "ensemble");
                            for (let i = 0; i < response.data.data.tableList.length; i++) {
                                let isCommit = false
                                for (let j = 0; j < that.mainFlowInfo.length; j++) {
                                    if (response.data.data.tableList[i].tableName === that.mainFlowInfo[j].flowManage.tranId) {
                                        response.data.data.tableList[i]["icon"] = "person"
                                        isCommit = true
                                        break
                                    }
                                }
                                if (!isCommit) {
                                    response.data.data.tableList[i]["icon"] = "edit"
                                }
                                that.items[key].number = response.data.data.tableList.length
                                that.desserts = response.data.data.tableList;
                            }
                        });
                    }
                    if (name === "accounting") {
                        that.title = "核算系统"
                        getTableList(name).then(function (response) {
                            console.log(response.data.data, "accounting");
                            for (let i = 0; i < response.data.data.tableList.length; i++) {
                                let isCommit = false
                                for (let j = 0; j < that.mainFlowInfo.length; j++) {
                                    if (response.data.data.tableList[i].tableName === that.mainFlowInfo[j].flowManage.tranId) {
                                        response.data.data.tableList[i]["icon"] = "person"
                                        isCommit = true
                                        break
                                    }
                                }
                                if (!isCommit) {
                                    response.data.data.tableList[i]["icon"] = "edit"
                                }
                                that.items[key].number = response.data.data.tableList.length
                            }
                        });
                    }
                    if (name === "price") {
                        that.title = "利率市场化"
                        getTableList(name).then(function (response) {
                            console.log(response.data.data, "price");
                            for (let i = 0; i < response.data.data.tableList.length; i++) {
                                let isCommit = false
                                for (let j = 0; j < that.mainFlowInfo.length; j++) {
                                    if (response.data.data.tableList[i].tableName === that.mainFlowInfo[j].flowManage.tranId) {
                                        response.data.data.tableList[i]["icon"] = "person"
                                        isCommit = true
                                        break
                                    }
                                }
                                if (!isCommit) {
                                    response.data.data.tableList[i]["icon"] = "edit"
                                }
                                that.items[key].number = response.data.data.tableList.length
                            }
                        });
                    }
                }
                // getTableList("ensemble").then(function (response) {
                //     console.log(response.data.data,"76543");
                //     for (let i = 0; i < response.data.data.tableList.length; i++) {
                //         let isCommit = false
                //         for (let j = 0; j < that.mainFlowInfo.length; j++) {
                //             if (response.data.data.tableList[i].tableName === that.mainFlowInfo[j].flowManage.tranId) {
                //                 response.data.data.tableList[i]["icon"] = "person"
                //                 isCommit = true
                //                 break
                //             }
                //         }
                //         if (!isCommit) {
                //             response.data.data.tableList[i]["icon"] = "edit"
                //         }
                //     }
                //     that.desserts = response.data.data.tableList;
                //     that.titleNum = response.data.data.tableList.length
                //     that.title = "核心系统"
                //     that.titleE = "ensemble"
                // });
            },
            routerTableInfo(item) {
                console.log(item.tableName," item.tableName,");
                console.log(item.tableDesc," item.tableDesc,");
                this.$router.push({
                    name: 'tableInfo',
                    hash: item.tableName
                })
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
        color: rgba(85, 198, 255, 0.85) !important;
    }
    .selected {
        background-color: #3C73E6;
        color: #fff;
    }
    .para >>> .v-list__tile__title {
        transition:none;
    }
     .table .v-btn--floating.v-btn--small {
        width: 35px;
        height: 35px;
        color: #3C73E6 !important;
        caret-color: #3C73E6 !important;

    }

</style>
