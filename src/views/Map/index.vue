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
    </div>
    
</template>

<script>
    import ready from '@/mixin/map/ready.js';
    export default {
        mixins: [ready]
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
