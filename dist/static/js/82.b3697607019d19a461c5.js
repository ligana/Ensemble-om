webpackJsonp([82],{XTuV:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={components:{VWidget:l("p1Qx").a},data:function(){return{items:[{title:"Click Me"},{title:"Click Me"},{title:"Click Me"},{title:"Click Me 2"}],nudge:{top:0,bottom:0,left:0,right:0}}},computed:{},methods:{handleClick:function(t){t.preventDefault()}}},n={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{attrs:{id:"page-menus"}},[l("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[l("v-layout",{attrs:{row:"",wrap:""}},[l("v-flex",{attrs:{lg12:"",sm12:""}},[l("v-widget",{attrs:{title:"Basic Usage"}},[l("section",{attrs:{slot:"widget-content"},slot:"widget-content"},[l("v-container",{attrs:{fluid:""}},[l("v-layout",{attrs:{row:"",wrap:""}},[l("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[l("v-menu",{attrs:{"offset-y":"","nudge-bottom":t.nudge.bottom,"nudge-left":t.nudge.left,"nudge-right":t.nudge.right,"nudge-top":t.nudge.top}},[l("v-btn",{attrs:{slot:"activator",dark:"",color:"primary"},slot:"activator"},[t._v("\n                      Menu Offset Bottom\n                    ")]),t._v(" "),l("v-list",t._l(t.items,function(e,s){return l("v-list-tile",{key:s,on:{click:t.handleClick}},[l("v-list-tile-title",[t._v(t._s(e.title))])],1)}))],1),t._v(" "),l("v-menu",{attrs:{"offset-y":"",top:""}},[l("v-btn",{attrs:{slot:"activator",dark:"",color:"primary"},slot:"activator"},[t._v("\n                      Menu Offset Top\n                    ")]),t._v(" "),l("v-list",t._l(t.items,function(e,s){return l("v-list-tile",{key:s,on:{click:t.handleClick}},[l("v-list-tile-title",[t._v(t._s(e.title))])],1)}))],1)],1),t._v(" "),l("v-flex",{attrs:{xs12:""}},[l("v-slider",{attrs:{label:"Top offset",max:50},model:{value:t.nudge.top,callback:function(e){t.$set(t.nudge,"top",e)},expression:"nudge.top"}})],1),t._v(" "),l("v-flex",{attrs:{xs12:""}},[l("v-slider",{attrs:{label:"Bottom offset",max:50},model:{value:t.nudge.bottom,callback:function(e){t.$set(t.nudge,"bottom",e)},expression:"nudge.bottom"}})],1),t._v(" "),l("v-flex",{attrs:{xs12:""}},[l("v-slider",{attrs:{label:"Left offset",max:50},model:{value:t.nudge.left,callback:function(e){t.$set(t.nudge,"left",e)},expression:"nudge.left"}})],1),t._v(" "),l("v-flex",{attrs:{xs12:""}},[l("v-slider",{attrs:{label:"Right offset",max:50},model:{value:t.nudge.right,callback:function(e){t.$set(t.nudge,"right",e)},expression:"nudge.right"}})],1)],1)],1)],1)])],1)],1)],1)],1)},staticRenderFns:[]},o=l("VU/8")(s,n,!1,null,null,null);e.default=o.exports}});
//# sourceMappingURL=82.b3697607019d19a461c5.js.map