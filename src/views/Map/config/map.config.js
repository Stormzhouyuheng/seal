// 所有地图配置

import View from 'ol/View'

// 默认缩放层级
const zoom = 6.8

// 默认最小缩放层级
const minZoom = 6.8

// 默认最大缩放层级
const maxZoom = 15

// 初始化中心经纬度
const center = [109.3, 23]

// 默认投影标准
const projection = 'EPSG:4326'

// 静态图片范围
const extent = [99.1901181, 14.630101719999999, 118.0827480425, 30.3655968625]

const view = new View({
    center,
    projection,
    zoom,
    maxZoom,
    minZoom
})

export default {

    view,

    zoom,
    minZoom,
    maxZoom,
    center,
    projection,
    extent

}
