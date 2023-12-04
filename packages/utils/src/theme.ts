import { definePadding, type Padding } from "./padding";
import { definePalette, type Palette, DefinePaletteOptions } from "./palette";
import { defineMapFontSizes, type MapFontSizes } from "./mapFontSizes";

export type Theme = {
  fontSizes: MapFontSizes;
  padding: Padding;
  palette: Palette;
};

export type DefineThemeOptions = {
  width: number;
  height: number;
  padding?: Partial<Padding>;
  palette?: DefinePaletteOptions;
};

export function defineTheme({
  palette,
  padding,
  width,
  height,
}: DefineThemeOptions): Theme {
  return {
    fontSizes: defineMapFontSizes(width),
    padding: definePadding(width, height, padding),
    palette: definePalette(palette),
  };
}
