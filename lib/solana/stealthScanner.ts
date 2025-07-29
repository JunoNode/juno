export interface TokenLaunch {
  name: string;
  address: string;
  liquidityUSD: number;
  launchedAt: string;
}

const MOCK_LAUNCHES: TokenLaunch[] = [
  {
    name: "SHADOWLIME",
    address: "F1keAddResss...shdw",
    liquidityUSD: 842,
    launchedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 min ago
  },
  {
    name: "GHOSTROOT",
    address: "Ex4mple...ghst",
    liquidityUSD: 1100,
    launchedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
  },
  {
    name: "NETHAZE",
    address: "S0m3AddRess...nhz",
    liquidityUSD: 450,
    launchedAt: new Date().toISOString(),
  },
];

/**
 * Simulates a scan for recently launched tokens with low liquidity.
 * In production, this would pull from a Solana DEX aggregator or LP monitor.
 */
export async function scanForNewTokens(threshold = 1000): Promise<TokenLaunch[]> {
  // Simulated async delay (e.g., fetching real LP data)
  await new Promise((res) => setTimeout(res, 250));

  const launches = MOCK_LAUNCHES.filter((token) => token.liquidityUSD < threshold);

  if (process.env.NODE_ENV === "development") {
    console.debug("[StealthScanner] Tokens under threshold:", launches);
  }

  return launches;
}
