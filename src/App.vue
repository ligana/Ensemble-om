<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app backPower">
        <app-drawer class="app--drawer elevation-2 dcMenu" :showMenuLog="showMenuLog"></app-drawer>
        <app-toolbar class="app--toolbar elevation-2 pl-0" v-on:menuSwitch="menuSwitch" ></app-toolbar>
        <v-content>
          <!-- Page Header -->
       <!--<page-header v-if="$route.meta.breadcrumb"></page-header>-->
          <tags-view></tags-view>
          <div class="px-4">
            <keep-alive :include='cachedViews'>
            <router-view :key="key"></router-view>
            </keep-alive>
          </div>
           <!-- App Footer -->

        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
<!--            <session-list></session-list>-->
        <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="#82B1FF" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
          >
          <theme-settings></theme-settings>
        </v-navigation-drawer>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import ThemeSettings from "@/components/ThemeSettings";
import AppEvents from "./event";
import TagsView from "@/views/layout/components/TagsView";
import SessionList from "@/views/propertyManage/sessionList"
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    SessionList,
    TagsView
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    dashboard: true,
    showMenuLog: false,
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  }),
    computed: {
        key() {
            return this.$route.fullPath
        },
        cachedViews() {
            return this.$store.state.tagsView.cachedViews;
        }
    },
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
    menuSwitch() {
        this.showMenuLog=!this.showMenuLog;
    }
  }
};
</script>


<style lang="stylus" scoped>
  .dcMenu {
    margin-top 66px!important;

  }
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
.ant-table-pagination.ant-pagination {
    padding: 16px!important;
}

</style>
