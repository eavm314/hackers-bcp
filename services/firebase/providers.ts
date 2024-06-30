import {
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";

import { app } from "./instance";

const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const passwordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
