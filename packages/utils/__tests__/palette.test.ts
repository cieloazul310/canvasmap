import { definePalette } from "../src";

describe("definePalette", () => {
  it("with no arguments", () => {
    const palette = definePalette();
    expect(palette.background.main).toBe("#fff");
    expect(palette.road.base).toBe("#ddd");
  });

  it("with arguments", () => {
    const palette = definePalette({
      road: {
        base: "#ccc",
      },
      contour: "#ca9",
    });
    expect(palette.road.base).toBe("#ccc");
    expect(palette.road.highway).toBe("#cdc");

    expect(palette.contour).toBe("#ca9");
    expect(palette.building).toBe("#eed");
  });
});
