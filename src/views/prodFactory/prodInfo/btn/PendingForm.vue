<template>
  <div>
    <v-layout row wrap>
        <v-btn color="warning" block @click='showPending=!showPending'>存在待处理的数据</v-btn>
    </v-layout>
    <div v-show="showPending">
      <v-layout row wrap>
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">交易单号:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" :disabled="false" label="" name="title" v-model="pandingInfo.mainSeqNo" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">交易名称:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" label="" :disabled="false" name="title" v-model="pandingInfo.tranDesc" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md4 lg4>
          <v-subheader class="primary--text subheading">当前状态:</v-subheader>
        </v-flex>
        <v-flex md8 lg8>
          <v-text-field class="primary--text mx-1" label="" :disabled="false" name="title" v-model="pandingInfo.status" single-line hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
    <v-layout row wrap>
      <v-flex md4 lg4>
        <v-subheader class="primary--text subheading">提交人:</v-subheader>
      </v-flex>
      <v-flex md8 lg8>
        <v-text-field class="primary--text mx-1" label="" :disabled="false" name="title" v-model="pandingInfo.userId" single-line hide-details>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md4 lg4>
        <v-subheader class="primary--text subheading">提交时间:</v-subheader>
      </v-flex>
      <v-flex md8 lg8>
        <v-text-field class="primary--text mx-1" label="" :disabled="false" name="title" v-model="pandingInfo.tranTime" single-line hide-details>
        </v-text-field>
      </v-flex>
    </v-layout>

    <div class="text-xs-center">
    <v-btn color="cyan" @click="dealPending" dark>
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
    import { getCheckFlowList } from "@/api/url/prodInfo";
    export default {
    props: ["pendInfos"],
    data() {
    return {
        showPending: false,
        pandingInfo: {
            mainSeqNo: '',
            tranDesc: '',
            status: '',
            userId: '',
            tranTime: ''

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
          getCheckFlowList().then(response => {
              let length = response.data.data.length
              for (let j = 0; j < length; j++) {
                  if (response.data.data[j].flowManage.status === "2") {
                      this.pandingInfo.tranTime = response.data.data[j].flowCommitInfo.tranTime
                      this.pandingInfo.userId = response.data.data[j].flowCommitInfo.userId
                      this.pandingInfo.status = "待复核"
                      this.pandingInfo.tranDesc = response.data.data[j].flowManage.tranDesc
                      this.pandingInfo.mainSeqNo = response.data.data[j].flowManage.mainSeqNo
                      break
                  }
                  if (response.data.data[j].flowManage.status === "3") {
                      this.pandingInfo.userId = response.data.data[j].flowCommitInfo.userId
                      this.pandingInfo.tranTime = response.data.data[j].flowCommitInfo.tranTime
                      this.pandingInfo.status = "待发布"
                      this.pandingInfo.tranDesc = response.data.data[j].flowManage.tranDesc
                      this.pandingInfo.mainSeqNo = response.data.data[j].flowManage.mainSeqNo
                      break
                  }
              }
          });
      }
  }
};
</script>
