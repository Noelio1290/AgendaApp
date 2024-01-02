import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ContactList from './Components/ContactList';
import SelectedContactWindow from './Components/SelectedContactWindow';
import ButtonSection from './Components/ButtonsSection';
import ModalWithForm from './Components/ModalWithForm';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from './firebase/firebase';

function App() {
  //Set ContactList
  const [ contactsList,setContactList ] = useState([]);


  useEffect(() => {

    const contactsListRef = collection(db, "ContactsList");
    getDocs(contactsListRef)
    .then((resp) => {

      setContactList(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id}
        } )
      )
    })

  },[contactsList])

  const addContact = (contact) => {
    const contactsListRef = collection(db, "ContactsList");
    addDoc(contactsListRef, contact)
    getDocs(contactsListRef)
    .then((resp) => {
      setContactList(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id}
        } )
      )
    })
  };
  
  const editContact = (contact) => {
    const updatedContacts = contactsList.map(contactIndex => {
      if (contactIndex._id === contact._id) {
        return contact;
      }
      return contactIndex;
    });
    setContactList(updatedContacts);
    setSelectedContact(contact)
  }

  const deleteContact = (contact) => {
    const updatedContacts = contactsList.filter(Contact => Contact._id !== contact._id);
    setContactList(updatedContacts);
    setSelectedContact({});
  };

  const onDeleteContact = () => {
    deleteContact(selectedContact);
  };

  //Set SeletedContact
  const [selectedContact, setSelectedContact] = useState({});

  const onCardClick = (contact) => {
    setSelectedContact(contact)
  };

  //Set buttons active
  const areButtonsActive = Object.keys(selectedContact).length > 0 ? false : true;

  //Set Modal
  const [ openModal, setOpenModal ] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

   //Set Modal edit
   const [ openModalEdit, setOpenModalEdit ] = useState(false);
   const handleOpenModalEdit = () => setOpenModalEdit(true);
   const handleCloseModalEdit = () => setOpenModalEdit(false);

  return (
    <Container>
      <ModalWithForm 
        openModal={openModal} 
        handleCloseModal={handleCloseModal} 
        modalFunction={addContact}
      />
      <ModalWithForm 
        openModal={openModalEdit} 
        handleCloseModal={handleCloseModalEdit}
        selectedContact={selectedContact}
        modalFunction={editContact}
      />
      <Box>
        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: 70, fontFamily:'inherit', }}>
          Agenda
        </Typography>
      </Box>
      <Box sx={{ display:'flex', flexDirection:'Row', justifyContent:'space-evenly', flexWrap:'wrap' }}>
        <Box sx={{  }}>
          <ContactList contactsList={contactsList} onCardClick={onCardClick} />
        </Box>
        <Box sx={{  }}>
          <SelectedContactWindow contact={selectedContact} />
          <ButtonSection 
            handleOpenModal={handleOpenModal} 
            handleOpenModalEdit={handleOpenModalEdit}
            onDeleteContact={onDeleteContact}
            areButtonsActive={areButtonsActive}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
