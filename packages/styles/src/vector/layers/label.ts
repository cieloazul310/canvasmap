import {
  labelColor,
  textPos,
  getLabelSize,
  type VectorTileLayer,
  type DspPos,
} from "./types";

type LabelProperties = { annoCtg: number; knj: string; dspPos: DspPos };

const label: VectorTileLayer<LabelProperties> = {
  layerName: "label",
  render:
    ({ context, theme, projection }) =>
    ({ geometry, properties }) => {
      if (!("coordinates" in geometry)) return;
      const { fontSizes } = theme;
      const { knj, annoCtg, dspPos } = properties;
      if (
        ![
          210, 312, 1312, 2312, 321, 1321, 2321, 322, 1322, 2322, 344, 1344,
          2344, 422, 681,
        ].includes(annoCtg)
      )
        return;
      const [x, y] = projection(geometry.coordinates as [number, number]) ?? [
        0, 0,
      ];
      context.font = `bold ${fontSizes[getLabelSize(annoCtg)]}pt sans-serif`;
      const [align, baseline] = textPos({ dspPos });
      context.textAlign = align;
      context.textBaseline = baseline;
      context.fillStyle = labelColor(annoCtg, theme);
      context.strokeStyle = theme.palette.background.main;
      context.strokeText(knj, x, y);
      context.fillText(knj, x, y);
    },
};

export default label;
