export const dummyWallet = {
  address: "9gzLP8xR9dRka...vU7W",
  totalSignals: 24,
  topSignalType: "trend-reversal",
  avgConfidence: 0.82,
  createdAt: "2024-05-20T12:00:00Z",
  tags: ["whale", "frequent-trader"]
};

export const mockTokens = [
  {
    name: "Solana",
    symbol: "SOL",
    amount: 12.3,
    usdValue: 242.15,
    contractAddress: "So11111111111111111111111111111111111111112",
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
    riskFlags: {
      mintable: false,
      paused: false,
    }
  },
  {
    name: "Bonk",
    symbol: "BONK",
    amount: 98219323,
    usdValue: 118.56,
    contractAddress: "DeAdBeEf00000000000000000000000000000000BoNK",
    logoUrl: "https://cryptologos.cc/logos/bonk-bonk-logo.png",
    riskFlags: {
      mintable: true,
      paused: false,
    }
  },
  {
    name: "USDC",
    symbol: "USDC",
    amount: 89.5,
    usdValue: 89.5,
    contractAddress: "A1cE000000000000000000000000000000000000USDC",
    logoUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    riskFlags: {
      mintable: false,
      paused: false,
    }
  }
];

export const mockSignals = [
  {
    type: "buy-pressure",
    confidence: 0.92,
    timestamp: "2024-05-25T10:00:00Z",
    source: "dex-trade",
    triggeredBy: "high-volume-buy"
  },
  {
    type: "trend-reversal",
    confidence: 0.88,
    timestamp: "2024-05-26T15:30:00Z",
    source: "wallet-patterns",
    triggeredBy: "smart-wallet-exit"
  },
  {
    type: "volume-spike",
    confidence: 0.74,
    timestamp: "2024-05-27T08:45:00Z",
    source: "dex-activity",
    triggeredBy: "unusual-pair-surge"
  }
];
