import {
  CanvasMap,
  vectorLayerNamesExclude,
  bitterPalette,
} from "@cieloazul310/canvasmap";

const map = new CanvasMap(1200, 630, {
  zoom: 13,
  center: [140.4602, 36.3703],
});

(async () => {
  await map
    .setTitle("Basic")
    .renderVectorMap()
    .then(async (canvas) => {
      await canvas.exportPng("./dist/multiple/basic.png");
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
    .then(async (canvas) => {
      await canvas.exportPng("./dist/multiple/hi-res.png");
    })
    .catch((err) => {
      throw new Error(err);
    });

  map.clearContext();
  map.setTheme({ palette: bitterPalette });
  await map
    .setTitle("Custom palette (Hi-Res)")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then(async (canvasMap) => {
      await canvasMap.exportPng("./dist/multiple/custom-palette.png");
    })
    .catch((err) => {
      throw new Error(err);
    });

  map.clearContext();
  await map
    .setTitle("Raster (Hi-Res)")
    .renderRasterMap()
    .then(async (canvas) => {
      await canvas.exportPng("./dist/multiple/raster.png", {
        palette: false,
        colors: undefined,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  map.clearContext();
  await map
    .setTitle("Webp (Hi-Res)")
    .renderVectorMap({
      layers: vectorLayerNamesExclude(["label", "symbol"]),
    })
    .then(async (canvasMap) => {
      await canvasMap.exportWebp("./dist/multiple/custom-palette.webp");
    })
    .catch((err) => {
      throw new Error(err);
    });
})();
