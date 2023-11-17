import type { VectorTileLayer } from "./types";

const waterarea: VectorTileLayer = {
  layerName: "waterarea",
  render:
    ({ context, theme }) =>
    () => {
      context.fillStyle = theme.palette.waterarea;
      context.fill();
    },
};

export default waterarea;
