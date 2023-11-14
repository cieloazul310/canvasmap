export interface MapFontSize {
  default: number;
  small: number;
  large: number;
  attribution: number;
}
export type MapFontSizes = keyof MapFontSize;

export function mapFontSize(width: number, height: number): MapFontSize {
  return {
    default: Math.round(width * 0.0075),
    small: Math.round(width * 0.006),
    large: Math.round(width * 0.01),
    attribution: Math.round(height * 0.015),
  };
}
