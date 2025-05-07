import { useWalletContext } from "@/context/WalletProvider";

export function useWallet() {
  const {
    address,
    walletType,
    connect,
    disconnect,
  } = useWalletContext();

  return {
    address,
    walletType,
    isConnected: !!address,
    connectPhantom: () => connect("phantom"),
    connectMetaMask: () => connect("metamask"),
    disconnect,
  };
}
