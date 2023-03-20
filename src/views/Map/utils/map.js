import mapConfig from '../config/map.config'

// import { transform } from 'ol/proj';

import { TileWMS, WMTS } from 'ol/source';

import axios from 'axios'

class Map {

    constructor(map, view) {

        this.map = map

        this.view = view

    }

    /**
     * 添加多个图层
     * @param {Array} layers 
     */
    addLayers(layers) {

        layers.forEach((layer) => {

            this.map.addLayer(layer)

        })

    }

    /**
     * 设置view中心层级
     * @param {view} view 
     * @param {animateOption} option 
     */
    setCenterZoom(option) {

        // 超过最大最小zoom范围不执行
        if (option.zoom < mapConfig.minZoom || option.zoom > mapConfig.maxZoom) {
            return
        }

        this.view.animate({

            zoom: mapConfig.zoom,

            duration: mapConfig.duration,

            ...option,

            // center: transform(option.center, 'EPSG:4326', 'EPSG:3857')
            center: option.center

        });

    }

    /**
     * 获取wms(wmts)服务feature
     * @param {*} view 
     * @param {*} evt 
     * @param {*} source 
     */
    arcgisServerWMSFeature(view, evt, source) {

        if (source instanceof TileWMS) {
            const viewResolution = view.getResolution();
            const url = source.getFeatureInfoUrl(
                evt.coordinate,
                viewResolution,
                'EPSG:3857', { INFO_FORMAT: 'application/json' }
            );
            if (url) {
                return axios({
                    method: 'get',
                    url
                })
            }

        } else if (source instanceof WMTS) {
            console.log('获取wmts的feature');
        }


    }

}

export default Map