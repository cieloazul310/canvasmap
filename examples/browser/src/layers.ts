import type { VectorLayerNames } from "@cieloazul310/canvasmap";

const layerNames: VectorLayerNames[] = [
  "building",
  "contour",
  "label",
  "railway",
  "road",
  "symbol",
  "waterarea",
];

export function createLayersList() {
  const details = document.querySelector("details");
  if (!details) return;

  layerNames.forEach((layerName) => {
    const container = document.createElement("div");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.checked = true;
    input.setAttribute("id", layerName);
    input.setAttribute("name", layerName);
    const label = document.createElement("label");
    label.setAttribute("for", layerName);
    label.innerText = layerName;

    container.appendChild(input);
    container.appendChild(label);

    details.appendChild(container);
  });
}

export function getLayerNames() {
  return layerNames.filter((layerName) => {
    const el = document.querySelector<HTMLInputElement>(`#${layerName}`);
    if (!el) return true;

    return el.checked;
  });
}
