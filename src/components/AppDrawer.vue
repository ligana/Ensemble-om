<template>
  <v-navigation-drawer
    id="appDrawer"
    fixed
    :dark="$vuetify.dark"
    :temporary="!menuSwitch"
    app
    v-model="drawer"
    width="260"
    >
    <v-flex lg4 pl-4 pt-3>
        <v-card-media src="/static/avatar/per1.jpg">
      </v-card-media>
    </v-flex>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title style="margin-left: 6%">{{userId}}</v-list-tile-title>
            <v-list-tile-title style="margin-left: 6%">{{userName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
        <template v-for="(item, i) in menus">
            <!--group with subitems-->
            <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon" no-action="no-action">
              <v-list-tile slot="activator" ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <template v-for="(subItem, i) in item.items">
                <!--sub group-->
                <v-list-group v-if="subItem.items" :key="subItem.title" :group="subItem.group" sub-group="sub-group">
                  <v-list-tile slot="activator" ripple="ripple">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-for="(grand, i) in subItem.children" :key="i" :to="genChildTarget(item, grand)" :href="grand.href" ripple="ripple">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
                <!--child item-->
                <v-list-tile v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple="ripple" >
                  <v-list-tile-content>
                    <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                  </v-list-tile-content>
                  <!-- <v-circle class="white--text pa-0 circle-pill" v-if="subItem.badge" color="red" disabled="disabled">{{ subItem.badge }}</v-circle> -->
                  <v-list-tile-action v-if="subItem.action">
                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list-group>
            <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="i"></v-divider>
            <!--top-level link-->
            <v-list-tile v-else :to="!item.href ? { name: item.name } : null" :href="item.href" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="item.name">
              <v-list-tile-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <!-- <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> -->
              <v-list-tile-action v-if="item.subAction">
                <v-icon class="success--text">{{ item.subAction }}</v-icon>
              </v-list-tile-action>
              <!-- <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> -->
            </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import { Menu } from "@/api/menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import {getMenuList} from "@/api/url/prodInfo";
import { getSysUserInfoByUser } from '@/api/url/prodInfo';
export default {
  name: "app-drawer",
  components: {
    VuePerfectScrollbar
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
    showMenuLog: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
        titleName: this.globalConfig.name,
        mini: false,
        drawer: true,
        menuSwitch: true,
        menus: Menu,
        scrollSettings: {
          maxScrollbarLength: 160
        },
        userId: "",
        userName: ""
    };
  },
  computed: {
    computeGroupActive() {
      return true;
    },
    computeLogo() {
      return "/static/prod/dcLog1.png";
    },

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    }
  },
    watch: {
        showMenuLog (val) {
            this.menuSwitch=val
        }
    },
  created() {
      this.userId = sessionStorage.getItem("userId")
      this.getUserName()
      window.getApp.$on("APP_DRAWER_TOGGLED", () => {
      this.drawer = !this.drawer;
        /* this.mini = !this.mini;*/
      });
      getMenuList({userId: sessionStorage.getItem("userId")}).then(response => {
          this.menus=response.data.data;
      })
  },
  methods: {
      genChildTarget(item, subItem) {
          if (subItem.href) return;
          if (subItem.component) {
              return {
                  name: subItem.component,
                  hash: subItem.params
              };
          }
          return { name: `${item.group}/${subItem.params}` };
      },
      //用户名称
      getUserName() {
          getSysUserInfoByUser(this.userId).then(response => {
              this.userName = response.data.data.userInfo[0].userName
          })
      },
  }
};
</script>


<style lang="stylus" scoped>
#appDrawer {
  overflow: hidden;
}
  .drawer-menu--scroll {
    height: calc(78vh - 48px);
    overflow: auto;
  }

</style>
