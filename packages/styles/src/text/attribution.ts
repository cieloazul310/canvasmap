import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2d } from "canvas";
import type { Theme } from "@cieloazul310/canvasmap-utils";

function renderAttribution(
  context: CanvasRenderingContext2D | NodeCanvasRenderingContext2d,
  {
    attribution,
    width,
    height,
    theme,
  }: { attribution: string; width: number; height: number; theme: Theme },
) {
  const fontSize = theme.fontSizes.attribution;
  const areaHeight = fontSize * 2;

  context.font = `${fontSize}pt sans-serif`;
  context.textAlign = "right";
  context.textBaseline = "bottom";
  context.fillStyle = "rgba(255, 255, 255, 0.8)";
  const textWidth = context.measureText(attribution).width;
  context.fillRect(
    width - (textWidth + 20),
    height - areaHeight,
    textWidth + 20,
    areaHeight,
  );
  context.fillStyle = "#333";
  context.fillText(attribution, width - 6, height - fontSize / 2);
}

export default renderAttribution;
