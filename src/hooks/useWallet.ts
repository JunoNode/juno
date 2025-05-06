import { useWalletContext } from "@/context/WalletProvider";

export function useWallet() {
  const { address, walletType, connect } = useWalletContext();

  return {
    address,
    walletType,
    isConnected: !!address,
    connectMetaMask: () => connect("metamask"),
    connectPhantom: () => connect("phantom"),
  };
}
