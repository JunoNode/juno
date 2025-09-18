// DexScreener integration + helpers to normalize into Juno-friendly shapes.

export type DexScreenerPair = {
  chainId?: string;
  dexId?: string;
  url?: string;
  baseToken?: { address?: string; name?: string; symbol?: string; };
  quoteToken?: { address?: string; name?: string; symbol?: string; };
  priceUsd?: string | number | null;
  liquidity?: { usd?: number | null } | null;
  volume?: { h24?: number | null; h6?: number | null; h1?: number | null } | null;
  fdv?: number | null;
};

export type DexScreenerResponse = {
  schemaVersion?: string;
  pairs?: DexScreenerPair[];
};

export type TokenMarketSnapshot = {
  contractAddress: string;
  name: string | null;
  symbol: string | null;
  logoUrl?: string | null;        // DexScreener doesn't always provide logos; keep optional
  priceUsd: number | null;        // current unit price in USD (best pair)
  liquidityUsd: number | null;    // pool liquidity (best pair)
  volume24hUsd: number | null;    // 24h volume (best pair)
  fdvUsd: number | null;          // fully diluted valuation if provided
  source: "dexscreener";
  pairUrl?: string | null;        // deep link to the best pair on DexScreener if available
};

/**
 * Lightweight in-memory cache (per server instance).
 * Avoids repeated calls when rendering lists / refetching quickly.
 */
const _cache = new Map<string, { at: number; data: DexScreenerResponse }>();
const CACHE_TTL_MS = 30_000; // 30s TTL — safe & snappy for UI

function fromCache(address: string): DexScreenerResponse | null {
  const hit = _cache.get(address);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    _cache.delete(address);
    return null;
  }
  return hit.data;
}

function toCache(address: string, data: DexScreenerResponse) {
  _cache.set(address, { at: Date.now(), data });
}

function safeNum(n: unknown): number | null {
  if (typeof n === "number" && Number.isFinite(n)) return n;
  if (typeof n === "string") {
    const parsed = Number(n);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/**
 * Select a "best" pair by highest liquidity, then 24h volume as tiebreak.
 */
function pickBestPair(pairs: DexScreenerPair[] = []): DexScreenerPair | null {
  if (!pairs.length) return null;
  const ranked = [...pairs].sort((a, b) => {
    const liqA = a?.liquidity?.usd ?? -1;
    const liqB = b?.liquidity?.usd ?? -1;
    if ((liqB ?? -1) !== (liqA ?? -1)) return (liqB ?? -1) - (liqA ?? -1);
    const vA = a?.volume?.h24 ?? -1;
    const vB = b?.volume?.h24 ?? -1;
    return (vB ?? -1) - (vA ?? -1);
  });
  return ranked[0] ?? null;
}

/**
 * Fetch raw DexScreener data for a token address.
 * Docs: https://api.dexscreener.com/latest/dex/tokens/:address
 */
export async function fetchDexScreener(address: string): Promise<DexScreenerResponse> {
  const key = address.trim().toLowerCase();
  const cached = fromCache(key);
  if (cached) return cached;

  const url = `https://api.dexscreener.com/latest/dex/tokens/${encodeURIComponent(key)}`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  if (!res.ok) {
    // Return an empty shape instead of throwing to keep UIs resilient.
    return { pairs: [] };
  }
  const json = (await res.json()) as DexScreenerResponse;
  toCache(key, json);
  return json;
}

/**
 * Normalize a DexScreener best-pair response into a clean market snapshot
 * that plays nicely with Juno’s Token flows.
 */
export async function getTokenMarketFromDexScreener(address: string): Promise<TokenMarketSnapshot | null> {
  const key = address.trim();
  if (!key) return null;

  const data = await fetchDexScreener(key);
  const best = pickBestPair(data.pairs);
  if (!best) {
    return {
      contractAddress: key,
      name: null,
      symbol: null,
      logoUrl: null,
      priceUsd: null,
      liquidityUsd: null,
      volume24hUsd: null,
      fdvUsd: null,
      source: "dexscreener",
      pairUrl: null,
    };
  }

  const name = best.baseToken?.name?.trim() || null;
  const symbol = best.baseToken?.symbol?.trim() || null;

  return {
    contractAddress: key,
    name,
    symbol,
    // DexScreener rarely provides direct logos; leave null so upstream can use your existing fallback.
    logoUrl: null,
    priceUsd: safeNum(best.priceUsd),
    liquidityUsd: safeNum(best.liquidity?.usd ?? null),
    volume24hUsd: safeNum(best.volume?.h24 ?? null),
    fdvUsd: safeNum(best.fdv ?? null),
    source: "dexscreener",
    pairUrl: best.url ?? null,
  };
}

/**
 * Helper to partially hydrate your existing Token model.
 * NOTE:
 * - `balance` is user-specific and should be set by your wallet parser.
 * - `decimals` are not provided by DexScreener; keep your current on-chain/registry flow for that.
 * - `quote` can be computed as price * balance upstream.
 */
export async function toPartialToken(address: string): Promise<{
  contractAddress: string;
  name?: string | null;
  symbol?: string | null;
  logoUrl?: string | null;
  priceUsd?: number | null;
  source: "dexscreener";
}> {
  const snap = await getTokenMarketFromDexScreener(address);
  if (!snap) {
    return { contractAddress: address, source: "dexscreener" };
  }
  return {
    contractAddress: snap.contractAddress,
    name: snap.name,
    symbol: snap.symbol,
    logoUrl: snap.logoUrl ?? null,
    priceUsd: snap.priceUsd ?? null,
    source: "dexscreener",
  };
}
