<template>
  <div class="tags-view-container">
    <scroll-pane class= 'tags-view-wrapper' ref= 'scrollPane'>
      <router-link ref= 'tag' class= 'tags-view-item' :class= "isActive(tag)?'active styleOmUi_Color3':''" v-for= 'tag in Array.from(visitedViews)'
                   :to= 'tag' :key= 'tag.path' @contextmenu.prevent.native= 'openMenu(tag,$event)'>
        {{titleName(tag)}}
        <v-icon @click.prevent.stop= 'closeSelectedTag(tag)' class="material-icons">close</v-icon>
      </router-link>
    </scroll-pane>
    <ul class='contextMenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click= 'closeSelectedTag(selectedTag)'>{{$t('tagsView.close')}}</li>
      <li @click= 'closeOthersTags'>{{$t('tagsView.closeOthers')}}</li>
      <li @click= 'closeAllTags'>{{$t('tagsView.closeAll')}}</li>
    </ul>
  </div>
</template>

<script>
    import ScrollPane from "@/components/ScrollPane";
    import { generateTitle } from "@/utils/i18n";
    import {getTableInfoDesc} from "@/api/url/prodInfo";
    export default {
        components: { ScrollPane },
        data() {
            return {
                visible: false,
                top: 0,
                left: 0,
                selectedTag: {}
            };
        },
        computed: {
            visitedViews() {
                return this.$store.state.tagsView.visitedViews;
            }
        },
        watch: {
            $route() {
                this.addViewTags();
                this.moveToCurrentTag();
            },
            visible(value) {
                if (value) {
                    document.body.addEventListener("click", this.closeMenu);
                } else {
                    document.body.removeEventListener("click", this.closeMenu);
                }
            }
        },
        mounted() {
            this.addViewTags();
        },
        methods: {
            generateTitle, // generateTitle by vue-i18n
            titleName(tag) {
                const name=tag.name;
                if(name ==='tableInfo')
                {
                    getTableInfoDesc(tag.hash).then(function (response) {
                        tag.title= response.data.data.tableDesc;
                    })
                }
                return tag.title
            },
            generateRoute() {
                if (this.$route.name) {
                    return this.$route;
                }
                return false;
            },
            isActive(route) {
                return (route.path === this.$route.path)&&(route.hash ===this.$route.hash);
            },
            addViewTags() {
                const route = this.generateRoute();
                if (!route) {
                    return false;
                }
                this.$store.dispatch("addVisitedViews", route);
            },
            moveToCurrentTag() {
                const tags = this.$refs.tag;
                this.$nextTick(() => {
                    for (const tag of tags) {
                        if (tag.to.fullpath === this.$route.fullpath) {
                            this.$refs.scrollPane.moveToTarget(tag.$el);
                            break;
                        }
                    }
                });
            },
            closeSelectedTag(view) {
                this.$store.dispatch("delVisitedViews", view).then(views => {
                    if (this.isActive(view)) {
                        const latestView = views.slice(-1)[0];
                        if (latestView) {
                            this.$router.push(latestView);
                        } else {
                            this.$router.push("/");
                        }
                    }
                });
            },
            closeOthersTags() {
                this.$router.push(this.selectedTag);
                this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
                    this.moveToCurrentTag();
                });
            },
            closeAllTags() {
                this.$store.dispatch("delAllViews");
                this.$router.push("/");
            },
            openMenu(tag, e) {
                this.visible = true;
                this.selectedTag = tag;
                this.left = e.clientX - 298;
                this.top = e.clientY - 52;
            },
            closeMenu() {
                this.visible = false;
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-wrapper .material-icons {
    padding-bottom: 1px;
  }

  .tags-view-container {
    .tags-view-wrapper {
      background: #B7C1CF;
      height: 46px;
     // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
      .tags-view-item {
        text-decoration: none;
        display: inline-block;
        position: relative;
        height: 35px;
        line-height: 35px;
        color: #a0a9ac;
        background: #DCE2EB;
        font-weight: 400;
        font-size: 16px;
        margin: 11px 5px 0px 5px;
        text-align: center;
        border-top: 2px solid #DCE2EB;
        padding:0 6px;
        border-radius: 3px 3px 0 0;

        &:first-of-type {
          margin-left: 15px;
        }
        &.active {
          color: #0C88B5;
          border-top: 2px solid #0C88B5;
            .material-icons{
                color: #0C88B5;
            }

          &::before {
            content: "";
            // background: #57ff4f;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
          }
        }
      }
    }
    .contextMenu {
      margin: 0;
      background: #B7C1CF;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
          color: #fff;
        &:hover {
          background: #00b0ff;
        }
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .tags-view-wrapper .material-icons {
    font-size: inherit;
  }
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
