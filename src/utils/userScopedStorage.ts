const CURRENT_USER_KEY = 'intellipath_current_user';

export function getCurrentUserId(): string {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    const user = raw ? JSON.parse(raw) : null;
    return String(user?.id || 'guest');
  } catch {
    return 'guest';
  }
}

export function userScopedKey(baseKey: string, userId = getCurrentUserId()): string {
  const safeId = String(userId || 'guest').replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${baseKey}::${safeId}`;
}

export function readUserScoped<T>(baseKey: string, fallback: T, userId?: string): T {
  try {
    const raw = localStorage.getItem(userScopedKey(baseKey, userId));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeUserScoped<T>(baseKey: string, value: T, userId?: string): void {
  try {
    localStorage.setItem(userScopedKey(baseKey, userId), JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or quota-exhausted sessions.
  }
}

export function removeUserScoped(baseKey: string, userId?: string): void {
  try { localStorage.removeItem(userScopedKey(baseKey, userId)); } catch {}
}

export function clearUserScopedData(userId = getCurrentUserId()): void {
  const suffix = `::${String(userId || 'guest').replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.endsWith(suffix)) localStorage.removeItem(key);
    });
  } catch {}
}
