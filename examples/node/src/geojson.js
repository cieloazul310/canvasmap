/* eslint @typescript-eslint/no-var-requires: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off */
/* eslint @typescript-eslint/no-unsafe-call: off */
/* eslint @typescript-eslint/no-unsafe-member-access: off */
const fs = require('fs');
const path = require('path');
const { CanvasMap } = require("@cieloazul310/canvasmap");

const geojson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/ibaraki.geojson'), 'utf8'));
const width = 800;
const height = 800;
const map = new CanvasMap(width, height, geojson, {
  title: 'With GeoJSON',
});
map
  .renderBasemap('vector')
  .then((map) => {
    const context = map.getContext();
    const path = map.getPath();
    geojson.features.forEach((feature) => {
      context.beginPath();
      path(feature);
      context.fillStyle = 'rgb(80, 100, 255)';
      context.globalCompositeOperation = 'multiply';
      context.fill();
      context.globalCompositeOperation = 'source-over';
    });
    map.addAttribution('国土数値情報');
    map.exportPng('./gallery/geojson.png');
  })
  .catch((err) => console.error(err));
