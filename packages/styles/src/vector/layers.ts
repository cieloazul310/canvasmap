import type { Feature } from "@turf/helpers";
import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from "canvas";
import type { GeoProjection } from "d3-geo";
import type { Theme, MapFontSizes } from "@cieloazul310/canvasmap-utils";

type VectorTileLayer = {
  layerName: string;
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

export const waterarea: VectorTileLayer = {
  layerName: "waterarea",
  render:
    ({ context, theme }) =>
    () => {
      context.fillStyle = theme.palette.waterarea;
      context.fill();
    },
};

export const railway: VectorTileLayer = {
  layerName: "railway",
  render:
    ({ context, theme }) =>
    () => {
      context.strokeStyle = theme.palette.railway;
      context.lineWidth = 2;
      context.stroke();
    },
};

function roadStrokeColor({ properties }: Feature, { palette }: Theme): string {
  if (!properties || !("rdCtg" in properties)) return palette.background.main;
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

export const road: VectorTileLayer = {
  layerName: "road",
  render:
    ({ context, theme }) =>
    (feature: Feature) => {
      context.strokeStyle = roadStrokeColor(feature, theme);
      context.lineWidth = roadLineWidth(feature);
      context.stroke();
    },
};

function contourWidth({ properties }: Feature): number {
  if (!properties || !("alti" in properties)) return 0;
  const { alti } = properties;
  return (alti as number) % 50 === 0 ? 1 : 0.5;
}

export const contour: VectorTileLayer = {
  layerName: "contour",
  render:
    ({ context, theme }) =>
    (feature: Feature) => {
      context.lineWidth = contourWidth(feature);
      context.strokeStyle = theme.palette.contour;
      context.stroke();
    },
};

function getLabelSize(annoCtg: number): keyof MapFontSizes {
  return annoCtg === 210 ? "small" : "default";
}

function labelColor(annoCtg: number, { palette }: Theme): string {
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

export const label: VectorTileLayer = {
  layerName: "label",
  render:
    ({ context, theme, projection }) =>
    (feature: Feature) => {
      if (
        !feature.properties ||
        !("knj" in feature.properties) ||
        !("annoCtg" in feature.properties) ||
        !feature.geometry ||
        !("coordinates" in feature.geometry)
      )
        return;
      const { fontSizes } = theme;
      const { knj, annoCtg } = feature.properties;
      if (
        ![
          210, 312, 1312, 2312, 321, 1321, 2321, 322, 1322, 2322, 344, 1344,
          2344, 422, 681,
        ].includes(annoCtg as number)
      )
        return;
      const [x, y] = projection(
        feature.geometry?.coordinates as [number, number],
      ) ?? [0, 0];
      context.font = `bold ${fontSizes[getLabelSize(annoCtg)]}pt sans-serif`;
      const [align, baseline] = textPos(feature);
      context.textAlign = align;
      context.textBaseline = baseline;
      context.fillStyle = labelColor(annoCtg, theme);
      context.strokeStyle = theme.palette.background.main;
      context.strokeText(knj, x, y);
      context.fillText(knj, x, y);
    },
};

export const symbol: VectorTileLayer = {
  layerName: "symbol",
  render:
    ({ context, theme, projection }) =>
    (feature: Feature) => {
      if (
        !feature.properties ||
        !("ftCode" in feature.properties) ||
        !feature.geometry ||
        !("coordinates" in feature.geometry)
      )
        return;
      const { fontSizes, palette } = theme;
      const { ftCode, knj, name } = feature.properties;
      if (!knj && !name) return;
      if (![1401, 1402].includes(ftCode as number)) return;
      const [x, y] = projection(
        feature.geometry?.coordinates as [number, number],
      ) ?? [0, 0];
      context.font = `bold ${fontSizes.default}pt sans-serif`;
      const [align, baseline] = textPos(feature);
      context.textAlign = align;
      context.textBaseline = baseline;
      context.fillStyle = palette.label.em;
      context.strokeStyle = palette.background.main;
      context.strokeText(knj ?? name, x, y);
      context.fillText(knj ?? name, x, y);
    },
};
