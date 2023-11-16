import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2d } from "canvas";
import type { Theme } from "@cieloazul310/canvasmap-utils";

function renderTitle(
  context: CanvasRenderingContext2D | NodeCanvasRenderingContext2d,
  { title, width, theme }: { title: string; width: number; theme: Theme },
) {
  const { top } = theme.padding;
  const fontSize = Math.round(top * 0.3);

  context.font = `bold ${fontSize}pt sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "rgba(255, 255, 255, 0.6)";
  const textWidth = context.measureText(title).width;
  context.fillRect(
    width / 2 - textWidth / 2 - 20,
    top * 0.25,
    textWidth + 40,
    top * 0.5,
  );

  context.fillStyle = "#333";
  context.fillText(title, width / 2, top * 0.5);
}

export default renderTitle;
