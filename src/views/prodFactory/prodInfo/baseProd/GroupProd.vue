<<<<<<< HEAD
<template>
    <v-card>
        <v-toolbar
                card
                color="grey lighten-3"
        >
              <v-layout>
                  <v-flex
                          xs6
                          md6
                  >
                  </v-flex>
                  <v-flex
                          xs1
                          md1
                  >
                      <v-subheader class="primary--text subheading pb-2">默认产品 :
                      </v-subheader>
                  </v-flex>
            <v-flex
                    xs4
                    md4
            >
            <v-select right v-model="defaultProd" label="设置默认子产品" solo single-line :items="selections" item-text="name" item-value="id"></v-select>
            </v-flex>
              </v-layout>
        </v-toolbar>

        <v-layout>
            <v-flex>
                <v-toolbar dense class="chat-history-toolbar">
                <v-text-field style="padding-top: 1%" solo single-line clearable prepend-icon="search" class="top" label="请输入产品参数" v-model="search"></v-text-field>
                </v-toolbar>
                <v-card-text style="max-height: 500px;overflow-y: scroll">
                    <v-treeview
                            v-model="tree"
                            :items="breweries"
                            activatable
                            selected-color="green"
                            :search="search"
                            open-on-click
                            selectable
                            :options="options"
                            expand-icon="mdi-assignment_turned_in-down"
                    >
                    </v-treeview>
                </v-card-text>
            </v-flex>

            <v-divider vertical></v-divider>

            <v-flex
                    xs12
                    md6
            >
                <v-card-text>
                    <div
                            v-if="selections.length === 0"
                            key="title"
                            class="title font-weight-light grey--text pa-3 text-xs-center"
                    >
                        Select your favorite breweries
                    </div>

                    <v-scroll-x-transition
                            group
                            hide-on-leave
                    >
                        <v-chip v-for="(selection, i) in selections" :key="i" color="green" dark smaller close @input="remove(selection)">
                            <v-icon left small>mdi-beer</v-icon>
                            {{ selection.name }}
                        </v-chip>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn
                    flat
                    @click="tree = []"
            >
                Reset
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>
<script>
    import {getParamTable} from "@/api/url/prodInfo";
    export default {
        props: ["prodData","prodTypeCode"],
        data: () => ({
            breweries: [
            ],
            breweriesSearch: [],
            isLoading: false,
            search: null,
            defaultProd: '',
            tree: [],
            types: [],
            selections: [],
        }),
        watch: {
         selections: {
                handler(msg) {
                    if(msg==null||msg.length==0){
                        return
                    }
                   this.updateGroup(msg)
                }
            },
            defaultProd: {
                handler() {
                    this.updateGroup(this.selections)
                }
            },
            tree: {
                handler(msg,oldMsg) {
                    const selections = []
                    for (const leaf of msg) {
                        const brewery = this.breweries.find(brewery => brewery.id == leaf)
                        if (!brewery) continue
                        selections.push(brewery)
                    }
                    this.selections=selections
                }
            },
        },
        mounted() {
            this.initOption()
        },
        methods: {
            updateGroup(msg){
                const prodDataGroup=[];
                for (const leaf in msg) {
                    let defaultProd='N'
                    if(msg[leaf].id===this.defaultProd){
                        defaultProd='Y'
                    }
                    const item={prodType: this._props.prodTypeCode, prodSubType: msg[leaf].id, SEQ_NO: parseInt(leaf)+1,defaultProd: defaultProd}
                    prodDataGroup.push(item)
                }
                this._props.prodData.mbProdGroup=prodDataGroup
            },
            initOption() {
                const that=this
                getParamTable("MB_PROD_TYPE").then(function (response) {
                    let locData=[]
                    let prodGroup = response.data.data.columnInfo;
                    for(let i=0; i<prodGroup.length; i++){
                        const data={id: prodGroup[i].PROD_TYPE,name: prodGroup[i].PROD_TYPE+'-' + prodGroup[i].PROD_DESC}
                        locData.push(data)
                    }
                    that.breweries=locData
                    that.breweriesSearch=locData
                    that.initData()
                });
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
                if(this.tree2.indexOf(name.id) != -1){
                    this.tree2.splice(this.tree2.indexOf(name.id),1)
                    let id=0;
                    for(const index in items){
                        const item= items[index]
                        for(const cIndex in item.children){
                            if(item.children[cIndex].id ==name.id){
                                id=item.id;
                            }
                        }
                    }
                    if(id>0&&this.tree2.indexOf(id)>=0){
                        this.tree2.splice(this.tree2.indexOf(id),1)
                    }
                }
            },
            initData() {
               const prodDataGroup=this._props.prodData.mbProdGroup;
               let locData=this.selections;
               let tree=this.tree
               let breweries=this.breweries
               for(const item in prodDataGroup){
                   const data={id: prodDataGroup[item].prodSubType,name: prodDataGroup[item].prodSubType}
                   breweries.push(data)
                   locData.push(data)
                   tree.push(prodDataGroup[item].prodSubType)
               }
            }
        }
    }
