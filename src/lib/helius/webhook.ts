import { HELIUS_WEBHOOK_AUTH } from "@/config/helius";
import { getEnhancedTransactions } from "@/lib/helius/client";
import { toActivities } from "@/lib/helius/normalize";
import type { HeliusEnhancedWebhookPayload, HeliusEnhancedTransaction } from "@/types/helius";

function verifyAuthHeader(h: Headers | Record<string, string | string[] | undefined>) {
  const get = (k: string) =>
    typeof (h as any).get === "function"
      ? (h as any).get(k)
      : Array.isArray((h as any)[k])
      ? ((h as any)[k] as string[])[0]
      : (h as any)[k];
  const incoming = (get("authorization") || get("Authorization") || "").toString();
  return HELIUS_WEBHOOK_AUTH && incoming === HELIUS_WEBHOOK_AUTH;
}

function extractSignatures(payload: unknown): string[] {
  const sigs: string[] = [];
  const push = (x?: string) => x && typeof x === "string" && sigs.push(x);

  const walk = (node: any) => {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node === "object") {
      if (typeof node.signature === "string") push(node.signature);
      for (const v of Object.values(node)) walk(v as any);
    }
  };

  walk(payload);
  return Array.from(new Set(sigs)).slice(0, 128);
}

export async function handleHeliusWebhook(req: Request): Promise<Response> {
  if (!verifyAuthHeader((req as any).headers)) return new Response("unauthorized", { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return new Response("bad request", { status: 400 });

  const maybeEnhanced: HeliusEnhancedWebhookPayload = body as any;

  let enhanced: HeliusEnhancedTransaction[] | null = null;

  if (Array.isArray(maybeEnhanced)) {
    enhanced = maybeEnhanced as HeliusEnhancedTransaction[];
  } else if (Array.isArray((maybeEnhanced as any).transactions)) {
    enhanced = (maybeEnhanced as any).transactions as HeliusEnhancedTransaction[];
  } else if (Array.isArray((maybeEnhanced as any).data)) {
    enhanced = (maybeEnhanced as any).data as HeliusEnhancedTransaction[];
  }

  if (!enhanced || enhanced.length === 0) {
    const sigs = extractSignatures(body);
    if (sigs.length === 0) return new Response("ok", { status: 200 });
    enhanced = await getEnhancedTransactions(sigs);
  }

  const activities = toActivities(enhanced);

  // TODO: persist or enqueue `activities` here
  return new Response(JSON.stringify({ ok: true, count: activities.length }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
