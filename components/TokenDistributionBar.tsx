import React from 'react';

interface Token {
  symbol: string;
  usdValue: number;
}

const TokenDistributionBar = ({ tokens }: { tokens: Token[] }) => {
  const total = tokens.reduce((sum, t) => sum + t.usdValue, 0);

  if (!total || tokens.length === 0) {
    return (
      <div className="h-4 mt-4 bg-glass rounded text-xs text-center text-white opacity-50 flex items-center justify-center">
        No token distribution available
      </div>
    );
  }

  return (
    <div className="flex h-4 mt-4 rounded overflow-hidden bg-glass border border-glass">
      {tokens.map((t, i) => {
        const width = (t.usdValue / total) * 100;
        return (
          <div
            key={i}
            style={{ width: `${width}%` }}
            className="bg-glow h-full transition-all duration-300"
            title={`${t.symbol}: ${width.toFixed(1)}%`}
            aria-label={`${t.symbol}: ${width.toFixed(1)}% of total`}
          />
        );
      })}
    </div>
  );
};

export default TokenDistributionBar;
