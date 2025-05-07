import { useEffect, useState } from "react";
import { formatUsd, truncateAddress } from "@/lib/utils";
import { getWalletTxs } from "@/lib/api"; // You’ll implement this

interface WatchedWalletProps {
  address: string;
  label?: string;
}

interface Tx {
  txHash: string;
  timestamp: string;
  tokenSymbol: string;
  amount: number;
  valueUsd?: number;
  direction: "in" | "out";
}

export default function WatchedWallet({ address, label }: WatchedWalletProps) {
  const [txs, setTxs] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTxs = async () => {
      try {
        setLoading(true);
        const data = await getWalletTxs(address); // your API call
        setTxs(data);
      } catch (err) {
        console.error("Failed to load wallet txs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTxs();
  }, [address]);

  return (
    <div className="bg-glass backdrop-blur p-5 rounded-2xl shadow-md mb-6 text-white">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">
          {label ? label : truncateAddress(address)}
        </h3>
        <p className="text-xs opacity-60">Tracking recent token movements</p>
      </div>

      {loading ? (
        <p className="text-sm opacity-60">Loading activity...</p>
      ) : txs.length === 0 ? (
        <p className="text-sm opacity-60">No recent transactions found.</p>
      ) : (
        <div className="space-y-3 text-sm">
          {txs.map((tx, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg"
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  {tx.direction === "in" ? "🟢 In" : "🔴 Out"} {tx.tokenSymbol}
                </span>
                <span className="text-xs opacity-60">{tx.timestamp}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold">
                  {tx.amount} {tx.tokenSymbol}
                </span>
                {tx.valueUsd && (
                  <span className="text-xs opacity-50 block">
                    {formatUsd(tx.valueUsd)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
