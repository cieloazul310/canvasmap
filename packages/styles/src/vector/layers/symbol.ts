import { textPos, type VectorTileLayer } from "./types";

const symbol: VectorTileLayer = {
  layerName: "symbol",
  render:
    ({ context, theme, projection }) =>
    (feature) => {
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

export default symbol;
