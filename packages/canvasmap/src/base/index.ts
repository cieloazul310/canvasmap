import { geoMercator, type GeoProjection, type ExtendedFeature } from "d3-geo";
import { tile as d3tile, type Tiles } from "d3-tile";
import turfBBox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import rewind from "@turf/rewind";
import type {
  Feature,
  Polygon,
  MultiPolygon,
  Position,
  FeatureCollection,
  BBox,
} from "@turf/helpers";
import type { VectorLayerNames } from "@cieloazul310/canvasmap-styles";
import {
  defineTheme,
  zoomToScale,
  scaleToZoom,
  type Theme,
  type DefineThemeOptions,
} from "@cieloazul310/canvasmap-utils";

export type CanvasMapBaseOptions = {
  center: Position;
  zoom: number;
  title: string;
  theme: Omit<DefineThemeOptions, "width" | "height">;
  zoomDelta: number;
  bbox: BBox;
};

export type VectorMapOptions = {
  background: string;
  backgroundFeature:
    | Feature<Polygon | MultiPolygon>
    | FeatureCollection<Polygon | MultiPolygon>;
  attribution: string;
  layers: VectorLayerNames[];
};

export type RasterMapOptions = {
  tileUrl: string;
  tileSize: number;
  rasterGrayScale: boolean;
  attribution: string;
};

export type TileMapOptions = VectorMapOptions & RasterMapOptions;

class CanvasMapBase {
  public width: number;

  public height: number;

  public projection: GeoProjection;

  public tiles: Tiles;

  public theme: Theme;

  public title: string | undefined;

  public zoomDelta: number;

  public bbox: BBox | undefined = undefined;

  public attribution: string[] = [];

  public state: { textRendered: boolean } = { textRendered: false };

  constructor(
    width: number,
    height: number,
    options?: Partial<CanvasMapBaseOptions>,
  ) {
    this.width = width;

    this.height = height;

    this.theme = defineTheme({ width, height, ...options?.theme });

    this.projection = geoMercator();
    this.zoomDelta = Math.max(-2, Math.min(options?.zoomDelta ?? 0, 2));
    this.updateProjection({
      center: options?.center,
      zoom: options?.zoom,
      bbox: options?.bbox,
    });

    this.tiles = this.generateTiles();

    this.setTitle(options?.title);
  }

  public generateTiles() {
    const { width, height, zoomDelta } = this;
    const tile = d3tile()
      .size([width, height])
      .scale(this.projection.scale() * Math.PI * 2)
      .translate(this.projection([0, 0]) ?? [0, 0])
      .zoomDelta(zoomDelta);
    return tile();
  }

  public updateTiles() {
    this.tiles = this.generateTiles();
  }

  public setCenter(center?: Position) {
    this.updateProjection({ center });
    return this;
  }

  public setZoom(zoom?: number) {
    this.updateProjection({ zoom });
    return this;
  }

  public setZoomDelta(zoomDelta?: number) {
    if (zoomDelta !== undefined) {
      this.zoomDelta = zoomDelta;
    }
    this.updateTiles();
    return this;
  }

  public updateProjection({
    center,
    zoom,
    bbox,
  }: Partial<Pick<CanvasMapBaseOptions, "center" | "zoom" | "bbox">> = {}) {
    const { width, height } = this;
    const currentCenter = this.projection.center();
    if (bbox) {
      this.bbox = bbox;
    }

    if (this.bbox) {
      this.projection.fitExtent(
        [
          [this.theme.padding.left, this.theme.padding.top],
          [
            width - this.theme.padding.right,
            height - this.theme.padding.bottom,
          ],
        ],
        rewind(bboxPolygon(this.bbox), { reverse: true }),
      );
    } else {
      if (center) {
        this.projection
          .center(center as [number, number])
          .translate([width / 2, height / 2]);
      }
      if (currentCenter[0] !== 0 && currentCenter[1] !== 0) {
        this.projection
          .center(currentCenter)
          .translate([width / 2, height / 2]);
      }
      if (zoom) {
        this.projection.scale(zoomToScale(zoom));
      }
    }
    this.updateTiles();
    return this;
  }

  public setBBox(bbox: BBox | undefined) {
    this.bbox = bbox;
    this.updateProjection();
    return this;
  }

  public clearBBox() {
    if (this.bbox) {
      const lon = this.bbox[0] + (this.bbox[2] - this.bbox[0]) / 2;
      const lat = this.bbox[1] + (this.bbox[3] - this.bbox[1]) / 2;
      this.bbox = undefined;
      this.setCenter([lon, lat]);
    }

    return this;
  }

  public setProjectionFitExtent(feature: ExtendedFeature | FeatureCollection) {
    this.setBBox(turfBBox(feature));
    return this;
  }

  public setTitle(title?: string) {
    this.title = title;
    this.state.textRendered = false;
    return this;
  }

  public setTheme(theme: Omit<DefineThemeOptions, "width" | "height">) {
    const { width, height } = this;
    this.theme = defineTheme({ width, height, ...theme });
    return this;
  }

  public addAttribution(attribution: string) {
    if (!this.attribution.includes(attribution))
      this.attribution.push(attribution);
    return this;
  }

  public getSize() {
    const { width, height } = this;
    return { width, height };
  }

  public getBBox() {
    return this.bbox;
  }

  public getProjection() {
    return this.projection;
  }

  public getZoom() {
    const { projection } = this;
    return scaleToZoom(projection.scale());
  }

  public getTiles() {
    return this.tiles;
  }
}

export default CanvasMapBase;
