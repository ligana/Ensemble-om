<template>
  <div>
    <v-layout row wrap v-if="edit == 'false'">
      <v-flex md5 lg5>
          <v-btn color="success" depressed="" @click='showCopy=!showCopy' class="downClass"><v-icon >history</v-icon>复制</v-btn>
      </v-flex>
      <v-spacer></v-spacer>

      <v-flex md5 lg5>
          <v-btn color="success" depressed="" @click="save" class="downClass"><v-icon >save</v-icon>保存</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="edit == 'true'">
      <v-flex md12 lg12>
        <v-btn color="success" depressed="" @click="save" class="downClass"><v-icon >save</v-icon>保存</v-btn>
      </v-flex>
    </v-layout>
    <div v-show="showCopy">
    <v-layout row wrap v-if="edit == 'false'">
      <v-flex md4 lg4>
        <v-subheader class="primary--text pt-3 subheading">产品类型</v-subheader>
      </v-flex>
      <v-flex md8 lg8>
        <v-text-field class="primary--text" label="产品类型" name="title" v-model="prodType" single-line hide-details>
        </v-text-field>
      </v-flex>
      <v-flex md4 lg4>
        <v-subheader class="primary--text pt-3 subheading">产品描述</v-subheader>
      </v-flex>
      <v-flex md8 lg8>
        <v-text-field class="primary--text" label="产品描述" name="title" v-model="prodDesc" single-line hide-details/>
      </v-flex>
    </v-layout>

      <div class="text-xs-center" v-if="edit == 'false'">
          <v-btn color="cyan" @click="copyOn" dark>
              <v-icon>done</v-icon>
            确认
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
export default {
    props: ["editShow"],
    data() {
    return {
      showCopy: false,
        prodType: '',
        prodDesc: '',
        edit: "false"
    };
  },
    watch: {
        editShow (val) {
            this.editShowDeal(val)
        }
    },
  methods: {
      editShowDeal(val) {
         if(val){
             this.edit = "true"
         }else{
             this.edit = "false"
         }
      },
    handleClick() {
      alert("button click");
    },
      copyOn() {
          if(this.prodType == "" || this.prodDesc == ""){
              this.sweetAlert('info',"请输入产品代码或产品描述！");
          }
          else if(this.prodType == null || this.prodType.indexOf(" ") != -1){
              this.sweetAlert('info',"产品代码不能包含空格！");
          }else if(this.prodType != null && this.prodType.indexOf(" ") == -1 && this.prodType != "" && this.prodDesc.indexOf(" ") != -1) {
              this.sweetAlert('info',"产品描述不能包含空格！");
          }else {
              this.showCopy = false
              this.$emit('listenToCopy', {
                  'prodType': this.prodType,
                  'prodDesc': this.prodDesc,
                  'showCopy': this.showCopy
              })
          }
      },
      save(){
          this.$emit('saveProd')
      }
  }
};
</script>
<style scoped>
  .downClass {
    width: 100%;
    margin-left: 0%;
    text-align: center;
    margin-right: auto;
  }
</style>
