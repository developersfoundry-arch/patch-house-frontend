// All firebase imports are dynamic so Rolldown's ?tsr-split bundler never
// statically resolves firebase/* subpath exports (which fails on Windows).
// At runtime these dynamic imports only ever execute in the browser.

const firebaseConfig = {
  apiKey:     import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  appId:      import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _app: any;

async function getApp() {
  if (!_app) {
    const { initializeApp } = await import("firebase/app");
    _app = initializeApp(firebaseConfig);
  }
  return _app;
}

export async function signInWithGoogle() {
  const { getAuth, GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
  const auth = getAuth(await getApp());
  return signInWithPopup(auth, new GoogleAuthProvider());
}
