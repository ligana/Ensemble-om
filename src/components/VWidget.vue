<template>
  <!--<div>-->
    <v-card id="v-widget">
      <v-toolbar color="transparent" flat dense card v-if="enableHeader">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="widget-header-action"></slot>
      </v-toolbar>
      <v-card-text :class="contentBg">
        <slot name="widget-content"></slot>       
      </v-card-text>       
    </v-card>
  <!--</div>-->
</template>

<script>
export default {
  name: 'v-widget',
  props: {
    title: {
      type: String,
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    contentBg: {
      type: String,
      default: 'white'
    }
  },

  data () {
    return {

    };
  },
  computed: {

  },  
};
</script>
<style scoped>


</style>
