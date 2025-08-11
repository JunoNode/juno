declare global {
  interface Window {
    solana?: PhantomProvider;
    ethereum?: EthereumProvider;
  }
}

type PublicKeyLike = { toString(): string };

export interface PhantomProvider {
  isPhantom: boolean;
  isConnected?: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: PublicKeyLike }>;
  disconnect?: () => Promise<void> | void;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
}

export interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] | object }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
}

// --- Guards ----------------------------------------------------

export function isPhantomAvailable(): boolean {
  return typeof window !== "undefined" && !!window.solana && !!window.solana.isPhantom;
}

export function isMetaMaskAvailable(): boolean {
  return typeof window !== "undefined" && !!window.ethereum;
}

function getPhantom(): PhantomProvider | null {
  return isPhantomAvailable() ? window.solana! : null;
}

function getMetaMask(): EthereumProvider | null {
  return isMetaMaskAvailable() ? window.ethereum! : null;
}

// --- Phantom ---------------------------------------------------

/** Try to grab an already-authorized Phantom session silently. */
export async function eagerPhantomAddress(): Promise<string | null> {
  const phantom = getPhantom();
  if (!phantom) return null;
  try {
    const resp = await phantom.connect({ onlyIfTrusted: true });
    return resp.publicKey.toString();
  } catch {
    return null;
  }
}

/** Prompt user to connect Phantom. */
export async function connectPhantom(): Promise<string | null> {
  const phantom = getPhantom();
  if (!phantom) {
    console.error("Phantom wallet not found");
    return null;
  }
  try {
    const resp = await phantom.connect();
    return resp.publicKey.toString();
  } catch (err) {
    console.error("Phantom connection error:", err);
    return null;
  }
}

export async function disconnectPhantom(): Promise<void> {
  const phantom = getPhantom();
  try {
    await phantom?.disconnect?.();
  } catch (err) {
    console.warn("Phantom disconnect error:", err);
  }
}

// --- MetaMask (fallback / EVM) --------------------------------

/**
 * Prompt MetaMask to connect. Optionally request a specific chainId (hex string),
 * e.g. "0x1" for Ethereum mainnet or "0x89" for Polygon.
 */
export async function connectMetaMask(opts?: { chainId?: string }): Promise<string | null> {
  const eth = getMetaMask();
  if (!eth) {
    console.error("MetaMask not found");
    return null;
  }
  try {
    if (opts?.chainId) {
      try {
        await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: opts.chainId }] });
      } catch (switchErr: any) {
        // 4902 = unknown chain; try to add if necessary (caller can handle)
        if (switchErr?.code !== 4902) throw switchErr;
      }
    }
    const accounts: string[] = await eth.request({ method: "eth_requestAccounts" });
    return accounts?.[0] ?? null;
  } catch (err) {
    console.error("MetaMask connection error:", err);
    return null;
  }
}

/** Read current MetaMask account without prompting (if already connected). */
export async function getMetaMaskAddress(): Promise<string | null> {
  const eth = getMetaMask();
  if (!eth) return null;
  try {
    const accounts: string[] = await eth.request({ method: "eth_accounts" });
    return accounts?.[0] ?? null;
  } catch {
    return null;
  }
}
