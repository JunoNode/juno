export function truncateAddress(addr: string, chars = 4): string {
  return `${addr.slice(0, chars + 2)}...${addr.slice(-chars)}`;
}

export function formatUsd(value: number, decimals = 2): string {
  return `$${value.toFixed(decimals)}`;
}

export function shortTokenName(name: string): string {
  return name.length > 10 ? name.slice(0, 10) + "…" : name;
}
