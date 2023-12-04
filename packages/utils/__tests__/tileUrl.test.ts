import { tileUrl } from "../src";

describe("vector test", () => {
  it("gsi", () => {
    const tile = tileUrl(
      "https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf",
    );
    expect(tile(6, 4, 2)).toBe(
      "https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/2/6/4.pbf",
    );
  });
});
