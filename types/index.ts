// types/index.ts

export interface Signal {
  type: string;
  confidence: number;
  timestamp: string;
}

export interface SignalEntry {
  message: string;
  timestamp: string;
}

export interface Token {
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
}

export interface TokenRisk {
  isMintable?: boolean;
  isTradingPaused?: boolean;
  isVerified?: boolean;
}

export interface WatchedWallet {
  address: string;
  tags: string[];
}
