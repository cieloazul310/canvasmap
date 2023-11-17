export type Palette = {
  background: {
    main: string;
    contrast: string;
  };
  waterarea: string;
  railway: string;
  road: {
    national: string;
    highway: string;
    base: string;
  };
  building: string;
  contour: string;
  label: {
    terrain: string;
    water: string;
    em: string;
    base: string;
  };
};

export const defaultPalette: Palette = {
  background: {
    main: "#fff",
    contrast: "#eee",
  },
  waterarea: "#ccd",
  railway: "#999",
  road: {
    national: "#dcb",
    highway: "#cdc",
    base: "#ddd",
  },
  building: "#eed",
  contour: "#cba",
  label: {
    terrain: "#977",
    water: "#aac",
    em: "#aaa",
    base: "#ccc",
  },
};

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
