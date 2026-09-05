import { UserProfile } from '../types';
import { userScopedKey } from '../utils/userScopedStorage';
import { getFirebaseAuth, getFirebaseConfigError } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const STORAGE_KEY = 'intellipath_current_user';
const ACCOUNTS_KEY = 'intellipath_accounts_registry';
const LEGACY_OWNER_KEY = 'intellipath_legacy_state_owner';

type AccountRegistry = Record<string, UserProfile>;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function readRegistry(): AccountRegistry {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as AccountRegistry) : {};
  } catch {
    return {};
  }
}

function writeRegistry(registry: AccountRegistry): void {
  try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(registry)); } catch {}
}

function migrateLegacyStateToUser(userId: string, email: string): void {
  try {
    const owner = localStorage.getItem(LEGACY_OWNER_KEY);
    if (owner !== normalizeEmail(email)) return;
    const keys = [
      'intellipath_roadmap_progress',
      'intellipath_courses_master_state',
      'intellipath_active_selected_course_id',
      'intellipath_projects_master_state',
      'intellipath_notifications_state',
      'careerpath_completed_resources',
      'intellipath_theme',
    ];
    keys.forEach((key) => {
      const legacy = localStorage.getItem(key);
      const scoped = userScopedKey(key, userId);
      if (legacy !== null && localStorage.getItem(scoped) === null) localStorage.setItem(scoped, legacy);
    });
    localStorage.removeItem(LEGACY_OWNER_KEY);
  } catch {}
}

function makeUser(name: string, email: string): UserProfile {
  return {
    id: 'usr_' + Math.random().toString(36).slice(2, 11),
    name: name.trim(),
    email: normalizeEmail(email),
    interests: [],
    careerGoals: [],
    continueStudies: 'Yes',
    profileCompleted: false,
    assessmentCompleted: false,
    createdAt: new Date().toISOString(),
    isLoggedIn: true,
  };
}

export const authService = {
  async login(email: string, _password?: string): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 300));
    const key = normalizeEmail(email);
    const registry = readRegistry();

    // One-time migration for the legacy single-current-user storage model.
    if (!registry[key]) {
      try {
        const legacyRaw = localStorage.getItem(STORAGE_KEY);
        const legacy = legacyRaw ? (JSON.parse(legacyRaw) as UserProfile) : null;
        if (legacy?.email && normalizeEmail(legacy.email) === key && legacy.id) registry[key] = legacy;
      } catch {}
    }

    const profile = registry[key] || makeUser(key.split('@')[0].replace(/[._-]+/g, ' '), key);
    const hydrated: UserProfile = { ...profile, email: key, isLoggedIn: true };
    migrateLegacyStateToUser(hydrated.id, key);
    registry[key] = hydrated;
    writeRegistry(registry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hydrated));
    return hydrated;
  },

  async signup(name: string, email: string, _password?: string): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 300));
    const key = normalizeEmail(email);
    const registry = readRegistry();
    if (registry[key]) {
      throw new Error('An account with this email already exists. Please log in instead.');
    }
    const newUser = makeUser(name, key);
    registry[key] = newUser;
    writeRegistry(registry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  },

  async socialLogin(provider: 'google' | 'apple'): Promise<UserProfile> {
    if (provider !== 'google') {
      throw new Error('Apple sign-in is not configured yet. Please use Google or email login.');
    }

    // Force Google's account chooser to appear every time. This lets users
    // select the correct Google account instead of silently reusing a session.
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    googleProvider.addScope('email');
    googleProvider.addScope('profile');

    try {
      const firebaseAuth = getFirebaseAuth();
      if (!firebaseAuth) {
        throw new Error(getFirebaseConfigError() || 'Firebase Google Login is not configured.');
      }
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const firebaseUser = result.user;
      const email = normalizeEmail(firebaseUser.email || '');
      if (!email) throw new Error('Google did not return an email address.');

      const registry = readRegistry();
      const existing = registry[email];
      const profile: UserProfile = existing
        ? {
            ...existing,
            id: existing.id || firebaseUser.uid,
            name: firebaseUser.displayName || existing.name,
            email,
            avatar: firebaseUser.photoURL || existing.avatar,
            provider: 'google',
            isLoggedIn: true,
          }
        : {
            ...makeUser(firebaseUser.displayName || email.split('@')[0], email),
            id: firebaseUser.uid,
            avatar: firebaseUser.photoURL || undefined,
            provider: 'google',
          };

      registry[email] = profile;
      writeRegistry(registry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      migrateLegacyStateToUser(profile.id, email);
      return profile;
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        throw new Error('Google account selection was cancelled.');
      }
      if (error?.code === 'auth/popup-blocked') {
        throw new Error('Your browser blocked the Google sign-in popup. Please allow popups for this site and try again.');
      }
      if (error?.code === 'auth/invalid-api-key') {
        throw new Error('Firebase API key is invalid. Check frontend/.env and copy the API key from Firebase Console → Project settings → Your apps → Web app. Then restart Vite.');
      }
      if (error?.code === 'auth/unauthorized-domain') {
        throw new Error('This website domain is not authorized in Firebase Authentication. Add the current domain in Firebase Console → Authentication → Settings → Authorized domains.');
      }
      throw error instanceof Error ? error : new Error('Google sign-in failed.');
    }
  },

  getCurrentUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 200));
    const current = this.getCurrentUser() || makeUser('Student Explorer', 'student@careerpath.local');
    const updatedUser: UserProfile = { ...current, ...updates, isLoggedIn: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    const registry = readRegistry();
    registry[normalizeEmail(updatedUser.email)] = updatedUser;
    writeRegistry(registry);
    return updatedUser;
  },

  logout(): void {
    const current = this.getCurrentUser();
    if (current) {
      try { localStorage.setItem(LEGACY_OWNER_KEY, normalizeEmail(current.email)); } catch {}
      const registry = readRegistry();
      registry[normalizeEmail(current.email)] = { ...current, isLoggedIn: false };
      writeRegistry(registry);
    }
    // Firebase sign-out is intentionally fire-and-forget so the existing
    // synchronous AuthContext logout API remains compatible.
    if (current?.provider === 'google') {
      const firebaseAuth = getFirebaseAuth();
      if (firebaseAuth) void signOut(firebaseAuth).catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEY);
  },
};
