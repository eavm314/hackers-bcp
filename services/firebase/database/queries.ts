import { addDoc,collection,getDocs, doc, QuerySnapshot, DocumentData, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../instance";


// Collection name
const collectionName = 'objetivo_compra';

// Create a document in the collection
export const createDocument = async (data: any) => {
  try {
    await addDoc(collection(db,collectionName),data);
    console.log('Document created with ID: ');
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
