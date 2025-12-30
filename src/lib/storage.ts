/**
 * Local storage utilities
 */

const STORAGE_PREFIX = "frudoku-";

export const STORAGE_KEYS = {
  THEME: `${STORAGE_PREFIX}theme`,
  CUSTOM_FRUITS: `${STORAGE_PREFIX}custom-fruits`,
} as const;

/**
 * Load a value from local storage
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Save a value to local storage
 */
export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}
