import { db } from '../config/firebaseConfig';
import {
  collection,
  getDocs,
  DocumentData,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore/lite';

const getStores = async (): Promise<DocumentData[]> => {
  try {
    const storeDoc = collection(db, 'stores');
    const storeSnapshot = await getDocs(storeDoc);
    const storeList = storeSnapshot.docs.map(doc => doc.data());
    return storeList;
  } catch (error) {
    console.error('Error connecting to Firestore:', error);
    throw error;
  }
};

const getStore = async (storeId: string): Promise<DocumentData | null> => {
  try {
    const storeDoc = doc(db, 'stores', storeId);
    const storeSnapshot = await getDoc(storeDoc);
    const productDoc = collection(db, 'products');
    const queryProduct = query(productDoc, where('id_store', '==', storeId));
    const productSnapshot = await getDocs(queryProduct);
    const storeData = storeSnapshot.data();

    const products: any[] = [];
    productSnapshot.forEach(doc => {
      products.push({ ...doc.data() });
    });

    if (!storeData) {
      throw new Error('Store not found');
    }
    return { ...storeData, products };
  } catch (error) {
    console.error('Error connecting to Firestore:', error);
    throw error;
  }
};

const createStore = async (
  data: Partial<DocumentData>,
): Promise<DocumentData | null> => {
  try {
    const storeDoc = doc(collection(db, 'stores'));
    await setDoc(storeDoc, data);

    const storeSnapshot = await getDoc(storeDoc);
    if (storeSnapshot.exists()) {
      return storeSnapshot.data();
    } else {
      console.error('Stores does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error connecting to Firestore:', error);
    throw error;
  }
};

const updateStore = async (
  storeId: string,
  data: Partial<DocumentData>,
): Promise<DocumentData> => {
  try {
    const storeDoc = doc(db, 'stores', storeId);
    await updateDoc(storeDoc, data);

    const storeSnapshot = await getDoc(storeDoc);
    if (!storeSnapshot.exists()) {
      throw new Error('Store not found');
    }
    return storeSnapshot.data();
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
};

const deleteStore = async (storeId: string) => {
  try {
    const storeDoc = doc(db, 'stores', storeId);
    await deleteDoc(storeDoc);
    return getStores;
    return;
  } catch (error: any) {
    console.error('Error deleting store:', error.message);
    throw error; // Lemparkan kembali kesalahan untuk menangkapnya di tempat yang memanggil updateUser
  }
};

export { getStores, getStore, updateStore, createStore, deleteStore };
