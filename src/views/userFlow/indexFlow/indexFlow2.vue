<template>
  <div>
    <v-card >
      <v-layout row wrap>
        <v-flex lg2 sm2 style="text-align: center;">
          <img src="/static/user/MyUser.png" class="imgUserIndexFlow" >
        </v-flex>
        <v-flex lg7 sm7 >
          <span class="userSpan1" >admin,欢迎进入SmartEnsemble-OM,祝你开心每一天!</span>
          <span class="userSpan2">神州数码 | 神州信息 - OM系统管理员</span>
        </v-flex>
        <v-flex lg3 sm3 >
          <div class="userDiv1">
            <p>交易数</p>
            <p class="userP1">210</p>
          </div>
          <div class="userDiv1 userDiv2">
            <p>我的发布数</p>
            <p class="userP1">45</p>
          </div>
          <div class="userDiv1 userDiv2">
            <p>我收藏的产品</p>
            <p class="userP1">20</p>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row>
      <v-flex xs9 sm9 class="userCard1">
        <v-card >
          <v-toolbar color="white" >
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>正在进行中项目</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text style="text-align: center;">
            <user-work-tags></user-work-tags>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 sm3 class="userCard1">
        <v-card >
          <v-toolbar color="white" >
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>快捷导航</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text style="text-align: center;">
            <v-list>
              <v-list-tile
                      v-for="item in items"
                      :key="item.title"
                      avatar
                      @click=""
              >
                <v-list-tile-action style="min-width: 0; ">
                  <v-icon v-if="item.icon" color="pink">star</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import userWorkTags from '@/views/userFlow/userWork/userWorkTags'
    export default {
        components: {
            userWorkTags
        },
        data () {
            return {
                items: [
                    { icon: true, title: '个人活期存款', avatar: '/static/prod/prod2.jpg' },
                    {icon: true, title: '产品目录', avatar: '/static/prod/prod2.jpg' },
                    {icon: true, title: '个人特色产品', avatar: '/static/prod/prod2.jpg' },
                    { icon: true,title: '参数管理入口', avatar: '/static/prod/prod2.jpg' }
                ]
            }
        }
    }
</script>
<style scoped>
  .imgUserIndexFlow{
    width: 100px;
    display: inline-block;
  }
  .userCard1{
    padding: 20px;
  }
  .userSpan1{
    font-size: 26px;
    display:inline-block;
    padding-top: 10px;
  }
  .userSpan2{
    display:inline-block;
    padding-top: 5px;
  }
  .userDiv1{
    float:left;
    text-align: center;
    margin-top: 10px;
  }
  .userDiv3{
    padding: 10px;
  }
  .userDiv2{
    padding-left: 40px;
  }
  .indexFlowTitle{
    padding: 10px;
  }
  .userP1{
    font-size: 25px;
    display:inline-block;
  }
</style>