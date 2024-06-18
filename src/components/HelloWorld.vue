<template>
    <div class="hello" style="margin: 0 auto">
        <el-button @click="sign('sign')">签名</el-button>
        <el-button @click="sign('seal')">盖章</el-button>
        <el-button @click="sign('create')">制作印章</el-button>
        <Signature-vue ref="SignatureForm" />
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    methods: {
        sign(type) {
            if (type == "create") {
                window.open(
                    "http://10.7.22.102:8000/",
                    "_blank",
                    "toolbar=yes,width=1200,height=800"
                );
            } else {
                this.show = true;
                this.$nextTick(() => {
                    this.$refs.SignatureForm.init(type);
                });
            }
        },
    },
};
</script>
<style>
.hello {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
