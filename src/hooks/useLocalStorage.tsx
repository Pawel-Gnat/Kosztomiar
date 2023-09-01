import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue: string) => {
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  const [value, setValue] = useState(storedValue || defaultValue);

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return { value, setValue };
};
