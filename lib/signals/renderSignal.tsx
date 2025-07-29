import React from "react";

type SignalType =
  | "token_mintable"
  | "trading_paused"
  | "new_liquidity"
  | "wallet_activity_spike"
  | string;

const SIGNAL_LABELS: Record<string, string> = {
  token_mintable: "Mintable Token",
  trading_paused: "Paused Trading",
  new_liquidity: "Fresh Launch",
  wallet_activity_spike: "Wallet Spike",
};

const SIGNAL_COLORS: Record<string, string> = {
  token_mintable: "bg-yellow-600 text-black",
  trading_paused: "bg-red-600 text-white",
  new_liquidity: "bg-green-600 text-black",
  wallet_activity_spike: "bg-blue-600 text-white",
};

export function renderSignalTag(type: SignalType): string {
  return SIGNAL_LABELS[type] || "Unknown Signal";
}

export function SignalBadge({ type }: { type: SignalType }) {
  const label = renderSignalTag(type);
  const color = SIGNAL_COLORS[type] || "bg-gray-700 text-white";

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${color}`}>
      {label}
    </span>
  );
}
