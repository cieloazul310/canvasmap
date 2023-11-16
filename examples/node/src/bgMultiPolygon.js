const fs = require("fs");
const path = require("path");
const { CanvasMap } = require("@cieloazul310/canvasmap");

const geojson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./data/ibaraki.geojson"), "utf8"),
);

const width = 800;
const height = 800;
const map = new CanvasMap(width, height, {
  title: "MultiPolygon as Background",
});
map
  .setProjectionFitExtent(geojson)
  .renderBasemap("vector", { backgroundFeature: geojson })
  .then((canvas) => {
    canvas.addAttribution("国土数値情報");
    canvas.exportPng("./dist/bgPolygon.png");
  })
  .catch((err) => console.error(err));
