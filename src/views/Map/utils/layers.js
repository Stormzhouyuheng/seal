import mapConfig from '@/views/Map/config/map.config'

import { Image as ImageLayer } from 'ol/layer';
import { ImageStatic } from 'ol/source';

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

}

export default new Layers()


