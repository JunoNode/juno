import { useEffect, useMemo, useRef, useState } from "react";
import type { TokenInfo } from "@/types/token"; // your existing shape
import { ROUTING_DEFAULTS } from "@/constants/ui";

// USDC (mainnet) – adjust if you already store this elsewhere
const USDC_MINT = "Es9vMFrzaCERz9...USDC"; // keep your correct USDC mint here

type QuoteResp = { data?: Array<{ inAmount: string; outAmount: string; priceImpactPct?: number } > };

async function fetchRouteQuote(inputMint: string, outputMint: string, rawAmount: string, slippageBps = ROUTING_DEFAULTS.slippageBps) {
  const url = new URL("https://quote-api.jup.ag/v6/quote");
  url.searchParams.set("inputMint", inputMint);
  url.searchParams.set("outputMint", outputMint);
  url.searchParams.set("amount", rawAmount);
  url.searchParams.set("slippageBps", String(slippageBps));
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`routing core error ${res.status}`);
  return (await res.json()) as QuoteResp;
}

function spotPriceFromQuote(q: QuoteResp, inDecimals: number, outDecimals: number) {
  const best = q?.data?.[0];
  if (!best) return { price: 0, impact: 0 };
  const inAmt = Number(best.inAmount) / 10 ** inDecimals;
  const outAmt = Number(best.outAmount) / 10 ** outDecimals;
  const price = inAmt === 0 ? 0 : outAmt / inAmt;
  const impact = Number(best.priceImpactPct ?? 0);
  return { price, impact };
}

export function usePortfolio() {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [isLoading, setLoading] = useState(true);

  const cacheRef = useRef<Map<string, { price: number; impact: number }>>(new Map());

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      // your existing portfolio fetch here
      // const base = await fetchUserPortfolio();
      // Assume it returns: { address, mint, symbol, decimals, balanceRaw, priceUsd? }
      const base = tokens; // keep your current logic

      // Enrich with live route price when we don't have a price or want a fresh one
      const enriched = await Promise.all(
        base.map(async (t) => {
          const cacheKey = `${t.address}:USDC`;
          if (cacheRef.current.has(cacheKey)) {
            const c = cacheRef.current.get(cacheKey)!;
            return { ...t, priceUsd: c.price, priceImpactPct: c.impact };
          }

          try {
            // quote for 1 unit of the token (in raw units)
            const oneUnitRaw = String(10 ** (t.decimals ?? 9));
            const q = await fetchRouteQuote(t.address, USDC_MINT, oneUnitRaw);
            const { price, impact } = spotPriceFromQuote(q, t.decimals ?? 9, 6);
            cacheRef.current.set(cacheKey, { price, impact });
            return { ...t, priceUsd: price, priceImpactPct: impact };
          } catch {
            return { ...t, priceImpactPct: 0 };
          }
        })
      );

      if (mounted) setTokens(enriched);
      setLoading(false);
    }

    // call your existing loader or merge this into it:
    load();

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // keep your dependencies the same as before

  const hasRisk = (token: TokenInfo) => Boolean(token.riskFlags && Object.values(token.riskFlags).some(Boolean));

  return {
    tokens,
    isLoading,
    hasRisk,
  };
}
