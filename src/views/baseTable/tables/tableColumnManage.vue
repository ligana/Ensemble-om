<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>元数据管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    clearable
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="600px" persistent>
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white;margin-left: 100px">添加</td>
                </v-btn>
                <v-toolbar color="primary lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text style="padding-top: 0px">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.columnId" label="字段ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.columnId" label="字段ID"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.columnDesc" label="字段名称"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.attrType" label="数据类型" :items="attrType" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.columnType" label="字段属性" :items="columnTypeRf" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.columnClass" label="参数分类" :items="mbAttrClass" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.useMethod" label="使用方式" :items="useMethod" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.valueMethod" label="数据模型" :items="valueMethodRf" item-text="value" item-value="key" @change="change()"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.setValueFlag" label="是否多选" :items="setValueFlag" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editBusiCategory" label="业务分类" :items="busiCategory" item-text="value" item-value="key" multiple></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.company" label="法人代码" :items="fmCompany" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.valueScore" label="数据来源表" :items="tab" item-text="value" item-value="key" @change="changeValue()" clearable></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-show="show">
                                    <v-text-field v-model="editedItem.valueScoreColumn" label="数据参数" hint="For example: A-B,C-D"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-show="!show">
                                    <v-select v-model="valueScoreColumn" label="数据参数" :items="param" item-text="value" item-value="key" multiple clearable></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions style="margin-top: -7%">
                        <v-btn color="info" @click="close" class="bthStyle" style="margin-left: 6%">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="save" class="bthStyle" style="margin-right: 6%">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.columnId }}</td>
                <td>{{ props.item.columnDesc }}</td>
                <!--<td>{{ props.item.valueType }}</td>-->
                <!--<td>{{ props.item.valueLength }}</td>-->
                <td>{{ props.item.attrType }}</td>
                <td>{{ props.item.columnType }}</td>
                <td>{{ props.item.columnClass }}</td>
                <td>{{ props.item.useMethod }}</td>
                <td>{{ props.item.valueMethod }}</td>
                <td>{{ props.item.setValueFlag }}</td>
                <td>{{ props.item.busiCategory }}</td>
                <td>{{ props.item.company }}</td>
                <td>{{ props.item.valueScore }}</td>
                <td>{{ props.item.valueScoreColumn }}</td>

                <td>
                    <v-layout wrap>
                        <v-flex xs6 sm6 md6>
                            <v-tooltip bottom color="blue" style="margin-left: -20px">
                                <v-btn flat icon="edit" slot="activator" @click="editItem(props.item)">
                                    <v-icon small class="mr-2" style="color: #0d47a1">edit</v-icon>
                                </v-btn>
                                <span>修改</span>
                            </v-tooltip>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                            <v-tooltip bottom color="red" style="margin-left: -20px">
                                <v-btn flat icon="delete" slot="activator" @click="deleteItem(props.item)">
                                    <v-icon small style="color: red">delete</v-icon>
                                </v-btn>
                                <span>删除</span>
                            </v-tooltip>
                        </v-flex>
                    </v-layout>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </div>
