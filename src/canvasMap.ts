import * as fs from "fs";
import {
  createCanvas,
  Canvas,
  CanvasRenderingContext2D,
  PngConfig,
  JpegConfig,
} from "canvas";
import {
  geoMercator,
  geoPath,
  GeoProjection,
  GeoPath,
  ExtendedFeature,
} from "d3-geo";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import rewind from "@turf/rewind";
import {
  Feature,
  Polygon,
  MultiPolygon,
  Position,
  FeatureCollection,
} from "@turf/helpers";
import { rasterTiles, vectorTiles } from "./tilemap";
import { renderTitle, renderAttribution } from "./utils/renderText";
import { createPadding, Padding } from "./utils/createPadding";
import { mapFontSize, MapFontSize } from "./utils/mapFontSize";
import { zoomToScale } from "./utils/zoomToScale";

export interface CanvasMapOptions {
  padding: Padding;
  center: Position;
  zoom: number;
  title: string;
}

export interface TileMapOptions {
  tileUrl: string;
  rasterGrayScale: boolean;
  background: string;
  backgroundFeature:
    | Feature<Polygon | MultiPolygon>
    | FeatureCollection<Polygon | MultiPolygon>;
  attribution: string;
}

function isFeature(
  obj?: ExtendedFeature | FeatureCollection | Record<string, unknown>,
): obj is ExtendedFeature {
  return typeof obj === "object" && obj.type === "Feature";
}
function isFeatureCollection(
  obj?: ExtendedFeature | FeatureCollection | Record<string, unknown>,
): obj is FeatureCollection {
  return typeof obj === "object" && obj.type === "FeatureCollection";
}

export class CanvasMap {
  size: { width: number; height: number };

  padding: Padding;

  canvas: Canvas;

  context: CanvasRenderingContext2D;

  projection: GeoProjection;

  path: GeoPath;

  options: Partial<CanvasMapOptions> & {
    basemap: "raster" | "vector";
    attribution: string;
  };

  attribution: string[] = [];

  fontSize: MapFontSize;

  state: { textRendered: boolean } = { textRendered: false };

  constructor(
    width: number,
    height: number,
    object?: ExtendedFeature | FeatureCollection | Partial<CanvasMapOptions>,
    options?: Partial<CanvasMapOptions>,
  ) {
    this.size = { width, height };
    this.canvas = createCanvas(width, height);
    this.context = this.canvas.getContext("2d");
    this.fontSize = mapFontSize(width, height);
    this.options = {
      basemap: "vector",
      attribution: "国土地理院",
      ...(isFeature(object) || isFeatureCollection(object) ? options : object),
    };

    this.padding = this.options.padding ?? createPadding(width, height);
    this.projection =
      isFeature(object) || isFeatureCollection(object)
        ? geoMercator().fitExtent(
            [
              [this.padding.left, this.padding.top],
              [width - this.padding.right, height - this.padding.bottom],
            ],
            isFeature(object)
              ? object
              : rewind(bboxPolygon(bbox(object)), { reverse: true }),
          )
        : geoMercator();

    if (
      !isFeature(object) &&
      !isFeatureCollection(object) &&
      this.options.center
    ) {
      this.projection
        .center(this.options.center as [number, number])
        .translate([width / 2, height / 2]);
    }
    if (this.options.zoom) {
      this.projection.scale(zoomToScale(this.options.zoom));
    }

    this.path = geoPath(this.projection, this.context);
  }

  public getSize(): { width: number; height: number } {
    return this.size;
  }

  public getPadding(): Padding {
    return this.padding;
  }

  public getProjection(): GeoProjection {
    return this.projection;
  }

  public getPath(): GeoPath {
    return this.path;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getCanvas(): Canvas {
    return this.canvas;
  }

  public getCanvasMapOptions(): Partial<CanvasMapOptions> {
    return this.options;
  }

  public getMapFontSize(): MapFontSize {
    return this.fontSize;
  }

  public addAttribution(attribution: string): CanvasMap {
    if (!this.attribution.includes(attribution))
      this.attribution.push(attribution);
    return this;
  }

  public async renderBasemap(
    type: "vector" | "raster",
    options?: Partial<TileMapOptions>,
  ): Promise<CanvasMap> {
    if (type === "vector") {
      await vectorTiles({
        background: options?.background,
        backgroundFeature: options?.backgroundFeature,
      })(this);
    } else {
      await rasterTiles(
        options?.tileUrl ??
          "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
        {
          grayScale: options?.rasterGrayScale ?? false,
          attribution: options?.attribution,
        },
      )(this);
    }
    return this;
  }

  private renderText(): CanvasMap {
    if (this.options.title) {
      renderTitle(this.options.title)(this);
    }
    if (this.attribution.length) {
      renderAttribution(this.attribution.join(", "))(this);
    }
    this.state.textRendered = true;
    return this;
  }

  public exportPng(file: string, config?: PngConfig): CanvasMap {
    if (!this.state.textRendered) this.renderText();
    const canvas = this.getCanvas();
    const buffer = canvas.toBuffer("image/png", config);
    fs.writeFileSync(file, buffer);
    console.log(`${file} exported!`);

    return this;
  }

  public exportJpg(file: string, config?: JpegConfig): CanvasMap {
    this.renderText();
    const canvas = this.getCanvas();
    const buffer = canvas.toBuffer("image/jpeg", config);
    fs.writeFileSync(file, buffer);
    console.log(`${file} exported!`);

    return this;
  }
}
