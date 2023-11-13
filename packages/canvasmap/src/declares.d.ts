/* eslint max-classes-per-file: off */

declare module "d3-tile" {
  export function tile(): Tile;

  export interface Tile {
    (): Tiles;
    size(): [number, number];
    size(size: [number, number]): this;
    extent(): [[number, number], [number, number]];
    extent(extent: [[number, number], [number, number]]): this;
    scale(): number;
    scale(scale: number): this;
    translate(): [number, number];
    translate(translate: [number, number]): this;
    zoomDelta(): number;
    zoomDelta(zoomDelta: number): this;
    tileSize(): number;
    tileSize(tileSize: number): this;
    clamp(): boolean;
    clamp(clamp: boolean): this;
    clampX(): boolean;
    clampX(clampX: boolean): this;
    clampY(): boolean;
    clampY(clampY: boolean): this;
  }
  export type Tiles = Array<[number, number, number]> & {
    translate: [number, number];
    scale: number;
  };
}

declare module "@mapbox/vector-tile" {
  import { Pbf } from "pbf";
  import { Feature } from "@turf/helpers";

  class VectorTileFeature {
    type: number;

    extent: number;

    id: number;

    properties: unknown;

    // loadGeometry(): [][]number;

    // bbox(): [number, number, number, number];

    toGeoJSON<G, P = unknown>(x: number, y: number, z: number): Feature<G, P>;
  }

  class Layer {
    version: number;

    name: string;

    extent: number;

    length: number;

    feature(i: number): VectorTileFeature;
  }

  type Layers = {
    [key: string]: Layer;
  };

  declare class VectorTile {
    constructor(protobuf: Pbf);
    layers: Layers;
  }
}
