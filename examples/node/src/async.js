const { CanvasMap } = require("@cieloazul310/canvasmap");

(async () => {
  const width = 1200;
  const height = 1200;
  const map = new CanvasMap(width, height, {
    center: [139.701175, 35.720874],
    zoom: 14,
    title: "Async",
  });
  await map.renderBasemap("vector").then((canvas) => {
    canvas.exportPng("./gallery/async.png");
  });
})().catch((err) => console.error(err));