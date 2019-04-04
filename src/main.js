// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App';
import Vuetify from 'vuetify';
import "babel-polyfill";
import router from './router';
import i18n from './lang';
import 'font-awesome/css/font-awesome.css';
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import VueDragTree from 'vue-drag-tree';
import dragTreeTable from 'drag-tree-table'
import 'vue-drag-tree/dist/vue-drag-tree.min.css'
import VueResource from 'vue-resource'
import Truncate from 'lodash.truncate';
import store from './store';
import qs from 'qs';
import globalConfig from "./config.js";
import './mock';
import 'ant-design-vue/dist/antd.css';
import 'vuetify/dist/vuetify.min.css'
import alert from './alert.js'
import '../static/common/common.css'
// import axios from 'axios'

//系统错误捕获
// Vue.prototype.axios = axios
// // 设置axios的返回拦截（还可以设置request拦截，这里暂时用不上）
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
//             console.log("错误回调", error);
//             alert("网络超时");
//             return Promise.reject(error);          // reject这个错误信息
//         }
//         return Promise.reject(error);
//     });
//
// Vue.config.productionTip = false

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
Vue.use(alert);
Vue.use(VueDragTree)
Vue.use(VueResource)
Vue.use(dragTreeTable)
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