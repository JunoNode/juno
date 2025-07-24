export function formatAmount(
  amount: number,
  opts: { compact?: boolean } = { compact: true }
): string {
  const { compact } = opts;

  if (compact) {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${(amount / 1_000).toFixed(1)}K`;
    if (amount >= 1) return amount.toFixed(2);
    if (amount > 0) return amount.toPrecision(2);
    return "0.00";
  } else {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}