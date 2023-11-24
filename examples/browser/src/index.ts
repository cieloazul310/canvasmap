import { CanvasMap } from "@cieloazul310/canvasmap/browser";
import { getConfig, createConfig, resetConfig } from "./config";
import { createLayersList, getLayerNames, resetLayers } from "./layers";
import { createPaletteConfig, getPalette, resetPalette } from "./palette";

const map = new CanvasMap(600, 600);

async function render() {
  const loader = document.querySelector("#loader");
  if (loader) {
    loader.classList.add("show");
  }

  const { width, height, lon, lat, zoom, title, zoomDelta } = getConfig();
  const layers = getLayerNames();
  const palette = getPalette();

  map.setTitle(title);
  map.setSize({ width, height });
  map.setCenter([lon, lat]);
  map.setZoom(zoom);
  map.setTheme({ palette });
  map.setZoomDelta(zoomDelta);

  map.clearContext();
  await map.renderVectorMap({ layers }).then(() => {
    if (loader) {
      loader.classList.remove("show");
    }
  });
  map.renderText();

  const viewer = document.querySelector("#map");
  const currentFigure = document.querySelector("#map figure");
  if (viewer) {
    const container = document.createElement("figure");
    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <ul>
        <li>size: ${width}x${height}</li>
        <li>center: ${lon}, ${lat}</li>
        <li>zoom: ${zoom}</li>
        <li>zoomDelta: ${zoomDelta}</li>
      </ul>
    `;

    const canvas = map.getCanvas();
    container.appendChild(canvas);
    container.appendChild(caption);

    if (currentFigure) {
      viewer.removeChild(currentFigure);
    }
    viewer.appendChild(container);
  }
}

function reset() {
  resetConfig();
  resetLayers();
  resetPalette();
}

createConfig();
createLayersList();
createPaletteConfig();

window.addEventListener("load", render);

const button = document.querySelector("#render");
button?.addEventListener("click", render);

const resetButton = document.querySelector("#reset");
resetButton?.addEventListener("click", reset);
