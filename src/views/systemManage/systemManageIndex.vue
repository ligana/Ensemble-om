<template>
    <div class="pt-5 pl-4">
        <v-layout>
            <v-flex md3 lg3 class="pl-4">
                <v-flex xs12>
                    <v-card class="pt-4 elevation-4 radiusDc">
                        <v-card-media src="/static/avatar/sys1.jpg">
                        </v-card-media>
                    </v-card>
                </v-flex>
                <v-flex xs12 class="mt-2 pb-4">
                    <v-card style="height: 200%" class="elevation-4 radiusDc">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)" :class="item.class">
                                <v-list-tile-action>
                                    <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title style="font-size: medium">{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md10 lg10 class="pl-4 pb-4 pr-1">
                <menu-tables v-if="action=='menu'"></menu-tables>
                <role-tables v-if="action=='role'"></role-tables>
                <user-tables v-if="action=='user'"></user-tables>
                <role-menu v-if="action=='roleMenu'"></role-menu>
                <user-role v-if="action=='userRole'"></user-role>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import MenuTables from './tables/menuTables'
    import RoleTables from './tables/roleTables'
    import UserTables from './tables/userTables'
    import RoleMenu from './tables/roleMenuRelationTables'
    import UserRole from './tables/userRoleRelationTables'

    export default {
        components: {
            MenuTables,
            RoleTables,
            UserTables,
            RoleMenu,
            UserRole
        },
        data() {
            return {
                action: 'menu',
                items: [
                    {title: '菜单管理',name: 'menu', class: '',icon: 'menu',color: "blue"},
                    {title: '角色管理',name: 'role', class: '', icon: 'event',color: "blue"},
                    {title: '角色菜单授权',name: 'roleMenu', class: '', icon: 'widgets',color: "blue"},
                    {title: '用户管理',name: 'user', class: '', icon: 'person',color: "blue"},
                    {title: '用户角色管理',name: 'userRole', class: '',icon: 'widgets',color: "blue"}
                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
            }
        },
        methods: {
            actionTag(item) {
                this.action = item.name;
                item.class="selected";
                for(const index in this.items){
                    if(this.items[index].name != item.name) {
                        this.items[index].class="";
                    }
                }
            },
            clickItem(index) {
                let userManagement=this.userManagement;
                for(const key in userManagement){
                    if(key==0){
                        continue
                    }
                    if(userManagement[key].index==index){

                        userManagement[key].classSpan='spanItemSelected'
                    }else{

                        userManagement[key].classSpan='spanItem'
                    }
                }

            }
        }
    }
</script>
<style scoped>
    .windowTitle {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }

    .windowItem {
        border: 1px solid #a09ba269;
        background-color: white
    }
    .shrink :hover {
        background-color: #9E9E9E;
    }
    .selectedItem {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }
    .spanItem {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #757575;
    }
    .spanItemSelected {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #000000;
    }
    .titleItem {

    }
</style>
