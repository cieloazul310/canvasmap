import { CanvasMap } from "../src";

const width = 1200;
const height = 630;

describe("with-bbox", () => {
  test("default", () => {
    const map = new CanvasMap(width, height, {
      bbox: [140.391646, 36.330038, 140.515123, 36.423687],
    });

    expect(map.getZoom()).toBeGreaterThan(12);
    expect(map.getZoom()).toBeLessThan(13);
  });

  test("change size", () => {
    const map = new CanvasMap(width, height, { zoom: 12.5 });
    expect(map.getZoom()).toBeGreaterThan(12);
    expect(map.getZoom()).toBeLessThan(13);

    map.setSize({ width: width / 2, height: height / 2 });

    expect(map.getZoom()).toBeGreaterThan(12);
    expect(map.getZoom()).toBeLessThan(13);
  });

  test("change size with bbox", () => {
    const map = new CanvasMap(width, height, {
      bbox: [140.391646, 36.330038, 140.515123, 36.423687],
    });
    expect(map.getZoom()).toBeGreaterThan(12);
    expect(map.getZoom()).toBeLessThan(13);

    map.setSize({ width: width / 2, height: height / 2 });

    /** holding bbox */
    expect(map.getZoom()).toBeGreaterThan(11);
    expect(map.getZoom()).toBeLessThan(12);
  });

  test("clear bbox", () => {
    const map = new CanvasMap(width, height, {
      bbox: [140.391646, 36.330038, 140.515123, 36.423687],
    });
    expect(map.getProjection().center()[0]).toBe(0);
    expect(map.getProjection().center()[1]).toBe(0);

    map.clearBBox();

    expect(map.getProjection().center()[0]).not.toBe(0);
    expect(map.getProjection().center()[1]).not.toBe(0);
  });
});
