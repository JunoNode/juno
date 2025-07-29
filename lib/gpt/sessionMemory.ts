export type MemoryRole = "user" | "assistant" | "system";

export interface MemoryEntry {
  role: MemoryRole;
  content: string;
  timestamp: number;
}

const memory: MemoryEntry[] = [];

/**
 * Add a new user + assistant exchange to session memory.
 */
export function addToMemory(user: string, assistant: string): void {
  const now = Date.now();

  memory.push(
    { role: "user", content: user, timestamp: now },
    { role: "assistant", content: assistant, timestamp: now }
  );

  if (process.env.NODE_ENV === "development") {
    console.debug("[Memory] Added user/assistant pair", { user, assistant });
  }
}

/**
 * Retrieve current memory stack.
 */
export function getMemory(): MemoryEntry[] {
  return [...memory];
}

/**
 * Clear all memory entries.
 */
export function clearMemory(): void {
  memory.length = 0;

  if (process.env.NODE_ENV === "development") {
    console.debug("[Memory] Cleared session memory");
  }
}

/**
 * Add a system-level instruction to memory.
 */
export function injectSystemMessage(content: string): void {
  memory.unshift({
    role: "system",
    content,
    timestamp: Date.now(),
  });

  if (process.env.NODE_ENV === "development") {
    console.debug("[Memory] System message injected:", content);
  }
}
