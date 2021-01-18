/* eslint @typescript-eslint/no-var-requires: off */
const { CanvasMap } = require('../dist');

(async () => {
  const width = 1200;
  const height = 1200;
  const map = new CanvasMap(width, height, {
    center: [139.701175, 35.720874],
    zoom: 14,
    title: 'Async',
  });
  await map.renderBasemap('vector').then((map) => {
    map.exportPng('./gallery/async.png');
  });
})().catch((err) => console.error(err));
