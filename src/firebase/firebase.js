import { initializeApp } from "firebase/app";
import { collection as firestoreCollection, getFirestore, connectFirestoreEmulator, collection, getDocs, setDoc, doc, updateDoc } from "firebase/firestore";
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
  const contactsListRef = firestoreCollection(db, "ContactsList");
  const contactDocRef = doc(contactsListRef, contact._id);
  await setDoc(contactDocRef, contactWithURL);
  return contactWithURL;
};

export const editContact = async (updatedContact) => {
    // Verificar si hay una nueva imagen para subir
    if (updatedContact.img.startsWith("blob:")) {
      console.log('its blob')
      // Convertir la URL de Blob a un objeto Blob
      const response = await fetch(updatedContact.img);
      const blob = await response.blob();

      // Crear un objeto de archivo (File) a partir del Blob
      const file = new File([blob], updatedContact._id, { type: 'image/png' });

      // Crear una referencia al lugar donde se almacenará el archivo en Firebase Storage
      const storageRef = ref(storage, `contacts/${updatedContact._id}`);

      // Subir el archivo a la ubicación especificada en storageRef
      await uploadBytes(storageRef, file);

      // Obtener la URL de descarga del archivo en Firebase Storage
      const url = await getDownloadURL(storageRef);
      // Contact URL is modified to update it
      const contactWithURL = { ...updatedContact, img: url };
      console.log(contactWithURL);

      const contactRef = doc(db, 'ContactsList', updatedContact._id);
      updateDoc(contactRef, contactWithURL);
    } else {
      const contactRef = doc(db, 'ContactsList', updatedContact._id);
      updateDoc(contactRef, updatedContact);
    }
};
