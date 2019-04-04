<template>
    <div>
        <br>
        <v-card>
            <v-toolbar card color="white">
                <v-layout row warp>
                    <v-flex xs6>
                        <h3 style="position: fixed;top: 10px">历史操作</h3>
                    </v-flex>
                    <v-flex xs5>
                        <v-text-field flat solo prepend-icon="search" placeholder="请输入主单号或操作人或时间" v-model="search" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-btn color="info" @click="searchHistory(search)">搜索</v-btn>
                    </v-flex>
                </v-layout>
            </v-toolbar>
            <v-divider></v-divider>
            <v-layout row warp>
                <v-flex xs7>
                    <div style="overflow-y:auto; height:500px;">
                        <v-layout row wrap>
                            <v-flex xs1>

                            </v-flex>
                            <v-flex xs11>
                                <div>
                                    <v-card flat width="80%">
                                        <v-card-title primary class="title">数据变动</v-card-title>
                                        <v-card-text v-for="(desc, m) in diffData" :key="desc" style="word-break:break-all">
                                            <v-layout row wrap>
                                                <v-flex xs4>
                                                    <div>{{desc.tableName[0]}}</div>
                                                    <div>{{desc.tableName[1]}}</div>
                                                </v-flex>
                                                <v-flex xs8>
                                                    <div v-for="(comp, p) in desc.compareData" :key="comp" style="word-break:break-all">
                                                        {{comp.name}}:{{comp.change}}
                                                    </div>
                                                </v-flex>
                                            </v-layout>
                                            <div style="margin:0;padding:0; width:100%;height:1px;background-color:#8aabe5;overflow:hidden;"></div>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-flex>
                <v-flex xs5>
                    <div style=" overflow-y:auto; height:500px;">
                        <v-timeline dense>
                            <v-timeline-item
                                    :color="history.color"
                                    v-for="(history, i) in data"
                                    :key="i"
                                    v-show="show"
                            >
                                <v-card width="80%" @click="diff(history.mainSeqNo)" style="cursor:pointer;">
                                    <div class="title" :id="history.mainSeqNo">
                                        <v-card>
                                            <v-card-title style="background-color: #00BCD4; color: #e3f2fd" class="cyan lighten-1">
                                                操作人:{{history.userId}}
                                                <v-icon style="color: white; margin-right: 0%; margin-left: 60%">
                                                    person
                                                </v-icon>
                                            </v-card-title>
                                            <v-container>
                                                <v-layout style="margin-top: -4%">
                                                    <h5>主单号: {{history.mainSeqNo}}</h5>
                                                </v-layout>
                                                <v-layout style="margin-top: 3%; margin-bottom: -5%">
                                                    <h5> 操作时间:{{history.tranTime}}</h5>
                                                </v-layout>
                                            </v-container>
                                        </v-card>
                                    </div>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                    </div>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
    import prodDiffTable from '@/views/prodFactory/prodDiff/prodDiffTable'
    import {findProdHistory} from "@/api/url/prodInfo";
    import {findProdHistoryChange} from "@/api/url/prodInfo";
    import {getColumnDesc} from "../../../../utils/columnDesc";
    export default {
        components: {
            prodDiffTable
        },
        data() {
            return {
                tranId: '',
                show: true,
                diffData: [],
                historys: {},
                change: {},
                data: [],
                tranType: "0",
                code: '',
            }
        },
        mounted: function () {
            this.init()
        },
        methods: {
            init(){
                this.tranId = this.$route.hash
                findProdHistory(this.tranId).then(response => {
                    this.historys = response.data.data
                    let num = this.historys.mainSeqNo.length-1
                    for(let i=0; i<num+1; i++){
                        let No = this.historys.mainSeqNo[num-i]
                        No['color']="teal lighten-3"
                        this.data.push(No)
                    }
                    this.diff(this.data[0].mainSeqNo)
                })
            },
            diff(seqNo){
                this.show = false
                for(let i=0; i<this.data.length; i++){
                    if(seqNo == this.data[i].mainSeqNo){
                        this.data[i].color = "red"
                    }else{
                        this.data[i].color = "teal lighten-3"
                    }
                }
                this.code = seqNo
                this.show = true
                findProdHistoryChange(seqNo).then(response => {
                    this.change = response.data.data
                    this.diffData = this.changeDate(this.change)
                })
            },
            //将数据分割组装
            changeDate(val){
                let newData = []
                let oldData = []
                let finishData = []
                newData = this.packageData(val.dmlData)
                oldData = this.packageData(val.dmlOldData)
                let compareDatas = []
                for(let n=0; n<newData.length; n++){
                    compareDatas.push(this.compareData(newData[n],oldData[n]))
                }
                for(let i=0; i<compareDatas.length; i++){
                    if(compareDatas[i].length == 0){
                        continue
                    }
                    let copy = {}
                    copy['tableName'] = val.tableNameDesc[i]
                    copy['pkAndValue'] = val.pkAndValue[i]
                    copy['compareData'] = compareDatas[i]
                    finishData.push(copy)
                }
                return finishData
            },
            //将dmlData和dmlOldData整理
            packageData(val){
                let newData = []
                for(let i=0; i<val.length; i++){
                    let nData = []
                    for(let j=0; j<val[i].length; j++){
                        if(val[i][j].indexOf(":") == -1){
                            nData[nData.length-1] = nData[nData.length-1]+","+val[i][j]
                        }else{
                            nData.push(val[i][j])
                        }
                    }
                    newData.push(nData)
                }
                return newData
            },
            //比较差异
            compareData(newVal,oldVal){
                let merges = []
                let assembleId = ""
                for(let i=0; i<newVal.length; i++){
                    for(let j=0; j<oldVal.length; j++){
                        if(newVal[i].split(":")[0] == "assembleId"){
                            assembleId = newVal[i].split(":")[1]
                        }
                        if(newVal[i] == oldVal[j]){
                            delete newVal[i]
                            delete oldVal[j]
                            break;
                        }
                    }
                }
                for(let n=0; n<newVal.length; n++){
                    let num = 0
                    if(newVal[n] == undefined){
                        continue
                    }
                    let newName = newVal[n].split(":");
                    //updata
                    for(let m=0; m<oldVal.length; m++){
                        let merge = {}
                        if(oldVal[m] != undefined){
                            if(oldVal[m].indexOf(newName[0]) > -1){
                                let oldName = oldVal[m].split(":")
                                if(newName[0] == "attrValue"){
                                    merge['name'] = assembleId
                                }else{
                                    merge['name'] = newName[0]
                                }
                                merge['change'] = oldName[1]+"->"+newName[1]
                                merges.push(merge)
                                num = 1
                            }
                        }
                    }
                    //add
                    if(num == 0){
                        let merge = {}
                        merge['name'] = newName[0]
                        merge['change'] = "null-> " + newName[1]
                        merges.push(merge)
                    }
                }
                //delete
                for(let t=0; t<oldVal.length; t++){
                    let y = 0
                    if(oldVal[t] == undefined){
                        continue
                    }
                    let oldName = oldVal[t].split(":")
                    if(oldName[0] == "group"){
                        continue
                    }
                    for(let p=0; p<merges.length; p++){
                        if(oldName[0] == merges[p].name){
                            y = 1
                        }
                    }
                    if(y == 0 && oldName[0] != "attrValue"){
                        let merge = {}
                        merge['name'] = oldName[0]
                        merge['change'] = oldName[1]+"-> null"
                        merges.push(merge)
                    }
                }
                //中文描述
                for(let s=0; s<merges.length; s++){
                    merges[s].name = getColumnDesc(merges[s].name)
                }
                return merges
            },
            searchHistory(history){
                for(let i=0; i<this.data.length; i++){
                    if(history == this.data[i].mainSeqNo || history == this.data[i].userId || history == this.data[i].tranTime){
                        this.diff(this.data[i].mainSeqNo)
                        let hash = "#"+this.data[i].mainSeqNo
                        window.location.hash = hash
                        break
                    }
                }
            },
        }

    }
</script>

<style scoped>

</style>