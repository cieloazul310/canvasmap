import { CanvasMap } from "@cieloazul310/canvasmap";

const width = 1200;
const height = 630;
const map = new CanvasMap(width, height, {
  title: "Canvas Map for Data Visualization",
  bbox: [140.391646, 36.330038, 140.515123, 36.423687],
});

map.renderVectorMap().then((canvasmap) => {
  canvasmap.exportPng("./dist/with-bbox.png");
});
