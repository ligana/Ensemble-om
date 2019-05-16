<template>
 <div >
  <v-layout row wrap>
   <v-flex md4 lg4>
    <v-layout row wrap right v-if="show">
     <div v-if="isNotNull == 'true'" style="align-self: flex-end;">
      <span style="color: red;font-size: 20px">*</span>
     </div>
     <v-subheader class="primary--text subheading pr-1" >{{labelText}}</v-subheader>
    </v-layout>
   </v-flex>
   <v-flex md7 lg7>
    <v-text-field class="primary--text mx-1" :disabled="disabled" name="title" v-model="value" @keyup="numberAmount(value)" @blur="animateWidth()" single-line hide-details :perShow="perShow" labelDesc="labelDesc"></v-text-field>
   </v-flex>
   <v-flex md1 lg1>
    <v-layout row wrap end style="height: 100%" >
     <div v-if="isKey == 'false' && notNull == true && isNotNull == 'true' && numberToLang == false && dateFalse == false" style="align-self: flex-end">
        <span>
          <v-icon style="color: green;">done</v-icon>
        </span>
     </div>
     <div v-if="isKey == 'true' && notNull == true && childPd == true && numberToLang == false && dateFalse == false" style="align-self: flex-end">
        <span>
          <v-icon style="color: green;">done</v-icon>
        </span>
     </div>
     <div v-if="isKey == 'true' && notNull == true && childPd == false" style="align-self: flex-end;cursor: default;">
        <v-tooltip bottom v-model="trueOrFalse" z-index="10000">
           <v-icon slot="activator" color="red">close</v-icon>
              <span>不能重复</span>
        </v-tooltip>
     </div>
     <div v-if="numberToLang == true" style="align-self: flex-end;cursor: default;">
        <v-tooltip bottom v-model="trueOrFalse" z-index="10000">
           <v-icon slot="activator" color="red">close</v-icon>
              <span>长度超出限制</span>
        </v-tooltip>
     </div>
     <div v-if="dateFalse == true" style="align-self: flex-end;cursor: default;">
      <v-tooltip bottom v-model="trueOrFalse" z-index="10000">
       <v-icon slot="activator" color="red">close</v-icon>
       <span>数据类型不符合,应为{{dataIndex}}类型</span>
      </v-tooltip>
     </div>
    </v-layout>
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
            dataIndex: String,
            lengths: String,
            isKey: String,
            childPd: String,
            isNotNull: String,
            type: String,
            isNumber: String,
            msg: String,
            perShow: String ,
            labelDesc: String ,
            baseAttr: {
                type: String,
                default: "SOLD"
            },
            showEdit: {
                type: String,
                default: false
            }
        },
        data() {
            return {
                trueOrFalse: false,
                num: 0,
                notNull: false,
                labelText: "",
                value: [],
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效",
                disabled: false,
                personShow: 0,
                optionPermissions: '',
                show: false,
                numberToLang: false,
                dateFalse: false,
            };
        },
        watch: {
            msg: {
                handler(msg) {
                    this.init(msg);
                }
            },
            value: {
               handler(newValue,oldValue) {
                   if(newValue!=oldValue){
                       this.reback(newValue);
                   }
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
            this.$watch('data',this.value)
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
            changeNum(){
                this.$emit('changeNum', this.num)
            },
            animateWidth() {
                this.numberToLang = false
                this.dateFalse = false

                if(this.value != ""){
                    if(this._props.dataIndex == 'Int'){
                        let p = /(^-?\d*$)/;
                        if(p.test(this.value) == true){
                            this.dateFalse = false
                        }else {
                            this.dateFalse = true
                        }
                    }
                    if(this._props.dataIndex == 'Double'){
                        let e=/^[-\+]?\d+(\.\d+)?$/;
                        if(e.test(this.value)){
                            this.dateFalse = false
                        }else {
                            this.dateFalse = true
                        }
                    }
                    if(this._props.dataIndex == 'Date'){
                        let r=  /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/;
                        if(this.value.match(r) == null){
                            this.dateFalse = true
                        }else{
                            this.dateFalse = false
                        }
                    }
                }

                if(this.value.length > parseInt(this._props.lengths)){
                    this.numberToLang = true
                }
                if(this.value == ""){
                    this.notNull = false
                }else{
                    this.notNull = true
                }
                this.num++
                this.changeNum()
                this.trueOrFalse = true
            },

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
            reback(newValue) {
                let value = newValue;
                let reValue=this._props.msg
                if(typeof reValue === "object" && reValue != null) {
                    reValue.attrValue = value
                }else{
                    reValue = value
                }
                if(this._props.isNumber == "DOUBLE"){
                    reValue = parseFloat(reValue);
                }
                if(reValue != undefined){
                    this.$emit("getVue", reValue);
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
                if(this._props.isNumber == "DOUBLE"){
                    this.value = this._props.msg.toString();
                }
                //判断是否显示分户生效标识
                if(this._props.perShow !== undefined && this._props.perShow === true){
                    this.personShow = 1
                }
                //分户生效标识回显 如果传入msg为对象 则进入if判断  如果为String 则this._props.msg.perEffect === undefined 不执行以下操作
                if(this._props.msg!== undefined&&typeof this._props.msg === "object"&&this._props.msg.perEffect !== undefined && this._props.msg.perEffect !== null){
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
  color: #ff110e;
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