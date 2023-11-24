import {
  CanvasMap,
  definePalette,
  vectorLayerNamesExclude,
} from "@cieloazul310/canvasmap";

const map = new CanvasMap(1200, 630, {
  zoom: 13,
  center: [140.4602, 36.3703],
});

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

(async () => {
  await map
    .setTitle("Basic")
    .renderVectorMap()
    .then((canvas) => {
      canvas.exportPng("./dist/multiple/basic.png");
    })
    .catch((err) => {
      throw new Error(err);
    });

  map.clearContext();

  await map
    .setResolution(2)
    .setTitle("Hi-Res")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then((canvas) => {
      canvas.exportPng("./dist/multiple/hi-res.png");
    })
    .catch((err) => {
      throw new Error(err);
    });

  map.clearContext();
  map.setTheme({ palette });
  await map
    .setTitle("Custom palette (Hi-Res)")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then((canvasMap) => {
      const canvas = canvasMap.getCanvas();
      canvasMap.exportPng("./dist/multiple/custom-palette.png", {
        compressionLevel: 9,
        filters: canvas.PNG_ALL_FILTERS,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  map.clearContext();
  await map
    .setTitle("Raster (Hi-Res)")
    .renderRasterMap()
    .then((canvas) => {
      canvas.exportPng("./dist/multiple/raster.png");
    })
    .catch((err) => {
      throw new Error(err);
    });
})();
