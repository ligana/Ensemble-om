<template>
  <div class="pageDashboard">
    <v-container grid-list-xl fluid class="pb-5">
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12 pad>
          <mini-statistic
                  icon="fa fa-facebook"
                  mark="RB"
                  title="存款产品"
                  class="elevation-2 radiusDc "
                  sub-title="210"
                  color="subject1"
          >
          </mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12 pad>
          <mini-statistic
                  icon="fa fa-google"
                  class="elevation-2 radiusDc "
                  mark="CL"
                  title="贷款产品"
                  sub-title="187"
                  color="subject2"
          >
          </mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12 pad>
          <mini-statistic
                  icon="fa fa-twitter"
                  mark="GL"
                  class="elevation-2 radiusDc"
                  title="内部帐"
                  sub-title="120"
                  color=" subject3"
          >
          </mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12 pad>
          <mini-statistic
                  icon="fa fa-instagram"
                  mark="SF"
                  class="elevation-2 radiusDc "
                  title="特色理财"
                  sub-title="20"
                  color="subject4"
          >
          </mini-statistic>
        </v-flex>
        <!-- mini statistic  end -->
        <v-flex lg8 sm12 xs12>
          <v-widget title="系统发布统计" content-bg="white" class="v-widget">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary" style='color:#7B82EE!important;'>refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
              <e-chart
                      :path-option="[
                  ['dataset.source', siteTrafficData],
                  ['color', [color.lightBlue.base, color.green.lighten1]],
                  ['legend.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],
                  ['series[0].type', 'bar'],
                  ['series[0].areaStyle', {}],
                  ['series[0].smooth', true],
                  ['series[1].smooth', true],
                  ['series[1].type', 'bar'],
                  ['series[1].areaStyle', {}],
                ]"
                      height="400px"
                      width="100%"
              >
              </e-chart>
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg4 sm12 xs12>
          <v-widget title="产品扇形图" content-bg="white" class="v-widget">
            <div slot="widget-content">
              <e-chart
                      :path-option="[
                  ['dataset.source', locationData],
                  ['legend.bottom', '0'],
                  ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                  ['series[0].avoidLabelOverlap', true],         
                  ['series[0].radius', ['50%', '70%']],                      
                ]"
                      height="400px"
                      width="100%"
              >
              </e-chart>
            </div>
          </v-widget>
        </v-flex>
        <!-- social/weather card start -->

      </v-layout>

    </v-container>
<!--    <v-footer height="auto" class="white pa-3 app&#45;&#45;footer elevation-2 dcFooter">
      <span class="caption">SmartEnsemble-om &copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <span class="caption mr-1"> ensemble-om </span> <v-icon color="pink" class="mr-2" small>favorite</v-icon>
    </v-footer>-->
  </div>

</template>

<script>
import API from "@/api";
import EChart from "@/components/chart/echart";
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic";
import PostListCard from "@/components/widgets/card/PostListCard";
import ProfileCard from "@/components/widgets/card/ProfileCard";
import PostSingleCard from "@/components/widgets/card/PostSingleCard";
import WeatherCard from "@/components/widgets/card/WeatherCard";
import PlainTable from "@/components/widgets/list/PlainTable";
import PlainTableOrder from "@/components/widgets/list/PlainTableOrder";
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
import VCircle from "@/components/circle/VCircle";
import BoxChart from "@/components/widgets/chart/BoxChart";
import ChatWindow from "@/components/chat/ChatWindow";
import CircleStatistic from "@/components/widgets/statistic/CircleStatistic";
import LinearStatistic from "@/components/widgets/statistic/LinearStatistic";
export default {
  components: {
    VWidget,
    MiniStatistic,
    ChatWindow,
    VCircle,
    WeatherCard,
    PostSingleCard,
    PostListCard,
    ProfileCard,
    EChart,
    BoxChart,
    CircleStatistic,
    LinearStatistic,
    PlainTable,
    PlainTableOrder
  },
  data: () => ({
    color: Material,
    selectedTab: "tab-1",
    linearTrending: [
      {
        subheading: "Sales",
        headline: "2,55",
        caption: "increase",
        percent: 15,
        icon: {
          label: "trending_up",
          color: "success"
        },
        linear: {
          value: 15,
          color: "success"
        }
      },
      {
        subheading: "Revenue",
        headline: "6,553",
        caption: "increase",
        percent: 10,
        icon: {
          label: "trending_down",
          color: "error"
        },
        linear: {
          value: 15,
          color: "error"
        }
      },
      {
        subheading: "Orders",
        headline: "5,00",
        caption: "increase",
        percent: 50,
        icon: {
          label: "arrow_upward",
          color: "info"
        },
        linear: {
          value: 50,
          color: "info"
        }
      }
    ],
    trending: [
      {
        subheading: "Email",
        headline: "15+",
        caption: "email opens",
        percent: 15,
        icon: {
          label: "email",
          color: "info"
        },
        linear: {
          value: 15,
          color: "info"
        }
      },
      {
        subheading: "Tasks",
        headline: "90%",
        caption: "tasks completed.",
        percent: 90,
        icon: {
          label: "list",
          color: "primary"
        },
        linear: {
          value: 90,
          color: "success"
        }
      },
      {
        subheading: "Issues",
        headline: "100%",
        caption: "issues fixed.",
        percent: 100,
        icon: {
          label: "bug_report",
          color: "primary"
        },
        linear: {
          value: 100,
          color: "error"
        }
      }
    ]
  }),
  computed: {
    activity() {
      return API.getActivity();
    },
    posts() {
      return API.getPost(3);
    },
    siteTrafficData() {
      return API.getMonthVisit;
    },
    locationData() {
      return API.getLocation;
    }
  }
};
</script>
<style lang="stylus" scoped>
  .dcFooter{
    position:absolute
    bottom 0;
    width: 100%
  }

  .radiusDc {
    /*padding: 0px!important;*/
      box-shadow: 0px 0px 0px 0px #fff !important;
      background-color: #ecf0f6;
  }
    .pageDashboard >>> .v-toolbar__title h4 {
        margin-bottom: .0em;
    }
    .v-widget >>> .v-card{
        border-radius:0!important;
        box-shadow:none!important;
        border 1px solid #E0E4EA;
    }
    #v-widget >>>.v-toolbar{
        background-color: #F4F5F9 !important;
    }

  </style>