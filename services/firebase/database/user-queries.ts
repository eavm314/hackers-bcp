import { addDoc, collection } from "firebase/firestore";

import { db } from "../instance";
import { UsersModel } from "../../../models/users";

import { getData } from "./queries";

// Collection name
const collectionName = "usuarios";

const emptyUser: UsersModel = {
  id: "",
  email: "",
  username: "",
  gastos: [],
  ingresos: [],
  objetivo_compra: [],
};

// Create a document in the collection
export const createNewUser = async (data: any) => {
  const { email } = data;
  const gottenData = await getData(collectionName);
  const existUserWithEqualEmail = gottenData.find(
    (user) => user.email === email,
  );

  if (existUserWithEqualEmail) {
    alert(`El usuario con email ya existe: ${email}`);

    return;
  }
  try {
    await addDoc(collection(db, collectionName), data);
    console.log("Document created with ID: ");
  } catch (error) {
    console.error("Error creating document: ", error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const gottenData = await getData(collectionName);
    const gottenUser = gottenData.find((user) => user.email === email) || email;

    return gottenUser;
  } catch (error) {
    console.error(error);

    return null;
  }
};
