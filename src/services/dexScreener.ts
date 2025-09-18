export type DexScreenerPair = {
  chainId?: string;
  dexId?: string;
  url?: string;
  baseToken?: { address?: string; name?: string; symbol?: string };
  quoteToken?: { address?: string; name?: string; symbol?: string };
  priceUsd?: string | number | null;
  liquidity?: { usd?: number | null } | null;
  volume?: { h24?: number | null; h6?: number | null; h1?: number | null } | null;
  fdv?: number | null;
};

export type DexScreenerResponse = {
  schemaVersion?: string;
  pairs?: DexScreenerPair[];
};

export type DexScreenerMarket = {
  name: string | null;
  symbol: string | null;
  priceUsd: number | null;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  fdvUsd: number | null;
  pairUrl: string | null;
  raw?: DexScreenerPair | null;
};

const API_ROOT = "https://api.dexscreener.com/latest/dex/tokens";

// simple in-memory cache (per server instance)
const cache = new Map<string, { at: number; data: DexScreenerResponse }>();
const TTL = 30_000; // 30s

function safeNum(n: unknown): number | null {
  if (typeof n === "number" && Number.isFinite(n)) return n;
  if (typeof n === "string") {
    const v = Number(n);
    return Number.isFinite(v) ? v : null;
  }
  return null;
}

function getFromCache(key: string): DexScreenerResponse | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function setCache(key: string, data: DexScreenerResponse) {
  cache.set(key, { at: Date.now(), data });
}

export async function fetchDexScreenerByToken(address: string): Promise<DexScreenerResponse> {
  const key = address.trim().toLowerCase();
  const cached = getFromCache(key);
  if (cached) return cached;

  const res = await fetch(`${API_ROOT}/${encodeURIComponent(key)}`, { cache: "no-store" });
  if (!res.ok) return { pairs: [] };

  const json = (await res.json()) as DexScreenerResponse;
  setCache(key, json);
  return json;
}

export function pickBestPair(pairs: DexScreenerPair[] = []): DexScreenerPair | null {
  if (!pairs.length) return null;
  const ranked = [...pairs].sort((a, b) => {
    const la = a?.liquidity?.usd ?? -1;
    const lb = b?.liquidity?.usd ?? -1;
    if (lb !== la) return lb - la;
    const va = a?.volume?.h24 ?? -1;
    const vb = b?.volume?.h24 ?? -1;
    return vb - va;
  });
  return ranked[0] ?? null;
}

export function toDexScreenerMarket(best: DexScreenerPair | null): DexScreenerMarket {
  if (!best) {
    return {
      name: null,
      symbol: null,
      priceUsd: null,
      liquidityUsd: null,
      volume24hUsd: null,
      fdvUsd: null,
      pairUrl: null,
      raw: null,
    };
  }
  return {
    name: best.baseToken?.name?.trim() || null,
    symbol: best.baseToken?.symbol?.trim() || null,
    priceUsd: safeNum(best.priceUsd),
    liquidityUsd: safeNum(best.liquidity?.usd ?? null),
    volume24hUsd: safeNum(best.volume?.h24 ?? null),
    fdvUsd: safeNum(best.fdv ?? null),
    pairUrl: best.url ?? null,
    raw: best,
  };
}

/**
 * Convenience: fetch + pick + normalize in one call.
 */
export async function getDexScreenerMarket(address: string): Promise<DexScreenerMarket> {
  const resp = await fetchDexScreenerByToken(address);
  const best = pickBestPair(resp.pairs ?? []);
  return toDexScreenerMarket(best);
}
