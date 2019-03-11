<template>
 <div >
  <v-layout row wrap>
   <v-flex md4 lg4>
    <v-layout row wrap right v-if="show">
     <v-flex md12>
         <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
     </v-flex>
    </v-layout>
   </v-flex>
   <v-flex md6 lg6>
    <v-text-field class="primary--text mx-1" :disabled="disabled" name="title" v-model="value" @keyup="numberAmount(value)" single-line hide-details :perShow="perShow" labelDesc="labelDesc"></v-text-field>
   </v-flex>
   <v-flex md2 lg2>
    <v-tooltip right :color="peopleColor" v-if="personShow==1">
    <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick" class="dcMulti1">
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
 </div>
</template>

<script>
    import DcNavbar from './DcNavbar'
    export default {
        components: {
            DcNavbar
        },
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: {
            isNumber: String,
            msg: String,
            perShow: String ,
            labelDesc: String ,
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
                labelText: "",
                value: [],
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效",
                disabled: false,
                personShow: 0,
                optionPermissions: '',
                show: false
            };
        },
        watch: {
            msg: {
                handler(msg) {
                    this.init(msg);
                }
            },
            value: {
                handler(newValue) {
                    this.reback(newValue);
                }
            },
            optionPermissions: {
                handler(newValue) {
                    this.rebackOption(newValue);
                }
            }
        },
        created() {
            //控件加载处理
            this.dealNewAttr(this._props.msg)
            this.init(this._props.msg);
        },
        mounted() {
            //区别可售产品取自基础产品参数
            if (this._props.baseAttr === "BASE" || this.$attrs.disabled === true) {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        methods: {
            numberAmount(num){
                if(this.isNumber == "DOUBLE"){
                    num = num.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                    num = num + "";
                    num = num.replace(/[ ]/g, "");
                    if (num == "") {
                        return;
                    }
                    if (isNaN(num)) {
                        return num;
                    }
                    let index = num.indexOf(".");
                    if (index == -1) {
                        let reg = /(-?\d+)(\d{3})/;
                        while (reg.test(num)) {
                            num = num.replace(reg, "$1,$2");
                        }
                    } else {
                        let intPart = num.substring(0, index);
                        let pointPart = num.substring(index + 1, num.length);
                        let reg = /(-?\d+)(\d{3})/;
                        while (reg.test(intPart)) {
                            intPart = intPart.replace(reg, "$1,$2");
                        }
                        num = intPart + "." + pointPart;
                    }
                    this.value = num;
                }
            },
            rebackOption(newValue){
                if(typeof this._props.msg === "object"){
                    this._props.msg.optionPermissions=newValue
                    this.$emit("getVue", this._props.msg);
                }
            },
            dealNewAttr(val) {
                //新增参数延迟展示
                if(val !== undefined &&val !== null && val.newAttr) {
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
            reback(newValue) {
                let value = newValue;
                let reValue=this._props.msg
                if(typeof reValue === "object" && reValue != null) {
                    reValue.attrValue = value
                }else{
                    reValue = value
                }
                if(reValue != undefined){
                this.$emit("getVue", reValue);
                }

            },
            peopleClick() {
                //预留 未处理v-model为String类型时 分户生效标识处理 (如果传入为String时 分户生效标识不显示 )
                if(this.peopleColor === "grey lighten-1") {
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                    this._props.msg.perEffect = "true"
                }else if (this.peopleColor === "red"){
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
                    this._props.msg.perEffect = "false"
                }
            },
            init(msg) {
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                //初始化数据 msg为对象时获取attrValue属性 否则直接赋值
                if(typeof this._props.msg === "object" && this._props.msg != null){
                    this.value = this._props.msg.attrValue
                    this.optionPermissions = this._props.msg.optionPermissions
                }else if(typeof this._props.msg === "string" || typeof this._props.msg === "undefined" || this._props.msg === null){
                    this.value = this._props.msg
                }
                //判断是否显示分户生效标识
                if(this._props.perShow !== undefined && this._props.perShow === true){
                    this.personShow = 1
                }
                //分户生效标识回显 如果传入msg为对象 则进入if判断  如果为String 则this._props.msg.perEffect === undefined 不执行以下操作
                if(this._props.msg!== undefined&&this._props.msg!== null&&typeof this._props.msg === "object"&&this._props.msg.perEffect !== undefined && this._props.msg.perEffect !== null){
                    if(this._props.msg.perEffect === "true"){
                        this.peopleColor = "red"
                        this.peopleDesc = "分户生效"
                    }else{
                        this.peopleColor = "grey lighten-1"
                        this.peopleDesc = "产品生效"
                    }
                }
            }
        }
    };
</script>
<style scoped>
 .dcMulti1 {
  margin-top: 18px;
 }
 .baseIcon {
  padding-top: 15px;
  color: #3C73E6;
 }
 .lock {
  color: #ff8511;
  padding-top: 20px;
 }
 .background {
  transform:rotate(360deg);
  transition:  transform 0.5s 0.2s;
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