=======
<template>
    <v-card>
        <v-toolbar
                card
                color="grey lighten-3"
        >
              <v-layout>
                  <v-flex
                          xs6
                          md6
                  >
                  </v-flex>
                  <v-flex
                          xs1
                          md1
                  >
                      <v-subheader class="primary--text subheading pb-2">默认产品 :
                      </v-subheader>
                  </v-flex>
            <v-flex
                    xs4
                    md4
            >
            <v-select right v-model="defaultProd" label="设置默认子产品" solo single-line :items="selections" item-text="name" item-value="id"></v-select>
            </v-flex>
              </v-layout>
        </v-toolbar>

        <v-layout>
            <v-flex>
                <v-toolbar dense class="chat-history-toolbar">
                <v-text-field style="padding-top: 1%" solo single-line clearable prepend-icon="search" class="top" label="请输入产品参数" v-model="search"></v-text-field>
                </v-toolbar>
                <v-card-text style="max-height: 500px;overflow-y: scroll">
                    <v-treeview
                            v-model="tree"
                            :items="breweries"
                            activatable
                            selected-color="green"
                            :search="search"
                            open-on-click
                            selectable
                            :options="options"
                            expand-icon="mdi-assignment_turned_in-down"
                    >
                    </v-treeview>
                </v-card-text>
            </v-flex>

            <v-divider vertical></v-divider>

            <v-flex
                    xs12
                    md6
            >
                <v-card-text>
                    <div
                            v-if="selections.length === 0"
                            key="title"
                            class="title font-weight-light grey--text pa-3 text-xs-center"
                    >
                        Select your favorite breweries
                    </div>

                    <v-scroll-x-transition
                            group
                            hide-on-leave
                    >
                        <v-chip v-for="(selection, i) in selections" :key="i" color="green" dark smaller close @input="remove(selection)">
                            <v-icon left small>mdi-beer</v-icon>
                            {{ selection.name }}
                        </v-chip>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn
                    flat
                    @click="tree = []"
            >
                Reset
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>
<script>
    import {getParamTable} from "@/api/url/prodInfo";
    export default {
        props: ["prodData","prodTypeCode"],
        data: () => ({
            breweries: [
            ],
            breweriesSearch: [],
            isLoading: false,
            search: null,
            defaultProd: '',
            tree: [],
            types: [],
            selections: [],
        }),
        watch: {
         selections: {
                handler(msg) {
                    if(msg==null||msg.length==0){
                        return
                    }
                   this.updateGroup(msg)
                }
            },
            defaultProd: {
                handler() {
                    this.updateGroup(this.selections)
                }
            },
            tree: {
                handler(msg,oldMsg) {
                    const selections = []
                    for (const leaf of msg) {
                        const brewery = this.breweries.find(brewery => brewery.id == leaf)
                        if (!brewery) continue
                        selections.push(brewery)
                    }
                    this.selections=selections
                }
            },
        },
        mounted() {
            this.initOption()
        },
        methods: {
            updateGroup(msg){
                const prodDataGroup=[];
                for (const leaf in msg) {
                    let defaultProd='N'
                    if(msg[leaf].id===this.defaultProd){
                        defaultProd='Y'
                    }
                    const item={prodType: this._props.prodTypeCode, prodSubType: msg[leaf].id, SEQ_NO: parseInt(leaf)+1,defaultProd: defaultProd}
                    prodDataGroup.push(item)
                }
                this._props.prodData.mbProdGroup=prodDataGroup
            },
            initOption() {
                const that=this
                getParamTable("MB_PROD_TYPE").then(function (response) {
                    let locData=[]
                    let prodGroup = response.data.data.columnInfo;
                    for(let i=0; i<prodGroup.length; i++){
                        const data={id: prodGroup[i].PROD_TYPE,name: prodGroup[i].PROD_TYPE+'-' + prodGroup[i].PROD_DESC}
                        locData.push(data)
                    }
                    that.breweries=locData
                    that.breweriesSearch=locData
                    that.initData()
                });
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
                if(this.tree2.indexOf(name.id) != -1){
                    this.tree2.splice(this.tree2.indexOf(name.id),1)
                    let id=0;
                    for(const index in items){
                        const item= items[index]
                        for(const cIndex in item.children){
                            if(item.children[cIndex].id ==name.id){
                                id=item.id;
                            }
                        }
                    }
                    if(id>0&&this.tree2.indexOf(id)>=0){
                        this.tree2.splice(this.tree2.indexOf(id),1)
                    }
                }
            },
            initData() {
               const prodDataGroup=this._props.prodData.mbProdGroup;
               let locData=this.selections;
               let tree=this.tree
               let breweries=this.breweries
               for(const item in prodDataGroup){
                   const data={id: prodDataGroup[item].prodSubType,name: prodDataGroup[item].prodSubType}
                   breweries.push(data)
                   locData.push(data)
                   tree.push(prodDataGroup[item].prodSubType)
               }
            }
        }
    }
>>>>>>> master
</script>