import * as fs from "fs";
import * as path from "path";
import {
  createCanvas,
  type Canvas as NodeCanvas,
  type PngConfig,
  type JpegConfig,
} from "canvas";
import { geoPath } from "d3-geo";
import {
  rasterTilesNode,
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

export type CanvasMapOptions = CanvasMapBaseOptions;

class CanvasMap extends CanvasMapBase {
  private canvas: NodeCanvas;

  constructor(
    width: number,
    height: number,
    options?: Partial<CanvasMapOptions>,
  ) {
    super(width, height, options);
    this.canvas = createCanvas(width, height);
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

  public async renderVectorMap({
    background,
    backgroundFeature,
    layers,
  }: Partial<VectorMapOptions> = {}) {
    const context = this.canvas.getContext("2d");
    const { width, height } = this.canvas;
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
    await rasterTilesNode(context, {
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
    }: Partial<TileMapOptions> = {},
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
        layers,
      });
    } else {
      await rasterTilesNode(context, { tiles: this.tiles, url: tileUrl });
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

  public clearContext() {
    const { width, height, state } = this;
    const context = this.canvas.getContext("2d");
    state.textRendered = false;

    context?.clearRect(0, 0, width, height);

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

export default CanvasMap;
