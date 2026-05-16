// utils/storage.ts

function isBrowser() {
  return typeof window !== "undefined";
}

export const safeStorage = {
  get<T>(key: string, defaultValue: T): T {
    if (!isBrowser()) return defaultValue;

    try {
      const value = window.localStorage.getItem(key);
      if (!value) return defaultValue;
      return JSON.parse(value) as T;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T) {
    if (!isBrowser()) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // optionally log error
    }
  },

  remove(key: string) {
    if (!isBrowser()) return;

    window.localStorage.removeItem(key);
  },
};
