import React from 'react';

const WalletAddressBadge = ({ address }: { address: string }) => {
  const short = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const copy = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <span
      title={address}
      onClick={copy}
      className="cursor-pointer text-sm bg-glass px-2 py-1 rounded hover:bg-glow transition"
    >
      {short}
    </span>
  );
};

export default WalletAddressBadge;