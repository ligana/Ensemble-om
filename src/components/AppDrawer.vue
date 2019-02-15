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
        <!--<div class="admin-box">-->
            <v-flex lg4 pl-4 pt-3>
                <v-card-media src="/static/avatar/per1.jpg"></v-card-media>
            </v-flex>
            <v-list>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title style="margin-left: 6%">admin</v-list-tile-title>
                        <v-list-tile-title style="margin-left: 6%">系统管理员</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        <!--</div>-->

        <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
            <v-list dense expand>
                <template v-for="(item, i) in menus">
                    <!--group with subitems-->
                    <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon"
                                  no-action="no-action">
                        <v-list-tile slot="activator" ripple="ripple">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <template v-for="(subItem, i) in item.items">
                            <!--sub group-->
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
                                 :disabled="item.disabled" :target="item.target" rel="noopener" :key="item.name">
                        <v-list-tile-action v-if="item.icon">
                            <v-icon outline>{{ item.icon }}</v-icon>
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


    
</script>


<style lang="stylus" scoped>

    #appDrawer {
        overflow: hidden;
        /*background-color: #2C2F43;*/
    }

    .drawer-menu--scroll {
        height: calc(78vh - 48px);
        overflow: auto;
    }

    .admin-box {
         /* display: flex;
          justify-content space-around;
          height: 100px;*/
         /* margin: 0 auto;
          background-color: #919191*/

      }
       /* .admin-box .v-responsive__content{
            width: 50px
            height: 50px
        }*/
    /*.primary--text {
        color: #3f51b5 !important;
        caret-color: #3f51b5 !important;
        border-left: 4px solid #fff;
        background-color: #1C1F2D;
   }
   .theme--light.v-list {
       color:#b5b4c2 !important;
   }*/


</style>
