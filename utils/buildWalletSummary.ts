import { Token, Signal } from '@/types';

interface WalletSummary {
  tokenCount: number;
  signalCount: number;
  topSignalType: string | null;
  avgConfidence: number | null;
  totalUsdValue: number;
}

const isFiniteNumber = (n: unknown): n is number =>
  typeof n === 'number' && Number.isFinite(n);

const toMs = (iso: string | number | Date | undefined) => {
  const t = new Date(iso ?? 0).getTime();
  return Number.isFinite(t) ? t : 0;
};

export const buildWalletSummary = (
  tokens: readonly Token[] = [],
  signals: readonly Signal[] = []
): WalletSummary => {
  const tokenCount = tokens.length;
  const signalCount = signals.length;

  // Sum only valid numbers; coerce missing values to 0
  const totalUsdValue = tokens.reduce<number>((sum, t) => {
    const v = (t as any)?.usdValue;
    return sum + (isFiniteNumber(v) ? v : 0);
  }, 0);

  let topSignalType: string | null = null;
  let avgConfidence: number | null = null;

  if (signalCount > 0) {
    // Filter to signals with valid type and optional confidence
    const valid = signals.filter(s => typeof s.type === 'string' && s.type.length > 0);

    // Frequency map and most-recent timestamp per type for deterministic tie-breaks
    const freq: Record<string, number> = {};
    const latest: Record<string, number> = {};

    let confSum = 0;
    let confCount = 0;

    for (const s of valid) {
      freq[s.type] = (freq[s.type] ?? 0) + 1;
      latest[s.type] = Math.max(latest[s.type] ?? 0, toMs(s.timestamp));

      if (isFiniteNumber((s as any).confidence)) {
        confSum += (s as any).confidence as number;
        confCount += 1;
      }
    }

    if (Object.keys(freq).length > 0) {
      // Sort by count desc, then latest timestamp desc
      const [type] = Object.keys(freq).sort((a, b) => {
        if (freq[b] !== freq[a]) return freq[b] - freq[a];
        return (latest[b] ?? 0) - (latest[a] ?? 0);
      });
      topSignalType = type ?? null;
    }

    if (confCount > 0) {
      avgConfidence = parseFloat((confSum / confCount).toFixed(3));
    }
  }

  return {
    tokenCount,
    signalCount,
    topSignalType,
    avgConfidence,
    totalUsdValue: parseFloat(totalUsdValue.toFixed(2)),
  };
};
