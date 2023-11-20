import {
  createCanvas,
  loadImage,
  type Image,
  type CanvasRenderingContext2D as NodeCanvasRenderingContext2D,
} from "canvas";
import { tileUrl } from "@cieloazul310/canvasmap-utils";
import type { RasterTilesOptions } from "./base";

async function rasterTilesNode(
  context: NodeCanvasRenderingContext2D,
  { tiles, url, width, height, grayScale }: RasterTilesOptions,
) {
  const tileSize = 256;
  const [x0, y0] = tiles[0];
  const [x1, y1] = tiles[tiles.length - 1];
  const tile =
    url ?? "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png";

  const offscreenContext = createCanvas(
    (x1 - x0 + 1) * tileSize,
    (y1 - y0 + 1) * tileSize,
  ).getContext("2d");

  const images = (await Promise.all(
    tiles.map(([x, y, z]) =>
      loadImage(tileUrl(tile)(x, y, z))
        .then((image) => [x, y, image])
        .catch(() => [x, y, null]),
    ),
  )) as [number, number, Image | null][];

  images.forEach(([x, y, image]) => {
    if (image) {
      offscreenContext.drawImage(
        image,
        (x - x0) * tileSize,
        (y - y0) * tileSize,
        tileSize,
        tileSize,
      );
    }
  });

  context.drawImage(
    offscreenContext.canvas,
    Math.round((x0 + tiles.translate[0]) * tiles.scale),
    Math.round((y0 + tiles.translate[1]) * tiles.scale),
    (x1 - x0 + 1) * tiles.scale,
    (y1 - y0 + 1) * tiles.scale,
  );

  if (grayScale && width && height) {
    const id = context.getImageData(0, 0, width, height);
    context.clearRect(0, 0, width, height);
    const { data } = id;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const y = 0.299 * r + 0.587 * g + 0.114 * b;
      data[i] = y;
      data[i + 1] = y;
      data[i + 2] = y;
    }
    context.putImageData(id, 0, 0);
  }
}

export default rasterTilesNode;
