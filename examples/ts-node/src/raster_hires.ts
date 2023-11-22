import { CanvasMap } from "@cieloazul310/canvasmap";

const width = 800;
const height = 800;
const map = new CanvasMap(width, height, {
  center: [140.4602, 36.3703],
  zoom: 10,
  title: "Raster Tiles",
  resolution: 2,
});
map
  .renderRasterMap()
  .then((canvas) => {
    canvas.exportPng("./dist/raster_hires.png");
  })
  .catch((err) => console.error(err));
