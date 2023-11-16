// @ts-nocheck

import type {
  Canvas as NodeCanvas,
  CanvasRenderingContext2D as NodeCanvasRenderingContext2D,
} from "canvas";

export function isNodeCanvas(
  canvas: HTMLCanvasElement | NodeCanvas,
): canvas is NodeCanvas {
  return typeof window === undefined;
}

export function isNodeCanvasContext(
  context: CanvasRenderingContext2D | NodeCanvasRenderingContext2D,
): context is NodeCanvasRenderingContext2D {
  return typeof window === undefined;
}
