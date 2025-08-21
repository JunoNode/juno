import { vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePortfolio } from "@/hooks/usePortfolio";

global.fetch = vi.fn(async (url: string) => {
  if (url.includes("/v6/quote")) {
    return {
      ok: true,
      json: async () => ({
        data: [{ inAmount: String(1_000_000_000), outAmount: String(2_000_000), priceImpactPct: 0.012 }],
      }),
    } as any;
  }
  return { ok: true, json: async () => ({}) } as any;
}) as any;

describe("usePortfolio", () => {
  it("enriches tokens with priceUsd and priceImpactPct", async () => {
    const { result, waitFor } = renderHook(() => usePortfolio());
    await waitFor(() => result.current.isLoading === false);
    const hasEnriched = result.current.tokens.every(
      (t) => typeof t.priceUsd === "number" && typeof t.priceImpactPct === "number"
    );
    expect(hasEnriched).toBe(true);
  });
});
