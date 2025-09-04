import type { Activity, ActivityKind } from "@/types/activity";
import type { HeliusEnhancedTransaction, HeliusTokenTransfer, HeliusNativeTransfer } from "@/types/helius";

function pickFirst<T>(arr?: T[]): T | undefined {
  return Array.isArray(arr) && arr.length > 0 ? arr[0] : undefined;
}

function classify(tx: HeliusEnhancedTransaction): ActivityKind {
  const t = (tx.type || "").toUpperCase();
  if (t.includes("SWAP")) return "SWAP";
  if (t.includes("STAKE") || t.includes("DEPOSIT")) return "STAKE";
  if (t.includes("UNSTAKE") || t.includes("WITHDRAW")) return "UNSTAKE";
  if (t.includes("MINT")) return "MINT";
  if (t.includes("BURN")) return "BURN";
  if (t.includes("TRANSFER")) return "TRANSFER";
  return "UNKNOWN";
}

function lamportsFromNative(n?: HeliusNativeTransfer) {
  return n?.amount;
}

function tokenDetails(tt?: HeliusTokenTransfer) {
  if (!tt) return { mint: undefined as string | undefined, amount: undefined as number | undefined, symbol: undefined as string | undefined };
  const pow = typeof tt.decimals === "number" ? Math.pow(10, tt.decimals) : undefined;
  const amount = typeof tt.tokenAmount === "number" && pow ? tt.tokenAmount / pow : tt.tokenAmount;
  return { mint: tt.mint, amount, symbol: tt.symbol };
}

export function toActivity(tx: HeliusEnhancedTransaction): Activity {
  const kind = classify(tx);
  const native = pickFirst(tx.nativeTransfers);
  const token = pickFirst(tx.tokenTransfers);
  const tdet = tokenDetails(token);
  return {
    signature: tx.signature,
    slot: tx.slot,
    ts: tx.timestamp,
    kind,
    mint: tdet.mint,
    amount: tdet.amount ?? (lamportsFromNative(native) ?? undefined),
    symbol: tdet.symbol,
    from: token?.fromUserAccount || native?.fromUserAccount,
    to: token?.toUserAccount || native?.toUserAccount,
    feeLamports: tx.fee,
    source: tx.source,
    rawType: tx.type,
  };
}

export function toActivities(txs: HeliusEnhancedTransaction[]): Activity[] {
  return (txs || []).map(toActivity);
}
