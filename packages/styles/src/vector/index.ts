import type { Tiles } from "d3-tile";
import Pbf from "pbf";
import { VectorTile } from "@mapbox/vector-tile";
import { geoPath, type ExtendedFeature, type GeoProjection } from "d3-geo";
import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from "canvas";
import type {
  Feature,
  FeatureCollection,
  Polygon,
  MultiPolygon,
  Geometry,
  GeometryCollection,
} from "@turf/helpers";
import { tileUrl, type Theme } from "@cieloazul310/canvasmap-utils";
import {
  waterarea,
  building,
  contour,
  road,
  railway,
  label,
  symbol,
  boundary,
  type VectorLayerNames,
  type VectorTileFeatureProperties,
} from "./layers";

export { type VectorLayerNames } from "./layers";

export type VectorTilesOptions = {
  backgroundColor?: string;
  backgroundFeature?:
    | Feature<Polygon | MultiPolygon>
    | FeatureCollection<Polygon | MultiPolygon>
    | null;
  layers?: VectorLayerNames[];
  width: number;
  height: number;
  projection: GeoProjection;
  tiles: Tiles;
  theme: Theme;
};

async function vectorTiles(
  context: CanvasRenderingContext2D | NodeCanvasRenderingContext2D,
  {
    width,
    height,
    projection,
    tiles,
    theme,
    backgroundColor,
    backgroundFeature,
    layers,
  }: VectorTilesOptions,
) {
  const url = `https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf`;
  const path = geoPath(projection, context);

  const layerNames = [
    waterarea,
    contour,
    road,
    building,
    railway,
    boundary,
    label,
    symbol,
  ].filter(({ layerName }) =>
    layers?.length ? layers.includes(layerName) : true,
  );

  /**
   * Load features from specified layers.
   */
  const features = await Promise.all(
    tiles.map(([x, y, z]) =>
      fetch(tileUrl(url)(x, y, z))
        .then((res) => res.arrayBuffer())
        .then((buffer) => new Pbf(buffer))
        .then((pbf) => {
          const vt = new VectorTile(pbf);
          return layerNames.map((layerName) => {
            const layer = vt.layers[layerName.layerName];
            const layerFeatures: Feature<
              Geometry | GeometryCollection,
              VectorTileFeatureProperties<any>
            >[] = [];
            if (layer) {
              for (let i = 0; i < layer.length; i += 1) {
                const feature = layer.feature(i);
                layerFeatures.push(feature.toGeoJSON(x, y, z));
              }
            }
            return layerFeatures.sort(layerName.sort);
          });
        })
        .catch(() => layerNames.map(() => [])),
    ),
  );
  /**
   * Assort features and flatten features array
   */
  const vectorLayers = layerNames.map((_, i) =>
    features
      .map((feature) => feature[i])
      .reduce((accum, curr) => [...accum, ...curr], []),
  );

  /**
   * Render background
   */
  if (backgroundColor !== "none" && !backgroundFeature) {
    context.fillStyle = backgroundColor ?? theme.palette.background.main;
    context.fillRect(0, 0, width, height);
  }
  if (backgroundFeature) {
    context.fillStyle = theme.palette.background.contrast;
    context.fillRect(0, 0, width, height);

    context.beginPath();
    path(backgroundFeature as ExtendedFeature);
    context.fillStyle = theme.palette.background.main;
    context.fill();
  }

  /**
   * Render features
   */
  vectorLayers.forEach((layerFeatures, i) => {
    const render = layerNames[i].render({ context, theme, projection });
    layerFeatures.forEach((feature) => {
      context.beginPath();
      path(feature as ExtendedFeature);
      render(feature);
    });
  });
}

export default vectorTiles;
