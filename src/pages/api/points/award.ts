import type { NextApiRequest, NextApiResponse } from "next";
import { awardPoints } from "@/lib/points/store";
import type { Action } from "@/lib/points/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { wallet, action, qualityBonus, meta } = req.body as {
    wallet?: string;
    action?: Action;
    qualityBonus?: boolean;
    meta?: Record<string, any>;
  };

  if (!wallet || !action) return res.status(400).json({ error: "wallet and action required" });

  try {
    const result = awardPoints(wallet, action, { qualityBonus, meta });
    return res.status(200).json({ ok: true, data: result });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "internal error" });
  }
}
