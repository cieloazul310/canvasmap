import { CanvasMap } from "@cieloazul310/canvasmap";

const map = new CanvasMap(1200, 630, {
  zoom: 13,
  center: [140.4602, 36.3703],
});

(async () => {
  await map
    .clearContext()
    .setZoomDelta(-1)
    .setTitle(`ZoomDelta (${-1})`)
    .renderRasterMap()
    .then((canvas) => {
      canvas.exportPng(`./dist/zoomDelta/${-1}.png`, {
        palette: false,
        colors: undefined,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  await map
    .clearContext()
    .setZoomDelta(0)
    .setTitle(`ZoomDelta (${0})`)
    .renderRasterMap()
    .then((canvas) => {
      canvas.exportPng(`./dist/zoomDelta/${0}.png`, {
        palette: false,
        colors: undefined,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  await map
    .clearContext()
    .setZoomDelta(1)
    .setTitle(`ZoomDelta (${1})`)
    .renderRasterMap()
    .then((canvas) => {
      canvas.exportPng(`./dist/zoomDelta/${1}.png`, {
        palette: false,
        colors: undefined,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  await map
    .clearContext()
    .setZoomDelta(2)
    .setTitle(`ZoomDelta (${2})`)
    .renderRasterMap()
    .then((canvas) => {
      canvas.exportPng(`./dist/zoomDelta/${2}.png`, {
        palette: false,
        colors: undefined,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
})();
