import Vue from 'vue'

// 地图配置
import mapConfig from '@/views/Map/config/map.config'
// 图层配置
import layerConfig from '@/views/Map/config/layer.config'
// 工具类
// import MapUtils from '@/views/Map/utils/map'

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

            // 初始化地图参数
            Vue.prototype.mapConfig = mapConfig

            // 初始化地图工具
            // Vue.prototype.MapUtils = new MapUtils(this.map, this.view)

            // 单击
            map.on('singleclick', (e) => {
                console.log(e);
            })

            // 右键菜单
            map.on('contextmenu', (e) => {
                console.log(e);
            })

        }
    }
}