import { createContext, useContext, useState, useEffect } from "react";
import { connectMetaMask, connectPhantom, isMetaMaskAvailable, isPhantomAvailable } from "@/lib/wallet";

type WalletType = "phantom" | "metamask" | null;

interface WalletContextProps {
  address: string | null;
  walletType: WalletType;
  connect: (type: WalletType) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextProps>({
  address: null,
  walletType: null,
  connect: async () => {},
  disconnect: () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);

  const connect = async (type: WalletType) => {
    try {
      if (type === "phantom" && isPhantomAvailable()) {
        const addr = await connectPhantom();
        if (addr) {
          setAddress(addr);
          setWalletType("phantom");
        }
      } else if (type === "metamask" && isMetaMaskAvailable()) {
        const addr = await connectMetaMask();
        if (addr) {
          setAddress(addr);
          setWalletType("metamask");
        }
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setWalletType(null);
  };

  // Optional: reconnect on page load (e.g., Phantom auto-connect)
  useEffect(() => {
    if (isPhantomAvailable()) {
      window.solana?.connect({ onlyIfTrusted: true }).then((resp: any) => {
        setAddress(resp.publicKey.toString());
        setWalletType("phantom");
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, walletType, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext)
