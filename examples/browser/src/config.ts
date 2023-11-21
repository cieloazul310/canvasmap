const fields = [
  {
    id: "width",
    name: "Width",
    type: "number",
    required: true,
    min: 300,
    max: 1200,
    defaultValue: 600,
  },
  {
    id: "height",
    name: "Height",
    type: "number",
    required: true,
    min: 300,
    max: 1200,
    defaultValue: 600,
  },
  {
    id: "lon",
    name: "Longitude",
    type: "number",
    required: true,
    min: 122,
    max: 149,
    step: 0.0001,
    defaultValue: 140.4602,
  },
  {
    id: "lat",
    name: "Latitude",
    type: "number",
    required: true,
    min: 20,
    max: 46,
    step: 0.0001,
    defaultValue: 36.3703,
  },
  {
    id: "zoom",
    name: "Zoom",
    type: "number",
    required: true,
    min: 2,
    max: 16,
    step: 0.1,
    defaultValue: 15,
  },
  {
    id: "title",
    name: "Title",
    type: "text",
    defaultValue: "Map title (optional)",
  },
];

const onChange = (id: string) => (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  localStorage.setItem(`canvasmap-config-${id}`, value);
};

export function createConfig() {
  const configContainer = document.querySelector("#config");
  if (!configContainer) return;

  fields.forEach(
    ({ id, name, type, required, max, min, step, defaultValue }) => {
      const container = document.createElement("div");
      const storaged = localStorage.getItem(`canvasmap-config-${id}`);
      const input = document.createElement("input");
      input.setAttribute("type", type);
      if (required) {
        input.setAttribute("required", "true");
      }
      if (min) {
        input.setAttribute("min", min.toString());
      }
      if (max) {
        input.setAttribute("max", max.toString());
      }
      if (step) {
        input.setAttribute("step", step.toString());
      }
      if (storaged) {
        input.setAttribute("value", storaged);
      } else if (required) {
        input.setAttribute("value", String(defaultValue));
      } else {
        input.setAttribute("placeholder", String(defaultValue));
      }

      input.setAttribute("id", id);
      input.setAttribute("name", id);

      input.addEventListener("change", onChange(id));

      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.innerText = `${name}:`;

      container.appendChild(label);
      container.appendChild(input);
      configContainer.appendChild(container);
    },
  );
}

export function getSize() {
  const w = document.querySelector<HTMLInputElement>("#width");
  const h = document.querySelector<HTMLInputElement>("#height");

  if (!w?.value || !h?.value) return { width: 600, height: 600 };
  return {
    width: parseInt(w.value, 10),
    height: parseInt(h.value, 10),
  };
}

export function getView() {
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

export function getTitle() {
  const t = document.querySelector<HTMLInputElement>("#title");

  return t?.value;
}

export function getConfig() {
  const { width, height } = getSize();
  const { lon, lat, zoom } = getView();
  const title = getTitle();

  return { width, height, lon, lat, zoom, title };
}

export function resetConfig() {
  fields.forEach(({ id, required, defaultValue }) => {
    const el = document.querySelector<HTMLInputElement>(`#${id}`);
    if (!el) return;

    if (required) {
      el.value = String(defaultValue);
    } else {
      el.value = "";
    }
    localStorage.removeItem(`canvasmap-config-${id}`);
  });
}
