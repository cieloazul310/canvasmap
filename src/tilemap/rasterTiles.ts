import { createCanvas, loadImage, Image } from 'canvas';
import { tile as d3tile } from 'd3-tile';
import { CanvasMap } from '../canvasMap';
import { tileUrl } from '../utils/tileUrl';

interface Options {
  grayScale: boolean;
  tileZoom: number | null;
  attribution: string | null;
}

export function rasterTiles(url: string, options?: Partial<Options>): (map: CanvasMap) => Promise<void> {
  const opt: Options = {
    grayScale: options?.grayScale ?? false,
    tileZoom: options?.tileZoom ?? null,
    attribution: options?.attribution ?? null,
  };

  return async (map: CanvasMap) => {
    const { width, height } = map.getSize();
    const projection = map.getProjection();
    const context = map.getContext();
    if (opt.attribution) map.addAttribution(opt.attribution);

    const tile = d3tile()
      .size([width, height])
      .scale(projection.scale() * Math.PI * 2)
      .translate(projection([0, 0]) ?? [0, 0]);
    const tiles = tile();
    console.log(`${tiles.length} tiles`);
    console.log(`tileZoom: ${tiles[0][2]}`);
    const tileSize = 256;
    const [x0, y0] = tiles[0];
    const [x1, y1] = tiles[tiles.length - 1];
    const offscreenContext = createCanvas((x1 - x0 + 1) * tileSize, (y1 - y0 + 1) * tileSize).getContext('2d');
    const images = (await Promise.all(
      tiles.map(([x, y, z]) =>
        loadImage(tileUrl(url)(x, y, z))
          .then((image) => [x, y, image])
          .catch(() => [x, y, null])
      )
    )) as [number, number, Image | null][];
    for (const [x, y, image] of images) {
      if (image) {
        offscreenContext.drawImage(image, (x - x0) * tileSize, (y - y0) * tileSize, tileSize, tileSize);
      }
    }
    context.drawImage(
      offscreenContext.canvas,
      Math.round((x0 + tiles.translate[0]) * tiles.scale),
      Math.round((y0 + tiles.translate[1]) * tiles.scale),
      (x1 - x0 + 1) * tiles.scale,
      (y1 - y0 + 1) * tiles.scale
    );

    if (opt.grayScale) {
      const id = context.getImageData(0, 0, width, height);
      context.clearRect(0, 0, width, height);
      const data = id.data;
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
  };
}
