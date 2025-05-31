import React from 'react';

interface WalletHeaderProps {
  address: string;
  totalSignals: number;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ address, totalSignals }) => {
  return (
    <div className="sticky top-0 z-50 bg-jungle/80 backdrop-blur-sm shadow-md p-4 border-b border-glass">
      <div className="max-w-xl mx-auto flex justify-between items-center text-white text-sm">
        <div>
          <strong>Wallet:</strong>{' '}
          <span className="text-glow">
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
        </div>
        <div>
          <strong>Signals:</strong> {totalSignals}
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;
