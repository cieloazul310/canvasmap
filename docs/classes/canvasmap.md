[canvasmap](../README.md) / [Exports](../modules.md) / CanvasMap

# Class: CanvasMap

## Hierarchy

* **CanvasMap**

## Table of contents

### Constructors

- [constructor](canvasmap.md#constructor)

### Properties

- [attribution](canvasmap.md#attribution)
- [canvas](canvasmap.md#canvas)
- [context](canvasmap.md#context)
- [fontSize](canvasmap.md#fontsize)
- [options](canvasmap.md#options)
- [padding](canvasmap.md#padding)
- [path](canvasmap.md#path)
- [projection](canvasmap.md#projection)
- [size](canvasmap.md#size)

### Methods

- [addAttribution](canvasmap.md#addattribution)
- [exportJpg](canvasmap.md#exportjpg)
- [exportPng](canvasmap.md#exportpng)
- [getCanvas](canvasmap.md#getcanvas)
- [getCanvasMapOptions](canvasmap.md#getcanvasmapoptions)
- [getContext](canvasmap.md#getcontext)
- [getMapFontSize](canvasmap.md#getmapfontsize)
- [getPadding](canvasmap.md#getpadding)
- [getPath](canvasmap.md#getpath)
- [getProjection](canvasmap.md#getprojection)
- [getSize](canvasmap.md#getsize)
- [renderBasemap](canvasmap.md#renderbasemap)
- [renderText](canvasmap.md#rendertext)

## Constructors

### constructor

\+ **new CanvasMap**(`width`: *number*, `height`: *number*, `object?`: *ExtendedFeature*<*null* \| Point \| MultiPoint \| LineString \| MultiLineString \| Polygon \| MultiPolygon \| GeometryCollection \| GeoSphere, GeoJsonProperties\> \| *FeatureCollection*<Geometry \| GeometryCollection, Properties\> \| *Partial*<CanvasMapOptions\>, `options?`: *Partial*<CanvasMapOptions\>): [*CanvasMap*](canvasmap.md)

#### Parameters:

Name | Type |
------ | ------ |
`width` | *number* |
`height` | *number* |
`object?` | *ExtendedFeature*<*null* \| Point \| MultiPoint \| LineString \| MultiLineString \| Polygon \| MultiPolygon \| GeometryCollection \| GeoSphere, GeoJsonProperties\> \| *FeatureCollection*<Geometry \| GeometryCollection, Properties\> \| *Partial*<CanvasMapOptions\> |
`options?` | *Partial*<CanvasMapOptions\> |

**Returns:** [*CanvasMap*](canvasmap.md)

Defined in: [canvasMap.ts:39](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L39)

## Properties

### attribution

• **attribution**: *string*[]

Defined in: [canvasMap.ts:38](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L38)

___

### canvas

• **canvas**: *Canvas*

Defined in: [canvasMap.ts:33](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L33)

___

### context

• **context**: *NodeCanvasRenderingContext2D*

Defined in: [canvasMap.ts:34](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L34)

___

### fontSize

• **fontSize**: [*MapFontSize*](../interfaces/mapfontsize.md)

Defined in: [canvasMap.ts:39](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L39)

___

### options

• **options**: *Partial*<CanvasMapOptions\>

Defined in: [canvasMap.ts:37](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L37)

___

### padding

• **padding**: [*Padding*](../interfaces/padding.md)

Defined in: [canvasMap.ts:32](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L32)

___

### path

• **path**: *GeoPath*<*any*, GeoPermissibleObjects\>

Defined in: [canvasMap.ts:36](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L36)

___

### projection

• **projection**: *GeoProjection*

Defined in: [canvasMap.ts:35](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L35)

___

### size

• **size**: { `height`: *number* ; `width`: *number*  }

#### Type declaration:

Name | Type |
------ | ------ |
`height` | *number* |
`width` | *number* |

Defined in: [canvasMap.ts:31](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L31)

## Methods

### addAttribution

▸ **addAttribution**(`attribution`: *string*): [*CanvasMap*](canvasmap.md)

#### Parameters:

Name | Type |
------ | ------ |
`attribution` | *string* |

**Returns:** [*CanvasMap*](canvasmap.md)

Defined in: [canvasMap.ts:108](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L108)

___

### exportJpg

▸ **exportJpg**(`file`: *string*, `config?`: JpegConfig): [*CanvasMap*](canvasmap.md)

#### Parameters:

Name | Type |
------ | ------ |
`file` | *string* |
`config?` | JpegConfig |

**Returns:** [*CanvasMap*](canvasmap.md)

Defined in: [canvasMap.ts:143](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L143)

___

### exportPng

▸ **exportPng**(`file`: *string*, `config?`: PngConfig): [*CanvasMap*](canvasmap.md)

#### Parameters:

Name | Type |
------ | ------ |
`file` | *string* |
`config?` | PngConfig |

**Returns:** [*CanvasMap*](canvasmap.md)

Defined in: [canvasMap.ts:134](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L134)

___

### getCanvas

▸ **getCanvas**(): *Canvas*

**Returns:** *Canvas*

Defined in: [canvasMap.ts:99](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L99)

___

### getCanvasMapOptions

▸ **getCanvasMapOptions**(): *Partial*<CanvasMapOptions\>

**Returns:** *Partial*<CanvasMapOptions\>

Defined in: [canvasMap.ts:102](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L102)

___

### getContext

▸ **getContext**(): *NodeCanvasRenderingContext2D*

**Returns:** *NodeCanvasRenderingContext2D*

Defined in: [canvasMap.ts:96](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L96)

___

### getMapFontSize

▸ **getMapFontSize**(): [*MapFontSize*](../interfaces/mapfontsize.md)

**Returns:** [*MapFontSize*](../interfaces/mapfontsize.md)

Defined in: [canvasMap.ts:105](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L105)

___

### getPadding

▸ **getPadding**(): [*Padding*](../interfaces/padding.md)

**Returns:** [*Padding*](../interfaces/padding.md)

Defined in: [canvasMap.ts:87](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L87)

___

### getPath

▸ **getPath**(): *GeoPath*<*any*, GeoPermissibleObjects\>

**Returns:** *GeoPath*<*any*, GeoPermissibleObjects\>

Defined in: [canvasMap.ts:93](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L93)

___

### getProjection

▸ **getProjection**(): *GeoProjection*

**Returns:** *GeoProjection*

Defined in: [canvasMap.ts:90](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L90)

___

### getSize

▸ **getSize**(): *object*

**Returns:** *object*

Name | Type |
------ | ------ |
`height` | *number* |
`width` | *number* |

Defined in: [canvasMap.ts:84](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L84)

___

### renderBasemap

▸ **renderBasemap**(`type`: *vector* \| *raster*, `options?`: *Partial*<TileMapOptions\>): *Promise*<[*CanvasMap*](canvasmap.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`type` | *vector* \| *raster* |
`options?` | *Partial*<TileMapOptions\> |

**Returns:** *Promise*<[*CanvasMap*](canvasmap.md)\>

Defined in: [canvasMap.ts:113](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L113)

___

### renderText

▸ `Private`**renderText**(): [*CanvasMap*](canvasmap.md)

**Returns:** [*CanvasMap*](canvasmap.md)

Defined in: [canvasMap.ts:125](https://github.com/cieloazul310/population/blob/902d785/packages/canvasmap/src/canvasMap.ts#L125)
