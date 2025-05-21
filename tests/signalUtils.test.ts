import { scoreRisk } from "@/lib/signals/scoreRisk";
import { getSignalLabel } from "@/constants/signals";
import { SIGNAL_TYPES } from "@/constants/signals";

describe("scoreRisk()", () => {
  it("calculates risk score correctly for risky token", () => {
    const token = {
      isMintable: true,
      isTradingPaused: true,
      isVerified: false,
    };
    expect(scoreRisk(token)).toBe(6);
  });

  it("returns 0 for safe token", () => {
    expect(scoreRisk({ isMintable: false, isTradingPaused: false, isVerified: true })).toBe(0);
  });
});

describe("getSignalLabel()", () => {
  it("returns correct signal label", () => {
    expect(getSignalLabel("token_mintable")).toBe(SIGNAL_TYPES.token_mintable);
  });

  it("returns fallback for unknown type", () => {
    expect(getSignalLabel("unknown_type")).toBe("Unknown Signal");
  });
});
