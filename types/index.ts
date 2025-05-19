export interface WatchedWallet {
  address: string;
  tags: string[];
}

export interface TokenRisk {
  isMintable?: boolean;
  isTradingPaused?: boolean;
  isVerified?: boolean;
}

export interface SignalEntry {
  message: string;
  timestamp: string;
}
