import { zoomToScale, scaleToZoom } from "../src";

describe("zoomToScale", () => {
  it("revert", () => {
    expect(scaleToZoom(zoomToScale(15))).toBe(15);
  });
});
