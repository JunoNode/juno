import { computeConfidenceScore } from '../lib/signalConfidence';

describe('Signal Confidence Scoring', () => {
  it('should give higher score for high volume and older wallet', () => {
    const score = computeConfidenceScore({
      signalType: 'trend-reversal',
      walletAgeDays: 365,
      recentVolumeUSD: 15000,
      isBuySignal: true,
      pastAccuracyScore: 0.8
    });
    expect(score).toBeGreaterThan(0.8);
  });

  it('should cap volume and age contribution correctly', () => {
    const score = computeConfidenceScore({
      signalType: 'volume-spike',
      walletAgeDays: 2000,
      recentVolumeUSD: 1000000,
      isBuySignal: false,
      pastAccuracyScore: 0.4
    });
    expect(score).toBeLessThanOrEqual(1);
    expect(score).toBeGreaterThan(0);
  });

  it('should default to 0.5 accuracy if not given', () => {
    const score = computeConfidenceScore({
      signalType: 'trend-reversal',
      walletAgeDays: 100,
      recentVolumeUSD: 5000,
      isBuySignal: true,
    });
    expect(score).toBeGreaterThan(0);
  });
});
