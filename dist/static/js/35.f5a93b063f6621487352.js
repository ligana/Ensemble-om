webpackJsonp([35],{"9VEC":function(t,e){},k6hE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("F0a4"),i=a("QvZr"),o=a("p1Qx"),l=a("etTB"),n=a.n(l),r=a("pvby"),c=a("Exlj"),v=a("Wear"),d={name:"deposit",components:{accountingPlain:r.a,EventForm:i.a,VWidget:o.a,AcctForm:c.a,VuePerfectScrollbar:n.a,downAction:v.a},data:function(){return{listLoading:!0,depositProd:{prodcode:"",version:""},listValue:"",prodCode:"",activeName:"basic",eventForm:{ccy:[]},acctForm:{},prodInfo:["基本信息","账户信息","核算信息"],files:[{icon:"assignment",iconClass:"blue white--text",value:"",lable:""}],folders:[{icon:"call_to_action",iconClass:"amber white--text",value:"",label:""}]}},watch:{prodCode:function(t,e){t!==e&&this.queryDespositProdData(t)}},created:function(){this.depositProd={prodcode:this.$route.params.prodType,version:"1.0"}},mounted:function(){this.prodCode=this.$route.hash,this.queryDespositProdData(this.prodCode)},methods:{queryProdInfo:function(){console.log("start query prod info")},selectByProd:function(){},handleClick:function(t){console.log(t);var e=t.value;this.listValue=e},onSubmit:function(){this.$message("submit!")},onCancel:function(){this.$message({message:"cancel!",type:"warning"})},queryDespositProdData:function(t){var e=this;Object(s.d)().then(function(a){for(var s=a.data.rbProdTypeForm.length,i=0;i<s;i++)t===a.data.rbProdTypeForm[i].prodClass&&e.folders.push(a.data.rbProdTypeForm[i])})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"v-card",attrs:{lg9:"",sm9:""}},[a("v-toolbar",{attrs:{color:"indigo lighten-1",dark:"",tabs:""}},[a("v-tabs",{attrs:{slot:"extension",color:"indigo lighten-1",grow:""},slot:"extension",model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("v-tabs-slider",{attrs:{color:"yellow"}}),t._v(" "),t._l(t.prodInfo,function(e){return a("v-tab",{key:e},[t._v("\n          "+t._s(e)+"\n        ")])})],2)],1),t._v(" "),a("v-tabs-items",{staticClass:"white elevation-1",model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},t._l(3,function(e){return a("v-tab-item",{key:e,attrs:{id:"mobile-tabs-5-"+e}},[a("v-card",[a("v-card-text",[1==e?a("event-form",{attrs:{listValue:t.listValue}}):t._e(),t._v(" "),3==e?a("accounting-plain"):t._e(),t._v(" "),2==e?a("acct-form",{attrs:{listValue:t.listValue}}):t._e()],1)],1)],1)}))],1),t._v(" "),a("v-flex",{staticClass:"v-card",attrs:{lg3:"",sm3:""}},[a("v-card",[a("v-card-text",[a("down-action")],1)],1),t._v(" "),a("v-toolbar",{staticClass:"chat-history-toolbar prodLists",attrs:{dense:""}},[a("v-text-field",{staticClass:"top",attrs:{flat:"",solo:"","full-width":"",clearable:"","prepend-icon":"search",label:"Search"}})],1),t._v(" "),a("vue-perfect-scrollbar",{staticClass:"depositTree"},[a("v-list",{attrs:{"two-line":"",subheader:""}},[a("v-subheader",{attrs:{inset:""}},[t._v("个人活期产品")]),t._v(" "),t._l(t.folders,function(e,s){return a("v-list-tile",{key:e.title,staticClass:"chat-list prodList",attrs:{avatar:""},on:{click:function(a){t.handleClick(e)}}},[a("v-list-tile-avatar",[a("v-icon",{class:[e.iconClass]},[t._v(t._s(e.icon))])],1),t._v(" "),a("v-list-tile-content",[a("v-list-tile-title",[t._v(t._s(e.value))]),t._v(" "),a("v-list-tile-sub-title",[t._v(t._s(e.label))])],1),t._v(" "),a("v-list-tile-action",[a("v-btn",{attrs:{icon:"",ripple:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("info")])],1)],1)],1)}),t._v(" "),a("v-subheader",{attrs:{inset:""}},[t._v("单位活期产品")]),t._v(" "),t._l(t.files,function(e){return a("v-list-tile",{key:e.title,staticClass:"prodList",attrs:{avatar:""},on:{click:t.handleClick}},[a("v-list-tile-avatar",[a("v-icon",{class:[e.iconClass]},[t._v(t._s(e.icon))])],1),t._v(" "),a("v-list-tile-content",[a("v-list-tile-title",[t._v(t._s(e.value))]),t._v(" "),a("v-list-tile-sub-title",[t._v(t._s(e.label))])],1),t._v(" "),a("v-list-tile-action",[a("v-btn",{attrs:{icon:"",ripple:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("info")])],1)],1)],1)})],2)],1)],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(d,u,!1,function(t){a("9VEC")},"data-v-7c07317e",null);e.default=p.exports}});
//# sourceMappingURL=35.f5a93b063f6621487352.js.map