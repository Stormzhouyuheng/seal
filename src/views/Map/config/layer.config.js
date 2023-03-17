// 所有地图配置

import Layers from '@/views/Map/utils/layers.js'
// 图层样式
// eslint-disable-next-line no-unused-vars

const defaultLayer = Layers.createImgLayer(require('@/assets/images/layer/sqhs-sqhsmaps.png'), {
    zIndex: 1
})

export default {

    defaultLayer,

    layers: [

        defaultLayer

    ]

}