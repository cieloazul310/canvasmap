/* eslint @typescript-eslint/no-var-requires: off */
const { CanvasMap } = require('../dist');

const width = 800;
const height = 800;
const map = new CanvasMap(width, height, {
  center: [140.4602, 36.3703],
  zoom: 10,
  title: 'Raster Tiles',
});
map
  .renderBasemap('raster')
  .then((map) => {
    map.exportPng('./gallery/raster.png');
  })
  .catch((err) => console.error(err));
