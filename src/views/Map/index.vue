<template>
    <div id="my-map">
        <my-map
                id="map"
                ref="map"
                width="100%"
                height="100%"
                :zoom="mapConfig.zoom"
                :center="mapConfig.center"
                :minZoom="mapConfig.minZoom"
                :maxZoom="mapConfig.maxZoom"
                :mapOptions="mapOptions"
                @ready="ready"></my-map>
                
                <MapUtil></MapUtil>
    </div>
    
</template>

<script>
    import ready from '@/mixin/map/ready.js';

    // 地图工具
    import MapUtil from '@/components/MapUtil'

    export default {
        mixins: [ready],
        components: {
            MapUtil
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/style/map/index.scss';

    #my-map {
        /deep/.ol-viewport {
            background-size: cover;
        }
    }

</style>
