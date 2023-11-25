import { Option } from "@commander-js/extra-typings";
import { CanvasMap } from "@cieloazul310/canvasmap";
import canvasMapProgram, { getConfig, getFormat } from "./common";

const program = canvasMapProgram()
  .addOption(new Option("--tileUrl <string>", "Raster tile url"))
  .addOption(new Option("--tileSize <number>", "Size of raster tile"));

program.parse(process.argv);

const { output, title, attribution, tileUrl, ...options } = program.opts();
const { width, height, center, zoomDelta } = getConfig(program);

const tileSize = options.tileSize ? parseInt(options.tileSize, 10) : 256;

const format = getFormat(output);

const map = new CanvasMap(width, height, {
  zoom: options.zoom ? parseFloat(options.zoom) : 13,
  center,
  zoomDelta,
  title,
});

map
  .renderRasterMap({
    tileUrl,
    tileSize,
    attribution,
  })
  .then((canvasmap) => {
    if (format === "webp") {
      canvasmap.exportWebp(output);
    } else if (format === "jpeg") {
      canvasmap.exportJpg(output);
    } else {
      canvasmap.exportPng(output, {
        palette: false,
        colors: undefined,
      });
    }
  });
