import Vue from 'vue'

// 地图配置
import mapConfig from '@/views/Map/config/map.config'
// 图层配置
import layerConfig from '@/views/Map/config/layer.config'

export default {
    data() {
        return {

            mapConfig: Object.freeze(mapConfig),
            layerConfig: Object.freeze(layerConfig),
            mapOptions: {
                view: mapConfig.view,
                layers: layerConfig.layers
            }

        }
    },
    methods: {
        // 加载地图
        ready(map, vm) {

            Vue.prototype.map = map

            Vue.prototype.view = map.getView()

            // 地图参数
            Vue.prototype.mapConfig = mapConfig

            // layerConfig.defaultLayer.setVisible = true

        }
    }
}