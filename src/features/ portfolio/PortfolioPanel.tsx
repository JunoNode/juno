import { useEffect, useState } from "react";
import { formatUsd, truncateAddress } from "@/lib/utils";
import { getTokenBalances, getTokenSecurity } from "@/lib/api";
import { useWalletContext } from "@/context/WalletProvider";

interface Token {
  contractAddress: string;
  symbol: string;
  name: string;
  balance: string;
  logo_url?: string;
  quote: number;
  riskFlags?: string[];
}

export default function PortfolioPanel() {
  const { address } = useWalletContext();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchTokens = async () => {
      setLoading(true);
      try {
        const tokenData = await getTokenBalances(address);
        const tokenList: Token[] = tokenData.items.map((t: any) => ({
          contractAddress: t.contract_address,
          symbol: t.contract_ticker_symbol,
          name: t.contract_name,
          balance: t.balance / 10 ** t.contract_decimals,
          quote: t.quote,
          logo_url: t.logo_url,
        }));

        // Check risk for each token using GoPlus
        const flagged = await Promise.all(
          tokenList.map(async (token) => {
            try {
              const risk = await getTokenSecurity(token.contractAddress);
              const flags = risk[token.contractAddress.toLowerCase()];
              const activeFlags = Object.entries(flags)
                .filter(([_, v]) => v === "1")
                .map(([k]) => k.replace(/_/g, " "));
              return { ...token, riskFlags: activeFlags };
            } catch {
              return token;
            }
          })
        );

        setTokens(flagged);
      } catch (err) {
        console.error("Portfolio fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [address]);

  if (!address) return <p className="opacity-60">Connect your wallet to view your treasure map.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 rounded-2xl bg-glass backdrop-blur text-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Treasure Map</h2>
      {loading ? (
        <p className="opacity-60">Loading your assets...</p>
      ) : tokens.length === 0 ? (
        <p className="opacity-60">No tokens found for {truncateAddress(address)}</p>
      ) : (
        <div className="space-y-4">
          {tokens.map((token, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3">
                {token.logo_url ? (
                  <img src={token.logo_url} alt={token.symbol} className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 bg-gray-500 rounded-full" />
                )}
                <div>
                  <p className="font-medium">{token.symbol}</p>
                  <p className="text-xs opacity-50">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatUsd(token.quote)}</p>
                {token.riskFlags && token.riskFlags.length > 0 && (
                  <p className="text-xs text-red-400">
                    ⚠ {token.riskFlags.slice(0, 2).join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
