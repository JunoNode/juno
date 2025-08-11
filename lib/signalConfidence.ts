export interface SignalInput {
  signalType: string;
  walletAgeDays: number;       // Age of the wallet in days
  recentVolumeUSD: number;     // Trading volume in USD in recent period
  isBuySignal: boolean;        // Direction of signal
  pastAccuracyScore?: number;  // Optional historical accuracy (0–1)
}

export function computeConfidenceScore(signal: SignalInput): number {
  const {
    walletAgeDays,
    recentVolumeUSD,
    isBuySignal,
    signalType,
    pastAccuracyScore
  } = signal;

  // Base weight varies per signal type
  const baseWeight = signalType === "trend-reversal" ? 0.65 : 0.45;

  // Volume weight capped to avoid outliers dominating
  const volumeWeight = Math.min(recentVolumeUSD / 10_000, 1.0);

  // Wallet age weight capped at 6 months (180 days)
  const ageWeight = Math.min(walletAgeDays / 180, 1.0);

  // Accuracy weight falls back to neutral 0.5 if unknown
  const accuracyWeight = pastAccuracyScore ?? 0.5;

  // Direction bias: slightly boost buy signals, slightly penalize sells
  const directionBias = isBuySignal ? 0.08 : -0.08;

  // Weighted scoring formula
  const score =
    baseWeight * 0.3 +
    volumeWeight * 0.25 +
    ageWeight * 0.2 +
    accuracyWeight * 0.2 +
    directionBias;

  // Clamp between 0 and 1, round to 3 decimal places
  return Math.max(0, Math.min(1, parseFloat(score.toFixed(3))));
}
