export function zoomToScale(zoom: number): number {
  return (256 * Math.pow(2, zoom)) / (Math.PI * 2);
}

export function scaleToZoom(scale: number): number {
  return Math.log2(((Math.PI * 2) / 256) * scale);
}
