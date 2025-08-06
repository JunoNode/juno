import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isClient = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isClient) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Fail silently
    }
  }, [key, storedValue, isClient]);

  return [storedValue, setStoredValue] as const;
}
