import { createContext, useContext, useState, useEffect } from "react";
import { connectMetaMask, connectPhantom, isMetaMaskAvailable, isPhantomAvailable } from "@/lib/wallet";

type WalletType = "phantom" | "metamask" | null;

interface WalletContextProps {
  address: string | null;
  walletType: WalletType;
  connect: (type: WalletType) => Promise<void>;
}

const WalletContext = createContext<WalletContextProps>({
  address: null,
  walletType: null,
  connect: async () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);

  const connect = async (type: WalletType) => {
    if (type === "phantom" && isPhantomAvailable()) {
      const addr = await connectPhantom();
      setAddress(addr);
      setWalletType("phantom");
    } else if (type === "metamask" && isMetaMaskAvailable()) {
      const addr = await connectMetaMask();
      setAddress(addr);
      setWalletType("metamask");
    }
  };

  useEffect(() => {
    // Optionally check for connected wallet on load
  }, []);

  return (
    <WalletContext.Provider value={{ address, walletType, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
