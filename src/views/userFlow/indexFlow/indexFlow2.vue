<template>
  <div class="pt-3">
    <v-card class="elevation-2 radiusDc">
      <v-layout align-center justify-space-between row fill-height>
        <v-flex lg2 sm2 pl-3>
          <img src="/static/user/MyUser.png" class="imgUserIndexFlow">
        </v-flex>
        <v-flex lg7 sm7>
          <v-layout>
            <v-flex lg7 sm7 pb-3>
              <span class="headline text-xs-center">{{userId}},你好,欢迎进入</span>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex lg7 sm7>
              <span class="title text-xs-center">XXX银行产品工厂 - {{userName}}</span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg3 sm3 offset-xs0 offset-lg2>
          <v-layout row wrap>
            <v-flex d-flex>
              <div>
                <span class="title">交易数</span>
                <br/><br/>
                <span class="title pl-2">{{tableListNum}}</span>
              </div>
            </v-flex>
            <v-flex d-flex>
              <div>
                <span class="title">我的发布</span>
                <br/><br/>
                <span class="title pl-2">{{processNum}}</span>
              </div>
            </v-flex>
            <v-flex d-flex>
              <div>
                <span class="title">我的收藏</span>
                <br/><br/>
                <span class="title pl-2">{{colleceNum}}</span>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row pt-2>
      <v-flex xs9 sm9 pt-1>
        <v-card class="elevation-2 radiusDc">
          <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" class="elevation-2" flat>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>我的任务</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-1">
            <user-work-tags></user-work-tags>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 sm3 pt-1 pl-3>
        <v-card class="elevation-2 radiusDc">
          <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" class="elevation-2" flat>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>快捷导航</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text style="text-align: center; " class="py-1">
            <v-list>
              <v-list-tile v-for="item in items" :key="item.title" avatar @click="keyboardClick(item)">

                <v-list-tile-action>
                  <v-icon v-if="item.icon" color="red">star</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
                <!-- <v-list-tile-action style="min-width: 0; ">
                  <v-chip label color="pink" text-color="white">
                    <v-icon left color="white">start</v-icon>编辑
                  </v-chip>
                </v-list-tile-action> -->
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="700">
        <index-flow-route :tree="tree"></index-flow-route>
    </v-dialog>
  </div>
</template>
<script>

    import indexFlowRoute from "./indexFlowRoute"
    import { Menu } from "@/api/menu";
    import userWorkTags from "@/views/userFlow/userWork/userWorkTags";
    import {getPkList} from "@/server/pkList";
    import {getMenuList} from "@/api/url/prodInfo";
    import {getSysTable} from '@/api/url/prodInfo';
    import { getCheckFlowList } from '@/api/url/prodInfo';
    import { getUserCollectByUserId } from '@/api/url/prodInfo';
    import { getSysUserInfoByUser } from '@/api/url/prodInfo';
export default {
    components: {
        userWorkTags,
        indexFlowRoute
    },
    data() {
        return {
            items: [
        {
          icon: true,
          title: "个人人民币活期基础产品",
          value: "BaseProdForm",
            hash: "RB101",
          avatar: "/static/prod/prod2.jpg"
        },
        {
          icon: true,
          title: "个人贷款基础产品",
          value: "BaseProdForm",
            hash: "CL001",
          avatar: "/static/prod/prod2.jpg"
        },
        {
          icon: true,
          title: "参数管理",
          value: "paramManage",
          avatar: "/static/prod/prod2.jpg"
        },
        {
          icon: true,
          title: "交易管理",
          value: "transManage",
          avatar: "/static/prod/prod2.jpg"
        }
      ],
            menus: Menu,
            dialog: false,
            search: '',
            tree: [],
            userId: "",
            tableListNum: "",
            processNum: "",
            colleceNum: "",
            userName: "",
        };
    },
    created() {
        this.userId = sessionStorage.getItem("userId")
        this.getTableList()
        this.getMainProcess()
        this.getCollect()
        this.getUserName()
        getMenuList({userId: this.userId}).then(response => {
            this.menus=response.data.data;
            let trees = []
            this.getMenusItems(this.menus,trees)
            this.tree = trees
        })
    },
    methods: {
        getMenusItems(item,trees){
            for(let i=0; i<item.length; i++){
                if(item[i].title != undefined && item[i].items == undefined){
                    let treeNode = {}
                    treeNode["id"] = parseInt(item[i].menuId)
                    treeNode["name"] = item[i].title
                    trees.push(treeNode)
                }
                if(item[i].items != undefined){
                    this.getMenusItems(item[i].items,trees)
                }
            }
        },
        keyboardClick(item) {
          this.$router.push({
            name: item.value,
            hash: item.hash,
          });
        },
        //用户名称
        getUserName() {
            getSysUserInfoByUser(this.userId).then(response => {
                this.userName = response.data.data.userInfo[0].userName
            })
        },
        //交易数
        getTableList() {
            getSysTable("OM_TABLE_LIST").then(response => {
                let tableList = response.data.data.columnInfo
                this.tableListNum = tableList.length
            })
        },
        //我的发布
        getMainProcess() {
            getCheckFlowList().then(response => {
                let main = response.data.data
                let num = 0
                for(let i=0; i<main.length; i++){
                    if(this.userId == main[i].flowManage.userId && main[i].flowManage.status == "4"){
                        num++
                    }
                }
                this.processNum = num
            })
        },
        //我的收藏
        getCollect() {
            getUserCollectByUserId(this.userId).then(response => {
                let collect = response.data.data.collectList
                this.colleceNum = collect.length
            })
        },

        //快捷导航的跳转
        route() {
            this.$router.push({
                name: 'tableInfo',
            })
        },
        add() {
            this.dialog = true

        }
    }
};
</script>
<style scoped>
.imgUserIndexFlow {
  width: 100px;
  display: inline-block;
}
.indexFlowTitle {
  padding: 10px;
}
</style>