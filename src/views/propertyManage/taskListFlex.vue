<template>
  <div>
      <v-widget title="任务列表" class="v-widget">
          <div slot="widget-content">
              <v-card-text class="pa-0">
                  <v-list two-line class="pa-0 taskListHeight" >
                      <template v-for="(item, index) in items" >
                          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                          <v-divider v-else-if="item.divider" :key="index"></v-divider>
                          <v-list-tile avatar v-else :key="item.tranName" :class="item.className" @click="handleClick(item)" v-show="classShow">
                              <v-list-tile-avatar color='light-green'>
                                  <v-icon dark>account_circle</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content >
                                  <v-list-tile-sub-title >{{ item.tranName }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                          </v-list-tile>
                      </template>
                  </v-list>
                  <v-divider>
                  </v-divider>
                  <v-btn class="btnClass reject mt-2 mb-2" @click="returnTask" dark large>驳 回</v-btn>
                  <v-btn class="btnClass  mt-2 mb-2" @click="submitTask" dark large>确 认</v-btn>
                  <div class="clear"></div>
              </v-card-text>
          </div>
      </v-widget>
  </div>
</template>

<script>
    import VWidget from "@/components/VWidget";
    import {getTaskListBySeqNo} from "@/api/url/prodInfo";
    import {getTableInfoDesc} from "@/api/url/prodInfo";
    import {submitCommon} from "@/api/url/prodInfo";
    export default {
        components: {
            VWidget
        },
        props: {
            seqNo: String
        },
        data: () => ({
            classShow: true,
            show: '',
            items: [
                {
                    tranName: '',
                    className: ''
                }
            ],
        }),
        watch: {
            seqNo: {
                handler(msg) {
                    if(msg!='' && msg!= undefined){
                    this.getTaskList()
                    }
                }
            }
        },
        created() {
            let that=this;
            window.addEventListener("taskList", function () {
                 that.getTaskList();
             })
        },
        mounted: function() {
            this.getTaskList()
        },
        methods: {
            handleClick(item) {
                this.$emit('sendType',item.tranType,item.tranId);
                this.show=true
                for(let i=0; i<this.items.length; i++){
                    this.items[i].className=this.items[i].tranName
                }
                this.classShow=false
                item.className="changeColor"
                this.classShow=true
            },
            submit(){
                let that=this
                submitCommon({"userId": sessionStorage.getItem("userId")}).then(response => {
                    that.items=[]
                })
            },
            submitTask(){
                this.$emit('submitTask','Y');
            },
            returnTask(){
                this.$emit('submitTask','N');
            },
            getTaskList() {
                const parentSeqNo=this._props.seqNo;

                getTaskListBySeqNo({"seqNo": parentSeqNo}).then(response => {
                    let itemCop = response.data.data;
                    let items = []
                    for(let n=0; n<itemCop.length; n++){
                        if(n == 0){
                            items.push(itemCop[n])
                        }
                        if(n!=0){
                            let num=0
                            for(let m=0; m<items.length; m++){
                                if(itemCop[n].tranId != items[m].tranId){
                                    num++
                                    if(num == items.length) {
                                        items.push(itemCop[n])
                                    }
                                }
                            }
                        }
                    }
                    this.items = items
                    for(let i=0; i<this.items.length; i++){
                        this.items[i].className=this.items[i].tranName
                    }
                    for(let j=0; j<this.items.length; j++){
                        if(this.items[j].tranName == null){
                            getTableInfoDesc(this.items[j].tranId).then(response => {
                                this.items[j].tranName = response.data.data.tableDesc
                            });
                        }
                    }
                    this.handleClick(this.items[0])
                });
            },
        }
    };
</script>
<style scoped>
  .taskListHeight {
    height: 272px;
    overflow-y:auto;
    overflow-x:hidden;
  }
  .changeColor{
    background-color: #ededed !important;
  }
  .changeColor >>> .v-list__tile {
      height: 60px!important;
  }
  .btnClass {
    float: right;
    box-shadow:none!important;
    background-color: #3C73E6!important;
    }
  .reject {
      background-color: #D9DEE5!important;
      color: #909193;
  }
  .clear{ clear:both}
  .v-widget >>> .v-card__text{
      padding: 0px 0;
  }
  .v-list--two-line .v-list__tile {
      height: 60px;
  }
</style>