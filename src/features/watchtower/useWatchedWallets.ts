import { useEffect, useState } from "react";
import { getWalletTxs } from "@/lib/api"; // Solana-based tx fetcher

interface Tx {
  txHash: string;
  timestamp: string;
  tokenSymbol: string;
  amount: number;
  valueUsd?: number;
  direction: "in" | "out";
}

interface WatchedWallet {
  address: string;
  label?: string;
  txs: Tx[];
  loading: boolean;
}

export function useWatchedWallets(addresses: { address: string; label?: string }[]) {
  const [wallets, setWallets] = useState<WatchedWallet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        addresses.map(async ({ address, label }) => {
          try {
            const txs = await getWalletTxs(address); // Solana wallet transaction pull
            return {
              address,
              label,
              txs,
              loading: false,
            };
          } catch {
            return {
              address,
              label,
              txs: [],
              loading: false,
            };
          }
        })
      );
      setWallets(results);
    };

    if (addresses.length) {
      fetchData();
    }
  }, [addresses]);

  return wallets;
}
