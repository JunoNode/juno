export type HeliusTxType = string;

export interface HeliusTokenTransfer {
  fromUserAccount?: string;
  toUserAccount?: string;
  fromTokenAccount?: string;
  toTokenAccount?: string;
  mint?: string;
  tokenAmount?: number;
  decimals?: number;
  symbol?: string;
}

export interface HeliusNativeTransfer {
  fromUserAccount?: string;
  toUserAccount?: string;
  amount?: number; // lamports
}

export interface HeliusEnhancedTransaction {
  signature: string;
  slot: number;
  timestamp?: number;
  type?: HeliusTxType;
  source?: string;
  fee?: number;
  nativeTransfers?: HeliusNativeTransfer[];
  tokenTransfers?: HeliusTokenTransfer[];
}

export type HeliusEnhancedWebhookPayload = HeliusEnhancedTransaction[] | {
  transactions?: HeliusEnhancedTransaction[];
  data?: HeliusEnhancedTransaction[];
  [k: string]: unknown;
};

// src/types/activity.ts
export type ActivityKind = "TRANSFER" | "SWAP" | "MINT" | "BURN" | "STAKE" | "UNSTAKE" | "UNKNOWN";

export interface Activity {
  signature: string;
  slot: number;
  ts?: number;
  kind: ActivityKind;
  mint?: string;
  amount?: number;
  symbol?: string;
  from?: string;
  to?: string;
  feeLamports?: number;
  source?: string;
  rawType?: string;
}
