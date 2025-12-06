import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, runTransaction, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

function initFirebaseApp() {
  if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) {
    return null;
  }

  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

function getDbInstance() {
  const app = initFirebaseApp();
  if (!app) return null;
  return getDatabase(app);
}

const LIKE_PATH = "portfolioLikes/count";

export async function fetchLikeCount(defaultValue = 21): Promise<number> {
  const db = getDbInstance();
  if (!db) {
    return defaultValue;
  }
  const snapshot = await get(ref(db, LIKE_PATH));
  if (snapshot.exists()) {
    return Number(snapshot.val());
  }
  await setDefaultCount(db, defaultValue);
  return defaultValue;
}

async function setDefaultCount(db: ReturnType<typeof getDatabase>, value: number) {
  await runTransaction(ref(db, LIKE_PATH), () => {
    return value;
  });
}

export async function incrementLike(): Promise<number> {
  const db = getDbInstance();
  if (!db) {
    return 0;
  }

  const result = await runTransaction(ref(db, LIKE_PATH), (current) => {
    return (current ?? 21) + 1;
  });

  return Number(result.snapshot?.val ?? 21);
}
