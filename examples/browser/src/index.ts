import { CanvasMapBrowser } from "@cieloazul310/canvasmap";
import "./style.css";

const width = 1200;
const height = 1200;
const map = new CanvasMapBrowser(width, height, {
  center: [140.4602, 36.3703],
  zoom: 15,
  title: "Canvas Map for Data Visualization",
});

await map.renderBasemap("vector");

const container = document.getElementById("map");
if (container) {
  const canvas = map.getCanvas();
  container.appendChild(canvas);
}
