// 所有地图配置

import Layers from '@/views/Map/utils/layers.js'

// 默认底图
const defaultLayer = Layers.createImgLayer(require('@/assets/images/layer/sqhs-sqhsmaps.png'), {
    zIndex: 1
})
// 默认水系
const waterLayer = Layers.createArcGISLayer('http://10.7.220.91:6080/arcgis/rest/services/zw_shape/zw_river1/MapServer', {
    zIndex: 2
})

// 流向图 http://10.7.220.91:6080/arcgis/rest/services/zw_shape/pearl_river_flow/MapServer


export default {

    defaultLayer,
    waterLayer,

    layers: [

        defaultLayer,
        waterLayer

    ]

}