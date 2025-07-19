import { Token, Signal } from '@/types';

interface WalletSummary {
  tokenCount: number;
  signalCount: number;
  topSignalType: string | null;
  avgConfidence: number | null;
  totalUsdValue: number;
}

export const buildWalletSummary = (
  tokens: Token[],
  signals: Signal[]
): WalletSummary => {
  const tokenCount = tokens.length;
  const signalCount = signals.length;

  const totalUsdValue = tokens.reduce(
    (sum, t) => sum + (t.usdValue || 0),
    0
  );

  let topSignalType: string | null = null;
  let avgConfidence: number | null = null;

  if (signals.length > 0) {
    const typeFrequency: Record<string, number> = {};
    let totalConfidence = 0;

    for (const s of signals) {
      typeFrequency[s.type] = (typeFrequency[s.type] || 0) + 1;
      totalConfidence += s.confidence || 0;
    }

    const sortedTypes = Object.entries(typeFrequency).sort(
      (a, b) => b[1] - a[1]
    );
    topSignalType = sortedTypes[0]?.[0] || null;
    avgConfidence = parseFloat((totalConfidence / signals.length).toFixed(3));
  }

  return {
    tokenCount,
    signalCount,
    topSignalType,
    avgConfidence,
    totalUsdValue: parseFloat(totalUsdValue.toFixed(2)),
  };
};
