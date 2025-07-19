import { Signal } from '@/types';
import { randomUUID } from 'crypto';

const SIGNAL_TYPES = [
  'buy-pressure',
  'sell-pressure',
  'volume-spike',
  'trend-reversal',
  'whale-trace',
  'liquidity-shift',
];

export interface GenerateSignalOptions {
  confidence?: number;
  type?: string;
  source?: string;
  timestamp?: string;
}

export const generateSignal = (
  options: GenerateSignalOptions = {}
): Signal => {
  const {
    confidence = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
    type = SIGNAL_TYPES[Math.floor(Math.random() * SIGNAL_TYPES.length)],
    source = 'Juno',
    timestamp = new Date().toISOString(),
  } = options;

  return {
    source,
    type,
    confidence,
    timestamp,
    hash: `sig_${randomUUID().slice(0, 10)}`,
  };
};
