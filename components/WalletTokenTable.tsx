import React from 'react';
import { TokenHolding } from '../types/token';

interface Props {
  tokens: TokenHolding[];
}

const WalletTokenTable: React.FC<Props> = ({ tokens }) => {
  return (
    <div className="mt-6 rounded-xl bg-white p-4 shadow-md max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Token Holdings</h3>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-500 uppercase">
          <tr>
            <th className="pb-2">Name</th>
            <th className="pb-2">Symbol</th>
            <th className="pb-2 text-right">Amount</th>
            <th className="pb-2 text-right">USD Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="py-2">{token.name}</td>
              <td className="py-2">{token.symbol}</td>
              <td className="py-2 text-right">{token.amount.toFixed(2)}</td>
              <td className="py-2 text-right">${token.usdValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTokenTable;
