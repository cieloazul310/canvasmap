import type { Theme } from "@cieloazul310/canvasmap-utils";
import type { VectorTileLayer } from "./types";

type RoadProperties = { rnkWidth: number; rdCtg: number };

function roadZIndex({ rdCtg }: Pick<RoadProperties, "rdCtg">) {
  if (rdCtg === 3) return 4;
  if (rdCtg === 0) return 3;
  if (rdCtg === 1) return 2;
  if (rdCtg === 2) return 1;
  return 0;
}

function roadStrokeColor(
  { rdCtg }: Pick<RoadProperties, "rdCtg">,
  { palette }: Theme,
): string {
  if (rdCtg === 0) return palette.road.national;
  if (rdCtg === 3) return palette.road.highway;
  return palette.road.base;
}

function roadLineWidth({ rnkWidth }: Pick<RoadProperties, "rnkWidth">): number {
  if (rnkWidth === 0 || rnkWidth === 5 || rnkWidth === 6) return 0.5;
  if (rnkWidth === 2) return 2;
  if (rnkWidth === 3 || rnkWidth === 4) return 3;
  return 1;
}

const road: VectorTileLayer<{ rnkWidth: number; rdCtg: number }> = {
  layerName: "road",
  render:
    ({ context, theme }) =>
    ({ properties }) => {
      const { rnkWidth, rdCtg } = properties;
      context.strokeStyle = roadStrokeColor({ rdCtg }, theme);
      context.lineWidth = roadLineWidth({ rnkWidth });
      context.stroke();
    },
  sort: (a, b) => roadZIndex(a.properties) - roadZIndex(b.properties),
};

export default road;
