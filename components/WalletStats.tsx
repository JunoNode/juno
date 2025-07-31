import React from 'react';

interface Props {
  totalValue: number;
  tokenCount: number;
  signalCount: number;
}

const WalletStats: React.FC<Props> = ({ totalValue, tokenCount, signalCount }) => (
  <div className="bg-glass border border-glass p-4 rounded-xl shadow-jungle text-white mb-6 flex flex-wrap gap-4 justify-between text-sm sm:text-base">
    <div className="flex items-center gap-2">
      <span className="opacity-70">Tokens:</span>
      <span className="font-semibold">{tokenCount}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="opacity-70">Signals:</span>
      <span className="font-semibold">{signalCount}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="opacity-70">Value:</span>
      <span className="font-semibold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </div>
  </div>
);

export default WalletStats;
