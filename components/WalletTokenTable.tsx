import React from 'react';

interface Token {
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
}

interface Props {
  tokens: Token[];
}

const WalletTokenTable: React.FC<Props> = ({ tokens }) => {
  return (
    <div className="mt-6 max-w-3xl mx-auto px-4">
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Token Holdings</h3>
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="border-b border-glass">
          <tr>
            <th className="py-2">Token</th>
            <th className="py-2 text-right">Amount</th>
            <th className="py-2 text-right">Value (USD)</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, idx) => (
            <tr key={idx} className="border-b border-glass hover:bg-glass transition">
              <td className="py-2 max-w-[160px] truncate" title={token.name}>
                <span className="font-medium">{token.symbol}</span>
              </td>
              <td className="py-2 text-right">{token.amount.toLocaleString()}</td>
              <td className="py-2 text-right">${token.usdValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTokenTable;