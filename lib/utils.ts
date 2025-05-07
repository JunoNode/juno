// Format a number to USD currency
export function formatUsd(value: number | undefined): string {
  if (value === undefined || isNaN(value)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

// Shorten a wallet address
export function truncateAddress(address: string | null | undefined, size = 4): string {
  if (!address || address.length < size * 2 + 2) return address || "";
  return `${address.slice(0, size)}...${address.slice(-size)}`;
}

// Convert timestamp to readable format (basic)
export function timeAgo(secondsAgo: number): string {
  if (secondsAgo < 60) return `${secondsAgo}s ago`;
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
  return `${Math.floor(secondsAgo / 86400)}d ago`;
}

// Capitalize first letter
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
