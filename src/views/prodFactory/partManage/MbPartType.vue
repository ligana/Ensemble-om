<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>指标类型定义</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white;margin-left: 100px">添加</td>
                </v-btn>
                <v-card>
                    <v-card-title>
                        <span style="color: #00b0ff;font-size: x-large;margin-left: 5%">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text style="margin-top: -10%">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.PART_TYPE" label="指标类型"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.PART_TYPE" label="指标类型" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.PART_DESC" label="指标描述"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.PART_CLASS" label="指标分类" :items="partClass" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.IS_STANDARD" label="是否标准模板" :items="isStandard" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.PROCESS_METHOD" label="指标实现方式" :items="processMethod" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.BUSI_CATEGORY" label="业务分类" :items="busiCategory" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.STATUS" label="状态" :items="status" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.COMPANY" label="法人代码" :items="company" item-text="value" item-value="key"></v-select>
                                </v-flex>

                                <v-flex xs12 sm12 md12 v-show="!show">
                                    <v-select v-model="ATTR_COLUMN" label="指标属性" :items="attrColum" item-text="value" item-value="key" multiple clearable></v-select>
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
        <v-data-table :headers="headers" :items="dess" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.PART_TYPE }}</td>
                <td>{{ props.item.PART_DESC }}</td>
                <td>{{ props.item.PART_CLASS }}</td>
                <td>{{ props.item.IS_STANDARD }}</td>
                <td>{{ props.item.PROCESS_METHOD }}</td>
                <td>{{ props.item.BUSI_CATEGORY }}</td>
                <td>{{ props.item.STATUS }}</td>
                <td>{{ props.item.COMPANY }}</td>
                <td>{{ props.item.ATTR_COLUMN }}</td>
                <td style="width: 50px">
                    <v-tooltip bottom color="blue" style="margin-left: -40px">
                        <v-btn flat icon="edit" slot="activator" @click="editItem(props.item)">
                            <v-icon small class="mr-2" style="color: #0d47a1">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -33px">
                        <v-btn flat icon="delete" slot="activator" @click="deleteItem(props.item)">
                            <v-icon small style="color: red">delete</v-icon>
                        </v-btn>
                        <span>删除</span>
                    </v-tooltip>
                </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import {saveTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {QueryAll} from "@/api/url/prodInfo";
    import {getAll} from "@/api/url/prodInfo";
    import {getAttrInfo} from "@/api/url/prodInfo";
    export default {
        props: ["title"],
        data: () => ({
            disabled: "false",
            dialog: false,
            headers: [
                { text: '指标类型',sortable: false},
                {text: '指标类型描述',sortable: false},
                {text: '指标分类',sortable: false,},
                {text: '是否标准模板',sortable: false,},
                {text: '指标实现方式',sortable: false,},
                {text: '业务分类',sortable: false,},
                {text: '状态',sortable: false,},
                {text: '法人代码',sortable: false,},
                {text: '指标属性',sortable: false,value: 'ATTR_COLUMN'},
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            menu: [],
            menu2: [],
            sourceData: [],
            dess: [],
            ATTR_COLUMN: [],
            attrColum: [],
            partClass: [],
            company: [],
            busiCategory: [],
            partAttrInfo: [],
            partType: [],
            partAttr: [],
            isStandard: [
                {
                    key: "Y",
                    value: "Y-标准描述"
                },
                {
                    key: "N",
                    value: "N-非标准描述"
                }
            ],
            processMethod: [
                {
                    key: "A",
                    value: "A-检查"
                },
                {
                    key: "C",
                    value: "C-提交"
                }
            ],
            status: [
                {

                    key: "A",
                    value: "A-有效"
                },
                {
                    key: "E",
                    value: "E-失效"
                },
                {
                    key: "F",
                    value: "F-无效"
                }
            ],
            keySet: [
                {
                    key: "true",
                    dataIndex: "PART_TYPE"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                PART_TYPE: '',
                PART_DESC: '',
                PART_CLASS: '',
                IS_STANDARD: '',
                PROCESS_METHOD: '',
                BUSI_CATEGORY: '',
                STATUS: '',
                COMPANY: '',
                ATTR_COLUMN: ''
            },
            defaultItem: {
                PART_TYPE: '',
                PART_DESC: '',
                PART_CLASS: '',
                IS_STANDARD: '',
                PROCESS_METHOD: '',
                BUSI_CATEGORY: '',
                STATUS: '',
                COMPANY: '',
                ATTR_COLUMN: '',
            },
            backValue: {},
            backValueRole: {}
        }),


        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.QueryAll();
            //加载指标属性备选数据
            let temp = [];
            const attrData = getAttrInfo();
            for(let index in attrData){
                let tempAttr = {};
                tempAttr["key"] = index;
                tempAttr["value"] = attrData[index].columnDesc;
                temp.push(tempAttr);
            }
            this.attrColum = temp;
            //加载指标分类备选数据
            let temp2 = [];
            const typeData = getAll("MB_PART_CLASS");
            for(let indexs in typeData){
                let temp2Type = {};
                temp2Type["key"] = typeData[indexs].PART_CLASS;
                temp2Type["value"] = typeData[indexs].PART_CLASS_DESC;
                temp2.push(temp2Type);
            }
            this.partClass = temp2;
            //加载业务分类备选数据
            let temp3 = [];
            const prodClass = getAll("MB_PROD_CLASS");
            for(let indexes in prodClass){
                let tempProd = {};
                if(tempProd["key"]==1)
                    tempProd["key"] = prodClass[indexes].PROD_CLASS_LEVEL;
                    tempProd["value"] = prodClass[indexes].PROD_CLASS;
                temp3.push(tempProd);
            }
            this.busiCategory = temp3;
            //法人代码备选数据
            let temp4 = [];
            const companyData = getAll("FM_COMPANY");
            for(let indexed in companyData){
                let tempCompany = {};
                tempCompany["key"] = companyData[indexed].COMPANY_NAME;
                tempCompany["value"] = companyData[indexed].COMPANY;
                temp4.push(tempCompany);
            }
            this.company = temp4;
        },
        methods: {
            QueryAll (){
                let that = this;

                //获取指标信息
                QueryAll().then(function (response) {
                    //that.desserts  GRACE_PERIOD,GRACE_END_MONTH
                    that.partType = response.data.data.partTypeInfo;
                    that.partAttr = response.data.data.partAttrInfo;

                    for(let typeIndex in that.partType){
                        let partKey = that.partType[typeIndex].partType;
                        let partAttrColumn = '';
                        for(let attrIndex in that.partAttr){
                            if(partKey == that.partAttr[attrIndex].partType){
                                if(partAttrColumn == ''){
                                    partAttrColumn = that.partAttr[attrIndex].attrKey;
                                }else{
                                    partAttrColumn = partAttrColumn+','+that.partAttr[attrIndex].attrKey;
                                }
                            }
                        }
                        that.partType[typeIndex]['attrColumn'] = partAttrColumn;
                    }
                    that.desserts = that.partType;
                    for(let i=0; i<that.desserts.length; i++){
                        that.dess.push(that.changeDesc(that.desserts[i]))
                    }
                   that.sourceDataType = that.copy(that.partType,that.sourceData)
                   that.sourceDataAttr = that.copy(that.partAttr,that.sourceData)

                });

            },

            editItem (item) {
                //this.ATTR_COLUMN = [],
                this.show = false;
                this.editedIndex = this.dess.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
                this.disabled = "true";
                let value = this.editedItem.ATTR_COLUMN.split(",");
                this.ATTR_COLUMN = value;


            },
            authorization(item){
                this.$router.push({
                    name: 'roleMenuAuthorzation',
                    hash: item
                })
            },
            addClick() {
                this.disabled = "false"
            },
            deleteItem (item) {
                const index = this.dess.indexOf(item)
                let confirms = confirm('Are you sure you want to delete this item?')
                if(confirms == true){
                    this.dess.splice(index, 1)
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.dess,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("partType")
                    this.backValue.userName = sessionStorage.getItem("userId");
                    this.backValue.tableName = "MB_PART_TYPE"
                    this.backValue.keySet = "ATTR_KEY"
                    this.sourceData = []
                    this.sourceData = this.copy(this.dess,this.sourceData)
                    saveTable(this.backValue).then(response => {
                        if (response.status === 200) {
                            this.sweetAlert('success',"保存成功!")
                        }
                    });
                }
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                let equals = false;
                for (let i = 0; i < this.dess.length; i++) {
                    if (this.editedItem.PART_TYPE == this.dess[i].PART_TYPE) {
                        equals = true;
                    }
                }
                if (this.editedIndex > -1) {
                    Object.assign(this.dess[this.editedIndex], this.editedItem)
                    equals = false;
                } else {
                    this.dess.push(this.editedItem)
                }
                if(this.editedItem.partType == []){
                    alert("指标类型不能为空")
                }else if(this.editedItem.partDesc == []){
                    alert("指标类型描述不能为空")
                }else if(this.editedItem.partClass == []){
                    alert("指标分类不能为空")
                }else if(this.editedItem.isStandard == []){
                    alert("是否标准模板不能为空")
                }else if(this.editedItem.status == []){
                    alert("状态不能为空")
                }else{
                    //保存数据落库
                    let newPart
                    this.backValueType.data = filterTableChangeData(this.keySet,this.partType,this.sourceData)
                    this.backValueAttr.data = filterTableChangeData(this.keySet,this.partAttr,this.sourceData)
                    this.backValueType.userName = sessionStorage.getItem("partType")
                    this.backValueAttr.userName = sessionStorage.getItem("partAttr")
                    this.backValueType.tableName = "MB_PART_TYPE"
                    this.backValueAttr.tableName = "MB_PART_ATTR"
                    this.backValueType.keySet = "PART_TYPE"
                    this.backValueAttr.keySet = "PART_TYPE"
                    this.backValueType.userName = sessionStorage.getItem("userId");
                    this.backValueAttr.userName = sessionStorage.getItem("userId");
                    saveTable(this.backValue).then(response => {
                        if (response.status === 200) {
                            this.sweetAlert('success',"保存成功!")
                        }
                    });
                    this.close();
                }
                this.initialize()
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
            saveClick() {
                //保存数据落库
                this.backValue.data = filterTableChangeData(this.keySet,this.dess,this.sourceData)
                this.backValue.userName = sessionStorage.getItem("attrKey")
                this.backValue.tableName = "MB_ATTR_TYPE"
                this.backValue.keySet = "ATTR_KEY"
                saveSysTable(this.backValue).then(response => {
                    if(response.status === 200){
                        toast.success("提交成功！");
                    }
                })
            },
            getBigDesc(val){
                if(/[a-z]/.test(val)){
                    val = val.replace(/([A-Z])/g,"_$1").toUpperCase();
                }
                return val
            },
            changeDesc(data) {
                let desc = {}
                for(let key in data){
                    desc[this.getBigDesc(key)] = data[key]
                }
                return desc
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