</template>
<script>
    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getSysInfoByUser} from "@/api/url/prodInfo";
    import {getAttrInfo} from '@/api/url/prodInfo'
    import {getTableColumnInfo} from '@/api/url/prodInfo'
    import {saveParam} from '@/api/url/prodInfo'
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            tab: [],
            param: [],
            valueScoreColumn: [],
            attrType: [
                {
                    key: "STRING",
                    value: "STRING-STRING"
                },
                {
                    key: "DATE",
                    value: "DATE-DATE"
                },
                {
                    key: "DOUBLE",
                    value: "DOUBLE-DOUBLE"
                }
            ],
            useMethod: [
                {
                    key: "EVAL",
                    value: "EVAL-赋值类",
                },
                {
                    key: "CTR",
                    value: "CTR-控制类",
                },
                {
                    key: "IND",
                    value: "IND-处理逻辑",
                },
                {
                    key: "DESC",
                    value: "DESC-静态描述",
                },
            ],
            setValueFlag: [
                {
                    key: "M",
                    value: "M-多选",
                },
                {
                    key: "S",
                    value: "S-单选",
                }
            ],
            busiCategory: [
                {
                    key: "RB",
                    value: "RB-存款",
                },
                {
                    key: "CL",
                    value: "CL-贷款",
                },
                {
                    key: "MM",
                    value: "MM-货币市场",
                },
                {
                    key: "GL",
                    value: "GL-总账",
                },
            ],
            valueMethodRf: [
                {
                    key: "RF",
                    value: "RF-数据来源他表"
                },
                {
                    key: "VL",
                    value: "VL-固定备选数据"
                },
                {
                    key: "FD",
                    value: "FD-手动输入"
                },
                {
                    key: "YN",
                    value: "YN-YN"
                }
            ],
            columnTypeRf: [
                {
                    key: "select",
                    value: "select-下拉选择"
                },
                {
                    key: "input",
                    value: "input-手动输入"
                },
                {
                    key: "switch",
                    value: "switch-开关"
                },
                {
                    key: "data",
                    value: "data-日期控件"
                },
                {
                    key: "tree",
                    value: "tree-树形结构"
                }
            ],
            headers: [
                { text: '字段ID',sortable: false,value: 'columnId'},
                { text: '字段名称',sortable: false,value: 'columnDesc'},
//                { text: '数据类型',sortable: false },
//                { text: '数据长度',sortable: false },
                { text: '数据类型',sortable: false,value: 'attrType' },
                { text: '字段属性',sortable: false,value: 'columnType' },
                { text: '参数分类',sortable: false,value: 'columnClass' },
                { text: '使用方式',sortable: false,value: 'useMethod' },
                { text: '数据模型',sortable: false,value: 'valueMethod' },
                { text: '参数值设置方式',sortable: false,value: 'setValueFlag' },
                { text: '业务分类',sortable: false,value: 'busiCategory' },
                { text: '法人代码',sortable: false,value: 'company' },
                { text: '数据来源表',sortable: false,value: 'valueScore' },
                { text: '数据参数',sortable: false,value: 'valueScoreColumn' },
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "tableName"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                columnId: '',
                columnDesc: '',
                attrType: '',
//                valueType: '',
//                valueLength: '',
                columnType: '',
                columnClass: '',
                useMethod: '',
                valueMethod: '',
                valueScore: '',
                valueScoreColumn: ''
            },
            defaultItem: {
                columnId: '',
                columnDesc: '',
//                valueType: '',
//                valueLength: '',
                columnType: '',
                valueMethod: '',
                valueScore: '',
                valueScoreColumn: ''

            },
            backValue: {},
            search: '',
            fmCompany: [],
            mbAttrClass: [],
            show: true,
            editBusiCategory: [],
            dataSource: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增元数据' : '修改元数据'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initRf()
            this.initClassAndFm()
        },

        methods: {
            //数据来源表
            initRf() {
                let that = this
                getSysTable("OM_TABLE_LIST").then(function (response) {
                    for(let i=0; i<response.data.data.columnInfo.length; i++){
                        let temp = {}
                        temp["key"] = response.data.data.columnInfo[i].tableName
                        temp["value"] = response.data.data.columnInfo[i].tableName +"-"+ response.data.data.columnInfo[i].tableDesc
                        that.tab.push(temp)
                    }
                });
            },
            //法人代码,参数分类
            initClassAndFm() {
                let that = this
                getTableColumnInfo().then(function (response) {
                    let fm = response.data.data.fmCompany
                    let cls = response.data.data.mbAttrClass
                    for(let i=0; i<fm.length; i++){
                        let temp = {}
                        temp["key"] = fm[i].company
                        temp["value"] = fm[i].companyName
                        that.fmCompany.push(temp)
                    }
                    for(let j=0; j<cls.length; j++){
                        let atr = {}
                        atr["key"] = cls[j].attrClass
                        atr["value"] = cls[j].attrClass+"-"+cls[j].attrClassDesc
                        that.mbAttrClass.push(atr)
                    }
                    let par = {}
                    par["key"] = "PARAM"
                    par["value"] = "PARAM-参数"
                    that.mbAttrClass.push(par)
                });
            },
            initialize () {
                let that = this
                //读取attr_type和attr_value表
                that.dataSource = getAttrInfo();
                for(let i in that.dataSource){
                    let temp = {}
                    temp["columnId"] = i
                    temp["columnDesc"] = that.dataSource[i].columnDesc
                    temp["columnType"] = that.dataSource[i].columnType
                    temp["attrType"] = that.dataSource[i].attrType
                    temp["columnClass"] = that.dataSource[i].columnClass
                    temp["useMethod"] = that.dataSource[i].useMethod
                    temp["setValueFlag"] = that.dataSource[i].setValueFlag
                    temp["busiCategory"] = that.dataSource[i].busiCategory
                    temp["company"] = that.dataSource[i].company
                    temp["valueMethod"] = that.dataSource[i].valueMethod
                    temp["valueScore"] = that.dataSource[i].valueScore === undefined?"":that.dataSource[i].valueScore.tableName
                    let valueScoreColumn = " "
                    if(that.dataSource[i].valueMethod === "RF" && that.dataSource[i].valueScore !== undefined){
                        valueScoreColumn = that.dataSource[i].valueScore.columnCode + "," +that.dataSource[i].valueScore.columnDesc
                    }
                    if(that.dataSource[i].valueMethod == "VL" && that.dataSource[i].valueScore !== undefined){
                        for(let j=0; j<that.dataSource[i].valueScore.length; j++){
                            valueScoreColumn =valueScoreColumn + that.dataSource[i].valueScore[j].key +"-" + that.dataSource[i].valueScore[j].value +','
                        }
                        valueScoreColumn = valueScoreColumn.substr(0, valueScoreColumn.length - 1);
                    }
                    temp["valueScoreColumn"] = valueScoreColumn
                    that.desserts.push(temp)
                }
            },
            addClick() {
                this.valueScoreColumn = []
                this.param = []
                this.show = true
                this.editBusiCategory = []
                this.disabled = "false"
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.changeValue()
                this.dialog = true
                this.disabled = "true";
                this.valueScoreColumn = []
                this.param = []
                this.editBusiCategory = []
                if(this.editedItem.busiCategory != undefined){
                    this.editBusiCategory = this.editedItem.busiCategory.split(",")
                }
                if(this.editedItem.valueMethod == "RF"){
                    this.changeValue()
                    let value = this.editedItem.valueScoreColumn.split(",")
                    this.valueScoreColumn.push(value[0])
                    this.valueScoreColumn.push(value[1])
                    this.show = false
                }
                if(this.editedItem.valueMethod != "RF"){
                    this.show = true
                }
            },
            //删除数据落库
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                let confirms = confirm('Are you sure you want to delete this item?')
                if(confirms == true){
                    this.desserts.splice(index, 1)
                    let map = {}
                    map["operate"] = "delete"
                    map["mbAttrType"] = this.getAttrType(item)
                    //attrValue中刪除的数据
                    map["mbAttrValueDelete"] = this.addAttrValue(item)
                    saveParam(map).then(response => {
                        if (response.status === 200) {
                            this.sweetAlert('success', "提交成功!")
                        }
                    });
                }
            },
            //关闭弹框
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            //保存数据落库
            save () {
                let num = this.getError()
                if(num == true){
                    let map = {}
                    if (this.editedIndex > -1) {
                        //更新
                        //业务分类组装
                        if(this.editBusiCategory.length != 0){
                            for(let i=0; i<this.editBusiCategory.length; i++){
                                if(i == 0){
                                    this.editedItem.busiCategory = this.editBusiCategory[i]
                                }
                                if(i != 0){
                                    this.editedItem.busiCategory = this.editedItem.busiCategory+","+this.editBusiCategory[i]
                                }
                            }
                        }
                        if(this.valueScoreColumn.length != 0){
                            this.editedItem.valueScoreColumn = this.valueScoreColumn[0]+","+this.valueScoreColumn[1]
                        }
                        map["operate"] = "update"
                        map["mbAttrValueUpdate"] = this.updateAttrValue(this.editedItem,this.desserts[this.editedIndex])
                        Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    } else {
                        //新增
                        //业务分类组装
                        if(this.editBusiCategory.length != 0){
                            for(let i=0; i<this.editBusiCategory.length; i++){
                                if(i == 0){
                                    this.editedItem.busiCategory = this.editBusiCategory[i]
                                }
                                if(i != 0){
                                    this.editedItem.busiCategory = this.editedItem.busiCategory+","+this.editBusiCategory[i]
                                }
                            }
                        }
                        if(this.valueScoreColumn.length != 0){
                            this.editedItem.valueScoreColumn = this.valueScoreColumn[0]+","+this.valueScoreColumn[1]
                        }
                        this.desserts.push(this.editedItem)
                        map["operate"] = "add"
                        //attrValue中增加的数据
                        map["mbAttrValueAdd"] = this.addAttrValue(this.editedItem)
                    }
                    //attrType表中的基础数据
                    map["mbAttrType"] = this.getAttrType(this.editedItem)
                    saveParam(map).then(response => {
                        if (response.status === 200) {
                            this.sweetAlert('success', "提交成功!")
                        }
                    });
                    this.close()
                }
            },
            //校验
            getError(){
                let num = true
                let key = false
                if(this.editedIndex == -1){
                    for(let i=0; i<this.desserts.length; i++){
                        if(this.desserts[i].columnId == this.editedItem.columnId){
                            key = true
                            break
                        }
                    }
                }
                if(this.editedItem.columnId == ""){
                    this.sweetAlert('info', "字段ID不能为空!")
                    num = false
                } else if(key == true){
                    this.sweetAlert('info', "字段ID不能重复!")
                    num = false
                } else if(this.editedItem.columnDesc == ""){
                    this.sweetAlert('info', "字段名称不能为空!")
                    num = false
                } else if(this.editedItem.attrType == ""){
                    this.sweetAlert('info', "数据类型不能为空!")
                    num = false
                }else if(this.editedItem.columnType == ""){
                    this.sweetAlert('info', "字段属性不能为空!")
                    num = false
                }else if(this.editedItem.columnClass == ""){
                    this.sweetAlert('info', "参数分类不能为空!")
                    num = false
                }else if(this.editedItem.useMethod == ""){
                    this.sweetAlert('info', "使用方式不能为空!")
                    num = false
                }else if(this.editedItem.valueMethod == ""){
                    this.sweetAlert('info', "数据模型不能为空!")
                    num = false
                }
                if(this.editedItem.valueMethod == "RF"){
                    if(this.editedItem.valueScore == ""){
                        this.sweetAlert('info', "数据来源表不能为空!")
                        num = false
                    }else if(this.valueScoreColumn.length != 2){
                        this.sweetAlert('info', "数据参数必须为两个!")
                        num = false
                    }
                }
                if(this.editedItem.valueMethod == "VL"){
                    if(this.editedItem.valueScoreColumn == ""){
                        this.sweetAlert('info', "数据参数不能为空!")
                        num = false
                    }
                }
                return num
            },
            //attrType表中的基础数据
            getAttrType(val) {
                let mbAttrType = {}
                mbAttrType["attrKey"] = val.columnId
                mbAttrType["attrType"] = val.attrType
                mbAttrType["attrDesc"] = val.columnDesc
                mbAttrType["attrClass"] = val.columnClass
                mbAttrType["useMethod"] = val.useMethod
                mbAttrType["valueMethod"] = val.valueMethod
                mbAttrType["setValueFlag"] = val.setValueFlag
                mbAttrType["busiCategory"] = val.busiCategory
                mbAttrType["status"] = "A"
                mbAttrType["company"] = val.company
                return mbAttrType
            },
            //增加/刪除 attrValue表中数据，按RF(来源他表)和VL（固定备选数据）分类组装数据
            addAttrValue(val) {
                let mbValue = {}
                let mbAttrValueAdd = []
                //RF
                if(val.valueMethod == "RF"){
                    mbValue["attrKey"] = val.columnId
                    mbValue["attrValue"] = "来源他表"
                    mbValue["valueDesc"] = val.columnDesc
                    mbValue["refTable"] = val.valueScore
                    mbValue["refCondition"] = "1=1"
                    mbValue["refColumns"] = val.valueScoreColumn
                    mbAttrValueAdd.push(mbValue)
                }
                //VL
                if(val.valueMethod == "VL"){
                    let valueScoreColumns = val.valueScoreColumn.split(",")
                    for(let i=0; i<valueScoreColumns.length; i++){
                        let mbValue = {}
                        let valueAndDesc = valueScoreColumns[i].split("-")
                        mbValue["attrKey"] = val.columnId
                        mbValue["attrValue"] = valueAndDesc[0]
                        mbValue["valueDesc"] = valueAndDesc[1]
                        mbAttrValueAdd.push(mbValue)
                    }
                }
                return mbAttrValueAdd
            },
            //更新 attrValue表中数据
            updateAttrValue(newV,oldV) {
                let mbAttrValueAdd = []
                let mbAttrValueUpdate = []
                let mbAttrValueDelete = []
                let map = {}
                //rf的更新数据
                if(newV.valueMethod == "RF"){
                    map["attrKey"] = newV.columnId
                    map["attrValue"] = "来源他表"
                    map["valueDesc"] = newV.columnDesc
                    map["refTable"] = newV.valueScore
                    map["refCondition"] = "1=1"
                    map["refColumns"] = newV.valueScoreColumn
                }
                //vl的更新数据
                if(newV.valueMethod == "VL"){
                    //新数据组装
                    let newValue = []
                    let valueScoreColumns = newV.valueScoreColumn.split(",");
                    for(let i=0; i<valueScoreColumns.length; i++){
                        let mbValue = {}
                        let valueAndDesc = valueScoreColumns[i].split("-")
                        mbValue["attrKey"] = newV.columnId
                        mbValue["attrValue"] = valueAndDesc[0]
                        mbValue["valueDesc"] = valueAndDesc[1]
                        newValue.push(mbValue)
                    }
                    //老数据组装
                    let oldValue = []
                    let valueScoreColumn = oldV.valueScoreColumn.split(",")
                    for(let i=0; i<valueScoreColumn.length; i++){
                        let mbValue = {}
                        let valueAndDesc = valueScoreColumn[i].split("-")
                        mbValue["attrKey"] = oldV.columnId
                        mbValue["attrValue"] = valueAndDesc[0]
                        mbValue["valueDesc"] = valueAndDesc[1]
                        oldValue.push(mbValue)
                    }
                    //新老数据差异对比
                    for(let i=0; i<newValue.length; i++){
                        let n = 0
                        for(let j=0; j<oldValue.length; j++){
                            //更新
                            if(newValue[i].attrKey == oldValue[j].attrKey && newValue[i].attrValue == oldValue[j].attrValue){
                                mbAttrValueUpdate.push(newValue[i])
                            }else{
                                n++
                            }
                        }
                        //删除
                        if(n == oldValue.length){
                            mbAttrValueAdd.push(newValue[i])
                        }
                    }
                    for(let i=0; i<oldValue.length; i++){
                        let n = 0
                        for(let j=0; j<newValue.length; j++){
                            //更新
                            if(oldValue[i].attrKey == newValue[j].attrKey && oldValue[i].attrValue == newValue[j].attrValue){
                                break
                            }else{
                                n++
                            }
                        }
                        //新增
                        if(n == newValue.length){
                            mbAttrValueDelete.push(oldValue[i])
                        }
                    }
                    map["mbAttrValueUpdate"] = mbAttrValueUpdate
                    map["mbAttrValueAdd"] = mbAttrValueAdd
                    map["mbAttrValueDelete"] = mbAttrValueDelete
                }
                return map
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
            //数据模型决定数据参数是输入框还是下拉框，RF是下拉框
            change(){
                if(this.editedItem.valueMethod == "RF"){
                    this.show = false
                }
                if(this.editedItem.valueMethod != "RF"){
                    this.show = true
                }
            },
            //选择表后获取参数列表
            changeValue(){
                let that = this
                if(that.editedItem.valueScore != ""){
                    getParamTable(that.editedItem.valueScore).then(function (response) {
                        let dataInfo = response.data.data.column;
                        that.param = []
                        for(let i=0; i<dataInfo.length; i++){
                            let data = {}
                            data["key"] = dataInfo[i].code
                            data["value"] = dataInfo[i].code + "-" + dataInfo[i].title
                            that.param.push(data)
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>
    .ee{
        font-size: medium;
    }
    .bthStyle {
        color: #00b0ff;
        width: 120px;
    }
</style>