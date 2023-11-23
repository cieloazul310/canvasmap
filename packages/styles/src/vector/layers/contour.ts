import type { VectorTileLayer } from "./types";

type ContourProperties = {
  alti: number;
};

function contourWidth({ alti }: ContourProperties): number {
  return (alti as number) % 50 === 0 ? 1 : 0.5;
}

const contour: VectorTileLayer<ContourProperties> = {
  layerName: "contour",
  render:
    ({ context, theme }) =>
    ({ properties }) => {
      const { alti } = properties;
      context.lineWidth = contourWidth({ alti });
      context.strokeStyle = theme.palette.contour;
      context.stroke();
    },
};

export default contour;
