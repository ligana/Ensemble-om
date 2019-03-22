<template>
    <v-container class="pa-0">
        <div class="flex text-sm-center py-3 white--text" :class="color">
            <div class="unit-box">
                {{ subTitle }}
                <span class="unit">单位</span>
            </div>
        </div>
    </v-container>
</template>

<script>
    export default {
        props: {
            icon: String,
            mark: String,
            title: String,
            subTitle: String,
            color: String
        },
        data() {
            return {
                classSpan: ""
            };
        },
        created() {
            this.classSpan = this._props.color + "--text display-2 font-weight-medium";
        }
    };
</script>
<style lang="stylus" scoped>
    .unit-box {
        position: absolute
        top: 75px;
        left 50%;
        transform :translateX(-100%)
        color: #fff;
        font-size:36px;
        font-family:FZLTZHK-GBK1-0;
    }
    .unit-box .unit {
        font-size: 14px;
    }
    .subject1,.subject2,.subject3,.subject4{
        background-repeat: no-repeat!important;
        background-size: cover;
        background-position: center center !important;
        height: 160px;
        position:relative;
    }
    .subject1 {
        background :url("/static/avatar/201.png");
    }
    .subject2 {
        background :url("/static/avatar/187.png");
    }
    .subject3 {
        background :url("/static/avatar/120.png");
    }
    .subject4 {
        background :url("/static/avatar/20.png");
    }
</style>