import { CanvasMap } from "@cieloazul310/canvasmap";

const width = 1200;
const height = 630;
const map = new CanvasMap(width, height, {
  title: "Canvas Map for Data Visualization",
  bbox: [140.391646, 36.330038, 140.515123, 36.423687],
});
(async () => {
  await map.renderVectorMap().then((canvasmap) => {
    canvasmap.exportPng("./dist/with-bbox/large.png");
    console.log(`zoom: ${canvasmap.getZoom()}`);
  });

  await map
    .setSize({ width: 600, height: 315 })
    .clearContext()
    .renderVectorMap()
    .then((canvasmap) => {
      canvasmap.exportPng("./dist/with-bbox/small.png");
      console.log(`zoom: ${canvasmap.getZoom()}`);
    });

  await map
    .clearContext()
    .clearBBox()
    .setSize({ width, height })
    .renderVectorMap()
    .then((canvasmap) => {
      canvasmap.exportPng("./dist/with-bbox/clear_bbox.png");
      console.log(`zoom: ${canvasmap.getZoom()}`);
    });
})();
/*
  .renderVectorMap()
  .then((canvas) => {
    console.log(
      `center: ${canvas.getCenter().join(", ")}`,
      `zoom: ${canvas.getZoom()}`,
    );
    canvas.exportPng("./dist/with-bbox.png");
  })
  .catch((err) => console.error(err));
*/
