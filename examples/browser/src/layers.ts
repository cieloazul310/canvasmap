import type { VectorLayerNames } from "@cieloazul310/canvasmap";

const layerNames: VectorLayerNames[] = [
  "boundary",
  "building",
  "contour",
  "label",
  "railway",
  "road",
  "symbol",
  "waterarea",
];

const onChange = (id: string) => (event: Event) => {
  const { checked } = event.target as HTMLInputElement;
  localStorage.setItem(`canvasmap-layer-${id}`, String(checked));
};

export function createLayersList() {
  const details = document.querySelector("#layers");
  if (!details) return;

  layerNames.forEach((layerName) => {
    const container = document.createElement("div");
    const storaged = localStorage.getItem(`canvasmap-layer-${layerName}`);

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    if (storaged) {
      input.checked = Boolean(JSON.parse(storaged));
    } else {
      input.checked = true;
    }
    input.setAttribute("id", layerName);
    input.setAttribute("name", layerName);

    input.addEventListener("change", onChange(layerName));

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

export function resetLayers() {
  layerNames.forEach((layerName) => {
    const el = document.querySelector<HTMLInputElement>(`#${layerName}`);

    if (!el) return;
    el.checked = true;
    localStorage.removeItem(`canvasmap-layer-${layerName}`);
  });
}
