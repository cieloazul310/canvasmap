import * as fs from "fs";
import * as path from "path";
import { createCanvas, type Canvas as NodeCanvas } from "canvas";
import sharp, {
  type PngOptions,
  type JpegOptions,
  type WebpOptions,
} from "sharp";
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
} from "../base";

export type CanvasMapOptions = CanvasMapBaseOptions;

class CanvasMap extends CanvasMapBase {
  #canvas: NodeCanvas;

  constructor(
    width: number,
    height: number,
    options?: Partial<CanvasMapOptions>,
  ) {
    super(width, height, options);
    this.#canvas = createCanvas(width, height);
  }

  setSize({ width, height }: Partial<{ width: number; height: number }>) {
    if (width) {
      this.width = width;
      this.#canvas.width = width;
    }
    if (height) {
      this.height = height;
      this.#canvas.height = height;
    }
    this.updateProjection();
    return this;
  }

  getCanvas() {
    return this.#canvas;
  }

  getContext() {
    const context = this.#canvas.getContext("2d");
    return context;
  }

  getPath() {
    const context = this.#canvas.getContext("2d");
    return geoPath(this.projection, context);
  }

  async renderVectorMap({
    background,
    backgroundFeature,
    layers,
    attribution,
  }: Partial<VectorMapOptions> = {}) {
    const context = this.#canvas.getContext("2d");
    const { tiles, projection, theme } = this;
    const { width, height } = this.#canvas;

    this.addAttribution(attribution ?? "国土地理院");

    await vectorTiles(context, {
      width,
      height,
      projection,
      tiles,
      theme,
      backgroundColor: background,
      backgroundFeature,
      layers,
    });
    return this;
  }

  async renderRasterMap({
    tileUrl,
    tileSize,
    attribution,
  }: Partial<RasterMapOptions> = {}) {
    const context = this.#canvas.getContext("2d");
    const { tiles } = this;
    const { width, height } = this.#canvas;

    this.addAttribution(attribution ?? "国土地理院");

    await rasterTilesNode(context, {
      tiles,
      url: tileUrl,
      width,
      height,
      tileSize,
    });
    return this;
  }

  /**
   * @deprecated
   * migrate to `renderVectorMap` or `renderRasterMap`
   */
  async renderBasemap(
    type: "vector" | "raster",
    {
      background,
      backgroundFeature,
      layers,
      tileUrl,
    }: Partial<TileMapOptions> = {},
  ): Promise<CanvasMap> {
    const context = this.#canvas.getContext("2d");
    const { width, height } = this.#canvas;

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
    const { width, height } = this.#canvas;
    const context = this.#canvas.getContext("2d");
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

  clearContext() {
    const { width, height, state } = this;
    const context = this.#canvas.getContext("2d");
    state.textRendered = false;

    context?.clearRect(0, 0, width, height);

    return this;
  }

  async exportPng(
    file: string,
    pngOptions: PngOptions = {
      palette: true,
      colors: 32,
    },
  ): Promise<CanvasMap> {
    if (!this.state.textRendered) this.renderText();
    const buffer = this.#canvas.toBuffer();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await sharp(buffer).png(pngOptions).toFile(file);
    console.log(`${file} exported!`);

    return this;
  }

  async exportJpg(file: string, jpegOptions?: JpegOptions): Promise<CanvasMap> {
    this.renderText();
    const buffer = this.#canvas.toBuffer();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await sharp(buffer).jpeg(jpegOptions).toFile(file);
    console.log(`${file} exported!`);

    return this;
  }

  async exportWebp(file: string, webpOptions?: WebpOptions) {
    this.renderText();
    const buffer = this.#canvas.toBuffer();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await sharp(buffer).webp(webpOptions).toFile(file);
    console.log(`${file} exported!`);

    return this;
  }
}

export default CanvasMap;
