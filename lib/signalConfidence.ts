export interface SignalInput {
  signalType: string;
  walletAgeDays: number;
  recentVolumeUSD: number;
  isBuySignal: boolean;
  pastAccuracyScore?: number; // optional historical success metric
}

export function computeConfidenceScore(signal: SignalInput): number {
  const { walletAgeDays, recentVolumeUSD, isBuySignal, signalType, pastAccuracyScore } = signal;

  const baseWeight = signalType === 'trend-reversal' ? 0.6 : 0.4;
  const volumeWeight = Math.min(recentVolumeUSD / 10000, 1.0); // cap at 1
  const ageWeight = Math.min(walletAgeDays / 180, 1.0); // cap at 6 months
  const accuracyWeight = pastAccuracyScore ?? 0.5;

  const directionWeight = isBuySignal ? 0.1 : -0.1;

  const total = baseWeight * 0.3 + volumeWeight * 0.25 + ageWeight * 0.2 + accuracyWeight * 0.2 + directionWeight;

  return Math.max(0, Math.min(1, parseFloat(total.toFixed(3))));
}
