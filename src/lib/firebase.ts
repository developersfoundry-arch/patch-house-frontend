import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// Lazy-init: Firebase uses browser APIs (IndexedDB, localStorage) that don't
// exist in the SSR/Node context TanStack Start runs during server rendering.
// Deferring until first access prevents the module from crashing on the server.
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    if (!_app) _app = initializeApp(firebaseConfig);
    _auth = getAuth(_app);
  }
  return _auth;
}

export function getGoogleProvider(): GoogleAuthProvider {
  return new GoogleAuthProvider();
}
