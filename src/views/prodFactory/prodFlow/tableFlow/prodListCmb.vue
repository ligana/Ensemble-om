<template>
    <v-card>
        <v-toolbar card color="white">
            <v-text-field flat solo prepend-icon="search" placeholder="Type something" v-model="search" hide-details class="hidden-sm-and-down"></v-text-field>
            <v-btn color="info" @click="addCompare">加入对比</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <v-data-table :headers="complex.headers" :search="search" :items="items" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="elevation-1" item-key="value" select-all v-model="complex.selected">
                <template slot="items" slot-scope="props">
                                                      <td>
                                                        <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                                                      </td>
                                                      <!-- <td>
                                                        <v-avatar size="32">
                                                          <img :src="props.item.avatar" alt="">
                                                        </v-avatar>
                                                      </td> -->
                                                      <td>{{ props.item.value }}</td>
                                                      <td>{{ props.item.label }}</td>
                                                      <td>{{ props.item.status }}</td>
                                                      <td>
                                                        <v-btn depressed outline icon fab dark color="primary" small>
                                                          <v-icon>edit</v-icon>
                                                        </v-btn>
                                                        <v-btn depressed outline icon fab dark color="pink" small>
                                                          <v-icon>chrome_reader_mode</v-icon>
                                                        </v-btn>
                                                      </td>
</template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
    import {
        getDepositDtl
    } from '@/api/prod';
    export default {
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                items: [],
                search: '',
                complex: {
                    selected: [],
                    items: [],
                    headers: [
                        // {
                        //     text: 'Avatar',
                        //     value: 'avatar'
                        // },
                        {
                            text: '产品代码',
                            value: 'value'
                        },
                        {
                            text: '产品类型',
                            value: 'label'
                        },
                        {
                            text: '产品状态',
                            value: 'status'
                        },
                        {
                            text: 'Action',
                            value: ''
                        },
                    ]
                }
            };
        },
        methods: {
            addCompare() {
                var selected = [];
                for (var item in this.complex.selected) {
                    selected.push(this.complex.selected[item].prodCode)
                }
                this.$router.push({
                    name: 'diffList',
                    params: {
                        'prodCodeList': selected
                    }
                })
            }
        }
    };
</script>
