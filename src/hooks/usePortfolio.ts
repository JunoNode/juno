{
  tokens: TokenInfo[];
  isLoading: boolean;
  hasRisk(token): boolean;
}

## Token Interface Example

export interface TokenInfo {
  contractAddress: string;
  name: string;
  symbol: string;
  logoUrl?: string;
  balance: string;
  priceUsd?: number;
  riskFlags?: {
    mintable: boolean;
    paused: boolean;
    [key: string]: boolean;
  };
}
