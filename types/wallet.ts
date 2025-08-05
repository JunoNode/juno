export interface WalletStats {
  address: string;
  totalSignals: number;
  topSignalType: SignalType;
  avgConfidence: number;
  signalBreakdown?: Record<SignalType, number>;
  lastActivity?: string; // ISO date
  isWatched?: boolean;
}

export type SignalType =
  | "buy-pressure"
  | "sell-pressure"
  | "volume-spike"
  | "trend-reversal"
  | "token_mintable"
  | "trading_paused"
  | "new_liquidity"
  | "wallet_activity_spike";
