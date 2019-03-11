/**
* chengliang 20180917
* 开关组件
* 示例 <dc-switch v-model="isMultiCcy"></dc-switch>
* 将其 value 特性绑定到一个名叫 value 的 prop 上
* 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
*/
<template>
 <div >
  <transition name="slide-fade">
  <v-layout row wrap class="switch" v-if="show">
   <v-flex md4 lg4>
    <v-layout row wrap right>
     <v-flex md12>
    <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
     </v-flex>
    </v-layout>
   </v-flex>
   <v-flex md6 lg6>
    <v-switch :label="desc" color="success" :disabled="disabled" v-model="dcSwitch" @change="switchChange" hide-details :perShow="perShow" labelDesc="labelDesc"></v-switch>
   </v-flex>
   <v-flex md2 lg2>
    <v-tooltip v-if="personShow==1" right :color="peopleColor">
     <v-btn flat small :color="peopleColor" icon="people" slot="activator" class="left" @click="peopleClick">
      <v-icon>people</v-icon>
     </v-btn>
     <span>{{peopleDesc}}</span>
    </v-tooltip>
    <dc-navbar v-if="showEdit == true" v-model="optionPermissions"></dc-navbar>
    <i v-if="baseAttr=='BASE'" class="material-icons baseIcon small">
     call_merge
    </i>
   </v-flex>
  </v-layout>
  </transition>
 </div>

</template>

<script>
    import DcNavbar from './DcNavbar'
    export default {
        components: {
            DcNavbar
        },
        model: {
            prop: "value",
            event: "getVue"
        },
        props: {
            label: {
                type: String,
                default: "是,否"
            },
            value: {},
            perShow: String,
            labelDesc: String,
            baseAttr: {
                type: String,
                default: "SOLD"
            },
            showEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效",
                currentValue: "",
                desc: "",
                show: false,
                disabled: false,
                optionPermissions: '',
                isOpen: 'lock',
                dcSwitch: false,
                personShow: 0,
                labelText: ''
            };
        },
        watch: {
            value: {
                handler(val) {
                    if(typeof val === "object"){
                        this.dcSwitch = val.attrValue=== "Y" ? true : false
                        this.optionPermissions = val.optionPermissions
                    }
                    else if(typeof val === "string"){
                        this.dcSwitch = val === "Y" ? true : false
                    }
                    if(typeof val !== "undefined") {
                        this.switchChange()
                        this.initPerson()
                    }
                },
                // watch 的一个特点是，最初绑定的时候是不会执行的，要等到 value 改变时才执行监听计算
                // 代表在wacth里声明了value这个方法之后立即先去执行handler方法
                immediate: true
            },
            optionPermissions: {
                handler(newValue) {
                    this.rebackOption(newValue);
                }
            }
        },
        created() {
            this.dealNewAttr(this._props.value)
        },
        mounted() {
            if(this._props.baseAttr === "BASE" || this.$attrs.disabled === true){
                this.disabled = true
            }else{
                this.disabled = false
            }
            this.switchChange();
        },
        methods: {
            rebackOption(newValue){
                if(typeof this._props.value === "object"){
                    this._props.value.optionPermissions=newValue
                    this.$emit("input", this._props.value);
                }
            },
            dealNewAttr(val) {
                //新增参数延迟展示
                if(val !== undefined && val.newAttr) {
                    let t;
                    clearTimeout(t)
                    let that = this;
                    t = setTimeout(function () {
                        that.show = true
                    }, 1000);
                }else{
                    this.show = true
                }
            },
            peopleClick() {
                //分户生效标识点击事件
                if(this.peopleColor === "grey lighten-1") {
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                    //分户生效标识绑定
                    this._props.value.perEffect = "true"
                }else if (this.peopleColor === "red"){
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
                    this._props.value.perEffect = "false"
                }
            },
            initPerson() {
                //通过组件配置的perShow参数，判断是否显示分户生效标识
                if(this._props.perShow === true){
                    this.personShow = 1
                }
                //通过产品配置的分户生效标识，初始化分户生效标志
                if(this._props.value.perEffect !== undefined && this._props.value.perEffect === "true"){
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                }else{
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
                }
            },
            switchChange() {
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                if(this._props.value !== undefined){
                if (this.dcSwitch) {
                    if(this._props.value.attrValue !== undefined) {
                        this._props.value.attrValue = "Y";
                    }
                    this.desc = this.label.split(",")[0];
                } else {
                    if(this._props.value.attrValue !== undefined) {
                        this._props.value.attrValue = "N";
                    }
                    this.desc = this.label.split(",")[1];
                }
                //在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出（对象）
                this.$emit("input", this._props.value);
                }
            }
        }
    };
</script>
<style scoped>
 .left {
  margin-left: 8px;
  margin-top: 20px;
  margin-right: auto;
 }
 .baseIcon {
  padding-top: 15px;
  color:  #3C73E6;
 }
 .lock {
  color: #ff8511;
  padding-top: 20px;
 }
 .switch {
  padding-top: 10px;
 }
 .slide-fade-enter-active {
  transition: all .3s ease;
 }
 .slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
 }
 .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
 }
</style>
