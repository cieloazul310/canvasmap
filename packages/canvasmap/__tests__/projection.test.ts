import { CanvasMap } from "../src";

const width = 1200;
const height = 630;

describe("projection", () => {
  test("default", () => {
    const map = new CanvasMap(width, height, {
      zoom: 12,
      center: [140.391646, 36.330038],
    });

    expect(map.getZoom()).toBe(12);
    expect(map.getProjection().center()[0]).not.toBe(0);
    expect(map.getProjection().center()[1]).not.toBe(0);

    map.setZoom(13);
    expect(map.getZoom()).toBe(13);
  });
});
