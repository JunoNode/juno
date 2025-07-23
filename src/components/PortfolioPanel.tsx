import React from "react";
import WalletTokenTable from "./WalletTokenTable";
import TokenDistributionBar from "./TokenDistributionBar";

interface Token {
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
}

interface Props {
  tokens: Token[];
}

export default function PortfolioPanel({ tokens }: Props) {
  const totalValue = tokens.reduce((sum, t) => sum + t.usdValue, 0);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 space-y-6">
      <h2 className="text-xl font-semibold text-white opacity-90">
        Portfolio Overview
      </h2>

      <TokenDistributionBar tokens={tokens} />

      <div className="text-sm text-juno-gray-light opacity-80">
        Total Value: <span className="font-semibold">${totalValue.toFixed(2)}</span>
      </div>

      <WalletTokenTable tokens={tokens} />
    </div>
  );
}

