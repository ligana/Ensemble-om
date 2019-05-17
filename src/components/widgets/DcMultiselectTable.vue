<template>
    <div>
        <transition name="slide-fade">
            <v-layout row wrap :class="background" v-if="show">
                <v-flex md4 lg4>
                    <v-layout row wrap right>
                            <div v-if="isNotNull == 'true'" style="align-self: flex-end;">
                                <span style="color: red;font-size: 20px">*</span>
                            </div>
                            <v-subheader class="primary--text subheading pr-1" >{{labelText}}</v-subheader>
                    </v-layout>
                </v-flex>
                <v-flex md7 lg7 v-if="search == 'true'">
                    <div ref="select" >
                        <multiselect v-model="value" :isMultiSelect="isMultiSelect" name="key" open-direction="bottom" placeholder="请选择..." selectLabel="" :class="background" :custom-label="nameWithSearch" @open="selectRef"
                                     :disabled="disabled" labelDesc="labelDesc" :close-on-select="closeSelect" label="value" :hide-selected="true" track-by="value" :options="options" :multiple="isMulti" class="dcMulti" :perShow="perShow">
                            <template slot="option" slot-scope="props"><span>{{props.option.value}}</span></template>
                            <template slot="noResult" slot-scope="props"><span>无返回结果</span></template>
                        </multiselect>
                    </div>

                </v-flex>
                <v-flex md7 lg7 v-if="search != 'true'">
                    <div ref="select" >
                        <multiselect v-model="value" :isMultiSelect="isMultiSelect" name="key" open-direction="bottom" placeholder="请选择..." selectLabel="" :class="background" :custom-label="nameWithLang" @open="selectRef"
                                     :disabled="disabled" labelDesc="labelDesc" :close-on-select="closeSelect" label="value" :hide-selected="true" track-by="value" :options="options" :multiple="isMulti" class="dcMulti" :perShow="perShow">
                            <template slot="option" slot-scope="props"><span>{{props.option.key}}-{{props.option.value}}</span></template>
                            <template slot="noResult" slot-scope="props"><span>无返回结果</span></template>
                        </multiselect>
                    </div>

                </v-flex>
                <v-flex md1 lg1>
                    <v-layout row wrap end style="height: 100%" >
                        <div v-if="isKey == 'false' && notNull == true && isNotNull == 'true'" style="align-self: flex-end">
                            <span>
                                <v-icon style="color: green;">done</v-icon>
                            </span>
                        </div>
                        <div v-if="isKey == 'true' && notNull == true && childPd == true " style="align-self: flex-end">
                            <span>
                                <v-icon style="color: green;">done</v-icon>
                            </span>
                        </div>
                        <div v-if="isKey == 'true' && notNull == true && childPd == false" style="align-self: flex-end;cursor: default;">
                            <v-tooltip bottom v-model="trueOrFalse" z-index="10000">
                                <v-icon slot="activator" color="red">warning</v-icon>
                                <span>不能重复</span>
                            </v-tooltip>
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
        </transition>
        <warn-dialog v-model="dialog" :oldOptionPermissions="oldOptionPermissions" v-on:rebackOptionPermissions="rebackOptionPermissions" :diffProdList="diffProdList"></warn-dialog>
    </div>
</template>

