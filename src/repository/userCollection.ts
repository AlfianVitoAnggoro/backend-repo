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

const getUsers = async (): Promise<DocumentData[]> => {
  try {
    const userDoc = collection(db, 'users');
    const userSnapshot = await getDocs(userDoc);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
  } catch (error) {
    console.error('Error connecting to Firestore:', error);
    throw error; // lemparkan kembali kesalahan untuk menangkapnya di tempat yang memanggil getUsers
  }
};

const getUser = async (userId: string): Promise<DocumentData | null> => {
  try {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to get user:', error);
    throw error;
  }
};

const createUser = async (
  data: Partial<DocumentData>,
): Promise<DocumentData | null> => {
  try {
    const userDoc = doc(collection(db, 'users'));
    await setDoc(userDoc, data);
    const newUserSnap = await getDoc(userDoc);
    if (newUserSnap.exists()) {
      return newUserSnap.data();
    } else {
      console.error('Document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fungsi untuk melakukan update data pengguna berdasarkan ID
const updateUser = async (
  userId: string,
  newData: Partial<DocumentData>,
): Promise<DocumentData | null> => {
  // Mengubah tipe kembalian menjadi DocumentData atau null
  try {
    const userRef = doc(db, 'users', userId); // Dokumen yang akan diperbarui
    await updateDoc(userRef, newData); // Menggunakan updateDoc untuk mengupdate data yang ada

    // Ambil data terbaru dari dokumen yang diperbarui
    const updatedUserSnap = await getDoc(userRef);
    if (updatedUserSnap.exists()) {
      return updatedUserSnap.data(); // Mengembalikan data terbaru dari dokumen
    } else {
      console.error('Document does not exist'); // Mungkin tidak perlu dilempar kesalahan, tergantung pada logika aplikasi Anda
      return null;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Lemparkan kembali kesalahan untuk menangkapnya di tempat yang memanggil updateUser
  }
};

const deleteUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    return getUsers();
  } catch (error: any) {
    console.error('Error deleting user:', error.message);
    throw error; // Lemparkan kembali kesalahan untuk menangkapnya di tempat yang memanggil updateUser
  }
};

export { getUsers, getUser, updateUser, createUser, deleteUser };
