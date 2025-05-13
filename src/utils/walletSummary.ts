import { Token } from "@/types/token";

export function summarizeWallet(tokens: Token[]): string {
  if (!tokens || tokens.length === 0) return "No tokens held.";

  return tokens
    .slice(0, 5)
    .map((t) => `${t.balance} ${t.symbol}`)
    .join(", ");
}
