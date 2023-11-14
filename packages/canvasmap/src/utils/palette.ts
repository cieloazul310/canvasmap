export function hexToRgb(hex: string) {
  if (hex.length === 4) {
    const result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
    if (!result) throw new Error();
    return {
      r: parseInt(`${result[1]}${result[1]}`, 16),
      g: parseInt(`${result[2]}${result[2]}`, 16),
      b: parseInt(`${result[3]}${result[3]}`, 16),
    };
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error();
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

const palette = {
  background: "#fff",
  waterArea: "#ccd",
  railway: "#999",
  road: {
    national: "#dcb",
    highway: "#cdc",
    base: "#ddd",
  },
  contour: "#cba",
  label: {
    terrain: "#977",
    water: "#aac",
    em: "#aaa",
    base: "#ccc",
  },
};

export const paletteConfigForPng = new Uint8ClampedArray(
  Array.from(
    new Set(
      Object.values(palette)
        .map((obj) => (typeof obj === "object" ? Object.values(obj) : obj))
        .reduce<string[]>(
          (accum, curr) =>
            Array.isArray(curr) ? [...accum, ...curr] : [...accum, curr],
          [],
        ),
    ),
  ).reduce<number[]>((accum, curr) => {
    const { r, g, b } = hexToRgb(curr);
    return [...accum, r, g, b, 255];
  }, []),
);

export default palette;
