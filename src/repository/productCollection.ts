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
} from 'firebase/firestore/lite';

const getProducts = async (): Promise<DocumentData[]> => {
  try {
    const productDoc = collection(db, 'products');
    const productSnapshot = await getDocs(productDoc);
    const productList = productSnapshot.docs.map(doc => doc.data());
    return productList;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error; // lemparkan kembali kesalahan untuk menangkapnya di tempat yang memanggil getUsers
  }
};

const getProduct = async (productId: string): Promise<DocumentData | null> => {
  try {
    const productDoc = doc(db, 'products', productId);
    const productSnap = await getDoc(productDoc);
    if (productSnap.exists()) {
      return productSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting products:', error);
    throw error; // lemparkan kembali kesalahan untuk menangkapnya di tempat yang memanggil getUsers
  }
};

const createProduct = async (
  data: Partial<DocumentData>,
): Promise<DocumentData | null> => {
  try {
    const productDoc = doc(collection(db, 'products'));
    await setDoc(productDoc, data);
    const newProductSnap = await getDoc(productDoc);
    if (newProductSnap.exists()) {
      return newProductSnap.data();
    } else {
      console.error('Products does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Fungsi untuk melakukan update data pengguna berdasarkan ID
const updateProduct = async (
  productId: string,
  newData: Partial<DocumentData>,
): Promise<DocumentData | null> => {
  // Mengubah tipe kembalian menjadi DocumentData atau null
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, newData);

    const updatedProductSnap = await getDoc(productRef);
    if (updatedProductSnap.exists()) {
      return updatedProductSnap.data();
    } else {
      console.error('Product does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    return getProducts();
  } catch (error: any) {
    console.error('Error deleting product:', error.message);
    throw error; // Lemparkan kembali kesalahan untuk menangkapnya di tempat yang memanggil updateUser
  }
};

export { getProducts, getProduct, updateProduct, createProduct, deleteProduct };
