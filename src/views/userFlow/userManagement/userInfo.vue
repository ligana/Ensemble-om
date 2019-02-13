<template>
        <v-layout row wrap>
            <v-card style="height: 500px;width: 95%" class="_userinfo">
                <v-toolbar color="primary " dark>
                        <!--<v-btn icon >-->
                            <!--<v-icon >person</v-icon>-->
                        <!--</v-btn>-->
                    <v-toolbar-title>个人信息管理</v-toolbar-title>

                </v-toolbar>
                <form class="class2" ref="Form">
                    <v-text-field v-model="userId" label="用户ID" required disabled append-icon="person" color="red"></v-text-field>
                    <v-text-field v-model="name" :rules="nameRules" label="用户名称" required append-icon="edit"></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="电子邮箱" required append-icon="email"></v-text-field>
                    <v-text-field v-model="phone" :rules="phoneErrors" label="联系电话" required append-icon="phone"></v-text-field>
                    <v-btn @click="submit" style="width: 122px;color: white;background-color: #00b0ff" round>确   认</v-btn>
                    <v-btn @click="clear" style="width: 122px;color: white;background-color: #00b0ff" round>重   置</v-btn>
                </form>
            </v-card>
        </v-layout>
</template>
<script>
    import {getSysInfoByUser} from "@/api/url/prodInfo";
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';

    export default {
        data: () => ({
            valid: true,
            userId: '',
            name: '',
            nameRules: [
                v => !!v || '用户名称必须填写',
                v => (v && v.length <= 10) || '用户名称不能超过十位'
            ],
            email: '',
            emailRules: [
                v => !!v || '邮箱必须填写',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '邮箱必须符合格式'
            ],
            phone: '',
            phoneErrors: [
                v => v.length<12 ||'电话号码必须是11位',
                v => v.length>10 ||'电话号码必须是11位',
            ],
            desserts: [],
            sourceData: [],
            backValue: {},
            select: null,
            keySet: [
                {
                    key: "true",
                    dataIndex: "userId"
                }
            ],
        }),

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.userInfo
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                    for(let i=0; i<that.desserts.length; i++){
                        if(userId==that.desserts[i].userId){
                            that.userId=that.desserts[i].userId
                            that.name=that.desserts[i].userName
                            that.email=that.desserts[i].email
                            that.phone=that.desserts[i].phone
                        }
                    }
                });
            },
            submit () {
                if(this.name==''){
                    toast.error("个人信息修改失败")
                }else{
                    let userId = sessionStorage.getItem("userId")
                    for(let i=0; i<this.desserts.length; i++){
                        if(userId==this.desserts[i].userId){
                            this.desserts[i].userName=this.name
                            this.desserts[i].email=this.email
                            this.desserts[i].phone=this.phone
                        }
                    }
                    //保存数据落库
                    this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                    this.sourceData = this.copy(this.desserts,this.sourceData)
                    this.backValue.userName = sessionStorage.getItem("userId")
                    this.backValue.tableName = "OM_USER"
                    this.backValue.keySet = "USER_ID"
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            toast.success("个人信息修改成功！");
                            this.initialize()
                        }
                    })
                }
            },
            clear () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                for(let i=0; i<that.desserts.length; i++){
                    if(userId==that.desserts[i].userId){
                        that.userId=that.desserts[i].userId
                        that.name=that.desserts[i].userName
                        that.email=that.desserts[i].email
                        that.phone=that.desserts[i].phone
                    }
                }
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
        }
    }
</script>

<style>
    .btn {
        width: 122px;
    }
    .class2 {
        width: 80%;margin-left: 10%;height: 400px;margin-top: 4%
    }
    .class3 {
        font-size: large; color: white; margin-left: 5px
    }
    ._userinfo {
        box-shadow: none;
        border: 1px solid #E0E4EA!important;
    }
    ._userinfo .v-toolbar{
        background-color: #F4F5F8!important;
        border-radius: 0;
        box-shadow: none;
        color: #383B4D!important;
        border-bottom: 1px solid #E0E4EA!important;
    }
</style>