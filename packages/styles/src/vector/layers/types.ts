import type { Feature, Geometry, GeometryCollection } from "@turf/helpers";
import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from "canvas";
import type { GeoProjection } from "d3-geo";
import type { Theme, MapFontSizes } from "@cieloazul310/canvasmap-utils";

export type VectorTileFeatureProperties<P = Record<string, unknown>> = {
  ftCode: number;
} & P;

export type VectorLayerNames =
  | "boundary"
  | "building"
  | "contour"
  | "label"
  | "railway"
  | "road"
  | "symbol"
  | "waterarea";

export type VectorTileLayer<P = Record<string, unknown>> = {
  layerName: VectorLayerNames;
  render: ({
    context,
    theme,
    projection,
  }: {
    context: CanvasRenderingContext2D | NodeCanvasRenderingContext2D;
    theme: Theme;
    projection: GeoProjection;
  }) => (
    feature: Feature<
      Geometry | GeometryCollection,
      VectorTileFeatureProperties<P>
    >,
  ) => void;
  sort?: (
    a: Feature<Geometry | GeometryCollection, VectorTileFeatureProperties<P>>,
    b: Feature<Geometry | GeometryCollection, VectorTileFeatureProperties<P>>,
  ) => number;
};

export type DspPos =
  | "LT"
  | "CT"
  | "RT"
  | "LC"
  | "CC"
  | "RC"
  | "LB"
  | "CB"
  | "RB";
export type Align = "L" | "C" | "R";
export type Baseline = "T" | "C" | "B";

function getAlignBaseline(dspPos: DspPos) {
  if (!dspPos) return { align: "C" as Align, baseline: "C" as Baseline };
  const align = dspPos.slice(0, 1) as Align;
  const baseline = dspPos.slice(1, 2) as Baseline;

  return { align, baseline };
}

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

function dspPosToAlign(align: Align) {
  if (align === "L") return "left";
  if (align === "R") return "right";
  return "center";
}

function dspPosToBaseline(baseline: Baseline) {
  if (baseline === "T") return "top";
  if (baseline === "B") return "bottom";
  return "middle";
}

export function textPos({
  dspPos,
}: {
  dspPos: DspPos;
}): [CanvasTextAlign, CanvasTextBaseline] {
  const { align, baseline } = getAlignBaseline(dspPos);
  return [dspPosToAlign(align), dspPosToBaseline(baseline)];
}
