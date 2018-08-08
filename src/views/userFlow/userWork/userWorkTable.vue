<template>
  <v-card>

    <v-divider></v-divider>
    <v-card-text class="pa-0">
        <v-data-table
                :headers="headers"
                :items="desserts"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                select-all
                light
                v-model="selected"
        >
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
              <td>
                <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                ></v-checkbox>
              </td>
                    <td class="text-xs-left">{{ props.item.code }}</td>
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.date }}</td>
                    <td class="text-xs-left">{{ props.item.status }}</td>
                    <td class="text-xs-left">{{ props.item.roleLast }}</td>
                    <td class="text-xs-left" @click="getDataInfo">详细信息</td>
                </tr>
          </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <v-card-text>录入人信息：para</v-card-text>
                </v-card>
            </template>
        </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
    import {getList} from '@/api/table';
    export default {
        data () {
            let value = 'accountingStatus';
            return {
                selected:[],
                desserts: [
                    {
                        code: 'pf3007',
                        name: '产品工厂',
                        date: '2018/07/02',
                        status: '待复核',
                        roleLast: 'admin',
                        DSubjectCode: 4.0
                    },
                    {
                        
                        code: 'pm2003',
                        name: '参数定义',
                        date: '2018/07/02',
                        status: '待复核',
                        roleLast:  'admin',
                        DSubjectCode: 4.0
                    },
                    {

                        code: 'pm281',
                        name: '参数分类',
                        date: '2018/07/02',
                        status: '待复核',
                        roleLast:  'admin',
                        DSubjectCode: 4.0
                    },
                    {

                        code: 'pm2211',
                        name: '币种信息',
                        date: '2018/07/02',
                        status: '待复核',
                        roleLast:  'admin',
                        DSubjectCode: 4.0
                    }

                ],
                headers: [
                    {
                        text: '操作单号',
                        align: 'left',
                        value: 'code'
                    },
                    {
                        text: '交易名称',
                        align: 'left',
                        value: 'name'
                    },
                    {text: '操作时间', value: 'date'},
                    {text: '交易状态', value: 'status'},
                    {text: '上一操作人 ', value: 'roleLast' },
                    {text: '记录', value: 'DSubjectCode'}

                ],
                projects: [     {      prodType: '',
                    accountingStatus: '',
                    subjectCode: '',
                    rateCode: '',
                    DSubjectCode: ''}]
            };
        },
        methods: {
            prodAction () {
                this.$router.push({ name: 'userWorkTags'})
            },
            queryDespositProdData() {
                getList().then(response => {
                    this.projects = response.data.irlAccounting
                })
            },
            getDataInfo() {
                this.$router.push({ name: 'tranDataIndex'})
            }
        },
        mounted: function() {
            this.queryDespositProdData()
        }
    };
</script>
