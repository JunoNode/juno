import type { NextApiRequest, NextApiResponse } from "next";
import { getWallet } from "@/lib/points/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wallet } = req.query as { wallet?: string };
  if (!wallet) return res.status(400).json({ error: "wallet required" });

  const data = getWallet(wallet);
  if (!data) return res.status(404).json({ error: "not found" });

  return res.status(200).json({ ok: true, data });
}
