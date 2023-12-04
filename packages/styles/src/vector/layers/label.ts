import {
  labelColor,
  textPos,
  getLabelSize,
  type VectorTileLayer,
  type DspPos,
} from "./types";

type LabelProperties = { annoCtg: number; knj: string; dspPos: DspPos };

/**
 * 210: 公称(町字名)
 * 311: 山名
 * 312: 山、岳、峰等
 * 321: 湖、沼、池、浦等
 * 322: 河川、用水等
 * 331: 高原、原、森、林、平、砂丘、湿原
 * 344: 海、灘
 * 422: 鉄道駅名
 * 441: 飛行場名
 * 532: 史跡名勝天然記念物
 * 621: 県庁
 * 631: 大学・大学院
 * 681: その他の主要・著名な建物
 */
const includedAnnoCtg = [
  210, 311, 312, 321, 322, 331, 344, 411, 422, 441, 621, 631, 681,
];

const label: VectorTileLayer<LabelProperties> = {
  layerName: "label",
  render:
    ({ context, theme, projection }) =>
    ({ geometry, properties }) => {
      if (!("coordinates" in geometry)) return;
      const { fontSizes } = theme;
      const { knj, annoCtg, dspPos } = properties;
      if (!includedAnnoCtg.includes(annoCtg)) return;
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
