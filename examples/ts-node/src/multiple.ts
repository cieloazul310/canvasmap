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

  await map
    .clearContext()
    .setZoomDelta(1)
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

  await map
    .clearContext()
    .setTheme({ palette: bitterPalette })
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

  await map
    .clearContext()
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

  await map
    .clearContext()
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

  await map
    .clearContext()
    .setZoomDelta(-1)
    .setTitle("Webp (Hi-Res)")
    .renderRasterMap()
    .then(async (canvasMap) => {
      await canvasMap.exportWebp("./dist/multiple/raster-zoom-minus.webp");
    })
    .catch((err) => {
      throw new Error(err);
    });
})();
