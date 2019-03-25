<template>
    <div class="pt-5 pl-4">
        <v-btn color="success" depressed="" @click="flowClick"><v-icon >assignment_turned_in</v-icon>FLOW测试</v-btn>
        {{retMsg}}

        <v-btn color="success" depressed="" @click="flowListClick"><v-icon >assignment_turned_in</v-icon>流程图响应</v-btn>

    </div>
</template>
<script>
    import {
        flowTest
    } from '@/api/url/prodInfo'
    import {
        flowList
    } from '@/api/url/prodInfo'
    export default {
//        components: {
//            ParamPerm,
//            ProdPerm
//        },
        data() {
            return {
                action: 'prod',
                items: [
                    {title: '产品工厂权限管理',name: 'prod', class: '',icon: 'gavel',color: "blue"},
                    {title: '参数系统权限管理',name: 'param', class: '', icon: 'settings',color: "blue"},
                    {title: '网贷端权限管理',name: 'inter', class: '', icon: 'widgets',color: "blue"},

                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
                retMsg: ""
            }
        },
        methods: {
            flowClick(){
                let testInfo ={
                    prodType: "RB101"
                }
                flowTest(testInfo).then(response => {
                    if(response.status === 200) {
                        this.retMsg = response.data;
                    }
                })
            },
            flowListClick(){
                let testInfo = "2501";
                flowList(testInfo).then(response => {
                    if(response.status === 200) {
                        this.retMsg = response.data;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .windowTitle {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }

    .windowItem {
        border: 1px solid #a09ba269;
        background-color: white
    }
    .shrink :hover {
        background-color: #9E9E9E;
    }
    .selectedItem {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }
    .spanItem {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #757575;
    }
    .spanItemSelected {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #000000;
    }
    .titleItem {

    }
</style>
