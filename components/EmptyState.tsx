import React from 'react';

const EmptyState = () => (
  <div className="text-center mt-24 text-white px-6">
    <h2 className="text-2xl font-semibold mb-3">No Wallet Connected</h2>
    <p className="text-sm text-gray-400 mb-6">
      Connect a wallet to surface real-time activity, token data, and AI insights from the chain.
    </p>
    <div className="inline-block rounded-lg bg-white text-jungle font-medium text-sm px-4 py-2 shadow hover:shadow-md transition cursor-not-allowed opacity-50">
      Connect Wallet
    </div>
  </div>
);

export default EmptyState;
