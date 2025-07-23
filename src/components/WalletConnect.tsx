import { useState } from "react";

export default function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Future: trigger wallet connection logic here
    setTimeout(() => setIsConnecting(false), 1200);
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleConnect}
        className="bg-jungle-glow text-black font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
      <p className="text-xs opacity-50 mt-1">
        Phantom and MetaMask supported
      </p>
    </div>
  );
}
