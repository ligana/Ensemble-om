<template>
  <v-data-table
<<<<<<< HEAD
          :items="desserts"
          class="elevat"
=======
          :items="htable"
          class="elevation-1"
>>>>>>> master
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
                desserts: [],
                dessert: {},
                htable: [],
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
                this.desserts = []
                //初始化产品对应的信息
                this.headers=prodService.headers;
                for(let i=0; i<prodService.column.length; i++){
                    this.dessert = {}
                    for(let j=0; j<this.headers.length; j++){
                        for(let key in prodService.column[i]){
                            if(this.headers[j].value == key){
                                this.dessert[this.headers[j].value] = prodService.column[i][key]
                                break
                            }else{
                                this.dessert[this.headers[j].value] = null
                            }
                        }
                    }
                    this.desserts.push(this.dessert)
                }
                //this.desserts = prodService.column
                this.htable = this.desserts
            }
        }
    }
</script>
<style scoped>
    .elevat >>> table td{
        border:1px solid #D6D7DB;
    }
    .elevat >>> table th {
        border:1px solid #D6D7DB;
        border-bottom:0px ;
    }

</style>