import {
  formatUsd,
  truncateAddress,
  timeAgo,
  capitalize,
} from "@/lib/utils";

describe("formatUsd", () => {
  it("formats a number as USD", () => {
    expect(formatUsd(1234.56)).toBe("$1,234.56");
    expect(formatUsd(0)).toBe("$0.00");
  });

  it("returns $0.00 for undefined or NaN", () => {
    expect(formatUsd(undefined)).toBe("$0.00");
    expect(formatUsd(NaN)).toBe("$0.00");
  });
});

describe("truncateAddress", () => {
  it("truncates a wallet address properly", () => {
    const addr = "So1aNaWALLeTADDreSS1234567890";
    expect(truncateAddress(addr, 4)).toBe("So1a...7890");
  });

  it("returns original if address is short", () => {
    expect(truncateAddress("abcd", 4)).toBe("abcd");
  });
});

describe("timeAgo", () => {
  it("formats seconds into time strings", () => {
    expect(timeAgo(45)).toBe("45s ago");
    expect(timeAgo(300)).toBe("5m ago");
    expect(timeAgo(7200)).toBe("2h ago");
    expect(timeAgo(90000)).toBe("1d ago");
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter of a string", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("Juno")).toBe("Juno");
  });
});

