import defaultPalette from "./light";
import type { Palette } from "./types";

export type DefinePaletteOptions = Partial<
  Pick<Palette, "waterarea" | "railway" | "contour"> & {
    background: Partial<Palette["background"]>;
    road: Partial<Palette["road"]>;
    label: Partial<Palette["label"]>;
  }
>;

export function definePalette(palette?: DefinePaletteOptions): Palette {
  if (!palette) return defaultPalette;
  return {
    ...defaultPalette,
    ...palette,
    background: {
      ...defaultPalette.background,
      ...palette.background,
    },
    road: {
      ...defaultPalette.road,
      ...palette.road,
    },
    label: {
      ...defaultPalette.label,
      ...palette.label,
    },
  };
}
