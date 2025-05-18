export interface WatchedWallet {
  address: string;
  tags: string[];
}

export const watchlist: WatchedWallet[] = [
  { address: "So1anaAddr1...", tags: ["whale", "early"] },
  { address: "So1anaAddr2...", tags: ["dev", "bridge"] }
];

export function filterByTag(tag: string) {
  return watchlist.filter(wallet => wallet.tags.includes(tag));
}
