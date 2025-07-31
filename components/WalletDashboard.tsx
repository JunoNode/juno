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
    <section className="bg-glass border border-glass rounded-2xl p-6 shadow-jungle backdrop-blur-sm max-w-xl mx-auto mt-6 text-white">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">
        Wallet Overview
      </h2>

      <p className="text-sm mb-5">
        <span className="text-gray-400 font-medium">Address:</span>{' '}
        <span className="text-white font-mono">{truncatedAddress}</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Total Signals</span>
          <span className="text-white font-semibold">{totalSignals}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Top Signal</span>
          <span className="text-white font-semibold">{topSignalType}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Avg. Confidence</span>
          <span className="text-white font-semibold">
            {(avgConfidence * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default WalletDashboard;
