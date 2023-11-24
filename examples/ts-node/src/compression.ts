import {
  CanvasMap,
  definePalette,
  vectorLayerNamesExclude,
} from "@cieloazul310/canvasmap";

const palette = definePalette({
  background: {
    main: "#eeeee7",
  },
  road: {
    base: "#ffffff",
    national: "#dabfa4",
    highway: "#afd4af",
  },
  contour: "#cbc7a9",
});

const map = new CanvasMap(1200, 630, {
  zoom: 13,
  center: [140.4602, 36.3703],
  resolution: 2,
  theme: {
    palette,
  },
});

(async () => {
  await map
    .setTitle("Basic")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then((canvasmap) => {
      const canvas = canvasmap.getCanvas();
      canvasmap.exportPng("./dist/compression/default.png", {
        compressionLevel: 6,
        filters: canvas.PNG_ALL_FILTERS,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  await map
    .clearContext()
    .setTitle("PNG Filter Avg")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then((canvasmap) => {
      const canvas = canvasmap.getCanvas();
      canvasmap.exportPng("./dist/compression/png-filter-avg.png", {
        compressionLevel: 6,
        filters: canvas.PNG_FILTER_AVG,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  await map
    .clearContext()
    .setTitle("Zero Compression")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then((canvasmap) => {
      const canvas = canvasmap.getCanvas();
      canvasmap.exportPng("./dist/compression/zero_compression.png", {
        compressionLevel: 0,
        filters: canvas.PNG_NO_FILTERS,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  await map
    .clearContext()
    .setTitle("Max Compression")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then((canvasmap) => {
      // const canvas = canvasmap.getCanvas();
      canvasmap.exportPng("./dist/compression/max_compression.png", {
        compressionLevel: 9,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
})();
