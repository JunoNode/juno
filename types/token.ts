export interface TokenHolding {
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
  mintAddress?: string;
  logoURI?: string;
  decimals?: number;
  priceChange24h?: number;
  lastUpdated?: string;
}
