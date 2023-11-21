import { defaultPalette, type Palette } from "@cieloazul310/canvasmap";
import { onChange, canonicalizeHex } from "./utils";

const keys: (keyof Palette["background"])[] = ["main", "contrast"];

export function createBackgroundPalette(target: Element) {
  const section = document.createElement("div");

  keys.forEach((key) => {
    const container = document.createElement("div");
    const paletteName = `background-${key}`;
    const storaged = localStorage.getItem(`canvasmap-palette-${paletteName}`);

    const input = document.createElement("input");
    input.setAttribute("type", "color");

    if (storaged) {
      input.setAttribute("value", canonicalizeHex(storaged));
    } else {
      input.setAttribute(
        "value",
        canonicalizeHex(defaultPalette.background[key]),
      );
    }

    input.setAttribute("id", `palette-${paletteName}`);
    input.setAttribute("name", `palette-${paletteName}`);

    input.addEventListener("change", onChange(paletteName));

    const label = document.createElement("label");
    label.setAttribute("for", `palette-${paletteName}`);
    label.innerText = paletteName;

    container.appendChild(input);
    container.appendChild(label);

    section.appendChild(container);
  });

  target.appendChild(section);
}

export function getBackgroundPalette(): Partial<Palette["background"]> {
  return keys.reduce<Partial<Palette["background"]>>((accum, curr) => {
    const paletteName = `background-${curr}`;

    const el = document.querySelector<HTMLInputElement>(
      `#palette-${paletteName}`,
    );
    if (!el) return { ...accum, [curr]: defaultPalette.background[curr] };

    return {
      ...accum,
      [curr]: el.value,
    };
  }, {});
}

export function resetBackgroundPalette() {
  keys.forEach((key) => {
    const paletteName = `background-${key}`;

    const el = document.querySelector<HTMLInputElement>(
      `#palette-${paletteName}`,
    );
    if (!el) return;

    el.value = canonicalizeHex(defaultPalette.background[key]);
    localStorage.removeItem(`canvasmap-palette-${paletteName}`);
  });
}
