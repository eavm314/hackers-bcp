import {
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { appLocalStorage } from "../../utils/local-storage";
import { LocalStorage } from "../../enums/local-storage";

import { auth } from "./instance";
import { googleProvider } from "./providers";

const { saveDataLS } = appLocalStorage();

const endLoginProcess = (user: User) => {
  saveDataLS(LocalStorage.USER_LOGIN, { auth: true });
  saveDataLS(LocalStorage.USER_EMAIL, { userEmail: user.email });
};

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    endLoginProcess(user);

    return user;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    endLoginProcess(user);

    return user;
  } catch (err) {
    console.error(err);

    return null;
  }
};
