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
  avgConfidence
}) => {
  return (
    <div className="rounded-2xl shadow-md p-6 bg-white max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Wallet Dashboard</h2>

      <p className="text-sm text-gray-600 mb-2">
        <strong>Address:</strong> {address.slice(0, 4)}...{address.slice(-4)}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold">Total Signals</p>
          <p>{totalSignals}</p>
        </div>
        <div>
          <p className="font-semibold">Top Signal</p>
          <p>{topSignalType}</p>
        </div>
        <div>
          <p className="font-semibold">Avg. Confidence</p>
          <p>{(avgConfidence * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
