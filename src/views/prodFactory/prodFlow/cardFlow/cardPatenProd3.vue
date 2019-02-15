<template>
  <div class="prod2-app-container">
    <v-layout row wrap>
    <v-flex lg4 sm12 class="prodCol">
        <v-card>
          <div class="v-card-media" height="64px">
          <v-card-title class="pb-0">
            <h4>存款产品</h4>
          </v-card-title>
          </div>
          <v-card-text>
            <prod-collapse3></prod-collapse3>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex lg4 sm12 class="prodCol">
        <v-card>
          <div class="v-card-media" height="64px">
          <v-card-title class="pb-0">
            <h4> 贷款产品</h4>
          </v-card-title>
          </div>
          <v-card-text>
            <prod-collapse2></prod-collapse2>
          </v-card-text>
        </v-card>
      </v-flex>
    <v-flex lg4 sm12 class="prodCol">
        <v-card>
          <div class="v-card-media" height="64px">
          <v-card-title class="pb-0">
            <h4>内部帐产品</h4>
          </v-card-title>
          </div>
          <v-card-text>
          <prod-collapse1></prod-collapse1>
          </v-card-text>
        </v-card>
    </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import prodCollapse3 from './prodCollapse3'
  import prodCollapse2 from './prodCollapse2'
  import prodCollapse1 from './prodCollapse1'
  export default {
    components: {
      prodCollapse3,
      prodCollapse2, prodCollapse1
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