<template>
        <v-layout row wrap>
<!--<<<<<<< HEAD-->
            <!--<v-card style="height: 500px;width: 95%" class="_userinfo">-->
                <!--<v-toolbar color="primary " dark>-->
                        <!--&lt;!&ndash;<v-btn icon >&ndash;&gt;-->
                            <!--&lt;!&ndash;<v-icon >person</v-icon>&ndash;&gt;-->
                        <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->
<!--=======-->
            <v-card style="width: 95%;" class="elevation-4">
                <v-toolbar color="primary lighten-2" dark>
                    <v-btn icon>
                        <v-icon>person</v-icon>
                    </v-btn>
<!--&gt;>>>>>> master-->
                    <v-toolbar-title>个人信息管理</v-toolbar-title>
                </v-toolbar>
                <v-layout row wrap>
                    <v-flex md8 lg8>
                        <v-form>
                            <v-container>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="userId" label="用户ID" append-icon="person" disabled color="red"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="userRole[0].roleDesc" label="用户角色" append-icon="account_box" disabled color="red"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="user[0].branch" label="所属部门" append-icon="chrome_reader_mode" disabled color="red"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="userRole[0].roleLevel" label="用户角色等级" append-icon="star" disabled color="red"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="user[0].userLevel" label="用户等级" append-icon="star" disabled color="red"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="name" :rules="nameRules" label="用户名称" append-icon="edit"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="email" :rules="emailRules" label="电子邮箱" append-icon="email"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="phone" :rules="phoneErrors" label="联系电话" append-icon="phone"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-btn @click="submit" style="width: 122px;color: white;background-color: #00b0ff" round>确   认</v-btn>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-btn @click="clear" style="width: 122px;color: white;background-color: #00b0ff" round>重   置</v-btn>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-flex>

                    <v-flex md4 lg4>
                        <div style="width: 1px;height: 100%;background: #000;float:left;width:0.5%">
                        </div>
                        <div style="float:left;width:99.5%;height:100%;">
                            <v-card-text style="height: 400px; max-height: 100%;overflow-y: scroll">
                                <h3>菜单权限</h3>
                                <v-treeview
                                        :items="tree"
                                ></v-treeview>
                            </v-card-text>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>
</template>
<script>
    import {getSysUserInfoByUser} from "@/api/url/prodInfo";
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';

    export default {
        data: () => ({
            open: 'Apps',
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
            item: [],
            menuTree: [],
            tree: [],
            userRole: [],
            user: [],
        }),

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                //获取角色信息
                getSysUserInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.userInfo
                    that.item = response.data.data.columnInfo;
                    that.user = response.data.data.userInfo
                    that.userRole = response.data.data.roleInfo
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                    for(let i=0; i<that.desserts.length; i++){
                        if(userId==that.desserts[i].userId){
                            that.userId=that.desserts[i].userId
                            that.name=that.desserts[i].userName
                            that.email=that.desserts[i].email
                            that.phone=that.desserts[i].phone
                        }
                    }
                    that.getTree(that.item)
                    that.tree = that.menuTree
                });
            },
            submit () {
                if(this.name==''){
                    this.sweetAlert('error',"个人信息修改失败,提交失败!")
                }else if(this.email==''){
                    this.sweetAlert('info',"邮箱不能为空!")
                }else if(this.phone.length!=11){
                    this.sweetAlert('info',"电话号码必须是11位!")
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
                    this.$emit('changeName',this.name)
                    saveSysTable(this.backValue).then(response => {
                        if(response.status === 200){
                            this.sweetAlert('success',"个人信息修改成功!")
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
            getTree(menu) {
                this.menuTree = []
                let num = 0
                for(let i=0; i<menu.length; i++){
                    if(menu[i].menuParentId == null || menu[i].menuParentId == ""){
                        let treeParent = {}
                        treeParent.id=parseInt(menu[i].menuId)
                        treeParent.code=menu[i].menuId
                        treeParent.name=menu[i].menuTitle
                        treeParent.children = []
                        this.creatTree(treeParent,menu)
                        this.menuTree[num] = treeParent
                        num++
                    }
                }
            },
            creatTree(parent,menu) {
                for(let i=0; i<menu.length; i++){
                    if(menu[i].menuParentId == parent.code){
                        let tree = {}
                        tree.id=parseInt(menu[i].menuId)
                        tree.code=menu[i].menuId
                        tree.name=menu[i].menuTitle
                        tree.children = []
                        this.creatTree(tree,menu)
                        parent.children.push(tree)
                    }
                }
            },
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