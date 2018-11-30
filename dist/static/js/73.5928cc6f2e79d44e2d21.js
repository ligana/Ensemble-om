webpackJsonp([73],{FhET:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l={components:{VWidget:e("p1Qx").a},data:function(){return{basic:{dialog:!1},fullscreen:{dialog:!1,notifications:!1,sound:!0,widgets:!1},scrollable:{name:"",dialog:!1}}},computed:{},methods:{}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"page-dialogs"}},[e("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{lg4:""}},[e("v-widget",{attrs:{title:"Basic Usage"}},[e("div",{attrs:{slot:"widget-content"},slot:"widget-content"},[e("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.basic.dialog,callback:function(a){t.$set(t.basic,"dialog",a)},expression:"basic.dialog"}},[e("v-btn",{attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("Open Dialog")]),t._v(" "),e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v("User Profile")])]),t._v(" "),e("v-divider"),t._v(" "),e("v-card-text",[e("v-container",{attrs:{"grid-list-md":""}},[e("v-layout",{attrs:{wrap:""}},[e("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[e("v-text-field",{attrs:{label:"Legal first name",required:""}})],1),t._v(" "),e("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[e("v-text-field",{attrs:{label:"Legal middle name",hint:"example of helper text only on focus"}})],1),t._v(" "),e("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[e("v-text-field",{attrs:{label:"Legal last name",hint:"example of persistent helper text","persistent-hint":"",required:""}})],1),t._v(" "),e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{attrs:{label:"Email",required:""}})],1),t._v(" "),e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{attrs:{label:"Password",type:"password",required:""}})],1),t._v(" "),e("v-flex",{attrs:{xs12:"",sm6:""}},[e("v-select",{attrs:{label:"Age",required:"",items:["0-17","18-29","30-54","54+"]}})],1),t._v(" "),e("v-flex",{attrs:{xs12:"",sm6:""}},[e("v-select",{attrs:{label:"Interests",multiple:"",autocomplete:"",chips:"",items:["Skiing","Ice hockey","Soccer","Basketball","Hockey","Reading","Writing","Coding","Basejump"]}})],1)],1)],1),t._v(" "),e("small",[t._v("*indicates required field")])],1),t._v(" "),e("v-card-actions",[e("v-spacer"),t._v(" "),e("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(a){t.basic.dialog=!1}}},[t._v("Close")]),t._v(" "),e("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(a){t.basic.dialog=!1}}},[t._v("Save")])],1)],1)],1)],1)])],1),t._v(" "),e("v-flex",{attrs:{xl4:""}},[e("v-widget",{attrs:{title:"Fullscreen Dialog"}},[e("div",{attrs:{slot:"widget-content"},slot:"widget-content"},[e("v-dialog",{attrs:{fullscreen:"",transition:"dialog-bottom-transition",overlay:!1},model:{value:t.fullscreen.dialog,callback:function(a){t.$set(t.fullscreen,"dialog",a)},expression:"fullscreen.dialog"}},[e("v-btn",{attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("Open Dialog")]),t._v(" "),e("v-card",[e("v-toolbar",{attrs:{dark:"",color:"primary"}},[e("v-btn",{attrs:{icon:"",dark:""},nativeOn:{click:function(a){t.fullscreen.dialog=!1}}},[e("v-icon",[t._v("close")])],1),t._v(" "),e("v-toolbar-title",[t._v("Settings")]),t._v(" "),e("v-spacer"),t._v(" "),e("v-toolbar-items",[e("v-btn",{attrs:{dark:"",flat:""},nativeOn:{click:function(a){t.dialog=!1}}},[t._v("Save")])],1)],1),t._v(" "),e("v-list",{attrs:{"three-line":"",subheader:""}},[e("v-subheader",[t._v("User Controls")]),t._v(" "),e("v-list-tile",{attrs:{avatar:""}},[e("v-list-tile-content",[e("v-list-tile-title",[t._v("Content filtering")]),t._v(" "),e("v-list-tile-sub-title",[t._v("Set the content filtering level to restrict apps that can be downloaded")])],1)],1),t._v(" "),e("v-list-tile",{attrs:{avatar:""}},[e("v-list-tile-content",[e("v-list-tile-title",[t._v("Password")]),t._v(" "),e("v-list-tile-sub-title",[t._v("Require password for purchase or use password to restrict purchase")])],1)],1)],1),t._v(" "),e("v-divider"),t._v(" "),e("v-list",{attrs:{"three-line":"",subheader:""}},[e("v-subheader",[t._v("General")]),t._v(" "),e("v-list-tile",{attrs:{avatar:""}},[e("v-list-tile-action",[e("v-checkbox",{model:{value:t.fullscreen.notifications,callback:function(a){t.$set(t.fullscreen,"notifications",a)},expression:"fullscreen.notifications"}})],1),t._v(" "),e("v-list-tile-content",[e("v-list-tile-title",[t._v("Notifications")]),t._v(" "),e("v-list-tile-sub-title",[t._v("Notify me about updates to apps or games that I downloaded")])],1)],1),t._v(" "),e("v-list-tile",{attrs:{avatar:""}},[e("v-list-tile-action",[e("v-checkbox",{model:{value:t.fullscreen.sound,callback:function(a){t.$set(t.fullscreen,"sound",a)},expression:"fullscreen.sound"}})],1),t._v(" "),e("v-list-tile-content",[e("v-list-tile-title",[t._v("Sound")]),t._v(" "),e("v-list-tile-sub-title",[t._v("Auto-update apps at any time. Data charges may apply")])],1)],1),t._v(" "),e("v-list-tile",{attrs:{avatar:""}},[e("v-list-tile-action",[e("v-checkbox",{model:{value:t.fullscreen.widgets,callback:function(a){t.$set(t.fullscreen,"widgets",a)},expression:"fullscreen.widgets"}})],1),t._v(" "),e("v-list-tile-content",[e("v-list-tile-title",[t._v("Auto-add widgets")]),t._v(" "),e("v-list-tile-sub-title",[t._v("Automatically add home screen widgets")])],1)],1)],1)],1)],1)],1)])],1),t._v(" "),e("v-flex",{attrs:{xl4:""}},[e("v-widget",{attrs:{title:"Scrollable Dialog"}},[e("div",{attrs:{slot:"widget-content"},slot:"widget-content"},[e("v-dialog",{attrs:{scrollable:"","max-width":"300px"},model:{value:t.scrollable.dialog,callback:function(a){t.$set(t.scrollable,"dialog",a)},expression:"scrollable.dialog"}},[e("v-btn",{attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("Open Dialog")]),t._v(" "),e("v-card",[e("v-card-title",[t._v("Select Country")]),t._v(" "),e("v-divider"),t._v(" "),e("v-card-text",[e("v-radio-group",{attrs:{column:""},model:{value:t.scrollable.name,callback:function(a){t.$set(t.scrollable,"name",a)},expression:"scrollable.name"}},[e("v-radio",{attrs:{label:"Bahamas, The",value:"bahamas"}}),t._v(" "),e("v-radio",{attrs:{label:"Bahrain",value:"bahrain"}}),t._v(" "),e("v-radio",{attrs:{label:"Bangladesh",value:"bangladesh"}}),t._v(" "),e("v-radio",{attrs:{label:"Barbados",value:"barbados"}}),t._v(" "),e("v-radio",{attrs:{label:"Belarus",value:"belarus"}}),t._v(" "),e("v-radio",{attrs:{label:"Belgium",value:"belgium"}}),t._v(" "),e("v-radio",{attrs:{label:"Belize",value:"belize"}}),t._v(" "),e("v-radio",{attrs:{label:"Benin",value:"benin"}}),t._v(" "),e("v-radio",{attrs:{label:"Bhutan",value:"bhutan"}}),t._v(" "),e("v-radio",{attrs:{label:"Bolivia",value:"bolivia"}}),t._v(" "),e("v-radio",{attrs:{label:"Bosnia and Herzegovina",value:"bosnia"}}),t._v(" "),e("v-radio",{attrs:{label:"Botswana",value:"botswana"}}),t._v(" "),e("v-radio",{attrs:{label:"Brazil",value:"brazil"}}),t._v(" "),e("v-radio",{attrs:{label:"Brunei",value:"brunei"}}),t._v(" "),e("v-radio",{attrs:{label:"Bulgaria",value:"bulgaria"}}),t._v(" "),e("v-radio",{attrs:{label:"Burkina Faso",value:"burkina"}}),t._v(" "),e("v-radio",{attrs:{label:"Burma",value:"burma"}}),t._v(" "),e("v-radio",{attrs:{label:"Burundi",value:"burundi"}})],1)],1),t._v(" "),e("v-divider"),t._v(" "),e("v-card-actions",[e("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(a){t.scrollable.dialog=!1}}},[t._v("Close")]),t._v(" "),e("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(a){t.scrollable.dialog=!1}}},[t._v("Save")])],1)],1)],1)],1)])],1)],1)],1)],1)},staticRenderFns:[]},s=e("VU/8")(l,i,!1,null,null,null);a.default=s.exports}});
//# sourceMappingURL=73.5928cc6f2e79d44e2d21.js.map