import { Option } from "@commander-js/extra-typings";
import {
  CanvasMap,
  defaultPalette,
  bitterPalette,
  vectorLayerNames,
} from "@cieloazul310/canvasmap";
import canvasMapProgram, { getFormat, getConfig } from "./common";

const program = canvasMapProgram()
  .addOption(
    new Option("-p, --palette <string>", "Palette for vector map").choices([
      "default",
      "bitter",
    ] as const),
  )
  .addOption(
    new Option("-l, --layers <layers...>", "Specify layers to render").choices(
      vectorLayerNames,
    ),
  )
  .addOption(
    new Option(
      "-le, --excludeLayers <layers...>",
      'Specify layers to "NOT" render',
    ).choices(vectorLayerNames),
  );

program.parse(process.argv);

const { output, title, attribution, layers, excludeLayers, ...options } =
  program.opts();

const { width, height, center, zoomDelta } = getConfig(program);

const palette = options.palette === "bitter" ? bitterPalette : defaultPalette;

const format = getFormat(output);

const renderLayers = (() => {
  if (layers && layers.length) {
    return vectorLayerNames.filter((layerName) => layers.includes(layerName));
  }
  if (excludeLayers && excludeLayers.length) {
    return vectorLayerNames.filter(
      (layerName) => !excludeLayers.includes(layerName),
    );
  }
  return vectorLayerNames;
})();

const map = new CanvasMap(width, height, {
  zoom: options.zoom ? parseFloat(options.zoom) : 13,
  center,
  zoomDelta,
  title,
  theme: {
    palette,
  },
});

map
  .renderVectorMap({
    layers: renderLayers,
    attribution,
  })
  .then((canvasmap) => {
    if (format === "webp") {
      canvasmap.exportWebp(output);
    } else if (format === "jpeg") {
      canvasmap.exportJpg(output);
    } else {
      canvasmap.exportPng(output);
    }
  });
