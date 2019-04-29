<template>
    <div class="pt-3 pl-1">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>{{titleE}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    clearable
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-toolbar>
        <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.tableName }}</td>
                <td>{{ props.item.tableDesc }}</td>
                <td>{{ props.item.system }}</td>
                <td>{{ props.item.modelId }}</td>
                <td>{{ props.item.parameter }}</td>
                <td v-if="props.item.icon == 'edit'">
                    <v-btn depressed outline icon fab dark color="primary lighten-2" small @click="routerTableInfo(props.item)">
                        <v-icon>{{ props.item.icon }}</v-icon>
                    </v-btn>
                </td>
                <td v-if="props.item.icon == 'person'">
                    <v-chip color="primary lighten-2" text-color="white">
                        待处理
                    </v-chip>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </div>
</template>
<script>
    import TableList from './tables/tableList'
    import {getTableList} from "@/api/url/prodInfo";
    import { getParaTableInflow } from "@/api/url/prodInfo";

    import {getSysTable} from "@/api/url/prodInfo";

    export default {
        components: {
            TableList
        },
        data() {
            return {
                title: "",
                titleE: "",
                titleNum: "",
                action: 'KBS',
                mainFlowInfo: [],
                items: [],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
                dialog: false,
                headers: [
                    { text: '交易ID',sortable: false,value: 'tableName'},
                    { text: '交易名称',sortable: false,value: 'tableDesc'},
                    { text: '所属系统',sortable: false,value: 'system' },
                    { text: '所属模块',sortable: false,value: 'modelId' },
                    { text: '参数类型',sortable: false,value: 'parameter' },
                    { text: 'Action',sortable: false,value: 'icon' }
                ],
                desserts: [
                    {
                        tableName: '',
                        tableDesc: '',
                        system: '',
                        modelId: '',
                        parameter: '',
                        icon: ''
                    }
                ],
                editedIndex: -1,
                defaultItem: {
                    tableName: '',
                    tableDesc: '',
                    system: '',
                    modelId: '',
                    parameter: ''
                },
                search: '',
            }
        },
        created () {
            this.getParaTable();
        },
        methods: {
            getParaTable() {
                let that = this;
                let key = that.$route.hash
                getParaTableInflow().then(response => {
                    that.mainFlowInfo = response.data.data
                });
                /*此处区分交易是否已提交等待复核发布
                    处理方法：重新查询待处理信息表，检查是否存在待处理单表交易
                    原因：交易展示界面重新查库加载 多次提交的情况下  前几次提交记录会丢失
                 */
                getTableList(key).then(function (response){
                    for(let i=0; i<response.data.data.tableList.length; i++){
                        let isCommit = false
                        for(let j=0; j<that.mainFlowInfo.length; j++){
                            if(response.data.data.tableList[i].tableName === that.mainFlowInfo[j].tranId){
                                response.data.data.tableList[i]["icon"] = "person"
                                isCommit = true
                                break
                            }
                        }
                        if(!isCommit) {
                            response.data.data.tableList[i]["icon"] = "edit"
                        }
                    }
                    that.desserts=response.data.data.tableList;
                    that.titleNum = response.data.data.tableList.length
                    that.titleE = key
                });
            },
            routerTableInfo(item) {
                this.$router.push({
                    name: 'tableInfo',
                    hash: item.tableName
                })
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
    .selected{
        background-color:gainsboro!important;
    }
</style>
