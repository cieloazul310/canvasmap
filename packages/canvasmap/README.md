# Canvas Map for Data Visualization

Canvas マップ -データビジュアライゼーションのための

[![npm version](https://badge.fury.io/js/%40cieloazul310%2Fcanvasmap.svg)](https://badge.fury.io/js/%40cieloazul310%2Fcanvasmap)

![Example](../../images/basic.png)

## Installing

```sh
npm install @cieloazul310/canvasmap
```

## How to Use

### Node (Vector map)

```js
const { CanvasMap } = require("@cieloazul310/canvasmap");

const width = 1000;
const height = 1000;
const map = new CanvasMap(width, height, {
  center: [140.4602, 36.3703],
  zoom: 13,
});
map
  .renderVectorMap()
  .then((canvas) => {
    canvas.exportPng("./dist/basic.png");
  })
  .catch((err) => console.error(err));
```

### Node (Raster map)

```js
const { CanvasMap } = require("@cieloazul310/canvasmap");

const width = 1000;
const height = 1000;
const map = new CanvasMap(width, height, {
  center: [140.4602, 36.3703],
  zoom: 13,
});
map
  .renderRasterMap({
    tileUrl: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
  })
  .then((canvas) => {
    canvas.exportPng("./dist/basic.png");
  })
  .catch((err) => console.error(err));
```

### Browser

```ts
import { CanvasMap } from "@cieloazul310/canvasmap/browser";

const width = 1000;
const height = 1000;
const map = new CanvasMap(width, height, {
  center: [140.4602, 36.3703],
  zoom: 13,
});

async function onClick() {
  await map.renderVectorMap();
  const canvas = map.getCanvas();
  const contaienr = document.querySelector("#map");
  container?.appendChild(container);
}

const button = document.querySelector("#rbutton");
button?.addEventListener("click", onClick);
```

## API Reference

### `CanvasMap` (class)

```ts
const map = new CanvasMap(width, height, options);
```

#### Constructor

- width (*required*) `number`: 生成する地図の横幅
- height (*required*) `number`: 生成する地図の縦幅
- options (*optional*): `Partial<object>`

| name | type |   |
|------|------|---|
| title | `string` | Map title |
| center | `[number, number]` | The center of map view |
| zoom   | `number` | Zoom level of map view |
| theme | `Partial<Theme>` | Map theme including padding, palette and fontSizes |
| zoomDelta | `number` |  (if the `zoom` is *12* and the `zoomDelta` is *1*, the tile zoom level will be **13** ; default to 1). |

zoomDelta: <https://observablehq.com/@d3/tile-zoomdelta?collection=@d3/d3-tile>

#### Common Methods

##### setCenter

- *arguments*: `[number, number]`
- *returns*: `this`

##### setZoom

- *arguments*: `number`
- *returns*: `this`

##### setZoomDelta

- *arguments*: `number`
- *returns*: `this`

##### setProjectionFitExtent

- *arguments*: `Feature | FeatureCollection`
- *returns*: `this`

##### setProjectionBBox

- *arguments*: `bbox` ([*minX*, *minY*, *maxX*, *maxY*])
- *returns*: `this`

##### setTitle

- *arguments*: `string`
- *returns*: `this`

##### addAttribution

- *arguments*: `string`
- *returns*: `this`

##### setTheme

- *arguments*: `Partial<{ padding: Partial<Padding>; palette: Partial<Palette> }>`
- *returns*: `this`

##### getSize

- *returns*: `object { width: number; height: number }`

##### getProjection

- *returns*: `Projection` ([d3-geo])

##### getZoom

- *returns*: `number`

##### getTiles

- *returns*: `Tiles` ([d3-tile])

#### `CanvasMap` (node) Methods

##### getCanvas

- *returns*: `Canvas` ([node-canvas])

##### getContext

- *returns*: `CanvasRenderingContext2D` ([node-canvas])

##### getPath

- *returns*: `GeoPath` ([d3-geo])

##### renderVectorMap

- *arguments*: Options (*optional*)
- *returns*: `Promise<this>`

| name | types | |
|------|-------|-|
| background | `string` | Background color |
| backgroundFeature | `Feature \| FeatureCollection` | Emphasized feature as background. |
| layers | `VectorLayerNames[]` | VectorLayerNames to render. |

`VectorLayerNames`: `"building" | "contour" | "label" | "railway" | "road" | "symbol" | "waterarea"`

##### *async* renderRasterMap

- *arguments*: Options(*optional*)
- *returns*: `Promise<this>`

| name | types | |
|------|-------|-|
| tileUrl | `string` | Raster tile url (default to `https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png` ) |

##### *async* exportPng

- *arguments*:
  - fileName: `string`
  - options: `PngOptions` ([sharp](https://sharp.pixelplumbing.com/api-output#png))
- *returns*: `Promise<this>` (CanvasMap class)

##### *async* exportJpg

- *arguments*:
  - filename: `string`
  - options: `JpegOptions` ([sharp](https://sharp.pixelplumbing.com/api-output#jpeg))
- *returns*: `Promise<this>` (CanvasMap class)

##### *async* exportWebp

- *arguments*:
  - filename: `string`
  - options: `WebpOptions` ([sharp](https://sharp.pixelplumbing.com/api-output#webp))
- *returns*: `Promise<this>` (CanvasMap class)

#### `CanvasMap` (browser) Methods

##### getCanvas

- *returns*: `HTMLCanvasElement`

##### getContext

- *returns*: `CanvasRenderingContext2D` 

##### getPath

- *returns*: `GeoPath` ([d3-geo])

##### async renderVectorMap

- *arguments*: Options (*optional*)
- *returns*: `Promise<this>`

| name | types | |
|------|-------|-|
| background | `string` | Background color or `none` |
| backgroundFeature | `Feature \| FeatureCollection` | Emphasized feature as background. |
| layers | `VectorLayerNames[]` | VectorLayerNames to render. |

`VectorLayerNames`: `"building" | "contour" | "label" | "railway" | "road" | "symbol" | "waterarea"`

##### *async* renderRasterMap

- *arguments*: Options(*optional*)
- *returns*: `Promise<this>`

| name | types | |
|------|-------|-|
| tileUrl | `string` | Raster tile url (default to `https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png` ) |
| tileSize | `number` | tile size |

## Recipes

### Basic

```typescript
const width = 1000;
const height = 1000;
const map = new CanvasMap(width, height);
map.renderVectorMap()
  .then((map) => {
    map.exportPng('map.png');
  });
```

### Use async/await

```typescript
(async () => {
  const width = 1000;
  const height = 1000;
  const map = new CanvasMap(width, height);
  await map.renderVectorMap();
  map.exportPng('map.png');
})();
```

### Draw GeoJSON

```typescript
const geojson = JSON.parse(fs.readFileSync('gj.geojson', 'utf8'));
const width = 1000;
const height = 1000;
const map = new CanvasMap(width, height, geojson);
await map.renderVectorMap();
const context = map.getContext();
const path = map.getPath();
// draw features
geojson.features.forEach((feature) => {
  context.beginPath();
  path(feature);
  context.fillStyle = '#aaf';
  context.fill();
});
map.exportPng('map.png');
```

Browse [example codes](./examples)

## References

- [node-canvas]
- [d3-geo]
- [d3-tile]

[node-canvas]: https://github.com/Automattic/node-canvas
[d3-geo]: https://github.com/d3/d3-geo
[d3-tile]: https://github.com/d3/d3-tile
