webpackJsonp([56],{I2vp:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={components:{VWidget:a("p1Qx").a},data:function(){return{selectedTab:null,tabs:null,material:null,ft:null}},computed:{},created:function(){var t=this;fetch("/static/data/material.json").then(function(t){return t.json()}).then(function(e){t.material=e.icons.splice(0,100)}),fetch("/static/data/font-awesome.json").then(function(t){return t.json()}).then(function(e){t.ft=e["4.7.0"].splice(0,100)})},methods:{}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"page-icons"}},[a("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{12:""}},[a("v-tabs",{attrs:{color:"grey lighten-3"},model:{value:t.selectedTab,callback:function(e){t.selectedTab=e},expression:"selectedTab"}},[a("v-tab",{attrs:{ripple:"",href:"#tab-1"}},[t._v("\n            Matrial Icons\n          ")]),t._v(" "),a("v-tab",{attrs:{ripple:"",href:"#tab-2"}},[t._v("\n            Font Awesome \n          ")]),t._v(" "),a("v-tabs-items",{model:{value:t.selectedTab,callback:function(e){t.selectedTab=e},expression:"selectedTab"}},[a("v-tab-item",{attrs:{id:"tab-1"}},[a("v-card",{attrs:{flat:""}},[a("v-card-text",[a("ul",{staticClass:"demo-icons-list"},t._l(t.material,function(e,s){return a("li",{key:s},[a("i",{staticClass:"icon material-icons"},[t._v(" "+t._s(e.ligature))])])})),t._v(" "),a("div",{staticClass:"text-sm-center"},[a("v-btn",{attrs:{href:"https://material.io/icons/",color:"primary",large:"",depressed:""}},[t._v("More")])],1)])],1)],1),t._v(" "),a("v-tab-item",{attrs:{id:"tab-2"}},[a("v-card",{attrs:{flat:""}},[a("v-card-text",[a("ul",{staticClass:"demo-icons-list"},t._l(t.ft,function(t,e){return a("li",{key:e},[a("i",{staticClass:"fa",class:t})])})),t._v(" "),a("div",{staticClass:"text-sm-center"},[a("v-btn",{attrs:{href:"https://fontawesome.com/icons?d=gallery",color:"primary",large:"",depressed:""}},[t._v("More")])],1)])],1)],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(s,n,!1,function(t){a("XZbL")},"data-v-1e8d2678",null);e.default=r.exports},XZbL:function(t,e){}});
//# sourceMappingURL=56.764ca46774565610e799.js.map