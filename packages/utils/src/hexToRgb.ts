export default function hexToRgb(hex: string) {
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
