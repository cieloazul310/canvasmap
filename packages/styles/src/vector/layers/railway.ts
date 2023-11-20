import type { VectorTileLayer } from "./types";

const railway: VectorTileLayer = {
  layerName: "railway",
  render:
    ({ context, theme }) =>
    () => {
      context.strokeStyle = theme.palette.railway;
      context.lineWidth = 2;
      context.stroke();
    },
};

export default railway;
