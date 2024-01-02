import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator, ref, uploadBytes } from "firebase/storage";
import firebaseConfig, { isProduction } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize db
export const db = getFirestore();
// Initialize storge
export const storage = getStorage(app);

// Initialize emulators
if (!isProduction) {
  connectFirestoreEmulator(db, 'localhost', 6004);
  connectStorageEmulator(storage, 'localhost', 6005);
}

export const uploadFile = (file, id) => {
  const storageRef = ref(storage, `${id}`)
  uploadBytes(storageRef, file).then(snapshot => {
    console.log(snapshot)
  })
};
