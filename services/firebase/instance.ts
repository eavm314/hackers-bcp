import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { firebaseCredentials } from "../instances";

const firebaseConfig = {
  apiKey: firebaseCredentials.apiKey,
  authDomain: firebaseCredentials.authDomain,
  projectId: firebaseCredentials.projectId,
  storageBucket: firebaseCredentials.storageBucket,
  messagingSenderId: firebaseCredentials.measurementId,
  appId: firebaseCredentials.appId,
  measurementId: firebaseCredentials.measurementId,
};

const gettingApp = () => {
  return initializeApp(firebaseConfig);
};

const instanceOfAuth = (app: any) => {
  return getAuth(app);
};

const instanceOfFireStore = (app: any) => {
  return getFirestore(app);
};

export const app = gettingApp();
export const auth = instanceOfAuth(app);
export const db = instanceOfFireStore(app);
