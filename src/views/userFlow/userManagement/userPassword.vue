<template>
    <v-layout row wrap>
        <v-card style="height: 500px;width: 95%" class="_userinfo">
            <v-toolbar color="primary" dark>
                <!--<v-btn icon>-->
                    <!--<v-icon>lock</v-icon>-->
                <!--</v-btn>-->
                <v-toolbar-title>密码管理</v-toolbar-title>
            </v-toolbar>
        <form class="class2">
            <v-text-field v-model="userId" label="用户ID" disabled= true required append-icon="person"></v-text-field>
            <v-text-field v-model="password" label="原密码" :rules="[v => v==this.userpassword||'输入的原密码错误']" required append-icon="lock"></v-text-field>
            <v-text-field v-model="newPassword" label="新密码" :rules="passwordErrors" required append-icon="lock"></v-text-field>
            <v-text-field v-model="newPasswordEnd" label="再次输入新密码" :rules="[v => v==newPassword||'与上次输入新密码不一致']" required append-icon="info"></v-text-field>
                <h6 style="color: orangered">
                    <v-icon style="color: orangered">info</v-icon>
                    修改成功后将重新登录
                </h6>
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
            userpassword: '',
            password: '',
            newPassword: '',
            newPasswordEnd: '',
            passwordErrors: [
                v => v.length>=6||'密码长度必须大于6位',
                v => v.length<=16||'密码最大长度不能超过16',
            ],
            desserts: [],
            sourceData: [],
            backValue: {},
            keySet: [
                {
                    key: "true",
                    dataIndex: "userId"
                }
            ],
        }),
        computed: {
           userId (){
             return sessionStorage.getItem("userId")
           }
        },
        created () {
            this.initialize()
        },
        methods: {
            initialize () {
                let that = this
                getSysInfoByUser(that.userId).then(function (response) {
                    that.desserts = response.data.data.userInfo
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                    for(let i=0; i<that.desserts.length; i++){
                        if(that.userId==that.desserts[i].userId){
                            that.userpassword=that.desserts[i].password
                        }
                    }
                });
            },
            submit () {
                if(this.password==''||this.newPassword==''||this.newPasswordEnd==''||this.newPasswordEnd!=this.newPassword){
                    toast.error("密码修改失败！");
                }else{
                    for(let i=0; i<this.desserts.length; i++){
                        if(this.userId==this.desserts[i].userId){
                            this.desserts[i].password=this.newPassword
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
                            toast.success("密码修改成功！");
                            window.location.href='http://localhost:8080/#/'
                        }
                    })
                }
            },
            passwordEndErrors () {
                const errors = []

                return errors
            },
            clear () {
                this.password= ''
                this.newPassword= ''
                this.newPasswordEnd= ''
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