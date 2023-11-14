const { CanvasMap } = require("@cieloazul310/canvasmap");

const width = 800;
const height = 800;
const map = new CanvasMap(width, height, {
  center: [140.4602, 36.3703],
  zoom: 10,
  title: "Raster Tiles",
});
map
  .renderBasemap("raster")
  .then((canvas) => {
    canvas.exportPng("./dist/raster.png");
  })
  .catch((err) => console.error(err));
