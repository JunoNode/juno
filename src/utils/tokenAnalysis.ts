import { getTokenMarketFromDexScreener, TokenMarketSnapshot } from "../services/tokens";

export type TokenAnalysis = {
  contractAddress: string;
  name: string | null;
  symbol: string | null;
  priceUsd: number | null;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  fdvUsd: number | null;
  pairUrl?: string | null;
  riskFlags: string[]; // heuristic tags for easier UI display
};

/**
 * Basic heuristic risk analysis for a token.
 * Extend this over time with more signals.
 */
function detectRiskFlags(market: TokenMarketSnapshot): string[] {
  const flags: string[] = [];

  // Extremely low liquidity
  if ((market.liquidityUsd ?? 0) < 5000) {
    flags.push("Low Liquidity");
  }

  // No FDV means incomplete data
  if (!market.fdvUsd) {
    flags.push("Missing FDV");
  }

  // Very low trading activity
  if ((market.volume24hUsd ?? 0) < 1000) {
    flags.push("Low Volume");
  }

  return flags;
}

/**
 * Run a token analysis:
 * - Fetch market snapshot from DexScreener
 * - Attach simple heuristics (risk flags)
 * - Return clean TokenAnalysis
 */
export async function analyzeToken(address: string): Promise<TokenAnalysis | null> {
  const snapshot = await getTokenMarketFromDexScreener(address);
  if (!snapshot) return null;

  return {
    contractAddress: snapshot.contractAddress,
    name: snapshot.name,
    symbol: snapshot.symbol,
    priceUsd: snapshot.priceUsd,
    liquidityUsd: snapshot.liquidityUsd,
    volume24hUsd: snapshot.volume24hUsd,
    fdvUsd: snapshot.fdvUsd,
    pairUrl: snapshot.pairUrl,
    riskFlags: detectRiskFlags(snapshot),
  };
}
