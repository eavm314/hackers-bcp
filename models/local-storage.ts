import { LocalStorage } from "../enums/local-storage";

export interface DataLocalStorage {
  auth?: boolean | null;
  userEmail?: string | null;
}

export interface actionsLocalStorage {
  saveDataLS: (keyValue: LocalStorage, value: DataLocalStorage) => void;
  getDataLS: (key: LocalStorage) => any;
}
