import React from "react";

const TokenEmptyState = () => (
  <div className="text-center mt-20 text-white opacity-80">
    <h2 className="text-lg font-semibold mb-2">No tokens found</h2>
    <p className="text-sm text-gray-400">This wallet doesn’t currently hold any assets. Check back after your next transaction.</p>
  </div>
);

export default TokenEmptyState;
