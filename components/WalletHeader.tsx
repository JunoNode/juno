import React, { useState } from 'react';

interface WalletHeaderProps {
  address: string;
  totalSignals: number;
  onRefresh?: () => void; // Optional callback for actual refresh logic
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ address, totalSignals, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);

    // Simulated delay — replace with actual refresh logic if needed
    setTimeout(() => {
      onRefresh?.();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="sticky top-0 z-50 bg-jungle/80 backdrop-blur-sm shadow-md p-4 border-b border-glass">
      <div className="max-w-xl mx-auto flex justify-between items-center text-white text-sm">
        <div>
          <strong>Wallet:</strong>{' '}
          <span className="text-glow">
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <strong>Signals:</strong> {totalSignals}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="border border-white/20 px-2 py-1 rounded text-white hover:bg-white/10 transition"
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;