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
} from "../base";

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

  public setSize({
    width,
    height,
  }: Partial<{ width: number; height: number }>) {
    if (width) {
      this.width = width;
      this.canvas.width = width;
    }
    if (height) {
      this.height = height;
      this.canvas.height = height;
    }
    this.tiles = this.updateTiles();
    return this;
  }

  public async renderVectorMap({
    background,
    backgroundFeature,
    layers,
    attribution,
  }: Partial<VectorMapOptions> = {}) {
    const context = this.canvas.getContext("2d");
    const { width, height } = this.canvas;
    if (!context) return this;

    this.addAttribution(attribution ?? "国土地理院");

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

  public async renderRasterMap({
    tileUrl,
    attribution,
    tileSize,
  }: Partial<RasterMapOptions> = {}) {
    const context = this.canvas.getContext("2d");
    const { width, height } = this.canvas;
    if (!context) return this;

    this.addAttribution(attribution ?? "国土地理院");

    await rasterTilesBrowser(context, {
      tiles: this.tiles,
      url: tileUrl,
      tileSize,
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

  public clearContext() {
    const { width, height, state } = this;
    const context = this.canvas.getContext("2d");

    state.textRendered = false;
    context?.clearRect(0, 0, width, height);

    return this;
  }
}

export default CanvasMapBrowser;
