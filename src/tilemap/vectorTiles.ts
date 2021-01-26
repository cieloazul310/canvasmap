import nodeFetch from 'node-fetch';
import { tile as d3tile } from 'd3-tile';
import Pbf from 'pbf';
import { VectorTile } from '@mapbox/vector-tile';
import { ExtendedFeature } from 'd3-geo';
import { Feature, FeatureCollection, Polygon, MultiPolygon } from '@turf/helpers';
import { CanvasMap } from '../canvasMap';
import { waterarea, contour, road, railway, label, symbol } from './vectorLayers';
import { tileUrl } from '../utils/tileUrl';

interface Options {
  background: string;
  backgroundFeature: Feature<Polygon | MultiPolygon> | FeatureCollection<Polygon | MultiPolygon> | null;
}

export function vectorTiles(options?: Partial<Options>): (map: CanvasMap) => Promise<void> {
  const opt: Options = {
    background: options?.background ?? '#fff',
    backgroundFeature: options?.backgroundFeature ?? null,
  };

  return async (map: CanvasMap) => {
    const url = `https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf`;

    map.addAttribution('国土地理院');
    const { width, height } = map.getSize();
    const projection = map.getProjection();
    const path = map.getPath();
    const context = map.getContext();

    const tile = d3tile()
      .size([width, height])
      .scale(projection.scale() * Math.PI * 2)
      .translate(projection([0, 0]) ?? [0, 0]);
    const tiles = tile();
    console.log(`${tiles.length} tiles`);
    console.log(`tileZoom: ${tiles[0][2]}`);

    const layerNames = [waterarea, contour, road, railway, label, symbol];
    const features = await Promise.all(
      tiles.map(([x, y, z]) =>
        nodeFetch(tileUrl(url)(x, y, z))
          .then((res) => res.arrayBuffer())
          .then((buffer) => new Pbf(buffer))
          .then((pbf) => {
            const vt = new VectorTile(pbf);
            return layerNames.map((layerName) => {
              const layer = vt.layers[layerName.layerName];
              const features: Feature[] = [];
              if (layer) {
                for (let i = 0; i < layer.length; i++) {
                  const feature = layer.feature(i);
                  features.push(feature.toGeoJSON(x, y, z));
                }
              }
              return features;
            });
          })
          .catch(() => layerNames.map(() => []))
      )
    );
    const layers = layerNames.map((_, i) => features.map((feature) => feature[i]).reduce((accum, curr) => [...accum, ...curr], []));

    if (opt.background !== 'none' && !opt.backgroundFeature) {
      context.fillStyle = opt.background;
      context.fillRect(0, 0, width, height);
    }
    if (opt.backgroundFeature) {
      context.fillStyle = '#eee';
      context.fillRect(0, 0, width, height);

      context.beginPath();
      path(opt.backgroundFeature as ExtendedFeature);
      context.fillStyle = '#fff';
      context.fill();
    }

    layers.forEach((features, i) => {
      const render = layerNames[i].render(map);
      features.forEach((feature) => {
        context.beginPath();
        path(feature as ExtendedFeature);
        render(feature);
      });
    });
  };
}
