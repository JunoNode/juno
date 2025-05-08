export type WalletType = "phantom" | "metamask" | null;

export interface WatchedWallet {
  address: string;
  label?: string;
}

export interface WalletTx {
  txHash: string;
  timestamp: string; // human-readable or ISO format
  tokenSymbol: string;
  amount: number;
  valueUsd?: number;
  direction: "in" | "out";
}
