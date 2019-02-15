// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App';
import Vuetify from 'vuetify';
import router from './router';
import i18n from './lang';
import 'font-awesome/css/font-awesome.css';
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import VueResource from 'vue-resource'
import Truncate from 'lodash.truncate';
import store from './store';
import qs from 'qs';
import globalConfig from "./config.js";

/*import './mock';*/

import './mock';


import 'ant-design-vue/dist/antd.css';
import 'vuetify/dist/vuetify.min.css'

// ���� table �� ��ҳ���

import { Spin, Table,Divider,Tag ,Button ,Upload, Icon} from 'ant-design-vue'

Vue.component(Table.name, Table)
Vue.component(Divider.name, Divider)
Vue.component(Tag.name, Tag)
Vue.component(Button.name, Button)
Vue.component(Spin.name, Spin)
Vue.component(Upload.name, Upload)
Vue.component(Icon.name, Icon)

// ע�ᵽȫ��
Vue.prototype.$qs = qs
//Global Config
Vue.prototype.globalConfig = globalConfig

Vue.config.productionTip = false;

// Helpers
// Global filters
Vue.filter('truncate', Truncate);

Vue.use(VueResource)
Vue.use(VueSweetalert2)
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields'
});
Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {},
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
// Bootstrap application components



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
});