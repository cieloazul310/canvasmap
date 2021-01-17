import { Feature } from '@turf/helpers';
import { MapFontSizes } from '../utils/mapFontSize';
import { CanvasMap } from '../canvasMap';

interface VectorLayer {
  layerName: string;
  render: (map: CanvasMap) => (feature: Feature) => void;
}

export const waterarea: VectorLayer = {
  layerName: 'waterarea',
  render: (map: CanvasMap) => () => {
    const context = map.getContext();
    context.fillStyle = '#ccd';
    context.fill();
  },
};

export const railway: VectorLayer = {
  layerName: 'railway',
  render: (map: CanvasMap) => () => {
    const context = map.getContext();
    context.strokeStyle = '#999';
    context.lineWidth = 2;
    context.stroke();
  },
};

export const road: VectorLayer = {
  layerName: 'road',
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    context.strokeStyle = roadStrokeColor(feature);
    context.lineWidth = roadLineWidth(feature);
    context.stroke();
  },
};

function roadStrokeColor({ properties }: Feature): string {
  if (!properties || !('rdCtg' in properties)) return '#fff';
  const { rdCtg } = properties;
  return rdCtg === 0 ? '#dcb' : rdCtg === 3 ? '#cdc' : '#ddd';
}

function roadLineWidth({ properties }: Feature): number {
  if (!properties || !('rnkWidth' in properties)) return 0;
  const { rnkWidth } = properties;
  return rnkWidth === 0 || rnkWidth === 5 || rnkWidth === 6 ? 0.5 : rnkWidth === 2 ? 2 : rnkWidth === 3 || rnkWidth === 4 ? 3 : 1;
}

export const contour: VectorLayer = {
  layerName: 'contour',
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    context.lineWidth = contourWidth(feature);
    context.strokeStyle = '#cba';
    context.stroke();
  },
};

function contourWidth({ properties }: Feature): number {
  if (!properties || !('alti' in properties)) return 0;
  const { alti } = properties;
  return (alti as number) % 10 === 0 ? 2 : 1;
}

export const label: VectorLayer = {
  layerName: 'label',
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    if (
      !feature.properties ||
      !('knj' in feature.properties) ||
      !('annoCtg' in feature.properties) ||
      !feature.geometry ||
      !('coordinates' in feature.geometry)
    )
      return;
    const fontSize = map.getMapFontSize();
    const { knj, annoCtg } = feature.properties;
    if (![210, 312, 1312, 2312, 321, 1321, 2321, 322, 1322, 2322, 344, 1344, 2344, 422, 681].includes(annoCtg as number)) return;
    const projection = map.getProjection();
    const [x, y] = projection(feature.geometry?.coordinates as [number, number]) ?? [0, 0];
    context.font = `bold ${fontSize[getLabelSize(annoCtg)]}pt sans-serif`;
    const [align, baseline] = textPos(feature);
    context.textAlign = align;
    context.textBaseline = baseline;
    context.fillStyle = labelColor(annoCtg);
    context.strokeStyle = '#fff';
    context.strokeText(knj, x, y);
    context.fillText(knj, x, y);
  },
};

function getLabelSize(annoCtg: number): MapFontSizes {
  return annoCtg === 210 ? 'small' : 'default';
}

function labelColor(annoCtg: number): string {
  return [312, 1312, 2312].includes(annoCtg)
    ? '#977'
    : [321, 1321, 2321, 322, 1322, 2322].includes(annoCtg)
    ? '#aac'
    : annoCtg === 422
    ? '#aaa'
    : '#ccc';
}

function textPos({ properties }: Feature): [CanvasTextAlign, CanvasTextBaseline] {
  if (!properties || !('dspPos' in properties)) return ['center', 'middle'];
  const { dspPos } = properties;
  const align = (dspPos as string).slice(0, 1);
  const baseline = (dspPos as string).slice(1, 2);

  return [align === 'L' ? 'left' : align === 'R' ? 'right' : 'center', baseline === 'T' ? 'top' : baseline === 'B' ? 'bottom' : 'middle'];
}

export const symbol: VectorLayer = {
  layerName: 'symbol',
  render: (map: CanvasMap) => (feature: Feature) => {
    const context = map.getContext();
    if (!feature.properties || !('ftCode' in feature.properties) || !feature.geometry || !('coordinates' in feature.geometry)) return;
    const fontSize = map.getMapFontSize();
    const { ftCode, knj, name } = feature.properties;
    if (!knj && !name) return;
    if (![1401, 1402].includes(ftCode as number)) return;
    const projection = map.getProjection();
    const [x, y] = projection(feature.geometry?.coordinates as [number, number]) ?? [0, 0];
    context.font = `bold ${fontSize.default}pt sans-serif`;
    const [align, baseline] = textPos(feature);
    context.textAlign = align;
    context.textBaseline = baseline;
    context.fillStyle = '#aaa';
    context.strokeStyle = '#fff';
    context.strokeText(knj ?? name, x, y);
    context.fillText(knj ?? name, x, y);
  },
};
