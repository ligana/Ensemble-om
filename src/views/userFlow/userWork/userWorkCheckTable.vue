<template>
    <v-data-table :headers="headers" :items="desserts" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="px-0 " item-key="flowManage" light v-model="selected">
        <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
                <td>
                    <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                </td>
                <td class="text-xs-left">{{ props.item.flowManage.mainSeqNo }}</td>
                 <td class="text-xs-left">{{ props.item.flowManage.tranDesc }}</td>
                 <td class="text-xs-left">{{ props.item.flowCommitInfo.tranTime }}</td>
                 <td class="text-xs-left">{{ props.item.flowManage.status }}</td>
                 <td class="text-xs-left">{{ props.item.flowCommitInfo.userId }}</td>
                 <td class="text-xs-left" @click="getDataInfo(props.item.flowManage.mainSeqNo)">详细信息</td>
            </tr>
      </template>
    </v-data-table>
</template>
<script>
import { getModuleByFlowCode } from "@/api/url/prodInfo";
export default {

    props: ["userWorkData"],
    data() {
    let value = "accountingStatus";
    return {
      selected: [],
      desserts: [
        {
          flowManage: {
          dtlSeqNo: "",
              recSeqNo: "",
          isTranGroup: "",
          mainSeqNo: "",
          status: "",
              tranDesc: "",
              tranId: ""
          },
            flowCommitInfo: {
                tranTime: "",
                userId: ""
            }
        }
      ],
        headers: [
        {
            text: "选择",
            align: "left",
            value: "check"
        },
        {
          text: "任务单号",
          align: "left",
          value: "code"
        },
        {
          text: "交易名称",
          align: "left",
          value: "name"
        },
        {
          text: "操作时间",
          value: "date"
        },
        {
          text: "交易状态",
          value: "status"
        },
        {
          text: "操作人 ",
          value: "roleLast"
        },
        {
          text: "详细信息",
          value: "DSubjectCode"
        }
      ],
      projects: [
        {
          prodType: "",
          accountingStatus: "",
          subjectCode: "",
          rateCode: "",
          DSubjectCode: ""
        }
      ]
    };
  },

    watch: {
        userWorkData(val) {
            this.queryDespositProdData(val)
        }
    },
  methods: {
      prodAction() {
          this.$router.push({
              name: "userWorkTags"
          });
      },
      queryDespositProdData(val) {
          this.desserts = []
          let length = val.length
          for (let j = 0; j < length; j++) {
              if (val[j].flowManage.status === "2") {
                  val[j].flowManage.status = "已提交"
                  this.desserts.push(val[j])
              }
          }
      },
      getDataInfo(code) {
          //获取当前处理数据
          console.log(code);
          let tagInfo = []
          for (let i = 0; i < this.desserts.length; i++) {
              if (code === this.desserts[i].flowManage.mainSeqNo) {
                  tagInfo.push(this.desserts[i])
                  break
              }
          }
          //通过主交易单号  在差异表 获取sourceModule
          getModuleByFlowCode(code).then(response => {
              let sourceModule
              for(let tId in response.data.data){
                  sourceModule = response.data.data[tId].SOURCE_MODULE
              }
//              if(sourceModule == "RB"){
//                  this.$router.push({name: "tranDataIndex", params: {code: code, optValue: "复核", flowInfo: tagInfo}});
//              }
//              if(sourceModule == "CL") {
                  this.$router.push({name: "tranDataIndex", params: {code: code, optValue: "复核", flowInfo: tagInfo}});
//              }else{
//
//          }
          });
      }
  }
};
</script>
