import { MemoryEntry } from "@/lib/memory";

export function buildPrompt(memory: MemoryEntry[], newPrompt: string, walletSummary?: string): any[] {
  const base: any[] = [];

  if (walletSummary) {
    base.push({
      role: "system",
      content: `This user holds the following tokens: ${walletSummary}. Use this context when replying.`,
    });
  }

  const history = memory.map((m) => ({ role: m.role, content: m.content }));

  return [...base, ...history, { role: "user", content: newPrompt }];
}
