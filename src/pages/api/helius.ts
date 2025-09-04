import type { NextApiRequest, NextApiResponse } from "next";
import { handleHeliusWebhook } from "@/lib/helius/webhook";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const r = await handleHeliusWebhook(new Request(req.url || "", { method: req.method, headers: req.headers as any, body: req.method !== "GET" ? JSON.stringify(req.body) : undefined }));
  res.status(r.status);
  r.headers.forEach((v, k) => res.setHeader(k, v));
  res.send(await r.text());
}
