<!--<<<<<<< HEAD-->
<!--<template>-->
    <!--<v-layout>-->
        <!--<v-flex md6 lg6>-->
            <!--<v-card max-height="600px">-->
                <!--<v-toolbar dense>-->
                    <!--<v-text-field solo clearable style="height: 100%" prepend-icon="search" label="请输入产品参数" v-model="searchValue"></v-text-field>-->
                <!--</v-toolbar>-->
                <!--<v-card-text style="max-height: 500px;overflow-y: scroll">-->
                    <!--<v-treeview :items="tree"></v-treeview>-->
                <!--</v-card-text>-->
            <!--</v-card>-->
        <!--</v-flex>-->
        <!--<v-flex md6 lg6>-->

        <!--</v-flex>-->
    <!--</v-layout>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--name: "indexFlowRoute",-->
        <!--props: ["tree"],-->
        <!--data: () => ({-->
            <!--search: '',-->
        <!--})-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--=======-->
<template>
    <v-layout>
        <v-flex md6 lg6>
            <v-card max-height="600px">
                <v-toolbar dense>
                    <v-text-field solo clearable style="height: 100%" prepend-icon="search" label="请输入产品参数" v-model="searchValue"></v-text-field>
                </v-toolbar>
                <v-card-text style="max-height: 500px;overflow-y: scroll">
                    <v-treeview :items="tree"></v-treeview>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex md6 lg6>

        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "indexFlowRoute",
        props: ["tree"],
        data: () => ({
            search: '',
        })
    }
</script>

<style scoped>

/*>>>>>>> master*/
</style>