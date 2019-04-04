<template>
  <v-container fluid grid-list-md py-0 px-0>
    <v-tabs v-model="active" slider-color="red">
      <v-tab v-for="n in userWork" :key="n" ripple>
        <span class="itemDc">{{n}}</span>
      </v-tab>
      <v-tab-item v-for="n in 3" :key="n" class="pb-2">
        <user-work-check-table v-if="n==1" v-bind:userWorkData="userWorkData"></user-work-check-table>
        <user-work-release-table v-if="n==2"></user-work-release-table>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
  import userWorkCheckTable from './userWorkCheckTable'
  import userWorkReleaseTable from './userWorkReleaseTable'
  import { getFlowList } from "@/api/url/prodInfo";
  export default {
      components: {
          userWorkCheckTable,
          userWorkReleaseTable
      },
    data() {
      return {
          userWorkData: [],
        active: null,
        text: '.',
        userWork: ['待复核', '待发布']
      }
    },

      mounted: function() {
          this.queryDespositProdData();
          const that=this
          window.addEventListener("referenceWork", function () {
              that.queryDespositProdData();
          })
      },
    methods: {
        queryDespositProdData() {
            getFlowList().then(response => {
                this.userWorkData = response.data.data
            });
        }
    }
  }
</script>
<style scoped>
 .itemDc{
   width: 300px;
 }
</style>