<script>
    import Multiselect from "vue-multiselect";
    import DcNavbar from './DcNavbar'
    import {findChildProd} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import warnDialog from '@/views/prodFactory/prodInfo/baseProd/warnDialog';
    export default {
        components: { Multiselect ,DcNavbar ,warnDialog,},
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: {
            model: String,
            search: String,
            isKey: String,
            childPd: String,
            isNotNull: String,
            options: String,
            msg: String,
            isMultiSelect: String,
            perShow: String,
            labelDesc: String,
            baseAttr: {
                type: String,
                default: "SOLD"
            },
            showEdit: {
                type: String,
                default: false
            },
            disablePower: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                trueOrFalse: false,
                num: 0,
                notNull: false,
                jumpWidth: '',
                value: [],
                fab: false,
                personShow: 0,
                isMulti: true,
                show: false,
                baseAttr: "",
                isOpen: 'fas fa-eye',
                optionPermissions: '',
                isToMoreTable: false,
                rfTableInfo: {
                    isRf: false
                },
                disabled: false,
                oldOptionPermissions: '',
                dialog: false,
                background: '',
                closeSelect: false,
                diffProdList: [],
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效",
                screenWidth: document.body.clientWidth
            };
        },
        watch: {
            msg: {
                handler(msg) {
                    if(typeof msg !== "undefined"&&msg!== null) {
                        this.value = ""
                        this.init(typeof msg === "object" ? msg.attrValue : msg);
                    }
                }
            },
            options: {
                handler(newValue,oldValue){
                    if(this._props.msg !== "undefined"&&this._props.msg !== undefined){
                        this.init(typeof this._props.msg === "object" ? this._props.msg.attrValue : this._props.msg)
                    }
                },
                deep: true
            },
            model: {
                handler(newValue) {
                    if(newValue == ""){
                        this.value = newValue
                    }
                }
            },
            value: {
                handler(newValue) {
                    this.reback(newValue);
                    if(newValue.length == 0){
                        this.notNull = false
                    }else{
                        this.notNull = true
                    }
                    this.num++
                    this.changeNum()
                    this.trueOrFalse = true
                }
            },
            optionPermissions: {
                handler(newValue,oldValue) {
                    //查询上收，下收影响的产品列表
                    if((newValue=='E'|| oldValue=='E')&&this.oldOptionPermissions.reback==undefined && oldValue !== "" && oldValue !== null){
                        this.oldOptionPermissions=oldValue;
                        this.findChildProd();
                    }else{
                        this.oldOptionPermissions=''
                        this.dialog=false
                    }
                    this.rebackOption(newValue);
                }
            },
            baseAttr: {
                handler(newValue) {
                    if(newValue === "BASE" || this.$attrs.disabled === true){
                        this.disabled = true
                    }else{
                        this.disabled = false
                    }
                }
            },
            disablePower: {
                handler(newValue) {
                    if(this._props.baseAttr === "BASE" || this.$attrs.disabled === true){
                        this.disabled = true
                    }else{
                        this.disabled= newValue;
                    }
                }
            },
            screenWidth(val){
                // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
                if(!this.timer){
                    // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                    this.screenWidth = val
                    this.timer = true
                    if(this.$refs.select.clientWidth != undefined || this.$refs.select.clientWidth != 0){
                        this.jumpWidth = this.$refs.select.clientWidth-25
                    }
                    let that = this
                    setTimeout(function(){
                        // 打印screenWidth变化的值
                        console.log(that.screenWidth)
                        that.timer = false
                    },400)
                }
            }
        },
        created() {
            if(typeof this._props.msg !== "undefined") {
                this.init(typeof this._props.msg === "object" ? this._props.msg.attrValue : this._props.msg);
            }
            //初始化描述
            if(typeof this._props.labelDesc !== "undefined") {
                this.labelText = this._props.labelDesc + ' :';
            }
            this.dealNewAttr(this._props.msg)
            //判断参数取自基础产品||可售产品
            if(this._props.baseAttr === "BASE" || this.$attrs.disabled === true){
                this.disabled = true
            }else{
                this.disabled= this._props.disablePower;
            }
        },
        mounted: function() {
            const that = this
            that.initProperty();
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
            if(this.$refs.select.clientWidth != undefined || this.$refs.select.clientWidth != 0){
                this.jumpWidth = this.$refs.select.clientWidth-25
            }
        },
        methods: {
            changeNum(){
                this.$emit('changeNum', this.num)
            },
            toMoreTable (){
                this.isToMoreTable= true;
                this.$router.push({
                    name: 'tableInfo',
                    hash: this.rfTableInfo.tableName
                })
            },
            nameWithSearch({value}){
                return `${value}`
            },
            nameWithLang ({ key, value }) {
                if(key == "ALL"){
                    value = "全部"
                }
                return `${key}—[${value}]`
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
            findChildProd() {
                if(this._props.msg!= undefined&& this._props.msg.attrKey!= undefined){
                    const column ={'prodType': this.$store.getters.prodType,'attrType': this._props.msg.attrKey,'attrValue': this._props.msg.attrValue};
                    findChildProd(column).then(response => {
                        const reList = response.data.data
                        //如果存在差异弹出差异列表
                        if(reList!= undefined&&reList.length>0){
                            this.dialog=true;
                            this.diffProdList=reList
                        }
                    });
                }
            },
            rebackOptionPermissions (optionPermissions){
                this.optionPermissions=optionPermissions.reback;
                this.oldOptionPermissions=optionPermissions
            },
            init(msg) {
                if(this._props.baseAttr === "BASE" || this.$attrs.disabled === true){
                    this.disabled = true
                }else{
                    this.disabled= this._props.disablePower;
                }
                if(msg !== null && msg !== undefined) {

                    let data = msg.split(",");
                    let options = this._props.options;
                    let values = [];
                    for (const num in data) {
                        let value = {};
                        if(data[num] !== null && data[num] !== "") {
                            value.key = data[num];
                            for (const index in options) {
                                const option = options[index];
                                if (option.key == value.key) {
                                    value.value = option.value;
                                }
                            }
                            values.push(value);
                        }
                    }
                    if(values.length) {
                        this.value = values;
                    }
                    //选项赋值
                    if(this._props.msg.optionPermissions!==undefined){
                        this.optionPermissions= this._props.msg.optionPermissions
                    }
                }
                if(this._props.options!==undefined&&!(typeof this._props.options === 'object' && !isNaN(this._props.options.length))){
                    this.rfTableInfo=this._props.options
                    this.rfTableInfo['isRf']=true;
                    getPkList(this.rfTableInfo,sessionStorage.getItem("mainSeqNo"),response => {
                        this._props.options=response
                    });
                }
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                //根据产品配置信息，初始化分户生效标志
                if(this._props.msg.perEffect !== undefined && this._props.msg.perEffect === "true"){
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                }else{
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
                }
            },
            initProperty() {
                //判断是否多选
                if(this._props.isMultiSelect === undefined || this._props.isMultiSelect === null || this._props.isMultiSelect === true){
                    //是否多选标志未定义时，默认为多选
                    this.isMulti = true
                }else{
                    this.isMulti = this._props.isMultiSelect;
                    this.closeSelect = true
                }
                //判断是否显示分户生效标识
                if(this._props.perShow === true){
                    this.personShow = 1
                }
            },
            selectRef(){
                if(this.isToMoreTable){
                    getPkList(this.rfTableInfo,sessionStorage.getItem("mainSeqNo"),response => {
                        this._props.options=response
                    });
                }
            },
            rebackOption(newValue){
                if(typeof this._props.msg === "object"){
                    this._props.msg.optionPermissions=newValue
                    this.$emit("getVue", this._props.msg);
                }
            },
            reback(newValue) {
                let value = "";
                //多选
                if(this.isMulti === true) {
                    //多选数据组装
                    for (const index in newValue) {
                        if (index == 0) {
                            value = newValue[index].key;
                        } else {
                            value = value + "," + newValue[index].key;
                        }
                    }
                }
                if(this.isMulti === false){
                    //默认单选
                    if(newValue[0] !== undefined){
                        value = newValue[0].key
                    }else{
                        value = newValue.key
                    }
                }
                if(typeof this._props.msg === "object" && this._props.msg != null) {
                    this._props.msg.attrValue = value
                }
                if(typeof this._props.msg === "string" || typeof this._props.msg === "undefined" || this._props.msg === null) {
                    this._props.msg = value
                }
                if (value) {
                    this.$emit("getVue", this._props.msg);
                }

            },
            addTag(newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
                };
                this.options.push(tag);
                this.value.push(tag);
            }
        }
    };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }
    .dcMulti1 {
        margin-top: 15px;
    }
    .baseIcon {
        padding-top: 15px;
        color: #ff110e;
    }
    .jump{
        height: 40px; /* 高度 */
        border-width: 0px; /* 边框宽度 */
        border-radius: 3px; /* 边框半径 */
        cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
        outline: none; /* 不显示轮廓线 */
        font-family: Microsoft YaHei; /* 设置字体 */
        font-size: 26px; /* 字体大小 */
    }
    .baseIconDis {
        padding-top: 15px;
        color: #fffdfe;
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