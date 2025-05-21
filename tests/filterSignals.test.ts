import { filterSignalsBySeverity, filterSignalsByType } from "@/lib/signals/filterSignals";

const mockSignals = [
  { type: "token_mintable", message: "mintable", timestamp: "x" },
  { type: "wallet_activity_spike", message: "spike", timestamp: "x" },
];

describe("filterSignalsBySeverity()", () => {
  it("filters by minimum severity", () => {
    const result = filterSignalsBySeverity(mockSignals, 2);
    expect(result.length).toBe(1);
    expect(result[0].type).toBe("token_mintable");
  });
});

describe("filterSignalsByType()", () => {
  it("filters by type correctly", () => {
    const result = filterSignalsByType(mockSignals, "wallet_activity_spike");
    expect(result.length).toBe(1);
    expect(result[0].type).toBe("wallet_activity_spike");
  });
});
