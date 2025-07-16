import React from 'react';

interface WalletDashboardProps {
  address: string;
  totalSignals: number;
  topSignalType: string;
  avgConfidence: number;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({
  address,
  totalSignals,
  topSignalType,
  avgConfidence,
}) => {
  const truncatedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <section className="bg-glass rounded-2xl p-6 shadow-soft backdrop-blur-xs border border-glass max-w-xl mx-auto mt-4">
      <h2 className="text-lg font-semibold text-white mb-4 tracking-tight">
        Wallet Overview
      </h2>

      <p className="text-sm text-gray-300 mb-4">
        <span className="font-medium text-gray-400">Address:</span>{' '}
        <span className="text-white">{truncatedAddress}</span>
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm text-white">
        <div>
          <p className="text-gray-400 font-medium">Total Signals</p>
          <p>{totalSignals}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">Top Signal</p>
          <p>{topSignalType}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">Avg. Confidence</p>
          <p>{(avgConfidence * 100).toFixed(1)}%</p>
        </div>
      </div>
    </section>
  );
};

export default WalletDashboard;
