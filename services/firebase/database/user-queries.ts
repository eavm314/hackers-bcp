import { addDoc, collection } from "firebase/firestore";

import { db } from "../instance";

import { getData } from "./queries";

// Collection name
const collectionName = "usuarios";

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
