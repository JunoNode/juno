import { useWalletContext } from "@/context/WalletProvider";

export function useWallet() {
  const { address, walletType, connect } = useWalletContext();

  const isConnected = Boolean(address);

  const connectMetaMask = () => connect("metamask");
  const connectPhantom = () => connect("phantom");

  return {
    address,
    walletType,
    isConnected,
    connectMetaMask,
    connectPhantom,
  };
}