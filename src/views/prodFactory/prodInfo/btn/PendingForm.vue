<template>
  <div>
    <v-layout row wrap style="margin-top: -5%">
        <v-btn color="success" block @click='showPending=!showPending' style="height: 30px">存在待处理的数据</v-btn>
    </v-layout>
    <div v-show="showPending">
      <v-layout row wrap style="margin-top: 0px">
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">交易单号:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" disabled="false" label="" name="title" v-model="pandingInfo.mainSeqNo" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="margin-top: -10px">
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">当前状态:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="pandingInfo.status" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="margin-top: -10px">
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">上一操作人:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="pandingInfo.lastOptUser" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="margin-top: -10px">
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">上一操作时间:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="pandingInfo.lastOptTime" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="margin-top: -10px">
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">处理意见:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="pandingInfo.remark" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="margin-top: -10px">
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">申请人:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="pandingInfo.applicationUser" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
    <v-layout row wrap style="margin-top: -10px">
      <v-flex md4 lg4>
        <v-subheader class="primary--text subheading">申请时间:</v-subheader>
      </v-flex>
      <v-flex md8 lg8>
        <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="pandingInfo.applicationTime" single-line hide-details>
        </v-text-field>
      </v-flex>
    </v-layout>

    <div class="text-xs-center">
    <v-btn color="success" @click="dealPending" dark style="height: 35px">
      <v-icon>done</v-icon>
      去处理
    </v-btn>
    </div>
    </div>
  </div>
</template>
<style>
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
</style>

<script>
    import { getFlowInfoByMainSeqNo } from "@/api/url/prodInfo";
    export default {
    props: ["prodType","mainSeqNo"],
    data() {
    return {
        showPending: false,
        pandingInfo: {
            mainSeqNo: '',
            status: '',
            applicationUser: '',
            applicationTime: '',
            lastOptUser: '',
            lastOptTime: '',
            remark: ''
        }
    };
  },
  mounted() {
      this.initPendingInfo();
  },
  methods: {
      dealPending() {
          this.$router.push({ name: 'userIndexFlow'});
      },
      initPendingInfo() {
          let param = {};
          let that = this;
          param["prodType"] = that._props.prodType;
          param["mainSeqNo"] = that._props.mainSeqNo;
          //监听主单号变化  实时获取流程信息
          getFlowInfoByMainSeqNo(param).then(function (response) {
              console.log(response.data.data)
              let temp = response.data.data;
              for(let key in temp){
                  if(key == "status"){
                      if(temp[key] == "1"){
                          temp[key] = "待提交";
                      }
                      if(temp[key] == "2"){
                          temp[key] = "待复核";
                      }
                      if(temp[key] == "3"){
                          temp[key] = "待发布";
                      }
                      if(temp[key] == "6"){
                          temp[key] = "驳回待处理";
                      }
                  }
              }
              that.pandingInfo = temp;
          });
      }
  }
};
</script>