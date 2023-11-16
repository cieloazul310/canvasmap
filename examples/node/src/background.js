const fs = require("fs");
const path = require("path");
const { CanvasMap } = require("@cieloazul310/canvasmap");

const geojson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./data/ibaraki.geojson"), "utf8"),
);
const [mito] = geojson.features.filter(
  ({ properties }) => properties.N03_004 === "水戸市",
);

const width = 800;
const height = 800;
const map = new CanvasMap(width, height, {
  title: "Feature as Background",
});
map
  .setProjectionFitExtent(mito)
  .renderBasemap("vector", { backgroundFeature: mito })
  .then((canvas) => {
    canvas.addAttribution("国土数値情報");
    canvas.exportPng("./dist/background.png");
  })
  .catch((err) => console.error(err));
