import type { Tiles } from "d3-tile";
import type { GeoProjection } from "d3-geo";
import type { Theme } from "@cieloazul310/canvasmap-utils";

export type RasterTilesOptions = {
  url?: string;
  grayScale?: boolean;
  tileZoom?: number | null;
  attribution?: string | null;
  width?: number;
  height?: number;
  projection?: GeoProjection;
  tiles: Tiles;
  theme?: Theme;
};
