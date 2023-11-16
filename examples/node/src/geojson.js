const fs = require("fs");
const path = require("path");
const { CanvasMap } = require("@cieloazul310/canvasmap");

const geojson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./data/ibaraki.geojson"), "utf8"),
);
const width = 800;
const height = 800;
const map = new CanvasMap(width, height, {
  title: "With GeoJSON",
});
map
  .setProjectionFitExtent(geojson)
  .renderBasemap("vector")
  .then((canvas) => {
    const context = canvas.getContext();
    const geoPath = canvas.getPath();
    geojson.features.forEach((feature) => {
      context.beginPath();
      geoPath(feature);
      context.fillStyle = "rgb(80, 100, 255)";
      context.globalCompositeOperation = "multiply";
      context.fill();
      context.globalCompositeOperation = "source-over";
    });
    canvas.addAttribution("国土数値情報");
    canvas.exportPng("./dist/geojson.png");
  })
  .catch((err) => console.error(err));
