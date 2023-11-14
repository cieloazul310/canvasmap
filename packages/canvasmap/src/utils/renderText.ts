import type { CanvasMap } from "../canvasMap";

export function renderTitle(title: string): (map: CanvasMap) => void {
  return (map: CanvasMap) => {
    const { width } = map.getSize();
    const { top } = map.getPadding();
    const context = map.getContext();
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
  };
}

export function renderAttribution(
  attribution: string,
): (map: CanvasMap) => void {
  return (map: CanvasMap) => {
    const { width, height } = map.getSize();
    const fontSize = map.getMapFontSize().attribution;
    const areaHeight = fontSize * 2;
    const context = map.getContext();

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
  };
}
