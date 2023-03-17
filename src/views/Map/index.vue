<template>
    <my-map
            id="map"
            ref="map"
            height="100%"
            :zoom="mapConfig.zoom"
            :minZoom="mapConfig.minZoom"
            :maxZoom="mapConfig.maxZoom"></my-map>
            <!-- @ready="ready" -->
</template>

<script>
    // import mapConfig from './config/map.config.js'
    import ready from '@/mixin/map/ready.js';
    export default {
        mixins: [ready]
    }
</script>

<style lang="scss" scoped>

</style>
