const { CanvasMap } = require("@cieloazul310/canvasmap");

const width = 1200;
const height = 630;
const map = new CanvasMap(width, height, {
  center: [140.4602, 36.3703],
  zoom: 13,
  title: 'Canvas Map for Data Visualization',
});
map.renderBasemap('vector').then((canvas) => {
  canvas.exportPng("./dist/basic.png");
})
.catch((err) => console.error(err));
