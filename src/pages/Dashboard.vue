<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid class="pb-5">
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12 v-for="type in prodType" :key="type">
          <mini-statistic
                  icon="fa fa-facebook"
                  :mark="type.prodClass"
                  :title="type.prodDesc"
                  class="elevation-2 radiusDc"
                  :sub-title="type.num"
                  :color="type.color"
          >
          </mini-statistic>
        </v-flex>
        <!-- mini statistic  end -->
        <v-flex lg8 sm12 xs12>
          <v-widget v-if="site" title="系统发布统计" content-bg="white" class="elevation-2">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
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
          <v-widget v-if="location" title="产品扇形图" content-bg="white" class="elevation-2">
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
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getFinishFlowInfo } from '@/api/url/prodInfo';
    import {getProdClassList} from '@/api/url/prodInfo';

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
            prodType: [],
            prod: [],
            dataCircle: [
            ],
            dataTable: [
            ],
            colorInfo: [
                "indigo",
                "red",
                "light-blue",
                "purple"
            ],
            site: true,
            location: true,
        }),
        computed: {
            //系统发布统计
            siteTrafficData() {
                return this.dataTable
            },
            //扇形图
            locationData() {
                return this.dataCircle
            }
        },
        created() {
            this.getAllData();
            this.getProd();
        },
        methods: {
            getAllData(){
                getFinishFlowInfo().then(response => {
                    let main = response.data.data
                    this.dataTable = []
                    for(let n=1; n<13; n++){
                        let prodNum = 0
                        let paramNum = 0
                        for(let i=0; i<main.length; i++){
                            let time = main[i].flowCheckInfo.tranTime.split("/")
                            let equals = false
                            if(n<10){
                                let str = "0"+n.toString()
                                if(str == time[1]){
                                    equals = true
                                }
                            }else{
                                if(n.toString() == time[1]){
                                    equals = true
                                }
                            }
                            if(equals){
                                if(main[i].flowManage.status == "4"){
                                    if(main[i].flowManage.tranId == "MB_PROD_TYPE"){
                                        prodNum++
                                    }else{
                                        paramNum++
                                    }
                                }
                            }
                        }
                        let table = {}
                        table['month'] = n
                        table['产品发布'] = prodNum
                        table['参数发布'] = paramNum
                        this.dataTable.push(table)
                    }
                    this.site = false
                    this.$nextTick(() => {
                        this.site = true
                    })
                })
            },
            //获取产品种类
            getProd(){
                let that = this
                getProdClassList().then(response => {
                    let prodClass = response.data.data
                    for(let i=0; i<prodClass.length; i++){
                        if(prodClass[i].prodClassLevel == "1"){
                            let prodC = {}
                            prodC['prodClass'] = prodClass[i].prodClass
                            prodC['prodDesc'] = prodClass[i].prodClassDesc
                            that.prod.push(prodC)
                        }
                    }
                    that.getProdType()
                })
            },
            //获取各种产品的数量
            getProdType() {
                let that = this
                getAllProdList().then(response => {
                    let type = response.data.data
                    for(let i=0; i<this.prod.length; i++){
                        let num = 0
                        for(let j=0; j<type.length; j++){
                            if(type[j].sourceModule == this.prod[i].prodClass){
                                num++
                            }
                        }
                        let data = {}
                        data['prodClass'] = that.prod[i].prodClass
                        let t = this.prod[i].prodDesc
                        data['prodDesc'] = that.prod[i].prodDesc.substring(0,3)
                        data['num'] = num
                        data['color'] = that.colorInfo[i%4]
                        that.prodType.push(data)
                        data = {}
                        data['value'] = num
                        data['name'] = that.prod[i].prodDesc
                        that.dataCircle.push(data)

                    }
                    this.location = false
                    this.$nextTick(() => {
                        this.location = true
                    })
                })
            },
        }
    };
</script>
<style lang="stylus" scoped>
  .dcFooter{
    position:absolute
    bottom 0;
    width: 100%
  }
</style>