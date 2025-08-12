import fs from "fs";
import path from "path";
import {
  ACTION_POINTS,
  DAILY_CAPPED_ACTIONS,
  DAILY_CAP_POINTS,
  DECAY_INACTIVITY_DAYS,
  DECAY_RATE_PER_WEEK,
  TIERS,
} from "./actions";
import type { Action, WalletPoints, HistoryItem } from "./types";

const DB_PATH = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_PATH, "points.db.json");

function ensureDb() {
  if (!fs.existsSync(DB_PATH)) fs.mkdirSync(DB_PATH, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ wallets: {} }, null, 2));
}

function loadDb(): { wallets: Record<string, WalletPoints> } {
  ensureDb();
  const raw = fs.readFileSync(DB_FILE, "utf8");
  return JSON.parse(raw || `{"wallets":{}}`);
}

function saveDb(db: { wallets: Record<string, WalletPoints> }) {
  ensureDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function ymd(ts: number) {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function computeTier(points: number): string {
  let tier = TIERS[0].name;
  for (const t of TIERS) {
    if (points >= t.min) tier = t.name;
  }
  return tier;
}

function weeksBetween(a: number, b: number): number {
  const diff = Math.max(0, b - a);
  return diff / (7 * 24 * 60 * 60 * 1000);
}

function daysBetween(a: number, b: number): number {
  const diff = Math.max(0, b - a);
  return diff / (24 * 60 * 60 * 1000);
}

/**
 * Apply inactivity decay if last update > DECAY_INACTIVITY_DAYS
 */
function applyDecayIfNeeded(w: WalletPoints, now: number): void {
  const last = w.lastUpdated || now;
  const days = daysBetween(last, now);
  if (days < DECAY_INACTIVITY_DAYS) return;

  // number of weeks since last decay (or last update)
  const since = Math.max(w.lastDecay || last, last);
  const weeks = weeksBetween(since, now);
  if (weeks <= 0) return;

  const decayFactor = Math.pow(1 - DECAY_RATE_PER_WEEK, weeks);
  const decayed = Math.floor(w.points * decayFactor);

  if (decayed < w.points) {
    const delta = decayed - w.points; // negative
    w.points = decayed;
    const h: HistoryItem = { ts: now, action: "daily_login" as Action, delta, meta: { reason: "decay" } };
    w.history.push(h);
    w.tier = computeTier(w.points);
    w.lastDecay = now;
  }
}

export function getOrCreateWallet(wallet: string, now = Date.now()): WalletPoints {
  const db = loadDb();
  let w = db.wallets[wallet];
  if (!w) {
    w = {
      wallet,
      points: 0,
      tier: computeTier(0),
      history: [],
      lastUpdated: now,
      lastDecay: now,
      dailyTotals: {},
    };
    db.wallets[wallet] = w;
    saveDb(db);
  } else {
    // decay check on read
    applyDecayIfNeeded(w, now);
    w.lastUpdated = now;
    db.wallets[wallet] = w;
    saveDb(db);
  }
  return w;
}

export function awardPoints(
  wallet: string,
  action: Action,
  options?: { qualityBonus?: boolean; meta?: Record<string, any> },
  now = Date.now()
): WalletPoints {
  const db = loadDb();
  let w = db.wallets[wallet];
  if (!w) {
    w = {
      wallet,
      points: 0,
      tier: computeTier(0),
      history: [],
      lastUpdated: now,
      lastDecay: now,
      dailyTotals: {},
    };
    db.wallets[wallet] = w;
  }

  // decay check before awarding
  applyDecayIfNeeded(w, now);

  const base = ACTION_POINTS[action] ?? 0;
  let delta = base;

  // Daily cap enforcement for selected actions
  const day = ymd(now);
  const dayTotal = w.dailyTotals[day] ?? 0;
  if (DAILY_CAPPED_ACTIONS.includes(action)) {
    const remaining = Math.max(0, DAILY_CAP_POINTS - dayTotal);
    if (remaining <= 0) {
      delta = 0;
    } else {
      delta = Math.min(delta, remaining);
    }
  }

  // Optional quality bonus
  if (options?.qualityBonus && delta > 0) {
    delta += 2; // QUALITY_BONUS
  }

  if (delta !== 0) {
    w.points += delta;
    w.tier = computeTier(w.points);
    w.history.push({ ts: now, action, delta, meta: options?.meta });
    if (DAILY_CAPPED_ACTIONS.includes(action)) {
      w.dailyTotals[day] = (w.dailyTotals[day] ?? 0) + delta;
    }
  } else {
    // record "capped" attempt as meta if you want an audit trail
    w.history.push({ ts: now, action, delta: 0, meta: { capped: true } });
  }

  w.lastUpdated = now;
  db.wallets[wallet] = w;
  saveDb(db);
  return w;
}

export function getWallet(wallet: string): WalletPoints | null {
  const db = loadDb();
  const w = db.wallets[wallet];
  if (!w) return null;
  // apply decay on read
  applyDecayIfNeeded(w, Date.now());
  w.lastUpdated = Date.now();
  db.wallets[wallet] = w;
  saveDb(db);
  return w;
}

export function getLeaderboard(limit = 20): WalletPoints[] {
  const db = loadDb();
  const all = Object.values(db.wallets);
  // no decay here for speed; consumers should read wallet to trigger decay
  return all.sort((a, b) => b.points - a.points).slice(0, limit);
}
