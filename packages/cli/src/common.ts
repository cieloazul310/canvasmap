import { Command } from "@commander-js/extra-typings";

function canvasMapProgram() {
  const program = new Command()
    .requiredOption("-w, --width <number>", "Map width", "600")
    .requiredOption("-h, --height <number>", "Map height", "600")
    .requiredOption("-o, --output <string>", "Output file")
    .option("-c, --center <number>", "Map center")
    .option("-z, --zoom <number>", "Map zoom level")
    .option("-zd, --zoomDelta <number>", "Zoom delta for tile zoom level", "0")
    .option("--title <string>", "Map title")
    .option("--attribution <string>", "Map attribution");

  return program;
}

export function getConfig(program: ReturnType<typeof canvasMapProgram>) {
  const options = program.opts();

  const width = parseInt(options.width, 10);
  const height = parseInt(options.height, 10);
  const center: [number, number] = (() => {
    const defaultCenter: [number, number] = [140.4602, 36.3703];
    if (!options?.center) return defaultCenter;
    const arr = options.center.split(",");
    if (arr.length !== 2) return defaultCenter;

    return arr.map((str) => parseFloat(str)) as [number, number];
  })();
  const zoomDelta =
    options.zoomDelta !== undefined ? parseInt(options.zoomDelta, 10) : 0;

  return { width, height, center, zoomDelta };
}

export function getFormat(output: string) {
  const outs = output.split(".");
  const ext = outs[outs.length - 1];

  if (ext === "jpg" || ext === "jpeg") return "jpeg";
  if (ext === "png") return "png";
  if (ext === "webp") return "webp";
  throw new Error("invalid output format");
}

export default canvasMapProgram;
