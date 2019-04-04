<template>
    <v-container grid-list-xl fluid class="pb-5">
        <v-layout row wrap>
            <v-flex lg3 sm6 xs12 v-for="type in prodType" :key="type.prodClass">
                <mini-statistic
                        icon="fa fa-facebook"
                        :mark="type.prodClass"
                        :title="type.prodDesc"
                        :sub-title="type.num"
                        :color="type.color"
                >
                </mini-statistic>
            </v-flex>
            <!-- mini statistic  end -->
            <v-flex lg8 sm12 xs12>
                <v-widget title="系统发布统计" content-bg="white" class="v-widget">
                    <v-btn icon slot="widget-header-action">
                        <v-icon class="text--secondary">refresh</v-icon>
                    </v-btn>
                    <div slot="widget-content">
                        <e-chart
                                :path-option="[
                  ['dataset.source', dataTable],
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
                  ['dataset.source', dataCircle],
                  ['dataset.source', dataCircle],
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
        </v-layout>
    </v-container>
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
    import {getAllProdList} from '@/api/url/prodInfo';
    import {getCheckFlowList} from '@/api/url/prodInfo';
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
            ],
            prodType: [],
            prod: [],
            dataCircle: [],
            dataTable: [
                {
                    'month': 1,
                    '产品发布': 200,
                    '参数发布': 250,
                },
                {
                    'month': 2,
                    '产品发布': 300,
                    '参数发布': 350,
                }
            ],
            colorInfo: [
                'subject1',
                'subject2',
                'subject3',
                'subject4'
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
        },
        created() {
            this.getAllData();
        },
        methods: {
            getAllData() {
                this.getProd()
                getCheckFlowList().then(response => {
                    let main = response.data.data
                    this.dataTable = []
                    for (let n = 1; n < 13; n++) {
                        let prodNum = 0
                        let paramNum = 0
                        for (let i = 0; i < main.length; i++) {
                            let time = main[i].flowCheckInfo.tranTime.split("/")
                            let equals = false
                            if (n < 10) {
                                let str = "0" + n.toString()
                                if (str == time[1]) {
                                    equals = true
                                }
                            } else {
                                if (n.toString() == time[1]) {
                                    equals = true
                                }
                            }
                            if (equals) {
                                if (main[i].flowManage.status == "4") {
                                    if (main[i].flowManage.tranId == "MB_PROD_TYPE") {
                                        prodNum++
                                    } else {
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
                    console.log(this.dataTable)
                })
            },
            //获取产品种类
            getProd() {
                getProdClassList().then(response => {
                    let prodClass = response.data.data
                    for (let i = 0; i < prodClass.length; i++) {
                        if (prodClass[i].prodClassLevel == "1") {
                            let prodC = {}
                            prodC['prodClass'] = prodClass[i].prodClass
                            prodC['prodDesc'] = prodClass[i].prodClassDesc
                            this.prod.push(prodC)
                            console.log(this.prod, "3456789");
                        }
                    }
                    this.getProdType()
                })
            },
            //获取各种产品的数量
            getProdType() {
                getAllProdList().then(response => {
                    let type = response.data.data
                    for (let i = 0; i < this.prod.length; i++) {
                        let num = 0
                        for (let j = 0; j < type.length; j++) {
                            if (type[j].sourceModule == this.prod[i].prodClass) {
                                num++
                            }
                        }
                        let data = {}
                        data['prodClass'] = this.prod[i].prodClass
                        data['prodDesc'] = this.prod[i].prodDesc
                        data['num'] = num
                        data['color'] = this.colorInfo[i % 4]
                        this.prodType.push(data)
                        console.log(this.prodType, "898989");
                    }
                })
            },
            //扇形图
            locationData() {
                let data = {}
                this.dataCircle = []
                data['value'] = this.RB
                data['name'] = '存款'
                this.dataCircle.push(data)
                data = {}
                data['value'] = this.GL
                data['name'] = '内部账'
                this.dataCircle.push(data)
                data = {}
                data['value'] = this.CL
                data['name'] = '贷款'
                this.dataCircle.push(data)
                data = {}
                data['value'] = this.SF
                data['name'] = '特色理财产品'
                this.dataCircle.push(data)
            },
        }
    };
</script>
<style lang="stylus" scoped>
    .dcFooter {
        position: absolute
        bottom 0;
        width: 100%
    }

</style>