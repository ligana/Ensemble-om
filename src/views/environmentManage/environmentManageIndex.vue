<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>环境管理</v-toolbar-title>
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
                                    <v-text-field v-model="editedItem.envId" label="环境ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.envId" label="环境ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.envDesc" label="环境描述"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.systemId" label="系统ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.module" label="模块"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.url" label="HTTP接入URL"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.serviceCode" label="服务代码"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.messageCode" label="报文代码"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.messageType" label="报文类型"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.operator" label="最新修改人ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                     <v-text-field v-model="editedItem.time" label="最新修改时间"></v-text-field>
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
        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.envId }}</td>
                <td>{{ props.item.envDesc }}</td>
                <td>{{ props.item.systemId }}</td>
                <td>{{ props.item.module }}</td>
                <td>{{ props.item.url }}</td>
                <td>{{ props.item.serviceCode }}</td>
                <td>{{ props.item.messageCode }}</td>
                <td>{{ props.item.messageType }}</td>
                <td>{{ props.item.operator}}</td>
                <td>{{ props.item.time}}</td>
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
   import toast from '@/utils/toast';
   import {getEnvInfo} from "@/api/url/prodInfo";

   export default {
       props: ["title"],
       data: () => ({
           disabled: "false",
           dialog: false,
           headers: [
               { text: '环境ID',sortable: false},
               {text: '环境描述',sortable: false},
               {text: '系统ID',sortable: false,size: "medium"},
               { text: '模块',sortable: false},
               { text: 'HTTP接入URL',sortable: false },
               { text: '服务代码',sortable: false },
               { text: '报文代码',sortable: false },
               { text: '报文类型',sortable: false},
               { text: '最新修改人ID',sortable: false },
               { text: '最新修改时间',sortable: false },
               { text: 'Action',sortable: false }
           ],

           desserts: [],
           menu: [],
           menu2: [],
           sourceData: [],
           keySet: [
               {
                   key: "true",
                   dataIndex: "envId"
               }
           ],
           editedIndex: -1,
           title: "",
           editedItem: {
               envDesc: '',
               envId: '',
               systemId: '',
               module: '',
               url: '',
               serviceCode: '',
               messageCode: '',
               messageType: '',
               operator: '',
               time: ''
           },
           defaultItem: {
               envDesc: '',
               envId: '',
               systemId: '',
               module: '',
               url: '',
               serviceCode: '',
               messageCode: '',
               messageType: '',
               operator: '',
               time: ''
           },
           backValue: {},
           backValueRole: {},
       }),


       watch: {
           dialog (val) {
               val || this.close()
           }
       },

       created () {
           this.getEnvInfo()
       },

       methods: {
           getEnvInfo () {
               let that = this;

               //获取环境信息
               getEnvInfo().then(function (response) {
                   that.desserts = response.data.data.envInfo;
                   that.sourceData = that.copy(that.desserts,that.sourceData)

               });
           },

           editItem (item) {
               this.editedIndex = this.desserts.indexOf(item)
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
               const index = this.desserts.indexOf(item)
               let confirms = confirm('Are you sure you want to delete this item?')
               if(confirms == true){
                   this.desserts.splice(index, 1)
                   //保存数据落库
                   this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                   this.backValue.userName = sessionStorage.getItem("envId")
                   this.backValue.tableName = "OM_ENV_ORG"
                   this.backValue.keySet = "ENV_ID"
                   this.sourceData = []
                   this.sourceData = this.copy(this.desserts,this.sourceData)
                   saveSysTable(this.backValue).then(response => {
                       if(response.status === 200){
                           this.sweetAlert('success',"删除成功!")
                       }
                   })
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
               for (let i = 0; i < this.desserts.length; i++) {
                   if (this.editedItem.envId == this.desserts[i].envId) {
                       equals = true;
                   }
               }
               if (this.editedIndex > -1) {
                   Object.assign(this.desserts[this.editedIndex], this.editedItem)
                   equals = false;
               } else {
                   this.desserts.push(this.editedItem)
               }
               if(this.editedItem.envId == []){
                   alert("环境ID不能为空")
               }else if(this.editedItem.systemId == []){
                   alert("系统ID不能为空")
               }else if(equals==true){
                   alert("环境ID不能与已存在的环境ID相同")
               }else{
                   //保存数据落库
                   this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                   this.backValue.userName = sessionStorage.getItem("envId")
                   this.backValue.tableName = "OM_ENV_ORG"
                   this.backValue.keySet = "ENV_ID"
                   saveSysTable(this.backValue).then(response => {
                       if(response.status === 200){
                           toast.success("提交成功！");
                       }
                   })
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
               this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
               this.backValue.userName = sessionStorage.getItem("envId")
               this.backValue.tableName = "OM_ENV_ORG"
               this.backValue.keySet = "ENV_ID"
               saveSysTable(this.backValue).then(response => {
                   if(response.status === 200){
                       toast.success("提交成功！");
                   }
               })
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