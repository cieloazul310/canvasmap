export function tileUrl(url: string): (x: number, y: number, z: number) => string {
  const [base, ext] = url.split('/{z}/{x}/{y}');
  if (!ext) throw new Error('Tile Url must have {z}/{x}/{y}');

  return (x: number, y: number, z: number) => `${base}/${z}/${x}/${y}${ext}`;
}
