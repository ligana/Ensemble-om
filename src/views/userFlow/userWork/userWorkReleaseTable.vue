<template>
<<<<<<< HEAD
    <v-data-table :headers="headers" :items="desserts" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="elevation-1 px-0 elevation-2" item-key="code" light>
=======
    <v-data-table :headers="headers" :items="desserts" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                  class=" px-0 " item-key="code" select-all light v-model="selected">
>>>>>>> styleUi2.0
        <template slot="items" slot-scope="props">
            <tr @click="getDataInfo(props.item.flowManage.mainSeqNo)">
                <td class="text-xs-left">{{ props.item.flowManage.mainSeqNo }}</td>
                <td class="text-xs-left">{{ props.item.flowManage.tranDesc }}</td>
                <td class="text-xs-left">{{ props.item.flowCheckInfo.tranTime }}</td>
                <td class="text-xs-left">{{ props.item.flowManage.status }}</td>
                <td class="text-xs-left">{{ props.item.flowCheckInfo.userId }}</td>
                <td class="text-xs-left">详细信息</td>
            </tr>
        </template>
    </v-data-table>
</template>
<script>
    import {getCheckFlowList} from "@/api/url/prodInfo";
    import {getModuleByFlowCode} from "@/api/url/prodInfo";

    export default {
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
                        flowCheckInfo: {
                            tranTime: "",
                            userId: ""
                        },
                        flowCommitInfo: {}
                    }
                ],
                headers: [
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
        created() {
            this.queryCheckedProdData()

        },
        methods: {
            prodAction() {
                this.$router.push({
                    name: "userWorkTags"
                });
            },
            queryCheckedProdData() {
                getCheckFlowList().then(response => {
                    this.desserts = []
                    let length = response.data.data.length
                    for (let j = 0; j < length; j++) {
                        if (response.data.data[j].flowManage.status === "3") {
                            response.data.data[j].flowManage.status = "已复核"
                            this.desserts.push(response.data.data[j])
                        }
                    }
                });
            },

            getDataInfo(code) {
                //获取当前处理数据
                let tagInfo = []
                for (let i = 0; i < this.desserts.length; i++) {
                    if (code === this.desserts[i].flowManage.mainSeqNo) {
                        tagInfo.push(this.desserts[i])
                        break
                    }
                }
                getModuleByFlowCode(code).then(response => {
                    console.log(response,"fabu");
                    let sourceModule = response.data.data.SOURCE_MODULE
                    if (sourceModule == "RB") {
                        this.$router.push({
                            name: "tranDataIndex",
                            params: {code: code, optValue: "发布", flowInfo: tagInfo}
                        });
                    }
                    if (sourceModule == "CL") {
                        this.$router.push({
                            name: "tranDataIndex",
                            params: {code: code, optValue: "发布", flowInfo: tagInfo}
                        });
                    }
                });
            }
        }
<<<<<<< HEAD
        getModuleByFlowCode(code).then(response => {
            let sourceModule
            for(let tId in response.data.data){
            sourceModule = response.data.data[tId].SOURCE_MODULE
        }
//        if(sourceModule == "RB"){
            this.$router.push({name: "tranDataIndex", params: {code: code, optValue: "发布", flowInfo: tagInfo}});
//        }
//        if(sourceModule == "CL") {
//            this.$router.push({name: "tranDataIndex", params: {code: code, optValue: "发布", flowInfo: tagInfo}});
//        }
    });
    }
  }
};
=======
    };
>>>>>>> styleUi2.0
</script>
