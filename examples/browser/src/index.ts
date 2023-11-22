import { CanvasMapBrowser } from "@cieloazul310/canvasmap";
import { getConfig, createConfig, resetConfig } from "./config";
import { createLayersList, getLayerNames, resetLayers } from "./layers";
import { createPaletteConfig, getPalette, resetPalette } from "./palette";

async function onClick() {
  const { width, height, lon, lat, zoom, title } = getConfig();
  const layers = getLayerNames();
  const palette = getPalette();

  const map = new CanvasMapBrowser(width, height, {
    center: [lon, lat],
    zoom,
    title,
    theme: {
      palette,
    },
  });

  await map.renderVectorMap({ layers });

  const viewer = document.querySelector("#map");
  if (viewer) {
    const container = document.createElement("figure");
    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <ul>
        <li>size: ${width}x${height}</li>
        <li>center: ${lon}, ${lat}</li>
        <li>zoom: ${zoom}</li>
      </ul>
    `;

    const canvas = map.getCanvas();
    container.appendChild(canvas);
    container.appendChild(caption);

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

const button = document.querySelector("#render");
button?.addEventListener("click", onClick);

const resetButton = document.querySelector("#reset");
resetButton?.addEventListener("click", reset);
