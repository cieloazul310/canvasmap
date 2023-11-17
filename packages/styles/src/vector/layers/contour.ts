import type { Feature } from "@turf/helpers";
import type { VectorTileLayer } from "./types";

function contourWidth({ properties }: Feature): number {
  if (!properties || !("alti" in properties)) return 0;
  const { alti } = properties;
  return (alti as number) % 50 === 0 ? 1 : 0.5;
}

const contour: VectorTileLayer = {
  layerName: "contour",
  render:
    ({ context, theme }) =>
    (feature) => {
      context.lineWidth = contourWidth(feature);
      context.strokeStyle = theme.palette.contour;
      context.stroke();
    },
};

export default contour;
