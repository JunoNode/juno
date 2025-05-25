If you’re storing session-based GPT memory in a structure like:

export const memory: MemoryEntry[] = [];

export function addToMemory(user: string, assistant: string) {
  memory.push({ user, assistant });
}

export function clearMemory() {
  memory.length = 0;
}

Then test like this:

import { memory, addToMemory, clearMemory } from "@/lib/memory/sessionMemory";

describe("sessionMemory", () => {
  it("adds to memory", () => {
    clearMemory();
    addToMemory("Hi", "Hello");
    expect(memory.length).toBe(1);
    expect(memory[0].user).toBe("Hi");
  });

  it("clears memory", () => {
    clearMemory();
    expect(memory.length).toBe(0);
  });
});
 
