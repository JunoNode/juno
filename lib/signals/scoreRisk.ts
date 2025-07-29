interface TokenRiskFlags {
  isMintable?: boolean;
  isTradingPaused?: boolean;
  isVerified?: boolean;
}

export function scoreRisk(token: TokenRiskFlags): number {
  const weights: Record<keyof TokenRiskFlags, number> = {
    isMintable: 3,
    isTradingPaused: 2,
    isVerified: -1,
  };

  let score = 0;

  if (token.isMintable) {
    score += weights.isMintable;
  }

  if (token.isTradingPaused) {
    score += weights.isTradingPaused;
  }

  if (token.isVerified === false) {
    score += 1; // Slight penalty for unverified
  }

  return score;
}
