import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../instance";
import { UsersModel } from "../../../models/users";

import { getData } from "./queries";

// Collection name
const collectionName = "usuarios";

const emptyUser: UsersModel = {
  id: "",
  email: "",
  username: "",
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

    if (!gottenUser) {
      console.error("user not found");

      return null;
    }

    return gottenUser;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getDataFromCollectionsByEmail = async (
  email: string,
  nameOfCollection: string,
) => {
  try {
    const collectionToQuery = nameOfCollection;
    const queryGotten = query(
      collection(db, collectionToQuery),
      where("user_email", "==", email),
    );

    if (!queryGotten) {
      return null;
    }

    const collectionGotten = await getDocs(queryGotten);
    const documents: any[] = [];

    collectionGotten.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error(error);

    return null;
  }
};
