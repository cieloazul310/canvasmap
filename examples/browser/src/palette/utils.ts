import { defaultPalette, type Palette } from "@cieloazul310/canvasmap";

export const onChange = (id: string) => (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  localStorage.setItem(`canvasmap-palette-${id}`, value);
};

export function canonicalizeHex(input?: string | Record<string, string>) {
  if (!input) return "#000000";
  if (typeof input === "object") return "#000000";
  if (input.slice(0, 1) === "#" && input.length === 4) {
    const r = input.slice(1, 2);
    const g = input.slice(2, 3);
    const b = input.slice(3, 4);
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return input;
}

export type NestedPaletteNames = "background" | "road" | "label" | "boundary";

function nestedKeys<T extends NestedPaletteNames>(variant: T) {
  if (variant === "background")
    return ["main", "contarst"] as (keyof Palette["background"])[];
  if (variant === "road")
    return ["base", "national", "highway"] as (keyof Palette["road"])[];
  if (variant === "boundary")
    return ["pref", "town"] as (keyof Palette["boundary"])[];
  return ["base", "em", "water", "terrain"] as (keyof Palette["label"])[];
}

export function createNestedPalette<T extends NestedPaletteNames>(variant: T) {
  return (target: Element) => {
    const section = document.createElement("div");
    section.className = "palette-section";
    const sectionTitle = document.createElement("small");
    sectionTitle.innerText = variant;
    section.append(sectionTitle);

    const keys = nestedKeys(variant);
    const defaultNestedPalette = defaultPalette[variant];

    keys.forEach((key) => {
      const container = document.createElement("div");
      container.className = "palette";
      const paletteName = `${variant}-${key}`;
      const storaged = localStorage.getItem(`canvasmap-palette-${paletteName}`);

      const input = document.createElement("input");
      input.setAttribute("type", "color");

      if (storaged) {
        input.setAttribute("value", canonicalizeHex(storaged));
      } else {
        // @ts-ignore
        input.setAttribute("value", canonicalizeHex(defaultNestedPalette[key]));
      }

      input.setAttribute("id", `palette-${paletteName}`);
      input.setAttribute("name", `palette-${paletteName}`);

      input.addEventListener("change", onChange(paletteName));

      const label = document.createElement("label");
      label.setAttribute("for", `palette-${paletteName}`);
      label.innerText = key;

      container.appendChild(input);
      container.appendChild(label);

      section.appendChild(container);
    });

    target.appendChild(section);
  };
}

export function getNestedPalette<T extends NestedPaletteNames>(variant: T) {
  const keys = nestedKeys(variant);
  const defaultNestedPalette = defaultPalette[variant];

  return keys.reduce<Partial<Palette[T]>>((accum, curr) => {
    const paletteName = `${variant}-${curr}`;

    const el = document.querySelector<HTMLInputElement>(
      `#palette-${paletteName}`,
    );
    // @ts-ignore
    if (!el) return { ...accum, [curr]: defaultNestedPalette[curr] };

    return {
      ...accum,
      [curr]: el.value,
    };
  }, {});
}

export function resetNestedPalette<T extends NestedPaletteNames>(variant: T) {
  const keys = nestedKeys(variant);
  const defaultNestedPalette = defaultPalette[variant];

  keys.forEach((key) => {
    const paletteName = `${variant}-${key}`;

    const el = document.querySelector<HTMLInputElement>(
      `#palette-${paletteName}`,
    );
    if (!el) return;

    // @ts-ignore
    el.value = canonicalizeHex(defaultNestedPalette[key]);
    localStorage.removeItem(`canvasmap-palette-${paletteName}`);
  });
}
