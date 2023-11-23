import type { VectorTileLayer, VectorTileFeatureProperties } from "./types";

function boundaryWidth({ ftCode }: VectorTileFeatureProperties): number {
  return ftCode === 1211 ? 2 : 1;
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
      context.strokeStyle = theme.palette.boundary.pref;
      context.setLineDash([5, 5]);
      context.stroke();
      context.setLineDash([]);
    },
};

export default boundary;
