import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// Firebase Web App configuration supplied for CareerPath AI.
// These values are safe to use in a browser app; Firebase Security Rules and
// Authentication settings must still be configured in the Firebase Console.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAQz51GdCzS9ilI2C4hlxH5JLeGPvP2ChQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "careerpathai-e9e5c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "careerpathai-e9e5c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "careerpathai-e9e5c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "58443383534",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:58443383534:web:07c62fe567671e7140a9ff",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId
);

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;

export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured) return null;
  if (firebaseAuth) return firebaseAuth;

  firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);
  return firebaseAuth;
}

export function getFirebaseConfigError(): string | null {
  return isFirebaseConfigured ? null :
    "Firebase Web configuration is missing. Check frontend/.env or the Firebase Web App settings.";
}
