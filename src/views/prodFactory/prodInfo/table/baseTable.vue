<template>
  <v-data-table
          :items="desserts"
          class="elevat"
          hide-actions
          :headers="headers"
  >
    <template slot="items" slot-scope="props">
      <td v-for="key in props.item">
        {{key}}
      </td>
    </template>
  </v-data-table>
</template>
<script>
    export default {
        props: ["prodCharge"],
        data () {
            return {
                desserts: [
                    {
                        value: false,
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%'
                    }
                ],
                headers: []
            }
        },
        watch: {
            prodCharge (val) {
                this.getChargeDefinesInfo(val)
            }
        },
        mounted: function() {

        },
        methods: {
            getChargeDefinesInfo(prodService) {
                //初始化产品对应的信息
                this.headers=prodService.headers;
                this.desserts=prodService.column;
            }
        }
    }
</script>
<style scoped>
    .elevat >>> .v-table__overflow{
        overflow-y:inherit;
    }
    .elevat >>> table td{
        border:1px solid #D6D7DB;
    }
</style>