import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initial: string) => {
  const [value, setValue] = useState(() => localStorage.getItem(key) || initial);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
