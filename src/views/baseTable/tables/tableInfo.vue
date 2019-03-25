<template>
    <v-layout justify-center pt-4 class="ml-4 mr-4">
        <v-flex xs12 sm12>
            <v-card class="MB_box">
                <v-toolbar color="" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
                    <!--<v-icon>widgets</v-icon>-->
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar card dense color="transparent">
                    <a-button type="primary" @click="onAdd">新增</a-button>
                    <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
                    <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
                    <a-button type="primary" @click="onSave" class="ml-2">提交</a-button>
                    <v-spacer></v-spacer>
                    <div v-for="searchColumn in searchCopy">
                        <v-select
                                v-model="searchColumn.model"
                                :items="searchColumn.value"
                                :label=searchColumn.searchColumn
                        ></v-select>
                    </div>
                    <a-button type="primary" @click="find" class="ml-2">查找</a-button>
                    <a-button type="primary" @click="clean" class="ml-2">重置</a-button>
                </v-toolbar>
                <v-card-text class="pa-0" v-if="searchData == false">
                    <a-table :customRow="customRow" :columns="columnsTwo" @change="changeTable" :dataSource="dataInfo">
                    </a-table>
                    <v-divider></v-divider>
                </v-card-text>
                <v-card-text class="pa-0" v-if="searchData == true">
                    <a-table :customRow="customRow" :columns="columnsTwo" @change="changeTable" :dataSource="searchInfo">
                    </a-table>
                    <v-divider></v-divider>
                </v-card-text>

                <v-dialog
                        v-model="dialog"
                        width="500"
                        persistent
                        z-index="100"
                >
                    <edit-table-info v-if="dialog" :selected="selected" :columns="columns" :tableName="tableName" :childPd="childPd"
                                     v-on:editAction="editAction" v-on:changeNum="changeNum"></edit-table-info>

                </v-dialog>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    import EditTableInfo from './editTableInfo'
    import {getParamTable} from "@/api/url/prodInfo";
    import {saveTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import DcTextField from "@/components/widgets/DcTextField";
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import {remove} from '@/utils/util'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import DcMultiselect from "../../../components/widgets/DcMultiselect";

    export default {
        name: 'tableInfo',
        components: {
            DcMultiselect,
            EditTableInfo,
            DcTextField,
        },
        data() {
            return {
                title: '',
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
                open: true,
                prodTypeSearch: '',
                prodClassSearch: 'RB100',
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
                tbd: {},
                option: '',
                selectedRowKeys: [],
                selected: {},
                columns: [],
                columnsTwo: [],
                backValue: {},
                key: [],
                isNull: [],
                search: [],
                searchCopy: [],
                searchData: false,
                searchColumn: []
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
                this.tableName = this.$route.hash
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
                    that.columns = response.data.data.column;
                    that.columnsTwo = response.data.data.columnTwo
                    that.tableName = tableName
                    that.searchColumn = response.data.data.search.searchColumn
                    that.getSearch(that.searchColumn)
                    that.getKey()
                });
            },
            getSearch(val){
                this.search = []
                if(val != null){
                    let searchColumns = val.split(",")
                    for(let i=0; i<searchColumns.length; i++){
                        let value = []
                        let temp = {}
                        for(let j=0; j<this.dataInfo.length; j++){
                            value.push(this.dataInfo[j][searchColumns[i]])
                        }
                        temp['searchColumn'] = searchColumns[i]
                        temp['value'] = value
                        temp['model'] = ""
                        this.search.push(temp)
                        this.searchCopy = this.search
                    }
                }
            },
            getKey(){
                for(let n=0; n<this.columns.length; n++) {
                    if(this.columns[n].key == "true"){
                        this.key.push(this.columns[n])
                    }
                }
                for(let n=0; n<this.columns.length; n++){
                    if(this.columns[n].isNull == "true"){
                        this.isNull.push(this.columns[n])
                    }
                }
            },
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
            onEdit() {
                this.tbd.style = '';
                this.dialog = true;
                this.addorchange = false;
            },
            onAdd() {
                this.tbd.style = '';
                this.selected = {};
                this.dialog = true;
                this.addorchange = true;
            },
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
                this.backValue.tableDesc = this.$route.params.tableDesc
                this.backValue.option = "save"
                this.backValue.userName = sessionStorage.getItem("userId")

                if(this.backValue.data.length==0){
                    this.sweetAlert('info',"未做任何修改,提交失败!")
                }else{
                    saveTable(this.backValue).then(response => {
                        if (response.status === 200) {
                            this.sweetAlert('success',"提交成功!")
                            this.$router.push({ name: "paramManage", params: { tableName: this.tableName} });
                            let setTaskEvent= new Event("taskList");
                            window.dispatchEvent(setTaskEvent);

                        }
                    });
                }
            },
            close() {
                this.dialog = false
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
            limit(editSelected){
                let keyIsNull = false
                let keyName = []
                let keyCoName = []
                let num = 0
                for(let i=0; i<this.isNull.length; i++){
                    if(editSelected[this.isNull[i].code].value == []){
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
<style scoped>
    .MB_box {
        box-shadow: none!important;
        border: 1px solid #D6D6D6;
    }
    .MB_box .v-toolbar {
        background-color: #f5f5f5;
        color: rgba(0,0,0,.87);
        border-bottom:1px solid #D6D6D6;
    }
    .MB_box >>> .ant-table-pagination.ant-pagination {
        margin: 16px 16px 16px 0!important;
    }
</style>