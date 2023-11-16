import * as fs from "fs";
import * as path from "path";
import {
  createCanvas,
  type Canvas,
  type PngConfig,
  type JpegConfig,
} from "canvas";
import { geoMercator, type GeoProjection, type ExtendedFeature } from "d3-geo";
import { tile as d3tile, type Tiles } from "d3-tile";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import rewind from "@turf/rewind";
import type {
  Feature,
  Polygon,
  MultiPolygon,
  Position,
  FeatureCollection,
} from "@turf/helpers";
import {
  rasterTiles,
  vectorTiles,
  renderAttribution,
  renderTitle,
} from "@cieloazul310/canvasmap-styles";
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

export type CanvasMapOptions = {
  center: Position;
  zoom: number;
  title: string;
  theme: Omit<DefineThemeOptions, "width" | "height">;
};

export interface TileMapOptions {
  tileUrl: string;
  rasterGrayScale: boolean;
  background: string;
  backgroundFeature:
    | Feature<Polygon | MultiPolygon>
    | FeatureCollection<Polygon | MultiPolygon>;
  attribution: string;
}

export class CanvasMap {
  private canvas: Canvas;

  private projection: GeoProjection;

  private tiles: Tiles;

  private theme: Theme;

  private title: string | undefined;

  private attribution: string[] = [];

  private state: { textRendered: boolean } = { textRendered: false };

  constructor(
    width: number,
    height: number,
    options?: Partial<CanvasMapOptions>,
  ) {
    this.canvas = createCanvas(width, height);
    this.theme = defineTheme({ width, height, ...options?.theme });

    this.projection = geoMercator();
    this.setCenter(options?.center).setZoom(options?.zoom);

    this.tiles = this.updateTiles();

    this.setTitle(options?.title);
  }

  private updateTiles() {
    const { width, height } = this.canvas;
    const tile = d3tile()
      .size([width, height])
      .scale(this.projection.scale() * Math.PI * 2)
      .translate(this.projection([0, 0]) ?? [0, 0]);
    return tile();
  }

  public setCenter(center?: Position): CanvasMap {
    const { width, height } = this.canvas;
    if (center) {
      this.projection
        .center(center as [number, number])
        .translate([width / 2, height / 2]);
    }
    this.tiles = this.updateTiles();
    return this;
  }

  public setZoom(zoom?: number): CanvasMap {
    if (zoom) {
      this.projection.scale(zoomToScale(zoom));
    }
    this.tiles = this.updateTiles();
    return this;
  }

  public setProjectionFitExtent(
    feature: ExtendedFeature | FeatureCollection,
  ): CanvasMap {
    const { width, height } = this.canvas;
    this.projection.fitExtent(
      [
        [this.theme.padding.left, this.theme.padding.top],
        [width - this.theme.padding.right, height - this.theme.padding.bottom],
      ],
      isFeature(feature)
        ? feature
        : rewind(bboxPolygon(bbox(feature)), { reverse: true }),
    );
    this.tiles = this.updateTiles();
    return this;
  }

  public setTitle(title?: string): CanvasMap {
    this.title = title;
    return this;
  }

  public addAttribution(attribution: string): CanvasMap {
    if (!this.attribution.includes(attribution))
      this.attribution.push(attribution);
    return this;
  }

  public async renderBasemap(
    type: "vector" | "raster",
    { background, backgroundFeature, tileUrl }: Partial<TileMapOptions> = {},
  ): Promise<CanvasMap> {
    const context = this.canvas.getContext("2d");
    const { width, height } = this.canvas;

    if (type === "vector") {
      await vectorTiles(context, {
        width,
        height,
        projection: this.projection,
        tiles: this.tiles,
        theme: this.theme,
        backgroundColor: background,
        backgroundFeature,
      });
    } else {
      await rasterTiles(context, { tiles: this.tiles, url: tileUrl });
    }
    return this;
  }

  private renderText(): CanvasMap {
    const { width, height } = this.canvas;
    const context = this.canvas.getContext("2d");
    if (this.title) {
      renderTitle(context, { width, title: this.title, theme: this.theme });
    }
    if (this.attribution.length) {
      renderAttribution(context, {
        attribution: this.attribution.join(", "),
        width,
        height,
        theme: this.theme,
      });
    }
    this.state.textRendered = true;
    return this;
  }

  public exportPng(file: string, config?: PngConfig): CanvasMap {
    if (!this.state.textRendered) this.renderText();
    const { canvas } = this;
    const buffer = canvas.toBuffer("image/png", config);
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(file, buffer);
    console.log(`${file} exported!`);

    return this;
  }

  public exportJpg(file: string, config?: JpegConfig): CanvasMap {
    this.renderText();
    const { canvas } = this;
    const buffer = canvas.toBuffer("image/jpeg", config);
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(file, buffer);
    console.log(`${file} exported!`);

    return this;
  }
}
