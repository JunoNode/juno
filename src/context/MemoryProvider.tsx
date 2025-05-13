import { createContext, useContext, useState, useEffect } from "react";
import { MemoryEntry, getMemory, addMemory, clearMemory } from "@/lib/memory";

interface MemoryContextValue {
  memory: MemoryEntry[];
  add: (entry: MemoryEntry) => void;
  reset: () => void;
}

const MemoryContext = createContext<MemoryContextValue | null>(null);

export const MemoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [memory, setMemory] = useState<MemoryEntry[]>([]);

  useEffect(() => {
    setMemory(getMemory());
  }, []);

  const add = (entry: MemoryEntry) => {
    addMemory(entry);
    setMemory((prev) => [...prev, entry].slice(-10));
  };

  const reset = () => {
    clearMemory();
    setMemory([]);
  };

  return (
    <MemoryContext.Provider value={{ memory, add, reset }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemoryContext = () => {
  const ctx = useContext(MemoryContext);
  if (!ctx) throw new Error("useMemoryContext must be used inside MemoryProvider");
  return ctx;
};
