import { geoPath } from "d3-geo";
import {
  rasterTilesBrowser,
  vectorTiles,
  renderAttribution,
  renderTitle,
} from "@cieloazul310/canvasmap-styles";
import CanvasMapBase, {
  type CanvasMapBaseOptions,
  type TileMapOptions,
  type VectorMapOptions,
  type RasterMapOptions,
} from "./base";

export type CanvasMapBrowserOptions = CanvasMapBaseOptions;

class CanvasMapBrowser extends CanvasMapBase {
  private canvas: HTMLCanvasElement;

  constructor(
    width: number,
    height: number,
    options?: Partial<CanvasMapBrowserOptions>,
  ) {
    super(width, height, options);

    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public async renderVectorMap({
    background,
    backgroundFeature,
    layers,
  }: Partial<VectorMapOptions> = {}) {
    const context = this.canvas.getContext("2d");
    const { width, height } = this.canvas;
    if (!context) return this;

    await vectorTiles(context, {
      width,
      height,
      projection: this.projection,
      tiles: this.tiles,
      theme: this.theme,
      backgroundColor: background,
      backgroundFeature,
      layers,
    });
    return this;
  }

  public async renderRasterMap({ tileUrl }: Partial<RasterMapOptions> = {}) {
    const context = this.canvas.getContext("2d");
    const { width, height } = this.canvas;
    if (!context) return this;

    await rasterTilesBrowser(context, {
      tiles: this.tiles,
      resolution: this.resolution,
      url: tileUrl,
      width,
      height,
    });
    return this;
  }

  /**
   * @deprecated
   * migrate to `renderVectorMap` or `renderRasterMap`
   */
  public async renderBasemap(
    type: "vector" | "raster",
    {
      background,
      backgroundFeature,
      layers,
      tileUrl,
      rasterGrayScale,
    }: Partial<TileMapOptions> = {},
  ) {
    const context = this.canvas.getContext("2d");
    const { width, height } = this.canvas;
    if (!context) return this;

    if (type === "vector") {
      await vectorTiles(context, {
        width,
        height,
        projection: this.projection,
        tiles: this.tiles,
        theme: this.theme,
        backgroundColor: background,
        backgroundFeature,
        layers,
      });
    } else {
      await rasterTilesBrowser(context, {
        tiles: this.tiles,
        url: tileUrl,
        grayScale: rasterGrayScale,
        width: this.width,
        height: this.height,
      });
    }
    return this;
  }

  public renderText(): CanvasMapBrowser {
    const { width, height } = this;
    const context = this.canvas.getContext("2d");
    if (!context || this.state.textRendered) return this;

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

  public getCanvas() {
    this.renderText();

    return this.canvas;
  }

  public getContext() {
    const context = this.canvas.getContext("2d");
    return context;
  }

  public getPath() {
    const context = this.canvas.getContext("2d");
    return geoPath(this.projection, context);
  }
}

export default CanvasMapBrowser;
