import { textPos, type VectorTileLayer, type DspPos } from "./types";

type SymbolProperties = {
  dspPos: DspPos;
  knj?: string;
  name?: string;
};

const symbol: VectorTileLayer<SymbolProperties> = {
  layerName: "symbol",
  render:
    ({ context, theme, projection }) =>
    ({ geometry, properties }) => {
      if (!("coordinates" in geometry)) return;
      const { fontSizes, palette } = theme;
      const { ftCode, knj, name, dspPos } = properties;
      if (!knj && !name) return;

      if (![1401, 1402].includes(ftCode as number)) return;
      const [x, y] = projection(geometry.coordinates as [number, number]) ?? [
        0, 0,
      ];
      context.font = `bold ${fontSizes.default}pt sans-serif`;
      const [align, baseline] = textPos({ dspPos });
      context.textAlign = align;
      context.textBaseline = baseline;
      context.fillStyle = palette.label.em;
      context.strokeStyle = palette.background.main;
      context.strokeText(knj ?? name ?? "", x, y);
      context.fillText(knj ?? name ?? "", x, y);
    },
};

export default symbol;
