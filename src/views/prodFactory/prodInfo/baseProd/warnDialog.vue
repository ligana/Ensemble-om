<template>
    <v-dialog v-model="dialogFlag" persistent max-width="45%">
        <v-card>
            <v-card-title class="headline">影响可售产品列表</v-card-title>
            <v-card-text>
                <diff-prod-table :diffProdList="diffProdList"></diff-prod-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click.native="reback">取消</v-btn>
                <v-btn color="green darken-1" flat @click.native="dialog = false">确认</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import diffProdTable from './diffProdTable'
    export default {
        components: {diffProdTable},
        model: {
            prop: "dialog",
            event: "getVue"
        },
        props: {
            dialog: {
                type: Boolean,
                define: false,
            },
            oldOptionPermissions: String,
            diffProdList: Array,
            pagination: [Array,Function,Object],
        },
        data() {
            return {
                dialogFlag: false,
                selected: [],
                // pagination: 'prodType',

                headers: [
                    { text: '产品名称', value: 'prodType' }, { text: '基础产品值', value: 'baseValue' }, { text: '可售产品值', value: 'soldValue' }]
            }
        },
        watch: {
            dialogFlag: {
                handler(msg) {
                    if(this._props.dialog!=this.dialogFlag) {
                        this.$emit("getVue", msg);
                    }
                }
            },
            dialog: {
                handler(msg) {
                    if(this._props.dialog !=undefined){
                        this.dialogFlag=this._props.dialog;
                    }
                }
            }
        },
        methods: {
            reback () {
                this.dialogFlag=false;
                this.$emit('rebackOptionPermissions',{'reback': this._props.oldOptionPermissions});
            }
        }
    }
</script>