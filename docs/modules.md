[canvasmap](README.md) / Exports

# canvasmap

## Table of contents

### Classes

- [CanvasMap](classes/canvasmap.md)

### Interfaces

- [MapFontSize](interfaces/mapfontsize.md)
- [Padding](interfaces/padding.md)

### Type aliases

- [MapFontSizes](modules.md#mapfontsizes)

### Variables

- [contour](modules.md#contour)
- [label](modules.md#label)
- [railway](modules.md#railway)
- [road](modules.md#road)
- [symbol](modules.md#symbol)
- [waterarea](modules.md#waterarea)

### Functions

- [createPadding](modules.md#createpadding)
- [mapFontSize](modules.md#mapfontsize)
- [rasterTiles](modules.md#rastertiles)
- [renderAttribution](modules.md#renderattribution)
- [renderTitle](modules.md#rendertitle)
- [scaleToZoom](modules.md#scaletozoom)
- [tileUrl](modules.md#tileurl)
- [vectorTiles](modules.md#vectortiles)
- [zoomToScale](modules.md#zoomtoscale)

## Type aliases

### MapFontSizes

Ƭ **MapFontSizes**: keyof [*MapFontSize*](interfaces/mapfontsize.md)

Defined in: [utils/mapFontSize.ts:7](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/mapFontSize.ts#L7)

## Variables

### contour

• `Const` **contour**: VectorLayer

Defined in: [tilemap/vectorLayers.ts:51](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/vectorLayers.ts#L51)

___

### label

• `Const` **label**: VectorLayer

Defined in: [tilemap/vectorLayers.ts:67](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/vectorLayers.ts#L67)

___

### railway

• `Const` **railway**: VectorLayer

Defined in: [tilemap/vectorLayers.ts:19](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/vectorLayers.ts#L19)

___

### road

• `Const` **road**: VectorLayer

Defined in: [tilemap/vectorLayers.ts:29](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/vectorLayers.ts#L29)

___

### symbol

• `Const` **symbol**: VectorLayer

Defined in: [tilemap/vectorLayers.ts:112](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/vectorLayers.ts#L112)

___

### waterarea

• `Const` **waterarea**: VectorLayer

Defined in: [tilemap/vectorLayers.ts:10](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/vectorLayers.ts#L10)

## Functions

### createPadding

▸ **createPadding**(`width`: *number*, `height`: *number*, `padding?`: *Partial*<[*Padding*](interfaces/padding.md)\>): [*Padding*](interfaces/padding.md)

#### Parameters:

Name | Type |
------ | ------ |
`width` | *number* |
`height` | *number* |
`padding?` | *Partial*<[*Padding*](interfaces/padding.md)\> |

**Returns:** [*Padding*](interfaces/padding.md)

Defined in: [utils/createPadding.ts:8](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/createPadding.ts#L8)

___

### mapFontSize

▸ **mapFontSize**(`width`: *number*, `height`: *number*): [*MapFontSize*](interfaces/mapfontsize.md)

#### Parameters:

Name | Type |
------ | ------ |
`width` | *number* |
`height` | *number* |

**Returns:** [*MapFontSize*](interfaces/mapfontsize.md)

Defined in: [utils/mapFontSize.ts:9](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/mapFontSize.ts#L9)

___

### rasterTiles

▸ **rasterTiles**(`url`: *string*, `options?`: *Partial*<Options\>): *function*

#### Parameters:

Name | Type |
------ | ------ |
`url` | *string* |
`options?` | *Partial*<Options\> |

**Returns:** *function*

Defined in: [tilemap/rasterTiles.ts:12](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/rasterTiles.ts#L12)

___

### renderAttribution

▸ **renderAttribution**(`attribution`: *string*): *function*

#### Parameters:

Name | Type |
------ | ------ |
`attribution` | *string* |

**Returns:** *function*

Defined in: [utils/renderText.ts:22](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/renderText.ts#L22)

___

### renderTitle

▸ **renderTitle**(`title`: *string*): *function*

#### Parameters:

Name | Type |
------ | ------ |
`title` | *string* |

**Returns:** *function*

Defined in: [utils/renderText.ts:3](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/renderText.ts#L3)

___

### scaleToZoom

▸ **scaleToZoom**(`scale`: *number*): *number*

#### Parameters:

Name | Type |
------ | ------ |
`scale` | *number* |

**Returns:** *number*

Defined in: [utils/zoomToScale.ts:6](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/zoomToScale.ts#L6)

___

### tileUrl

▸ **tileUrl**(`url`: *string*): *function*

#### Parameters:

Name | Type |
------ | ------ |
`url` | *string* |

**Returns:** *function*

Defined in: [utils/tileUrl.ts:1](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/tileUrl.ts#L1)

___

### vectorTiles

▸ **vectorTiles**(`options?`: *Partial*<Options\>): *function*

#### Parameters:

Name | Type |
------ | ------ |
`options?` | *Partial*<Options\> |

**Returns:** *function*

Defined in: [tilemap/vectorTiles.ts:16](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/tilemap/vectorTiles.ts#L16)

___

### zoomToScale

▸ **zoomToScale**(`zoom`: *number*): *number*

#### Parameters:

Name | Type |
------ | ------ |
`zoom` | *number* |

**Returns:** *number*

Defined in: [utils/zoomToScale.ts:2](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/utils/zoomToScale.ts#L2)
