import { initializeApp } from "firebase/app";
import { collection as firestoreCollection, getFirestore, connectFirestoreEmulator, collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, connectStorageEmulator, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import firebaseConfig, { isProduction } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize db
export const db = getFirestore();
// Initialize storge
export const storage = getStorage(app);

// Initialize emulators
if (isProduction) {
  connectFirestoreEmulator(db, 'localhost', 6004);
  connectStorageEmulator(storage, 'localhost', 6005);
}

export const getContactList = () => {
  const contactsListRef = collection(db, "ContactsList");
  const contactsList = getDocs(contactsListRef);
  return contactsList
};

export const addContact = async (contact) => {
  if(contact.img !== '') {
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
  } else {
    const contactsListRef = firestoreCollection(db, "ContactsList");
    const contactDocRef = doc(contactsListRef, contact._id);
    await setDoc(contactDocRef, contact);
  }
};

export const editContact = async (updatedContact) => {
    // Verificar si hay una nueva imagen para subir
    if (updatedContact.img.startsWith("blob:")) {
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

      const contactRef = doc(db, 'ContactsList', updatedContact._id);
      updateDoc(contactRef, contactWithURL);
    } else {
      const contactRef = doc(db, 'ContactsList', updatedContact._id);
      updateDoc(contactRef, updatedContact);
    }
};

export const deleteContact = async (contactId) => {
  try {
    // Crear una referencia al documento del contacto en Firestore
    const contactRef = doc(db, 'ContactsList', contactId);

    // Eliminar el documento del contacto
    await deleteDoc(contactRef);

    // Eliminar la imagen asociada al contacto en Firebase Storage
    const storageRef = ref(storage, `contacts/${contactId}`);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting contact:', error.message);
  }
};
