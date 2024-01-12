import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, connectStorageEmulator, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

export const getContactList = () => {
  const contactsListRef = collection(db, "ContactsList");
  const contactsList = getDocs(contactsListRef);
  return contactsList
};

export const addContact = async (contact) => {
  // Convert the Blob URL to a Blob object
  const response = await fetch(contact.img);
  const blob = await response.blob();

  // Create a file object (File) from the Blob
  const file = new File([blob], contact._id, { type: 'image/png' }); // Adjust the file type according to the image type

  // Create a reference to where the file will be stored in Firebase Storage
  const storageRef = ref(storage, `contacts/${contact._id}`);

  // Upload the file to the location specified in storageRef
  await uploadBytes(storageRef, file);

  // URL is generated to retrieve image from Firebase Storage
  const url = await getDownloadURL(storageRef);

  // Contact URL is modified to update it
  const contactWithURL = { ...contact, img: url };

  // Create a reference to where the contact will be stored in Firebase firestore
  const contactsListRef = collection(db, "ContactsList");
  addDoc(contactsListRef, contactWithURL);
  return contactWithURL;
};
 
