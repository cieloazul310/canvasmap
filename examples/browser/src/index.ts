import { CanvasMapBrowser } from "@cieloazul310/canvasmap";
import { createLayersList, getLayerNames } from "./layers";

function getSize() {
  const w = document.querySelector<HTMLInputElement>("#width");
  const h = document.querySelector<HTMLInputElement>("#height");

  if (!w?.value || !h?.value) return { width: 600, height: 600 };
  return {
    width: parseInt(w.value, 10),
    height: parseInt(h.value, 10),
  };
}

function getView() {
  const x = document.querySelector<HTMLInputElement>("#lon");
  const y = document.querySelector<HTMLInputElement>("#lat");
  const z = document.querySelector<HTMLInputElement>("#zoom");

  if (!x?.value || !y?.value || !z?.value)
    return { lon: 140.4602, lat: 36.3703, zoom: 15 };
  return {
    lon: parseFloat(x.value),
    lat: parseFloat(y.value),
    zoom: parseFloat(z.value),
  };
}

function getTitle() {
  const t = document.querySelector<HTMLInputElement>("#title");

  return t?.value;
}

async function onClick() {
  const { width, height } = getSize();
  const { lon, lat, zoom } = getView();
  const title = getTitle();
  const layers = getLayerNames();

  const map = new CanvasMapBrowser(width, height, {
    center: [lon, lat],
    zoom,
    title,
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

createLayersList();
const button = document.querySelector("#render");
button?.addEventListener("click", onClick);
