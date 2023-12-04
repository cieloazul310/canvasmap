import type { Theme } from "@cieloazul310/canvasmap-utils";
import type { VectorTileLayer, VectorTileFeatureProperties } from "./types";

function boundaryWidth({ ftCode }: VectorTileFeatureProperties): number {
  return ftCode === 1211 ? 3 : 2;
}

function boundaryColor(
  { ftCode }: VectorTileFeatureProperties,
  { palette }: Theme,
): string {
  if (ftCode === 1211) return palette.boundary.pref;
  return palette.boundary.town;
}

const boundary: VectorTileLayer = {
  layerName: "boundary",
  render:
    ({ context, theme }) =>
    ({ properties }) => {
      const { ftCode } = properties;
      /**
       * 1211: 都府県界及び北海道総合振興局・振興局界
       * 1212: 市区町村界
       */
      if (ftCode !== 1211 && ftCode !== 1212) return;
      context.lineWidth = boundaryWidth({ ftCode });
      context.strokeStyle = boundaryColor({ ftCode }, theme);
      context.setLineDash([6, 6]);
      context.stroke();
      context.setLineDash([]);
    },
};

export default boundary;
