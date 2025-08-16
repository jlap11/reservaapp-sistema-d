import { useState, useCallback, useEffect } from 'react';

/**
 * useKV: Persistencia ligera basada en localStorage.
 * Replica API: const [value, setValue] = useKV(key, initial)
 * - Serializa en JSON
 * - setValue acepta valor o función updater
 * - Sincroniza entre pestañas mediante 'storage'
 */
export function useKV<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const read = (): T => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return initial;
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  };

  const [value, setValue] = useState<T>(read);

  const setAndPersist: React.Dispatch<React.SetStateAction<T>> = useCallback(
    updater => {
      setValue(prev => {
        const next = typeof updater === 'function' ? (updater as (p: T) => T)(prev) : updater;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // ignorar errores (cuota, etc.)
        }
        return next;
      });
    },
    [key]
  );

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(read());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [value, setAndPersist];
}
