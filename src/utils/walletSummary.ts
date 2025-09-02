import { Token } from "@/types/token";

export function summarizeWallet(tokens: Token[]): string {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return "No tokens held.";
  }

  const summary = tokens
    .filter((t) => t && typeof t.symbol === "string" && typeof t.balance === "number")
    .slice(0, 5)
    .map((t) => `${formatBalance(t.balance)} ${t.symbol}`)
    .join(", ");

  return summary || "No valid tokens held.";
}

function formatBalance(balance: number): string {
  if (balance >= 1_000_000) return (balance / 1_000_000).toFixed(2) + "M";
  if (balance >= 1_000) return (balance / 1_000).toFixed(2) + "K";
  return balance.toString();
}
