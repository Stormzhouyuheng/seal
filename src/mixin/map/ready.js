import Vue from 'vue'

// 地图配置
import mapConfig from '@/views/Map/config/map.config'

export default {
    data() {
        return {
            mapConfig: Object.freeze(mapConfig)
        }
    },
    methods: {
        // 加载地图
        ready(map) {

            Vue.prototype.map = map

            // 地图参数
            Vue.prototype.mapConfig = mapConfig
            
        }
    }
}