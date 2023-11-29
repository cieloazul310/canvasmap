export type MapFontSizes = {
  default: number;
  small: number;
  large: number;
  attribution: number;
};

export function defineMapFontSizes(width: number): MapFontSizes {
  return {
    default: Math.round(Math.max(width * 0.0075, 8)),
    small: Math.round(Math.max(width * 0.006, 8)),
    large: Math.round(Math.max(width * 0.01, 8)),
    attribution: 10,
  };
}
