import React from "react";

export function renderSignalTag(type: string): string {
  const map: Record<string, string> = {
    token_mintable: "Mintable Token",
    trading_paused: "Paused Trading",
    new_liquidity: "Fresh Launch",
    wallet_activity_spike: "Wallet Spike",
  };
  return map[type] || "Unknown Signal";
}

export function SignalBadge({ type }: { type: string }) {
  const label = renderSignalTag(type);
  const colorMap: Record<string, string> = {
    token_mintable: "bg-yellow-600 text-white",
    trading_paused: "bg-red-600 text-white",
    new_liquidity: "bg-green-600 text-white",
    wallet_activity_spike: "bg-blue-600 text-white",
  };

  const color = colorMap[type] || "bg-gray-600 text-white";

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${color}`}
    >
      {label}
    </span>
  );
}
