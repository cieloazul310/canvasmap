import type { Feature } from "@turf/helpers";
import { palette, type MapFontSizes } from "../utils";
import type { CanvasMap } from "../canvasMap";

interface VectorLayer {
  layerName: string;
  render: (map: CanvasMap) => (feature: Feature) => void;
}

export const waterarea: VectorLayer = {
  layerName: "waterarea",
  render: (map: CanvasMap) => () => {
    const context = map.getContext();
    context.fillStyle = palette.waterArea;
    context.fill();
  },
};

export const railway: VectorLayer = {
  layerName: "railway",
  render: (map: CanvasMap) => () => {
    const context = map.getContext();
    context.strokeStyle = palette.railway;
    context.lineWidth = 2;
    context.stroke();
  },
};

function roadStrokeColor({ properties }: Feature): string {
  if (!properties || !("rdCtg" in properties)) return palette.background;
  const { rdCtg } = properties;

  if (rdCtg === 0) return palette.road.national;
  if (rdCtg === 3) return palette.road.highway;
  return palette.road.base;
}

function roadLineWidth({ properties }: Feature): number {
  if (!properties || !("rnkWidth" in properties)) return 0;
  const { rnkWidth } = properties;

  if (rnkWidth === 0 || rnkWidth === 5 || rnkWidth === 6) return 0.5;
  if (rnkWidth === 2) return 2;
  if (rnkWidth === 3 || rnkWidth === 4) return 3;
  return 1;
}

export const road: VectorLayer = {
  layerName: "road",
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    context.strokeStyle = roadStrokeColor(feature);
    context.lineWidth = roadLineWidth(feature);
    context.stroke();
  },
};

function contourWidth({ properties }: Feature): number {
  if (!properties || !("alti" in properties)) return 0;
  const { alti } = properties;
  return (alti as number) % 10 === 0 ? 2 : 1;
}

export const contour: VectorLayer = {
  layerName: "contour",
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    context.lineWidth = contourWidth(feature);
    context.strokeStyle = palette.contour;
    context.stroke();
  },
};

function getLabelSize(annoCtg: number): MapFontSizes {
  return annoCtg === 210 ? "small" : "default";
}

function labelColor(annoCtg: number): string {
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

function textPos({
  properties,
}: Feature): [CanvasTextAlign, CanvasTextBaseline] {
  if (!properties || !("dspPos" in properties)) return ["center", "middle"];
  const { dspPos } = properties;
  const align = (dspPos as string).slice(0, 1);
  const baseline = (dspPos as string).slice(1, 2);

  return [dspPosToAlign(align), dspPosToBaseline(baseline)];
}

export const label: VectorLayer = {
  layerName: "label",
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    if (
      !feature.properties ||
      !("knj" in feature.properties) ||
      !("annoCtg" in feature.properties) ||
      !feature.geometry ||
      !("coordinates" in feature.geometry)
    )
      return;
    const fontSize = map.getMapFontSize();
    const { knj, annoCtg } = feature.properties;
    if (
      ![
        210, 312, 1312, 2312, 321, 1321, 2321, 322, 1322, 2322, 344, 1344, 2344,
        422, 681,
      ].includes(annoCtg as number)
    )
      return;
    const projection = map.getProjection();
    const [x, y] = projection(
      feature.geometry?.coordinates as [number, number],
    ) ?? [0, 0];
    context.font = `bold ${fontSize[getLabelSize(annoCtg)]}pt sans-serif`;
    const [align, baseline] = textPos(feature);
    context.textAlign = align;
    context.textBaseline = baseline;
    context.fillStyle = labelColor(annoCtg);
    context.strokeStyle = palette.background;
    context.strokeText(knj, x, y);
    context.fillText(knj, x, y);
  },
};

export const symbol: VectorLayer = {
  layerName: "symbol",
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    if (
      !feature.properties ||
      !("ftCode" in feature.properties) ||
      !feature.geometry ||
      !("coordinates" in feature.geometry)
    )
      return;
    const fontSize = map.getMapFontSize();
    const { ftCode, knj, name } = feature.properties;
    if (!knj && !name) return;
    if (![1401, 1402].includes(ftCode as number)) return;
    const projection = map.getProjection();
    const [x, y] = projection(
      feature.geometry?.coordinates as [number, number],
    ) ?? [0, 0];
    context.font = `bold ${fontSize.default}pt sans-serif`;
    const [align, baseline] = textPos(feature);
    context.textAlign = align;
    context.textBaseline = baseline;
    context.fillStyle = palette.label.em;
    context.strokeStyle = palette.background;
    context.strokeText(knj ?? name, x, y);
    context.fillText(knj ?? name, x, y);
  },
};
