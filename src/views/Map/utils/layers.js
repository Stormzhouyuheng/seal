import mapConfig from '@/views/Map/config/map.config'

import { Image as ImageLayer } from 'ol/layer';
import { ImageStatic, TileArcGISRest } from 'ol/source';
import TileLayer from 'ol/layer/Tile.js';

// import mapConfig from '@/views/Map/config/map.config'

// Openlayers 中加载渲染 img WMTS TMS XYZ WMS WFS 图层

class Layers {

    // 加载图片图层
    createImgLayer(url, sourceOption, option) {
        return new ImageLayer({
            source: new ImageStatic({
                url,
                imageExtent: mapConfig.extent,
                ...sourceOption
            }),
            ...option
        })
    }

    // 加载arcgis地图服务
    createArcGISLayer(url, option, layers) {
        return new TileLayer({
            source: new TileArcGISRest({
                url
                // params: {
                //     layers
                // }
            }),
            ...option
        })
    }
}

export default new Layers()


