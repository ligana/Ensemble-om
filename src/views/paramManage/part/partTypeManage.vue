<template>
    <v-layout justify-center class="mt-2">
        <v-flex xs12 sm12>
            <v-card class="radiusDc" style="height: 730px">
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xd3 lg3>
                            <div>
                                <a-button type="primary" @click="onAdd">新增</a-button>
                                <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
                                <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
                                <a-button v-if="notCommit" type="primary" @click="onSave" class="ml-2">提交</a-button>
                            </div>
                        </v-flex>
                        <v-flex xd7 lg7>
                            <div v-for="searchColumn in search" style="width: 49%;float:left;margin-top: -10px">
                                <dc-multiselect-table
                                        v-model="searchColumn.model"
                                        :labelDesc="searchColumn.desc"
                                        :options="searchColumn.value"
                                        :isMultiSelect=false
                                        :search="searchColumn.search"
                                        :model="searchColumn.model"
                                ></dc-multiselect-table>
                            </div>
                        </v-flex>
                        <v-flex xd2 lg2 v-if="search.length != 0">
                            <a-button type="primary" @click="find" class="ml-3">查找</a-button>
                            <a-button type="primary" @click="clean" class="ml-4">重置</a-button>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text v-if="searchData == false" style="margin-top: -1%">
                    <a-table :customRow="customRow" :scroll=ttt :columns="seeColumnsTable" @change="changeTable" :dataSource="dataInfo">
                    </a-table>
                    <v-divider></v-divider>
                </v-card-text>
                <v-card-text v-if="searchData == true">
                    <a-table :customRow="customRow" :scroll=ttt :columns="seeColumnsTable" @change="changeTable" :dataSource="searchInfo">
                    </a-table>
                    <v-divider></v-divider>
                </v-card-text>
                <v-dialog v-model="dialog" width="800px" persistent z-index="100">
                    <edit-table-info v-if="dialog" :selected="selected" :columns="seeColumns" :tableName="tableName" :childPd="childPd"
                                     v-on:editAction="editAction" v-on:changeNum="changeNum"></edit-table-info>
                </v-dialog>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    import {getParamTable} from "@/api/url/prodInfo";
    import EditTableInfo from '../../../views/baseTable/tables/editTableInfo'

    import {saveTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import DcTextField from "@/components/widgets/DcTextField";
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import {remove} from '@/utils/util'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import DcMultiselect from "../../../components/widgets/DcMultiselect";
    import DcTextFieldTable from "@/components/widgets/DcTextFieldTable";
    import DcMultiselectTable from '@/components/widgets/DcMultiselectTable'

    export default {
        name: 'tableInfo',
        components: {
            DcMultiselect,
            DcTextField,
            DcTextFieldTable,
            DcMultiselectTable,
            EditTableInfo
        },
        data() {
            return {
                childPd: true,
                childEditSelected: {},
                num: "",
                tableDesc: "",
                tableName: "",
                dataInfo: [],
                searchInfo: [],
                sourceDataInfo: [],
                disabledFlag: false,
                prodType: '',
                notCommit: true,
                open: true,
                prodTypeSearch: '',
                prodClassSearch: 'RB100',
                editFlag: false,
                prodClassOption: [
                    {
                        "key": "RB100",
                        "value": "RB100-存款RB100"
                    },
                    {
                        "key": "RB400",
                        "value": "RB400-存款RB400"
                    }
                ],
                addorchange: true,
                valid: true,
                dialog: false,
                drawer: false,
                tbd: {},
                ttt: { x: 2000, y: false },
                option: '',
                selectedRowKeys: [],
                selected: {},
                columns: [],
                columnsTwo: [],
                backValue: {},
                key: [],
                isNull: [],
                search: [],
                searchData: false,
                searchColumn: [],
                eidtColumns: [],
                seeColumns: [],
                seeColumnsTable: [],
                seeValueNotNull: [],
                unSeeValue: [],
            };
        },
        watch: {
            num: {
                handler(newValue,oldValue) {
                    if(newValue!=oldValue) {
                        this.childPd = this.childLimit(this.childEditSelected)
                    }
                }
            },
            dataInfo: {
                handler(newValue,oldValue) {
                    this.getSearch(this.searchColumn)
                },
                deep: true
            }
        },
        mounted: function () {
            this.initTableInfo()
        },
        methods: {
            changeWar(war){
                this.war = war
            },
            changeNum(num,editSelected){
                this.num = num
                this.childEditSelected = editSelected
            },
            initTableInfo() {
                this.tableName = "MB_PART_TYPE";
                this.getParaTable(this.tableName);
            },
            getParaTable(tableName) {
                let that = this;
                getParamTable(tableName).then(function (response) {
                    that.dataInfo = response.data.data.columnInfo;
                    if(that.tableDesc == '') {
                        that.tableDesc = response.data.data.tableDesc
                    }
                    that.sourceDataInfo = that.copy(that.dataInfo, that.sourceDataInfo)
                    //根据表名获取参数列信息
                    that.columns = response.data.data.column;
                    //根据表名获取参数列信息,给a-table传参数用的
                    that.columnsTwo = response.data.data.columnTwo
                    that.tableName = tableName
                    that.searchColumn = response.data.data.search.searchColumn
                    that.getSearch(that.searchColumn)
                    that.getEidtColumns(response.data.data.search.eidtColumns)
                    that.getData(that.columns,that.columnsTwo)
                    that.getKey()
                });
            },
            //组装检索条件
            getSearch(val){
                this.search = []
                if(val != null && val != ""){
                    let searchColumns = val.split(",")
                    for(let i=0; i<searchColumns.length; i++){
                        let value = []
                        let temp = {}
                        //value数据组装
                        for(let j=0; j<this.dataInfo.length; j++){
                            let val = {}
                            let num = 0
                            for(let n=0; n<value.length; n++){
                                if(this.dataInfo[j][searchColumns[i]] == value[n].value){
                                    num++
                                }
                            }
                            if(num == 0){
                                val['value'] = this.dataInfo[j][searchColumns[i]]
                                val['key'] = this.dataInfo[j][searchColumns[i]]
                                value.push(val)
                            }
                        }
                        for(let n=0; n<this.columnsTwo.length; n++){
                            if(searchColumns[i] == this.columnsTwo[n].dataIndex){
                                temp['desc'] = this.columnsTwo[n].title
                            }
                        }
                        temp['searchColumn'] = searchColumns[i]
                        temp['value'] = value
                        temp['model'] = ""
                        temp['search'] = "true"
                        this.search.push(temp)
                    }
                }
            },
            //组装可见参数
            getEidtColumns(val){
                this.eidtColumns = []
                if(val != null){
                    if(val == "ALL"){
                        this.eidtColumns[0] = val
                    }else {
                        this.eidtColumns = val.split(",")
                    }
                }
            },
            //组装columns,columnsTwo
            getData(column,columnTable){
                if(this.eidtColumns[0] == "ALL"){
                    this.seeColumns = column
                    this.seeColumnsTable = columnTable
                }else{
                    for(let i=0; i<this.eidtColumns.length; i++){
                        for(let j=0; j<column.length; j++){
                            if(column[j].code == this.eidtColumns[i]){
                                this.seeColumns.push(column[j])
                                break
                            }
                        }
                        for(let n=0; n<columnTable.length; n++){
                            if(columnTable[n].dataIndex == this.eidtColumns[i]){
                                this.seeColumnsTable.push(columnTable[n])
                                break
                            }
                        }
                    }
                }
                //设置列宽
                for(let index in this.seeColumnsTable){
                    this.seeColumnsTable[index]["width"] = 220;
                    if(index == "0" || index == "1"){
                        this.seeColumnsTable[index]["fixed"] = "left";
                    }
                }
            },

            //获取主键和非空
            getKey(){
                //主键
                for(let n=0; n<this.columns.length; n++) {
                    if(this.columns[n].key == "true"){
                        this.key.push(this.columns[n])
                    }
                }
                //非空
                for(let n=0; n<this.columns.length; n++){
                    if(this.columns[n].isNull == "true"){
                        this.isNull.push(this.columns[n])
                    }
                }

                if(this.eidtColumns[0] == "ALL"){
                    //可见数据中的非空项
                    for(let i=0; i<this.isNull.length; i++){
                        this.seeValueNotNull.push(this.isNull[i].code)
                    }
                }else{
                    //可见数据中的非空项
                    for(let i=0; i<this.isNull.length; i++){
                        for(let j=0; j<this.eidtColumns.length; j++){
                            if(this.isNull[i].code == this.eidtColumns[j]){
                                this.seeValueNotNull.push(this.isNull[i].code)
                            }
                        }
                    }
                    //不可见数据
                    for(let i=0; i<this.columns.length; i++){
                        let n = 0
                        for(let j=0; j<this.seeValueNotNull.length; j++){
                            if(this.columns[i].code == this.eidtColumns[j]){
                                n++
                                break
                            }
                        }
                        if(n == 0){
                            this.unSeeValue.push(this.columns[i].code)
                        }
                    }
                }
            },
            //对象浅复制
            copy(obj1, obj2) {
                var obj = obj2 || {};
                for (let name in obj1) {
                    if (typeof obj1[name] === "object" && obj1[name] !== null) {
                        obj[name] = (obj1[name].constructor === Array) ? [] : {};
                        this.copy(obj1[name], obj[name]);
                    } else {
                        obj[name] = obj1[name];
                    }
                }
                return obj;
            },

            customRow(record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
            //点击
            clickRow(record, event) {
                var tr = event.currentTarget;
                var tbd = tr.parentNode;
                for (const i in tbd.childNodes) {
                    if (!isNaN(i)) {
                        if (tr == tbd.childNodes[i]) {
                            tbd.childNodes[i].style = 'background-color: #e6f7ff';
                            this.tbd = tbd.childNodes[i]
                        } else {
                            tbd.childNodes[i].style = '';
                        }
                    }
                }
                this.selected = record;
            },
            //修改
            onEdit() {
                this.tbd.style = '';
                this.dialog = true;
                this.addorchange = false;
                this.drawer = !this.drawer;

            },
            //新增
            onAdd() {
                this.tbd.style = '';
                this.selected = {};
                this.dialog = true;
                this.addorchange = true;
                this.drawer = !this.drawer;
            },
            //删除
            onDelete() {
                this.tbd.style = '';
                remove(this.dataInfo, this.selected)
                remove(this.searchInfo, this.selected)
            },
            changeTable() {
                this.tbd.style = '';
            },
            onSave() {
                this.backValue.data = filterTableChangeData(this.columnsTwo, this.dataInfo, this.sourceDataInfo)
                this.backValue.tableName = this.tableName
                this.backValue.tableDesc= this.$route.params.tableDesc
                this.backValue.option = "save"
                this.backValue.userName = sessionStorage.getItem("userId")
                if(this.backValue.data.length==0){
                    this.sweetAlert('info',"未做任何修改,提交失败!")
                }else{
                    saveTable(this.backValue).then(response => {
                        if (response.status === 200) {
                            this.notCommit = false;
                            this.sweetAlert('success',"保存成功!")
                            //保存成功后隐藏提交按钮  不允许再进行参数修改提交
//                        this.$router.push({ name: "paramManageCif", params: { tableName: this.tableName} });
//                        this.$store.dispatch("delVisitedViews", this.$route);
//                        this.$router.push({ name: "paramManageCif", params: { tableName: this.tableName} });
                            let setTaskEvent= new Event("taskList");
                            window.dispatchEvent(setTaskEvent);
                        }
                    });
                }
            },
            close (){
                this.dialog=false
            },
            find (){
                let num = 0
                for(let i=0; i<this.search.length; i++){
                    if(this.search[i].model == ""){
                        num++
                    }
                }
                if(num == this.search.length){
                    this.sweetAlert('info',"搜索条件为空!")
                }else{
                    this.searchInfo = []
                    this.searchData = false
                    for(let i=0; i<this.dataInfo.length; i++){
                        let num = 0
                        for(let name in this.dataInfo[i]){
                            for(let j=0; j<this.search.length; j++){
                                if(this.search[j].searchColumn == name && this.search[j].model == this.dataInfo[i][name]){
                                    num++
                                    break
                                }else if(this.search[j].searchColumn == name && this.search[j].model == ""){
                                    num++
                                    break
                                }
                            }
                        }
                        if(num == this.search.length){
                            this.searchInfo.push(this.dataInfo[i])
                        }
                    }
                    if(this.searchInfo.length != 0){
                        this.searchData = true
                    }else{
                        this.sweetAlert('info',"请输入正确搜索条件!")
                    }
                }
            },
            clean (){
                for(let i=0; i<this.search.length; i++){
                    this.search[i].model = ""
                }

                this.searchData = false
            },
            childLimit(editSelected){
                this.childPd = true
                let keyName = []
                let keyCoName = []
                let num = 0
                for(let j=0; j<this.dataInfo.length; j++){
                    if(editSelected[this.key[0].code].value == this.dataInfo[j][this.key[0].code]){
                        if(num == this.key.length){
                            break
                        }
                        num++
                        keyCoName.push(this.key[0].title)
                        for(let n=1; n<this.key.length; n++){
                            if(editSelected[this.key[n].code].value == this.dataInfo[j][this.key[n].code]){
                                num++
                                keyCoName.push(this.key[n].title)
                            }else{
                                num=0
                                keyCoName = []
                                break
                            }
                        }
                    }
                }
                if (this.addorchange == false){
                    let numSel = 0
                    for(let i=0; i<this.key.length; i++){
                        if(editSelected[this.key[i].code].value == this.selected[this.key[i].code]){
                            numSel++
                        }
                        if(numSel == this.key.length){
                            num = 0
                        }
                    }
                }
                if(num == this.key.length){
                    //alert(keyCoName+"不能重复")
                    return false
                }else{
                    return true
                }
            },
            //判断非空是否是空，主键是否重复
            limit(editSelected){
                let keyIsNull = false
                let keyName = []
                let keyCoName = []
                let num = 0
                for(let i=0; i<this.seeValueNotNull.length; i++){
                    if(editSelected[this.seeValueNotNull[i]].value == []){
                        keyIsNull = true
                    }
                }
                for(let j=0; j<this.dataInfo.length; j++){
                    if(editSelected[this.key[0].code].value == this.dataInfo[j][this.key[0].code]){
                        if(num == this.key.length){
                            break
                        }
                        num++
                        keyCoName.push(this.key[0].title)
                        for(let n=1; n<this.key.length; n++){
                            if(editSelected[this.key[n].code].value == this.dataInfo[j][this.key[n].code]){
                                num++
                                keyCoName.push(this.key[n].title)
                            }else{
                                num=0
                                keyCoName = []
                                break
                            }
                        }
                    }
                }
                if (this.addorchange == false){
                    let numSel = 0
                    for(let i=0; i<this.key.length; i++){
                        if(editSelected[this.key[i].code].value == this.selected[this.key[i].code]){
                            numSel++
                        }
                        if(numSel == this.key.length){
                            num = 0
                        }
                    }
                }
                if(keyIsNull == true){
                    this.sweetAlert('error',"带*号的字段不能为空!")
                    return false
                }else if(num == this.key.length){
                    this.sweetAlert('error',keyCoName+"不能重复!")
                    return false
                }else{
                    return true
                }
            },
            editAction(option, editSelected) {
                if(option == 'close'){
                    this.close()
                }
                if (option == 'submit') {
                    let selected = this.selected;
                    if (this.addorchange == true) {
                        for (const key in editSelected) {
                            if (editSelected[key] !== undefined) {
                                selected[key] = editSelected[key].value
                            }
                        }
                        for(let n=0; n<this.unSeeValue.length; n++){
                            selected[this.unSeeValue[n]] = []
                        }
                        if(this.limit(editSelected)){
                            this.dataInfo.splice(0, 0, selected)
                            this.close()
                        }
                    }
                    else {
                        let dataCon = this.limit(editSelected)
                        for (const keys in selected) {
                            if(dataCon == false){
                                break;
                            }else{
                                if (selected[keys] !== undefined && editSelected[keys] !== undefined) {
                                    selected[keys] = editSelected[keys].value
                                    this.close()
                                }
                            }
                        }
                    }
                }
            }
        }
    };
</script>
