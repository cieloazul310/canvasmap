canvasmap / [Exports](modules.md)

# Aoi Map for Data Visualization

葵マップ -データビジュアライゼーションのための

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
yarn add aoi-map
```

## API Reference

class CanvasMap(width: number, height: number, feature, options)

### constructor

#### width (required): number

#### height (required): number

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
