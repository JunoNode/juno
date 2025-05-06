import { ethers } from "ethers";

export function isMetaMaskAvailable() {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
}

export async function connectMetaMask(): Promise<string | null> {
  if (!isMetaMaskAvailable()) return null;
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
}

// Phantom (Solana)
export function isPhantomAvailable() {
  return typeof window !== "undefined" && window.solana && window.solana.isPhantom;
}

export async function connectPhantom(): Promise<string | null> {
  if (!isPhantomAvailable()) return null;
  const resp = await window.solana.connect();
  return resp.publicKey.toString();
}
