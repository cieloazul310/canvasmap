import { CanvasMap } from "@cieloazul310/canvasmap";

(async () => {
  const width = 1200;
  const height = 1200;
  const map = new CanvasMap(width, height, {
    center: [139.701175, 35.720874],
    zoom: 14,
    title: "Async",
  });
  await map.renderVectorMap().then((canvas) => {
    canvas.exportPng("./dist/async.png");
  });
})().catch((err) => console.error(err));
