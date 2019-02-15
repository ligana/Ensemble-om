<template>
    <div class="pt-5 pl-4">
        <v-layout>
            <v-flex md3 lg3 class="pl-4">
                <v-flex xs12>
                    <v-card class="pt-4 e">
                        <v-card-media src="/static/avatar/perm2.jpg" style="margin-top: -10%">
                        </v-card-media>
                    </v-card>
                </v-flex>
                <v-flex xs12 class="mt-2 pb-4">
                    <v-card style="height: 200%" class="">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)" :class="item.class">
                                <v-list-tile-action>
                                    <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title style="font-size: medium">{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md10 lg10 class="pl-4 pb-4 pr-1">
                <prod-perm v-if="action == 'prod'"></prod-perm>
                <param-perm v-if="action == 'param'"></param-perm>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import ParamPerm from './tables/paramPermTables'
    import ProdPerm from './tables/prodPermTables'

    export default {
        components: {
            ParamPerm,
            ProdPerm
        },
        data() {
            return {
                action: 'prod',
                items: [
                    {title: '产品工厂权限管理',name: 'prod', class: '',icon: 'gavel',color: "blue"},
                    {title: '参数系统权限管理',name: 'param', class: '', icon: 'keyboard',color: "blue"},
                    {title: '网贷端权限管理',name: 'inter', class: '', icon: 'local_atm',color: "blue"},

                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
            }
        },
        methods: {
            actionTag(item) {
                this.action = item.name;
                item.class="selected";
                for(const index in this.items){
                    if(this.items[index].name != item.name) {
                        this.items[index].class="";
                    }
                }
            },
            clickItem(index) {
                let userManagement=this.userManagement;
                for(const key in userManagement){
                    if(key==0){
                        continue
                    }
                    if(userManagement[key].index==index){

                        userManagement[key].classSpan='spanItemSelected'
                    }else{

                        userManagement[key].classSpan='spanItem'
                    }
                }

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
    .pt-5 .pl-4 >>> .v-card{
        box-shadow: none;
        border: 1px solid #E0E4EA;
    }
    .pt-5 .pl-4 >>> .v-toolbar{
        box-shadow: none;
        background-color: #F4F5F8!important;
        border-bottom: 1px solid #E0E4EA!important;
        color: #383B4D;
    }
    .pt-5 .pl-4 >>> .elevation-1,.elevation-4 {
        box-shadow: none!important;
    }
    .pt-5 .pl-4 >>> .elevation-4 {
        border:1px solid #E0E4EA!important;
    }
    .pt-5 .pl-4 >>> .v-btn__content td {
        color: #383B4D!important;
    }
</style>
