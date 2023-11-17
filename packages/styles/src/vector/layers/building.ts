import type { VectorTileLayer } from "./types";

const building: VectorTileLayer = {
  layerName: "building",
  render:
    ({ context, theme }) =>
    () => {
      context.fillStyle = theme.palette.building;
      context.fill();
    },
};

export default building;
