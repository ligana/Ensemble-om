<template>
    <v-data-table
            :headers="headers"
            :items="projects"
            hide-actions
            class="elevation-1"
            :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"

    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.tableName }}</td>
            <td class="text-xs-left">{{ props.item.tableDesc }}</td>
            <td class="text-xs-left">{{ props.item.parameter }}</td>
            <td class="text-xs-left">{{ props.item.system }}</td>
            <td>
                <v-btn depressed outline icon fab dark color="primary lighten-2" small @click="routerTableInfo(props.item.tableName)">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn depressed outline icon fab dark color="pink" small>
                    <v-icon>chrome_reader_mode</v-icon>
                </v-btn>
            </td>
        </template>
    </v-data-table>
</template>
<script>
    import {getTableList} from "@/api/url/prodInfo";
    export default {
        data () {
            return {
                headers: [
                    {
                        text: '表名',
                        align: 'left',
                        value: 'tableName'
                    },
                    {text: '表描述', value: 'tableDesc'},
                    {text: '业务类型', value: 'parameter'},
                    {text: '所属系统', value: 'system' },
                    {
                        text: 'Action',
                        value: ''
                    }

                ],
                projects: [
                    {
                        tableName: '',
                        tableDesc: '',
                        parameter: '',
                        system: ''
                    }
                ]
            };
        },
        mounted: function() {
            this.getParaTable();
        },
        methods: {
            getParaTable() {
                let that=this;
                getTableList("ensemble").then(function (response){
                    that.projects=response.data.data.tableList;
                });
            },
            routerTableInfo(tableName) {
                this.$router.push({
                    name: 'tableInfo',
                    params: {
                        'tableName': tableName
                    }
                })
            }
        }
    };
</script>