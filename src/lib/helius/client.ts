import { HELIUS_ENH_TX_URL, HELIUS_RPC_URL } from "@/config/helius";
import type { HeliusEnhancedTransaction } from "@/types/helius";

export async function getEnhancedTransactions(signatures: string[]): Promise<HeliusEnhancedTransaction[]> {
  if (!Array.isArray(signatures) || signatures.length === 0) return [];
  const res = await fetch(HELIUS_ENH_TX_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ transactions: signatures }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Helius getEnhancedTransactions failed: ${res.status}`);
  const data = (await res.json()) as HeliusEnhancedTransaction[];
  return Array.isArray(data) ? data : [];
}

type JsonRpcRequest = { jsonrpc: "2.0"; id: string | number; method: string; params?: unknown[] };
type JsonRpcResponse<T> = { jsonrpc: "2.0"; id: string | number; result?: T; error?: { code: number; message: string } };

export async function rpc<T>(method: string, params: unknown[] = []): Promise<T> {
  const payload: JsonRpcRequest = { jsonrpc: "2.0", id: Date.now(), method, params };
  const res = await fetch(HELIUS_RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Helius RPC ${method} failed: ${res.status}`);
  const json = (await res.json()) as JsonRpcResponse<T>;
  if (json.error) throw new Error(json.error.message);
  return json.result as T;
}

export async function getTransaction(signature: string, parsed = true) {
  const cfg = parsed ? { commitment: "confirmed", maxSupportedTransactionVersion: 0 } : { commitment: "confirmed" };
  return rpc("getTransaction", [signature, parsed ? { ...cfg, encoding: "jsonParsed" } : cfg]);
}

export async function getBlock(slot: number) {
  return rpc("getBlock", [slot, { maxSupportedTransactionVersion: 0 }]);
}

