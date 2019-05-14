<template>
    <a-spin tip="全量脚本生成中,请稍候... ..." size="large" :spinning="spinning">

    <v-card class="elevation-0 mt-3">
        <v-layout>
            <v-flex xs6 md6>
                <v-text-field single-line style="height: 100%" prepend-icon="search" label="请输入需要同步的表名" v-model="searchValue"></v-text-field>
            </v-flex>
            <v-flex xs6 md6 class="mt-3">

            <a-button type="primary" @click="start" style="height: 28px; margin-left: 60%">开始同步</a-button>
                <a-button type="primary" @click="release" class="ml-4" style="height: 28px">撤销同步</a-button>
            </v-flex>
        </v-layout>
        <v-layout>
        <v-flex xs6 md6>
            <v-card-text style="height: 400px; max-height: 350px;overflow-y: scroll">
                <v-treeview
                        :search="searchValue"
                        slot="header"
                        v-model="tree"
                        activatable
                        :items="items"
                        selected-color="green"
                        open-on-click
                        selectable
                        :options="options"
                        expand-icon="mdi-assignment_turned_in-down"
                        labelDesc="labelDesc">
                </v-treeview>
            </v-card-text>
        </v-flex>
            <v-flex xs6 md6>
                <v-card-text style="max-height: 400px; height: 300px; overflow-y: scroll">
                    <div v-if="selections.length === 0" key="title" class="title font-weight-light grey--text pa-3 text-xs-center">待同步参数表...</div>
                    <v-scroll-x-transition group hide-on-leave>
                        <v-chip v-for="(selection, i) in selections" :key="i" color="green" dark smaller close @input="remove(selection)">
                            <v-icon left small>mdi-beer</v-icon>
                            {{ selection.name }}
                        </v-chip>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
    </a-spin>
</template>
<script>
    import toast from '@/utils/toast';
    import { getAllTableInfo } from "@/api/url/prodInfo";
    import { asyncParam } from "@/api/url/prodInfo";
    export default {
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: ["options", "msg","labelDesc"],
        data() {
            return {
                items: [],
                lists: [],
                brewerie: [],
                tree: [],
                tLen: '',
                spinning: false,
                copTree: [],
                diffTree: [],
                options: [],
                labelText: "",
                backValue: [],
                searchValue: null,
                same: false,
                open: [1, 2],
                caseSensitive: false
            };
        },
        computed: {
            selections: function () {
                const selections = []
                for (const leaf1 of this.tree) {
                    const brewery = this.brewerie.find(brewery => brewery.id + "" === leaf1 + "")
                    if (!brewery) continue
                    if(brewery.part){
                        brewery["color"] = "green";
                    }else{
                        brewery["color"] = "blue";
                    }
                    selections.push(brewery)
                }
                return selections
            }
        },
        mounted() {
            this.getTableInfo();
            this.initParam()
        },
        methods: {
            getTableInfo() {
                let tagInfo = [];
                const response = getAllTableInfo();
                let omEnvInfo = response.omEnvOrg;
                let tableInfo = response.omTableList;
                for(let envIndex in omEnvInfo){
                    for(let tableIndex in tableInfo){
                        if(omEnvInfo[envIndex].systemId == (tableInfo[tableIndex].system).split(",")[0]){
                            let temp = {};
                            temp["key"] = tableInfo[tableIndex].tableName;
                            temp["columnDesc"] = tableInfo[tableIndex].tableDesc;
                            temp["parentCode"] = omEnvInfo[envIndex].systemId;
                            temp["parentDesc"] = omEnvInfo[envIndex].envDesc;
                            tagInfo.push(temp);
                        }
                    }
                }
                //获取参数信息
                this.init(tagInfo);
            },
            start() {
                if(!this.tree.length){
                    this.$swal({
                        allowOutsideClick: false,
                        type: 'info',
                        title: "请选择需要同步的参数表!",
                    })
                }else {
                    this.spinning = true;
                    let selectedTable = {};
                    selectedTable["tableInfo"] = this.tree;
                    asyncParam(selectedTable).then(response => {
                        if(response.status === 200) {
                            this.spinning = false;
                            this.sweetAlert('success', "参数全量文件生成成功!");
                        }
                    })
                }
            },
            remove(name) {
                const items=this.items
                this.tree.splice(this.tree.indexOf(name.id),1)
                let id=0;
                for(const index in items){
                    const item= items[index]
                    for(const cIndex in item.children){
                        if(item.children[cIndex].id ==name.id){
                            id=item.id;
                        }
                    }
                }
                if(id>0&&this.tree.indexOf(id)>=0){
                    this.tree.splice(this.tree.indexOf(id),1)
                }
            },
            init(val) {
                //加工树形结构数据
                let options = val;
                let parent = []
                for(let i=0; i<options.length; i++){
                    if(i === 0){
                        let temp = {}
                        temp.id = parent.length+1
                        temp.code = options[i].parentCode;
                        temp.name = options[i].parentDesc;
                        temp.children = []
                        parent[0] = temp
                    }
                    let flag = 0
                    for(let j=0; j<parent.length; j++){
                        if(parent[j].code !== undefined && options[i].parentCode === parent[j].code){
                            flag = 1;
                            break
                        }
                    }
                    if(flag === 0){
                        let temp = {}
                        temp.id = parent.length+1
                        temp.code = options[i].parentCode;
                        temp.name = options[i].parentDesc;
                        temp.children = []
                        parent[parent.length] = temp
                    }
                }
                let index = parent.length+1
                for(let k=0; k<options.length; k++){
                    let brewerieTemps = {}
                    brewerieTemps.id = options[k].key+""
                    brewerieTemps.name = options[k].columnDesc
                    this.brewerie.push(brewerieTemps)
                    for(let n=0; n<parent.length; n++){
                        if(options[k].parentCode !== undefined && options[k].parentCode === parent[n].code){
                            let temps = {}
                            temps.id = options[k].key+""
                            temps.name = options[k].columnDesc
                            parent[n].children.push(temps)
                        }
                    }
                    index++
                }
                this.items = parent
            },
            initParam(val){
                //根据v-model绑定数据初始化树形结构
                this.tree = []
                if(this._props.msg !== undefined){
                    if(this._props.msg instanceof Array){
                        this.tree =this._props.msg
                    }else{
                        this.tree = this._props.msg.split(",")
                    }
                }
            }
        }
    };
</script>
<style scoped>
    .btn {
        width: 200px;
    }
    .chat-history-toolbar {
        /*padding: 5px 0;*/
        box-shadow: none;
    }
</style>