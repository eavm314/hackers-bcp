import { addDoc,collection,getDocs, doc, QuerySnapshot, DocumentData, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../instance";


// Collection name
// const collectionName = 'objetivo_compra';
const deniedCollection = ['usuarios'];

// Create a document in the collection
export const createDocument = async (collectionName: string, userId: string, data: any): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    const docId = docRef.id;
    console.log('Document created with ID: ', docId);

    // Update the user's collection with the document ID
    if(!deniedCollection.includes(collectionName)){
    const userDocRef = doc(db, 'usuarios', userId);
    const userCollectionRef = collection(userDocRef, collectionName);
    await addDoc(userCollectionRef, { docId });
    }

  } catch (error) {
    console.error('Error creating document: ', error);
  }
};

// Read all documents in the collection
export const getData = async (collectionName: string): Promise<DocumentData[]> => {
  try {
    const querySnapshot: QuerySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error('Error getting documents: ', err);
    return [];
  }
};

// Update a document in the collection
export const updateData = async (collectionName: string, docId: string, data: any): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (err) {
    console.error('Error updating document: ', err);
  }
};

// Delete a document from the collection
export const deleteData = async (collectionName: string, docId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (err) {
    console.error('Error deleting document: ', err);
  }
};

//Esta funcion elimina el UID de la collection de lo que se tenga en la collection de un usuario

export const deleteData2 = async (collectionName: string, docId: string, userId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    const userDocRef = doc(db, 'usuarios', userId);
    const userCollectionRef = collection(userDocRef, collectionName);

    const querySnapshot = await getDocs(userCollectionRef);
    const docToDelete = querySnapshot.docs.find(doc => doc.data().docId === docId);

    if (docToDelete) {
      await deleteDoc(doc(db, 'usuarios', userId, collectionName, docToDelete.id));
    }
  } catch (err) {
    console.error('Error deleting document: ', err);
  }
};