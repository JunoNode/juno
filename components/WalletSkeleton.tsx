import React from 'react';

const WalletSkeleton: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto animate-pulse space-y-4 mt-6">
      <div className="h-6 bg-glass rounded w-1/3" />
      <div className="h-4 bg-glass rounded w-2/3" />
      <div className="h-4 bg-glass rounded w-1/2" />
      <div className="h-48 bg-glass rounded-xl mt-4" />
    </div>
  );
};

export default WalletSkeleton;
