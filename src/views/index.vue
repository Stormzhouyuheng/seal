<template>
    <my-dv-page target="parent"
                scale
                lock
                fit>

                <!-- 整个项目的边框 -->
                <my-dv-border6 x-align="center"
                               y-align="middle"
                               width="100%"
                               height="100%">

                            <!-- 标题 -->
                            <my-dv-header4>数据可视化大屏页面</my-dv-header4>

                            <!-- 放置地图的边框 -->
                            <my-dv-border5 
                                            x-align="center"
                                            top="80px"
                                            padding="5px"
                                            width="calc(100% - 10px)"
                                            height="calc(100% - 90px)">
                                            <Map ref="map"></Map>

                            </my-dv-border5>
                        
                </my-dv-border6>
                
    </my-dv-page>
</template>

<script>
    import Map from './Map/index.vue'
    export default {
        data() {
            return {

            }
        },
        components: {
            Map
        },
        methods: {
            
        }
        
    }
</script>

<style lang="scss" scoped>
    .action-box {
        height: 400px;
        width: 100%;
        text-align: center;
        line-height: 150px;
        font-size: 3rem;
        background-color: #eee;
        color: #fff;
        font-weight: bold;
    }
</style>