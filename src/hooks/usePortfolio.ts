import { useEffect, useState } from "react";
import { TokenInfo } from "@/types/token";
import { fetchWalletTokens } from "@/lib/portfolio";

interface UsePortfolioResult {
  tokens: TokenInfo[];
  isLoading: boolean;
  hasRisk: (token: TokenInfo) => boolean;
}

export function usePortfolio(walletAddress: string): UsePortfolioResult {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;

    const loadTokens = async () => {
      setIsLoading(true);
      try {
        const result = await fetchWalletTokens(walletAddress);
        setTokens(result);
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
        setTokens([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens();
  }, [walletAddress]);

  const hasRisk = (token: TokenInfo): boolean => {
    if (!token.riskFlags) return false;
    return Object.values(token.riskFlags).some((flag) => flag);
  };

  return { tokens, isLoading, hasRisk };
}