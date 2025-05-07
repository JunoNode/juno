// 1. Check if Phantom is available
export function isPhantomAvailable(): boolean {
  return typeof window !== "undefined" && !!window.solana && window.solana.isPhantom;
}

// 2. Connect to Phantom wallet
export async function connectPhantom(): Promise<string | null> {
  try {
    if (!isPhantomAvailable()) {
      throw new Error("Phantom wallet not found");
    }

    const resp = await window.solana.connect();
    return resp.publicKey.toString();
  } catch (err) {
    console.error("Phantom connection error:", err);
    return null;
  }
}

// 3. Check if MetaMask is available
export function isMetaMaskAvailable(): boolean {
  return typeof window !== "undefined" && !!window.ethereum;
}

// 4. Connect to MetaMask (fallback)
export async function connectMetaMask(): Promise<string | null> {
  try {
    if (!isMetaMaskAvailable()) {
      throw new Error("MetaMask not found");
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (err) {
    console.error("MetaMask connection error:", err);
    return null;
  }
}
