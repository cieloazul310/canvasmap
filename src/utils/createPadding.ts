export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function createPadding(width: number, height: number, padding?: Partial<Padding>): Padding {
  return {
    top: padding?.top ?? Math.round(height * 0.1),
    right: padding?.right ?? Math.round(width * 0.05),
    bottom: padding?.bottom ?? Math.round(height * 0.05),
    left: padding?.left ?? Math.round(width * 0.05),
  };
}
