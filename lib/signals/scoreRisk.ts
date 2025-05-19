export function scoreRisk(token: {
  isMintable?: boolean;
  isTradingPaused?: boolean;
  isVerified?: boolean;
}): number {
  const weights = {
    isMintable: 3,
    isTradingPaused: 2,
    isVerified: -1
  };

  return (
    (token.isMintable ? weights.isMintable : 0) +
    (token.isTradingPaused ? weights.isTradingPaused : 0) +
    (!token.isVerified ? 1 : 0)
  );
}
