import type { Theme } from "@cieloazul310/canvasmap-utils";
import type { VectorTileLayer } from "./types";

type RailwayProperties = {
  /** 複線
   * - `0`: 非表示
   * - `1`: 単線
   * - `2`: 複線以上
   * - `3`: 側線 (z11-16)
   * - `4`: 駅部分 (z14-16)
   */
  snglDbl: 0 | 1 | 2 | 3 | 4;

  /** 軌道の状態
   * - `0`: 地上・通常部
   * - `1`: 橋・高架 (z14-16)
   * - `2`: トンネル (z14-16)
   * - `3`: 地下 (z14-16)
   * - `4`: 雪覆い (z14-16)
   * - `5`: 運休中 (z14-16)
   * - `6`: その他 (z14-16)
   * - `7`: 不明 (z14-16)
   * - `100`: トンネル (z8-13)
   * - `200`: 雪覆い (z8-13)
   * - `300`: 地下 (z8-13)
   * - `400`: 路面 (z8-13)
   * - `500`: 坑口無しトンネル (z8-13)
   */
  railState: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 100 | 200 | 300 | 400 | 500;
  /**
   * 0: 新幹線及び地下鉄以外
   * 1: 新幹線
   * 2: 地下鉄 (z11-13)
   */
  rtCode10: "0" | "1" | "2";
  rtCode: string;
};

function railwayWidth({ snglDbl }: Pick<RailwayProperties, "snglDbl">) {
  /// 側線
  if (snglDbl === 3) return 1;
  // 駅部分
  if (snglDbl === 4) return 4;
  return 2;
}

function railwayColor(
  { snglDbl }: Pick<RailwayProperties, "snglDbl">,
  { palette }: Theme,
) {
  if (snglDbl === 4) return palette.railway.station;
  return palette.railway.section;
}

const railway: VectorTileLayer<RailwayProperties> = {
  layerName: "railway",
  render:
    ({ context, theme }) =>
    ({ properties }) => {
      const { snglDbl, railState, rtCode10 } = properties;
      if (snglDbl === 0) return;
      if (railState === 3 || rtCode10 === "2") return;

      context.strokeStyle = railwayColor({ snglDbl }, theme);
      context.lineWidth = railwayWidth({ snglDbl });
      context.stroke();
    },
};

export default railway;
