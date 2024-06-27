import { db } from '../config/firebaseConfig';
import {
  collection,
  getDocs,
  DocumentData,
  updateDoc,
  doc,
  getDoc,
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

export { getUsers, updateUser };
