export const HELIUS_API_KEY = process.env.HELIUS_API_KEY || "";
export const HELIUS_WEBHOOK_AUTH = process.env.HELIUS_WEBHOOK_AUTH || "";
export const HELIUS_NETWORK = (process.env.HELIUS_NETWORK || "mainnet") as
  | "mainnet"
  | "testnet"
  | "devnet";

export const HELIUS_API_BASE = "https://api.helius.xyz";
export const HELIUS_ENH_TX_URL = `${HELIUS_API_BASE}/v0/transactions?api-key=${HELIUS_API_KEY}`;

export const HELIUS_RPC_URL =
  HELIUS_NETWORK === "mainnet"
    ? `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
    : `https://${HELIUS_NETWORK}.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
