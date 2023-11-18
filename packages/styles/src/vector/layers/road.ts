import type { Feature } from "@turf/helpers";
import type { Theme } from "@cieloazul310/canvasmap-utils";
import type { VectorTileLayer } from "./types";

function roadStrokeColor({ properties }: Feature, { palette }: Theme): string {
  if (!properties || !("rdCtg" in properties)) return palette.background.main;
  const { rdCtg } = properties;

  if (rdCtg === 0) return palette.road.national;
  if (rdCtg === 3) return palette.road.highway;
  return palette.road.base;
}

function roadLineWidth({ properties }: Feature): number {
  if (!properties || !("rnkWidth" in properties)) return 0;
  const { rnkWidth } = properties;

  if (rnkWidth === 0 || rnkWidth === 5 || rnkWidth === 6) return 0.5;
  if (rnkWidth === 2) return 2;
  if (rnkWidth === 3 || rnkWidth === 4) return 3;
  return 1;
}

const road: VectorTileLayer = {
  layerName: "road",
  render:
    ({ context, theme }) =>
    (feature) => {
      context.strokeStyle = roadStrokeColor(feature, theme);
      context.lineWidth = roadLineWidth(feature);
      context.stroke();
    },
};

export default road;
