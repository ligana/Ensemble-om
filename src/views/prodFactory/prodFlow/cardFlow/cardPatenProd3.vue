<template>
  <div class="prod2-app-container">
    <v-layout row wrap>
    <v-flex lg4 sm12 class="prodCol">
        <v-widget title="存款产品" content-bg="white" class="v-widget">
            <div slot="widget-content">
                <prod-collapse3></prod-collapse3>
            </div>
        </v-widget>
    </v-flex>
    <v-flex lg4 sm12 class="prodCol">
        <v-widget title="贷款产品" content-bg="white" class="v-widget">
            <div slot="widget-content">
                <prod-collapse2></prod-collapse2>
            </div>
        </v-widget>
      </v-flex>
    <v-flex lg4 sm12 class="prodCol">
        <v-widget title="内部帐产品" content-bg="white" class="v-widget">
            <div slot="widget-content">
                <prod-collapse1></prod-collapse1>
            </div>
        </v-widget>
    </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import VWidget from "@/components/VWidget";
  import prodCollapse3 from './prodCollapse3'
  import prodCollapse2 from './prodCollapse2'
  import prodCollapse1 from './prodCollapse1'
  export default {
    components: {
      prodCollapse3,
      prodCollapse2, prodCollapse1,VWidget
    }
  }
</script>
<style scoped>
  .iconSelect {
    float:right;
  }
  .prod2-app-container{
    height: 700px;
    background-color: #eeeeee;

  }
  .prodCol {
     padding: 20px;
  }
  .prodCol > .v-card {
      box-shadow: none;
      border: 1px solid #ccc;
  }
  .prodCol > .v-card .v-card__title {
      height: 64px!important;
      padding:0 0 0 16px!important;
  }
  .prodCol > .v-card .v-card__title h4 {
      margin-bottom: 0!important;
  }
  .v-card-media {
      background-color: rgb(244, 245, 249);
      border-bottom: 1px solid #ccc;
  }

</style>