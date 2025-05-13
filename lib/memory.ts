const KEY = "juno-memory";

export interface MemoryEntry {
  role: "user" | "assistant";
  content: string;
}

export function getMemory(): MemoryEntry[] {
  if (typeof window === "undefined") return [];
  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addMemory(entry: MemoryEntry) {
  const current = getMemory();
  const next = [...current, entry].slice(-10); // Keep last 10
  sessionStorage.setItem(KEY, JSON.stringify(next));
}

export function clearMemory() {
  sessionStorage.removeItem(KEY);
}
