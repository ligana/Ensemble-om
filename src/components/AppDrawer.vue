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
        <div class="admin-box">
            <div class="imgbox">
                <v-img src="/static/avatar/per1.jpg"></v-img>
            </div>
            <v-list>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title style="color: #fff;font-size: 18px;font-weight: 800">admin统管
                        </v-list-tile-title>
                        <v-list-tile-title style="color: #c5d0e1;font-size: 14px;font-weight: 400">系统管理员
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>
        <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
            <v-list dense expand>
                <template v-for="(item, i) in menus">
                    <!--group with subitems组条目-->
                    <v-list-group v-if="item.items" :key="i" :group="item.group" :prepend-icon="item.icon" no-action="no-action">
                        <v-list-tile slot="activator" ripple="ripple">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <template v-for="(subItem, i) in item.items">
                            <!--sub group子组-->
                            <v-list-group v-if="subItem.items" :key="subItem.name" :group="subItem.group"
                                          sub-group="sub-group">
                                <v-list-tile slot="activator" ripple="ripple">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile v-for="(grand, i) in subItem.children" :key="i"
                                             :to="genChildTarget(item, grand)" :href="grand.href" ripple="ripple">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-group>
                            <!--child item-->
                            <v-list-tile v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href"
                                         :disabled="subItem.disabled" :target="subItem.target" ripple="ripple">
                                <v-list-tile-content>
                                    <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <!-- <v-circle class="white--text pa-0 circle-pill" v-if="subItem.badge" color="red" disabled="disabled">{{ subItem.badge }}</v-circle> -->
                                <v-list-tile-action v-if="subItem.action">
                                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}
                                    </v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </template>
                    </v-list-group>
                    <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>
                    <v-divider v-else-if="item.divider" :key="i"></v-divider>
                    <!--top-level link-->
                    <v-list-tile v-else :to="!item.href ? { name: item.name } : null" :href="item.href" ripple="ripple"
                                 :disabled="item.disabled" :target="item.target" rel="noopener" :key="i">
                        <v-list-tile-action v-if="item.icon">
                            <v-icon outline>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                        <!--&lt;!&ndash; <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> &ndash;&gt;-->
                        <v-list-tile-action v-if="item.subAction">
                            <v-icon class="success--text">{{ item.subAction }}</v-icon>
                        </v-list-tile-action>
                        <!--&lt;!&ndash; <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> &ndash;&gt;-->
                    </v-list-tile>
                </template>
            </v-list>
        </vue-perfect-scrollbar>
    </v-navigation-drawer>
</template>
<script>
<<<<<<< HEAD
    // import {Menu} from "@/api/menu";
    import {Menu} from "@/mock/menu";
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    import {getMenuList} from "@/api/url/prodInfo";

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
                drawer: false,
                menuSwitch: false,
                menus: Menu,
                scrollSettings: {
                    maxScrollbarLength: 160
                }
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
            showMenuLog(val) {
                this.menuSwitch = val
            }
        },
        created() {
            window.getApp.$on("APP_DRAWER_TOGGLED", () => {
                this.drawer = !this.drawer;
                /* this.mini = !this.mini;*/
            });
            getMenuList({userId: sessionStorage.getItem("userId")}).then(response => {
                this.menus = response.data.data;
            })
        },
        methods: {
            genChildTarget(item, subItem) {
                if (subItem.href) return;
                if (subItem.component) {
                    return {
                        name: subItem.component,
                        // hash: subItem.name,
                        hash: subItem.params
                    };

                }
                return {name: `${item.group}/${subItem.params}`};
            }
        }
    };
=======
import { Menu } from "@/api/menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import {getMenuList} from "@/api/url/prodInfo";
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
        drawer: false,
        menuSwitch: false,
        menus: Menu,
        scrollSettings: {
          maxScrollbarLength: 160
        },
        userId: ""
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
    }
  }
};
>>>>>>> master
</script>


<style lang="stylus" scoped>
    #appDrawer {
        overflow: hidden;
        background-color: #2C2F43;

    }

    .drawer-menu--scroll {
        height: calc(78vh - 48px);
        overflow: auto;
    }

    .admin-box {
        display: flex;
        justify-content: flex-start;
        background-color: #919191;
        padding: 0 20px;
        box-shadow: 0 1px 8px 2px #a5a5a5;
    }

    .admin-box .imgbox {
        width: 100px;
    }

    #appDrawer >>> .v-image__image {
        width: 60px;
        height: 60px;
        top: 20px;
        left: 20px;
        border-radius: 50%;
        border: 3px solid #a2a9b7;
    }

    .admin-box .v-list {
        padding: 26px 0;
    }

    .admin-box >>> .v-list .v-list__tile {
        padding-left: 0px;
    }

    #appDrawer >>> .theme--light.v-subheader {
        color: #4D5270 !important;
        font-weight: 600;
        box-shadow: 0px 0px 6px 0px #232738;
    }

    #appDrawer >>> .v-list__group__items {
        background-color: #26293C

    }

    #appDrawer >>> .v-list__tile--active {
        background-color: #1C1F2D;
        border-left 2px solid #3C73E6;
    }

    /*#appDrawer >>>  .theme--light.v-icon{
        color #fff!important;
    }*/
    #appDrawer >>> .v-list__tile--active .v-icon {
        color #3c73e6 !important;
    }

    #appDrawer >>> .primary--text {
        color: #3C73E6 !important;
        caret-color: #3C73E6 !important;
    }

    #appDrawer >>> .theme--light.v-list .v-list__group--active:after,
    #appDrawer >>> .theme--light.v-list .v-list__group--active:before {
        background-color: #2C2F43 !important;
        height: 0px

    }

    #appDrawer >>> .v-list__group--active {
        box-shadow: 0px 0px 0px 2px #232738;
    }

    #appDrawer >>> .v-list .v-list__tile--link:hover {
        background-color: #2C2F43 !important;
        transition: none;
    }

    #appDrawer >>> .v-list__tile--link .v-icon {
        color #fff;

    }

    #appDrawer >>> .v-list__tile--link:hover .v-icon {
        color #1890ff;
    }

    #appDrawer >>> .v-list__tile--link:hover .v-list__tile__title {
        color #1890ff;
    }

    #appDrawer >>> .v-list--dense .v-list__tile {
        color #fff;
    }

    #appDrawer >>> .v-list__group__header:hover {
        background-color: #2C2F43 !important;
    }

    #appDrawer >>> .v-list__group__header .v-icon {
        color #fff;
    }

    #appDrawer >>> .v-list__group__header:hover .v-icon {
        color #1890ff;
    }

    #appDrawer >>> .v-list__group__header:hover .theme--light {
        color #1890ff !important;
    }

    #appDrawer >>> .v-list__group__header:hover .v-list__tile__title {
        transition: none;
    }

    /* #appDrawer >>> .primary--text{
        color :#3C73E6!important;
    }
    #appDrawer >>> .theme--light.v-icon {
        color #fff;
    }
  .drawer-menu--scroll >>>.theme--light.v-list{
       color:#B5B4C2!important;
   }
    .drawer-menu--scroll >>> .theme--light.v-icon {
        color:#B5B4C2!important;
    }
    .drawer-menu--scroll >>> .theme--light.v-subheader {
        color:#4C516F!important;
        font-weight: 600
        font-size:14px
    }*/

</style>
