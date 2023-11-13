/* eslint @typescript-eslint/no-var-requires: off */
/* eslint @typescript-eslint/no-unsafe-assignment: off */
/* eslint @typescript-eslint/no-unsafe-call: off */
/* eslint @typescript-eslint/no-unsafe-member-access: off */
const fs = require('fs');
const path = require('path');
const { CanvasMap } = require("@cieloazul310/canvasmap");

const geojson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/ibaraki.geojson'), 'utf8'));
const [mito] = geojson.features.filter(({ properties }) => properties.N03_004  === '水戸市');

const width = 800;
const height = 800;
const map = new CanvasMap(width, height, mito, {
  title: 'Feature as Background',
});
map
  .renderBasemap('vector', { backgroundFeature: mito })
  .then((map) => {
    map.addAttribution('国土数値情報');
    map.exportPng('./gallery/background.png');
  })
  .catch((err) => console.error(err));
