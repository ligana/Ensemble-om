<template>
    <div class="vCard" v-show="show">
        <v-layout row wrap>
            <v-dialog v-model="diff" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card ref="print">
                    <v-toolbar dark color="#3C73E6!important">
                        <v-btn icon dark @click="closeDialog">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>修改差异展示</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <prod-diff-table :sendTranId="tranId" :sendTranType="tranType" :seqNo="code" :recSeqNo="recSeqNo"></prod-diff-table>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-card flat tile>
            <div class="vToolbar">
                <v-toolbar flat dense color="#3C73E6!important" dark class="pa-0">
                    <v-toolbar-title>操作列表</v-toolbar-title>
                </v-toolbar>
            </div>
            <div class="vList">
                <v-list three-line class="pa-0">
                    <template v-for="(item, index) in items">
                        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                        <v-divider v-else-if="item.divider" :key="index"></v-divider>
                        <v-list-tile avatar v-else :key="item.tranName" @click="handleClick" class="vlTile">
                            <div style="width: 20%;height: 60%;padding-left: 1%">
                                <img src="../../../static/prod/prod7.jpg" height=100% width=70%>
                            </div>
                            <div style="width: 60%">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.tranId }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.tranName }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ item.recSeqNo }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </div>
                            <div style="width: 20%">
                                <div style="width: 40%;float: left">
                                    <v-icon style="font-size: 30px" class="material-icons" @click="different(item)">
                                        visibility
                                    </v-icon>
                                </div>
                                <div style="width: 40%;float: right">
                                    <v-icon style="font-size: 30px" class="material-icons" @click="deleteTask(item)">
                                        close
                                    </v-icon>
                                </div>
                            </div>
                        </v-list-tile>
                        <v-divider></v-divider>
                    </template>
                </v-list>
            </div>
            <div class="button">
                <div style="width: 10%;height: 100%;float: left"></div>
                <div class="clear">
                    <v-btn block color="#3C73E6!important" style="margin-top: 10px;" dark @click="clean()">清空</v-btn>
                </div>
                <div style="width: 20%;height: 100%;float: left"></div>
                <div class="submit">
                    <v-btn block color="#3C73E6!important" style="margin-top: 10px;" dark @click="submit()">提交</v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
    import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
    import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'
    import prodDiffTable from '@/views/prodFactory/prodDiff/prodDiffTable'
    import {getCommonList} from "@/api/url/prodInfo";
    import {cleanList} from "@/api/url/prodInfo";
    import {deleteTask} from "@/api/url/prodInfo";
    import {submitCommon} from "@/api/url/prodInfo";
    import DcTextField from '@/components/widgets/DcTextField'
//    import TaskListMenu from '@/views/propertyManage/taskListMenu'
    import download2 from '@/utils/download2';
    import toast from '@/utils/toast';
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    import {
        tranFlowRelease
    } from '@/api/url/prodInfo';

    export default {
        components: {
            baseTable,
            prodDiffTable,
//            TaskListMenu,
        },
        props: {
            taskMenu: Boolean
        },
        data: () => ({
            diff: false,
            show: '',
            items: [
                {
                    tranName: '',
                    color: '',
                    icon: '',
                    timeLabel: ''
                }
            ],
            sourceModule: [],
            seqNo: '',
            recSeqNo: '',
            dialog: false,
            code: '',
            tranId: '',
            tranType: '',
            prodData: {},
        }),
        watch: {
            taskMenu: {
                handler() {
                    this.getTaskList()
                }
            }
        },
        created() {
            let that = this;
            window.addEventListener("taskList", function () {
                that.getTaskList();
            })
        },
        mounted: function () {
            this.getTaskList()
        },
        methods: {
            handleClick: (e) => {
                console.log(e);
            },
            closeDialog() {
                this.diff = false
                this.prodData = {}
                //parent.location.reload();
            },
            different(item) {
                this.diff = true
                this.code = item.mainSeqNo
                this.tranId = item.tranId
                this.tranType = item.tranType
                this.recSeqNo = item.recSeqNo
            },
            submit() {
                let that = this
                that.show = false
                submitCommon({"userId": sessionStorage.getItem("userId")}).then(response => {
                    that.items = []
                    this.$emit('getTaskList', '0')
                })
            },
            clean() {
                let that = this
                that.show = false
                cleanList({"seqNo": this.seqNo}).then(response => {
                    that.items = []
                    this.$emit('getTaskList', '0')
                })
                this.tranId = ''
            },
            deleteTask(item) {
                let that = this;
                that.show = false
                deleteTask({
                    "tranId": item.tranId,
                    "seqNo": this.seqNo
                }).then(response => {
                    if (that.items.length == 1) {
                        that.items = []
                    } else {
                        for (const [i, v] of that.items.entries()) {
                            if (v === item) {
                                that.items.splice(i, 1)
                            }
                        }
                    }
                    that.$emit('getTaskList', that.items.length)
                })
                this.tranId = ''
            },
            showSearchAction() {
                this.$router.push({name: "tranDataIndex"});
            },
            getTaskList() {
                getCommonList({"userId": sessionStorage.getItem("userId")}).then(response => {
                    this.items = response.data.data;
                    if (this.items[0] != null) {
                        this.seqNo = this.items[0].mainSeqNo
                    }

                    if(response.data.data!=null&&response.data.data!={}){
                        this.$emit('getTaskList',response.data.data.length)
                        if(response.data.data.length!=0){
                        sessionStorage.setItem("mainSeqNo", response.data.data[0].mainSeqNo);
                        }
                    }
                    this.show = true
                    if (this.items.length == 0) {
                        this.show = false
                    }
                });
            }
        },

    };
</script>
<style lang="stylus" scoped>
    .vCard {
        background-color white
        margin auto
        width 100%
        height 100%
    }

    .vToolbar {
        height 10%
    }

    .vList {
        width 100%
        height 70%
    }

    .vlTile {
        width 100%
        margin 0
    }

    .button {
        background-color white
        width 100%
        height 58px

    }

    .clear {
        float left
        width 30%
        height 100%
    }

    .submit {
        float left
        width 30%
        height 100%
    }
</style>