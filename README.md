# Canvas Map for Data Visualization

Canvas マップ -データビジュアライゼーションのための

## How to Use

```typescript
const width = 1000;
const height = 1000;
const map = new CanvasMap(width, height);
map.renderBasemap('vector')
  .then((map) => {
    map.exportPng('map.png');
  });
```

## Install

```sh
yarn add @cieloazul310/canvasmap
```

## API Reference

class CanvasMap(width: number, height: number, feature: object, options)

### constructor

#### width (required): number

生成する地図の横幅

#### height (required): number

生成する地図の縦幅

#### Feature (*optional*): object

地図の表示領域を地物、または GeoJSON オブジェクトで設定する

#### options (*optional*)

| key      |    type    | default |
|:--   |:--|:--|
| padding | Partial<{top: number; right: number; bottom: number; left: number }> |  |
| center | Position ([number, number]) |  |
| a | a | a |
| a | a | a |

### methods

## Recipes

### Basic

```typescript
const width = 1000;
const height = 1000;
const map = new CanvasMap(width, height);
map.renderBasemap('vector')
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
  await map.renderBasemap('vector');
  map.exportPng('map.png');
})();
```
