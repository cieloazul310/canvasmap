import {
  labelColor,
  textPos,
  getLabelSize,
  type VectorTileLayer,
} from "./types";

const label: VectorTileLayer = {
  layerName: "label",
  render:
    ({ context, theme, projection }) =>
    (feature) => {
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

export default label;
