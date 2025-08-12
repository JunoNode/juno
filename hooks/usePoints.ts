import { useCallback, useEffect, useState } from "react";

interface PointsState {
  wallet: string;
  points: number;
  tier: string;
}

export function usePoints(wallet?: string) {
  const [state, setState] = useState<PointsState | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/points/${wallet}`);
      const j = await r.json();
      if (j.ok) {
        setState({ wallet: j.data.wallet, points: j.data.points, tier: j.data.tier });
      }
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  const award = useCallback(
    async (action: string, opts?: { qualityBonus?: boolean; meta?: Record<string, any> }) => {
      if (!wallet) return;
      const r = await fetch(`/api/points/award`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, action, qualityBonus: opts?.qualityBonus, meta: opts?.meta }),
      });
      const j = await r.json();
      if (j.ok) {
        setState({ wallet: j.data.wallet, points: j.data.points, tier: j.data.tier });
      }
    },
    [wallet]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { state, loading, refresh, award };
}
