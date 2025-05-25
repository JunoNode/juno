export const SIGNAL_TYPES = {
  token_mintable: "Mintable Token",
  trading_paused: "Paused Trading",
  new_liquidity: "Fresh Launch",
  wallet_activity_spike: "Wallet Spike",
} as const;

export type SignalType = keyof typeof SIGNAL_TYPES;

export function getSignalLabel(type: string): string {
  return SIGNAL_TYPES[type as SignalType] || "Unknown Signal";
}
 
