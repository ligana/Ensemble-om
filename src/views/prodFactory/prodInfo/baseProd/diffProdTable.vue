<template>
    <v-data-table
            v-model="selected"
            :headers="headers"
            :items="diffProdList"
            :pagination.sync="pagination"
            select-all
            item-key="name"
            class="elevation-1"
    >
        <template slot="headers" slot-scope="props">
            <tr>
                <th>
                    <v-checkbox
                            :input-value="props.all"
                            :indeterminate="props.indeterminate"
                            primary
                            hide-details
                            @click.native="toggleAll"
                    ></v-checkbox>
                </th>
                <th
                        v-for="header in props.headers"
                        :key="header.text"
                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                        @click="changeSort(header.value)"
                >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                </th>
            </tr>
        </template>
        <template slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                    <v-checkbox
                            :input-value="props.selected"
                            primary
                            hide-details
                    ></v-checkbox>
                </td>
                <td>{{ props.item.prodType }}</td>
                <td class="text-xs-center">{{ props.item.baseValue }}</td>
                <td class="text-xs-center">{{ props.item.soldValue }}</td>
            </tr>
        </template>
    </v-data-table>
</template>
    <script>
        export default {
            props: {
                diffProdList: Array,

            },
            data() {
                return {
                    selected: [],
                    // pagination: 'prodType',
                    // pagination: String,
                    // pagination: Function,
                    pagination: {},
                    // pagination: [Object,Function,Array],
                    headers: [
                        {text: '产品名称', value: 'prodType'},
                        {text: '基础产品值', value: 'baseValue'},
                        {text: '可售产品值', value: 'soldValue'}
                        ]
                }
            }
        }
    </script>