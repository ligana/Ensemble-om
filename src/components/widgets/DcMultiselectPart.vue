<template>
    <div>
        <transition name="slide-fade">
            <v-layout row wrap :class="background" v-if="show">
                <v-flex md4 lg4>
                    <v-layout row wrap right>
                        <v-flex md12 row wrap>
                            <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md8 lg8>
                    <div ref="select">
                        <multiselect v-model="value" :isMultiSelect="isMultiSelect" name="key" open-direction="bottom" placeholder="请选择..." selectLabel="" :class="background" :custom-label="nameWithLang" @open="selectRef"
                                     :disabled="disabled" labelDesc="labelDesc" :close-on-select="closeSelect" label="value" :hide-selected="true" track-by="value" :options="options" :multiple="isMulti" class="dcMulti" :perShow="perShow"
                                     :limit="limitNum" :limit-text="limitTextFaction"
                        >
                            <template slot="option" slot-scope="props"><span>{{props.option.key}}-{{props.option.value}}</span></template>
                            <template slot="afterList" slot-scope="props">
                                <div v-if="rfTableInfo.isRf" style="text-align: left">
                                    <v-tooltip bottom>
                                        <span slot="activator" @click="toMoreTable" class="jump">
                                        >>>
                                    </span>
                                        <span>跳转到{{rfTableInfo.tableName}}</span>
                                    </v-tooltip>
                                </div>
                            </template>
                            <template slot="limit" slot-scope="props">
                                <th>
                                <span>还有{{limitIndex}}个为展示选项</span>
                                <v-btn flat small icon="people" slot="activator" style="pointer-events:visible" @click="changeLimitNum">
                                    <v-icon>reply_all</v-icon>
                                </v-btn>
                                </th>
                            </template>
                            <template slot="noResult" slot-scope="props"><span>无返回结果</span></template>
                        </multiselect>
                    </div>
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
        components: { Multiselect ,DcNavbar ,warnDialog},
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: {
            options: {
                type: Object,
                default: []
            },
            msg: String,
            isMultiSelect: String,
            perShow: String,
            labelDesc: String,
            limitIndex: 0,
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
                jumpWidth: '',
                value: [],
                fab: false,
                personShow: 0,
                isMulti: true,
                limitNum: 2,
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
                    if(typeof msg !== "undefined") {
                        let val = msg
                        if(typeof msg === "object" && msg !== null){
                            val = msg.attrValue
                        }
                        this.init(val);
                    }
                }
            },
            options: {
                handler(newValue,oldValue){
                        if(this._props.msg !== "undefined"&&this._props.msg !== undefined&&typeof this._props.msg === "object" && this._props.msg !== null){
                            this.init(this._props.msg.attrValue)
                        }else{
                            this.init(this._props.msg)
                        }
                },
                deep: true
            },
            value: {
                handler(newValue) {
                    this.reback(newValue);
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
            if(typeof this._props.msg === "object" && this._props.msg !== null&&typeof this._props.msg !== "undefined"){
                this.init(this._props.msg.attrValue)
            }else{
                this.init(this._props.msg)
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
            if(this.$refs.select != undefined) {
                if (this.$refs.select.clientWidth != undefined || this.$refs.select.clientWidth != 0) {
                    this.jumpWidth = this.$refs.select.clientWidth - 25
                }
            }
        },
        methods: {
            changeLimitNum () {
                this.limitNum=9999
            },
            limitTextFaction (count) {
                this.limitIndex=count
            },
            toMoreTable (){
                this.isToMoreTable= true;
                this.$router.push({
                    name: 'tableInfo',
                    hash: this.rfTableInfo.tableName
                })
            },
            nameWithLang ({ key, value }) {
                return `${key}—[${value}]`
            },
            dealNewAttr(val) {
                //新增参数延迟展示
                if(val != null && val !== undefined && val.newAttr) {
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
                    this._props.options=[];
                    getPkList(this.rfTableInfo,sessionStorage.getItem("mainSeqNo"),response => {
                        this._props.options=response
                    });
                }
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                //根据产品配置信息，初始化分户生效标志
                if(this._props.msg != null && this._props.msg != undefined) {
                    if (this._props.msg.perEffect !== undefined && this._props.msg.perEffect === "true") {
                        this.peopleColor = "red"
                        this.peopleDesc = "分户生效"
                    } else {
                        this.peopleColor = "grey lighten-1"
                        this.peopleDesc = "产品生效"
                    }
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
                    }else {
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