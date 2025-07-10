// types/index.ts

// ─── Signals ─────────────────────────────────────────────

/** A basic signal with confidence and timestamp metadata */
export interface Signal {
  type: string;
  confidence: number; // Range: 0.0 – 1.0
  timestamp: string;  // ISO format
}

/** A human-readable log entry for a signal */
export interface SignalEntry {
  message: string;
  timestamp: string;
}

// ─── Tokens ─────────────────────────────────────────────

/** Represents a token holding within a wallet */
export interface Token {
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
}

/** Optional risk flags from token security APIs */
export interface TokenRisk {
  isMintable?: boolean;
  isTradingPaused?: boolean;
  isVerified?: boolean;
}

// ─── Wallets ─────────────────────────────────────────────

/** A wallet being tracked with optional user-assigned tags */
export interface WatchedWallet {
  address: string;
  tags: string[];
}