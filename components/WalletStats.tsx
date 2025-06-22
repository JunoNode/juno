import React from 'react';

interface Props {
  totalValue: number;
  tokenCount: number;
  signalCount: number;
}

const WalletStats: React.FC<Props> = ({ totalValue, tokenCount, signalCount }) => (
  <div className="bg-glass p-4 rounded-xl shadow-jungle text-white mb-4 flex justify-between text-sm">
    <span>💰 Tokens: {tokenCount}</span>
    <span>📡 Signals: {signalCount}</span>
    <span>📊 Value: ${totalValue.toFixed(2)}</span>
  </div>
);

export default WalletStats;
