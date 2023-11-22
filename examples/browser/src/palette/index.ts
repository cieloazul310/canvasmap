import {
  defaultPalette,
  type Palette,
  type DefinePaletteOptions,
} from "@cieloazul310/canvasmap";
import {
  onChange,
  canonicalizeHex,
  createNestedPalette,
  getNestedPalette,
  resetNestedPalette,
} from "./utils";

const paletteNames: (keyof Palette)[] = [
  "building",
  "contour",
  "railway",
  "waterarea",
];
const nestedPaletteNames: ("background" | "road" | "label")[] = [
  "background",
  "road",
  "label",
];

export function createPaletteConfig() {
  const details = document.querySelector("#palette");
  if (!details) return;

  nestedPaletteNames.forEach((nestedPalette) => {
    const createConfig = createNestedPalette(nestedPalette);

    createConfig(details);
  });

  paletteNames.forEach((paletteName) => {
    const container = document.createElement("div");
    container.className = "palette";
    const storaged = localStorage.getItem(`canvasmap-palette-${paletteName}`);

    const input = document.createElement("input");
    input.setAttribute("type", "color");

    if (storaged) {
      input.setAttribute("value", canonicalizeHex(storaged));
    } else {
      input.setAttribute("value", canonicalizeHex(defaultPalette[paletteName]));
    }

    input.setAttribute("id", `palette-${paletteName}`);
    input.setAttribute("name", `palette-${paletteName}`);

    input.addEventListener("change", onChange(paletteName));

    const label = document.createElement("label");
    label.setAttribute("for", `palette-${paletteName}`);
    label.innerText = paletteName;

    container.appendChild(input);
    container.appendChild(label);

    details.appendChild(container);
  });
}

export function getPalette(): DefinePaletteOptions {
  const background = getNestedPalette("background");
  const road = getNestedPalette("road");
  const label = getNestedPalette("label");

  const palette = paletteNames.reduce<Partial<Palette>>((accum, curr) => {
    const el = document.querySelector<HTMLInputElement>(`#palette-${curr}`);
    if (!el) return { ...accum, [curr]: defaultPalette[curr] };

    return {
      ...accum,
      [curr]: el.value,
    };
  }, {});

  return {
    ...palette,
    background,
    road,
    label,
  };
}

export function resetPalette() {
  nestedPaletteNames.forEach((nestedPaletteName) => {
    resetNestedPalette(nestedPaletteName);
  });

  paletteNames.forEach((paletteName) => {
    const el = document.querySelector<HTMLInputElement>(
      `#palette-${paletteName}`,
    );
    if (!el) return;

    el.value = canonicalizeHex(defaultPalette[paletteName]);
    localStorage.removeItem(`canvasmap-palette-${paletteName}`);
  });
}
