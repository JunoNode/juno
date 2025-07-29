import { MemoryEntry } from "@/lib/memory";

export function buildPrompt(
  memory: MemoryEntry[],
  newPrompt: string,
  walletSummary?: string
): { role: "system" | "user" | "assistant"; content: string }[] {
  const prompt: { role: "system" | "user" | "assistant"; content: string }[] = [];

  if (walletSummary) {
    prompt.push({
      role: "system",
      content: `Context: This user holds the following tokens — ${walletSummary}. Use this information to inform your responses.`,
    });
  }

  const history = memory.map((entry) => ({
    role: entry.role,
    content: entry.content,
  }));

  return [...prompt, ...history, { role: "user", content: newPrompt }];
}
