import React from 'react';
import { TokenHolding } from '../types/token';

interface TokenValueBarProps {
  tokens: TokenHolding[];
}

const TokenValueBar: React.FC<TokenValueBarProps> = ({ tokens }) => {
  const totalValue = tokens.reduce((sum, token) => sum + token.usdValue, 0);

  return (
    <div className="mt-6 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-100 mb-2">Portfolio Distribution</h3>
      <div className="flex h-5 w-full overflow-hidden rounded-full bg-glass shadow-inner">
        {tokens.map((token, i) => {
          const percentage = (token.usdValue / totalValue) * 100;
          return (
            <div
              key={i}
              title={`${token.symbol}: ${percentage.toFixed(1)}%`}
              style={{ width: `${percentage}%` }}
              className="h-full transition-all duration-300 ease-in-out"
              // Different token = different color (for now random pastel)
              // For production: use token color map
              className="h-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: `hsl(${(i * 70) % 360}, 70%, 70%)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TokenValueBar;
