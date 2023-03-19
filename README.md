## 安装
```
npm install
```

## 启动文档站点
```
npm run start
```

## 运行开发环境
```
npm run dev
```

## 编译主应用
```
npm run build
```

## README.md
```
@xdh\my\ui\lib\map\packages\my-map\Map.js （修改的地方）

this.map = new Map({
    ...(this.mapOptions || {}),
    layers: [].concat(layer),
    view: view,
    target: this.$el,
    // 删除默认的控件
    controls: [],
    interactions: [
    new DragPan(),
    new MouseWheelZoom(),
    new PointerInteraction({
        handleEvent: this.handleEvent
    })
    ]
})
```