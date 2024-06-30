import { jest } from '@jest/globals';
import { describe, beforeEach, it } from 'node:test';
import { getDocument, setDocument, updateDocument, deleteDocument, addDocument } from '../firebase/database/queries';

describe('Firebase Database Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get a document from Firestore', async () => {
    const documentId = 'document-id';
    const expectedDocumentData = {
      id: 'document-id',
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const documentRef = {
      id: documentId,
      get: jest.fn(() => Promise.resolve({ data: () => expectedDocumentData })),
    };

    const collectionRef = {
      doc: jest.fn(() => documentRef),
    };

    const firestore = {
      collection: jest.fn(() => collectionRef),
    };

    const result = await getDocument(firestore, 'collection-name', documentId);

    expect(firestore.collection).toHaveBeenCalledWith('collection-name');
    expect(collectionRef.doc).toHaveBeenCalledWith(documentId);
    expect(documentRef.get).toHaveBeenCalled();
    expect(result).toEqual(expectedDocumentData);
  });

  it('should set a document in Firestore', async () => {
    const documentId = 'document-id';
    const documentData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const documentRef = {
      id: documentId,
      set: jest.fn(() => Promise.resolve()),
    };

    const collectionRef = {
      doc: jest.fn(() => documentRef),
    };

    const firestore = {
      collection: jest.fn(() => collectionRef),
    };

    await setDocument(firestore, 'collection-name', documentId, documentData);

    expect(firestore.collection).toHaveBeenCalledWith('collection-name');
    expect(collectionRef.doc).toHaveBeenCalledWith(documentId);
    expect(documentRef.set).toHaveBeenCalledWith(documentData);
  });

  it('should update a document in Firestore', async () => {
    const documentId = 'document-id';
    const documentData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const documentRef = {
      id: documentId,
      update: jest.fn(() => Promise.resolve()),
    };

    const collectionRef = {
      doc: jest.fn(() => documentRef),
    };

    const firestore = {
      collection: jest.fn(() => collectionRef),
    };

    await updateDocument(firestore, 'collection-name', documentId, documentData);

    expect(firestore.collection).toHaveBeenCalledWith('collection-name');
    expect(collectionRef.doc).toHaveBeenCalledWith(documentId);
    expect(documentRef.update).toHaveBeenCalledWith(documentData);
  });

  it('should delete a document from Firestore', async () => {
    const documentId = 'document-id';

    const documentRef = {
      id: documentId,
      delete: jest.fn(() => Promise.resolve()),
    };

    const collectionRef = {
      doc: jest.fn(() => documentRef),
    };

    const firestore = {
      collection: jest.fn(() => collectionRef),
    };

    await deleteDocument(firestore, 'collection-name', documentId);

    expect(firestore.collection).toHaveBeenCalledWith('collection-name');
    expect(collectionRef.doc).toHaveBeenCalledWith(documentId);
    expect(documentRef.delete).toHaveBeenCalled();
  });

  it('should add a document to Firestore', async () => {
    const documentData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const addedDocumentId = 'new-document-id';

    const documentRef = {
      add: jest.fn(() => Promise.resolve({ id: addedDocumentId })),
    };

    const collectionRef = {
      doc: jest.fn(() => documentRef),
    };

    const firestore = {
      collection: jest.fn(() => collectionRef),
    };

    const result = await addDocument(firestore, 'collection-name', documentData);

    expect(firestore.collection).toHaveBeenCalledWith('collection-name');
    expect(collectionRef.doc).toHaveBeenCalled();
    expect(documentRef.add).toHaveBeenCalledWith(documentData);
    expect(result).toEqual(addedDocumentId);
  });
});
