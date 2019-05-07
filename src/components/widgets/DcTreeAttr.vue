<template>
    <v-card>
        <v-toolbar dense card color="blue-grey lighten-5">
            <v-toolbar-title style="font-size: large; color: slategrey">{{labelText}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom color="orange">
                <v-btn flat icon="edit" slot="activator" color="blue" @click="saveClick">
                    <v-icon>save</v-icon>
                </v-btn>
                <span>应用</span>
            </v-tooltip>
        </v-toolbar>
        <v-toolbar dense class="chat-history-toolbar prodLists">
            <v-text-field style="height: 100%" prepend-icon="search" label="请输入产品参数" v-model="searchValue"></v-text-field>
        </v-toolbar>
            <v-flex xs6 md12>
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
        <v-divider></v-divider>
        <v-layout>
            <v-flex xs6 md12>
                <v-card-text style="max-height: 400px; height: 300px; overflow-y: scroll">
                    <div v-if="selections.length === 0" key="title" class="title font-weight-light grey--text pa-3 text-xs-center">请选择...</div>
                    <v-scroll-x-transition group hide-on-leave>
                        <!--区别指标与参数   指标采用蓝色chip 参数采用绿色chip-->
                        <v-chip v-for="(selection, i) in selections" :key="i" v-if="selection.part == true" color="blue" dark smaller close @input="remove(selection)">
                            <v-icon left small>mdi-beer</v-icon>
                            {{ selection.name }}
                        </v-chip>
                        <v-chip v-for="(selection, i) in selections" :key="i" v-if="selection.part == undefined" color="green" dark smaller close @input="remove(selection)">
                            <v-icon left small>mdi-beer</v-icon>
                            {{ selection.name }}
                        </v-chip>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import toast from '@/utils/toast';
    import {getAllPartList} from "@/api/url/prodInfo";

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
                /*        this.backValue = this.tree*/
                return selections
            }
        },
        watch: {
            msg: {
                handler(msg) {
                    this.initParam(msg);
                }
            },
            options: {
                handler(msg){
                    this.init(msg);
                }
            },
            tree: {
                handler(msg){
                    console.log(msg)
                }
            },
        },
        mounted() {
            this.init();
            this.initParam()
        },
        methods: {
            saveClick() {
                if(!this.tree.length){
                    this.$swal({
                        allowOutsideClick: false,
                        type: 'info',
                        title: "请选择要添加的信息!",
                    })
                }else {
                    this.backValue = []
                    for (let y = 0; y < this.tree.length; y++) {
                        for (let x = 0; x < this.brewerie.length; x++) {
                            //标记新增为指标
                            if (this.brewerie[x].id === this.tree[y] && this.brewerie[x].part) {
                                this.backValue.push("PART--" + this.brewerie[x].id + "--" + this.brewerie[x].name)
                            }
                            //标记新增为参数
                            if (this.brewerie[x].id === this.tree[y] && !this.brewerie[x].part) {
                                this.backValue.push("ATTR--" + this.brewerie[x].id + "--" + this.brewerie[x].name)
                            }
                        }
                    }
                    this.$emit("getVue", this.backValue);
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
            init() {
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc;
                }
                //加工树形结构数据
                let options = this._props.options
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
                //待添加参数列表增加指标信息
                //获取指标信息
                getAllPartList().then(response => {
                    let partInfo = response.data.data.partTypeInfo;
                    let tempPart = {};
                    let parLength = parent.length;
                    tempPart["name"] = "部件信息";
                    tempPart["id"] = parLength+1;
                    tempPart["code"] = "PART";
                    tempPart["children"] = [];
                    for(let parIndex in partInfo){
                        tempPart.children.push({id: partInfo[parIndex].partType,name: partInfo[parIndex].partDesc});
                        this.brewerie.push({id: partInfo[parIndex].partType,name: partInfo[parIndex].partDesc,part: true});
                    }
                    parent[parLength] = tempPart;
                    this.items = parent
                });
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