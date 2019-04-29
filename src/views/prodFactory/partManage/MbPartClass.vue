<template>
    <div class="pt-5 pl-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>指标分类定义</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
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
                                <v-flex xs12 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.PART_CLASS" label="参数分类"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.PART_CLASS" label="参数分类" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.PART_CLASS_DESC" label="参数分类描述"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.PART_CLASS_LEVEL" label="参数分类层级"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.PARENT_PART_CLASS" label="上级参数分类"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.COMPANY" label="法人代码" :items="company" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.TRAN_TIMESTAMP" label="交易时间戳"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.TRAN_TIME" label="交易时间"></v-text-field>
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
                <td>{{ props.item.PART_CLASS }}</td>
                <td>{{ props.item.PART_CLASS_DESC }}</td>
                <td>{{ props.item.PART_CLASS_LEVEL }}</td>
                <td>{{ props.item.PARENT_PART_CLASS }}</td>
                <td>{{ props.item.COMPANY }}</td>
                <td>{{ props.item.TRAN_TIMESTAMP }}</td>
                <td>{{ props.item.TRAN_TIME }}</td>
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
    import {findAll} from "@/api/url/prodInfo";
    import {getAll} from "@/api/url/prodInfo";
    export default {
        props: ["title"],
        data: () => ({
            disabled: "false",
            dialog: false,
            headers: [
                { text: '参数分类',sortable: false},
                {text: '参数分类描述',sortable: false},
                {text: '参数分类层级',sortable: false,},
                { text: '上级参数分类',sortable: false},
                {text: '法人代码',sortable: false,},
                { text: 'Action',sortable: false }
            ],

            desserts: [],
            menu: [],
            menu2: [],
            dess: [],
            company: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "PART_CLASS"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                PART_CLASS: '',
                PART_CLASS_DESC: '',
                PART_CLASS_LEVEL: '',
                PARENT_PART_CLASS: '',
                COMPANY: '',
                TRAN_TIMESTAMP: '',
                TRAN_TIME: ''

            },
            defaultItem: {
                PART_CLASS: '',
                PART_CLASS_DESC: '',
                PART_CLASS_LEVEL: '',
                PARENT_PART_CLASS: '',
                COMPANY: '',
                TRAN_TIMESTAMP: '',
                TRAN_TIME: ''
            },
            backValue: {},
            backValueRole: {},
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增指标分类' : '修改指标分类'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.findAll()
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
            findAll () {
                let that = this;

                //获取环境信息
                findAll().then(function (response) {
                    that.desserts = response.data.data.PartClassInfo;
                    for(let i=0; i<that.desserts.length; i++){
                        that.dess.push(that.changeDesc(that.desserts[i]))
                    }
                    that.sourceData = that.copy(that.dess,that.sourceData)

                });
            },

            editItem (item) {
                this.editedIndex = this.dess.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";

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
                    this.backValue.userName = sessionStorage.getItem("partClass")
                    this.backValue.userName = sessionStorage.getItem("userId");
                    this.backValue.tableName = "MB_PART_CLASS"
                    this.backValue.keySet = "PART_CLASS"
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
                    if (this.editedItem.PART_CLASS == this.dess[i].PART_CLASS) {
                        equals = true;
                    }
                }
                if (this.editedIndex > -1) {
                    Object.assign(this.dess[this.editedIndex], this.editedItem)
                    equals = false;
                } else {
                    this.dess.push(this.editedItem)
                }
                if(this.editedItem.PART_CLASS == []){
                    alert("参数分类不能为空")
                }else{
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.dess,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("partClass")
                    this.backValue.tableName = "MB_PART_CLASS"
                    this.backValue.keySet = "PART_CLASS";
                    this.backValue.userName = sessionStorage.getItem("userId");
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
                this.backValue.userName = sessionStorage.getItem("attrClass")
                this.backValue.tableName = "MB_ATTR_CLASS"
                this.backValue.keySet = "ATTR_CLASS"
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