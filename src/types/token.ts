export interface Token {
  contractAddress: string;
  name: string;
  symbol: string;
  logoUrl?: string;
  balance: number; // human-readable (not raw wei or lamports)
  decimals: number;
  quote: number; // USD value of current token holding
  riskFlags?: string[]; // from GoPlus
}
