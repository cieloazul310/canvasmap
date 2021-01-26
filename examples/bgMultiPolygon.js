/* eslint @typescript-eslint/no-var-requires: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off */
/* eslint @typescript-eslint/no-unsafe-call: off */
/* eslint @typescript-eslint/no-unsafe-member-access: off */
const fs = require('fs');
const path = require('path');
const { CanvasMap } = require('../dist');

const geojson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/ibaraki.geojson'), 'utf8'));

const width = 800;
const height = 800;
const map = new CanvasMap(width, height, geojson, {
  title: 'MultiPolygon as Background',
});
map
  .renderBasemap('vector', { backgroundFeature: geojson })
  .then((map) => {
    map.addAttribution('国土数値情報');
    map.exportPng('./gallery/bgPolygon.png');
  })
  .catch((err) => console.error(err));
