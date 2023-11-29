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
  type Theme,
  type DefineThemeOptions,
} from "@cieloazul310/canvasmap-utils";

function isFeature(
  obj?: ExtendedFeature | FeatureCollection | Record<string, unknown>,
): obj is ExtendedFeature {
  return typeof obj === "object" && obj.type === "Feature";
}

export type CanvasMapBaseOptions = {
  center: Position;
  zoom: number;
  title: string;
  theme: Omit<DefineThemeOptions, "width" | "height">;
  zoomDelta: number;
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
    this.setCenter(options?.center).setZoom(options?.zoom);

    this.zoomDelta = Math.max(-2, Math.min(options?.zoomDelta ?? 0, 2));

    this.tiles = this.updateTiles();

    this.setTitle(options?.title);
  }

  public updateTiles() {
    const { width, height, zoomDelta } = this;
    const tile = d3tile()
      .size([width, height])
      .scale(this.projection.scale() * Math.PI * 2)
      .translate(this.projection([0, 0]) ?? [0, 0])
      .zoomDelta(zoomDelta);
    return tile();
  }

  public setCenter(center?: Position) {
    const { width, height } = this;
    if (center) {
      this.projection
        .center(center as [number, number])
        .translate([width / 2, height / 2]);
    }
    this.tiles = this.updateTiles();
    return this;
  }

  public setZoom(zoom?: number) {
    if (zoom) {
      this.projection.scale(zoomToScale(zoom));
    }
    this.tiles = this.updateTiles();
    return this;
  }

  public setZoomDelta(zoomDelta?: number) {
    if (zoomDelta !== undefined) {
      this.zoomDelta = zoomDelta;
    }
    this.tiles = this.updateTiles();
    return this;
  }

  public setProjectionBBox(bbox: BBox) {
    const { width, height } = this;
    this.projection.fitExtent(
      [
        [this.theme.padding.left, this.theme.padding.top],
        [width - this.theme.padding.right, height - this.theme.padding.bottom],
      ],
      rewind(bboxPolygon(bbox), { reverse: true }),
    );
    this.tiles = this.updateTiles();
    return this;
  }

  public setProjectionFitExtent(feature: ExtendedFeature | FeatureCollection) {
    const { width, height } = this;
    this.projection.fitExtent(
      [
        [this.theme.padding.left, this.theme.padding.top],
        [width - this.theme.padding.right, height - this.theme.padding.bottom],
      ],
      isFeature(feature)
        ? feature
        : rewind(bboxPolygon(turfBBox(feature)), { reverse: true }),
    );
    this.tiles = this.updateTiles();
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

  public getProjection() {
    return this.projection;
  }

  public getTiles() {
    return this.tiles;
  }
}

export default CanvasMapBase;
