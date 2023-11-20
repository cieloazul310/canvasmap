import type { Feature } from "@turf/helpers";
import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from "canvas";
import type { GeoProjection } from "d3-geo";
import type { Theme, MapFontSizes } from "@cieloazul310/canvasmap-utils";

export type VectorLayerNames =
  | "building"
  | "contour"
  | "label"
  | "railway"
  | "road"
  | "symbol"
  | "waterarea";

export type VectorTileLayer = {
  layerName: VectorLayerNames;
  render: ({
    context,
    theme,
    projection,
  }: {
    context: CanvasRenderingContext2D | NodeCanvasRenderingContext2D;
    theme: Theme;
    projection: GeoProjection;
  }) => (feature: Feature) => void;
};

export function getLabelSize(annoCtg: number): keyof MapFontSizes {
  return annoCtg === 210 ? "small" : "default";
}

export function labelColor(annoCtg: number, { palette }: Theme): string {
  if ([312, 1312, 2312].includes(annoCtg)) return palette.label.terrain;
  if ([321, 1321, 2321, 322, 1322, 2322].includes(annoCtg))
    return palette.label.water;
  if (annoCtg === 422) return palette.label.em;
  return palette.label.base;
}

function dspPosToAlign(align: string) {
  if (align === "L") return "left";
  if (align === "R") return "right";
  return "center";
}

function dspPosToBaseline(baseline: string) {
  if (baseline === "T") return "top";
  if (baseline === "B") return "bottom";
  return "middle";
}

export function textPos({
  properties,
}: Feature): [CanvasTextAlign, CanvasTextBaseline] {
  if (!properties || !("dspPos" in properties)) return ["center", "middle"];
  const { dspPos } = properties;
  const align = (dspPos as string).slice(0, 1);
  const baseline = (dspPos as string).slice(1, 2);

  return [dspPosToAlign(align), dspPosToBaseline(baseline)];
}
