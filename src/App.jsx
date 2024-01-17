import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ContactList from './Components/ContactList';
import SelectedContactWindow from './Components/SelectedContactWindow';
import ButtonSection from './Components/ButtonsSection';
import ModalWithForm from './Components/ModalWithForm';
import { getContactList, addContact, editContact } from './firebase/firebase'

function App() {
  //Set ContactList
  const [ contactList,setContactList ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    const contactListSnapshot = await getContactList();
    const formattedContactList = contactListSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setContactList(formattedContactList);
    }
    fetchData();
  }, []);

  const deleteContact = (contact) => {
    const updatedContacts = contactList.filter(Contact => Contact._id !== contact._id);
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
        setContactList={setContactList}
        label= 'Creando'
      />
      <ModalWithForm 
        openModal={openModalEdit} 
        handleCloseModal={handleCloseModalEdit}
        modalFunction={editContact}
        setContactList={setContactList}
        label= 'Editando'
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      <Box>
        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: 70, fontFamily:'inherit', }}>
          Agenda
        </Typography>
      </Box>
      <Box sx={{ display:'flex', flexDirection:'Row', justifyContent:'space-evenly', flexWrap:'wrap' }}>
        <Box sx={{  }}>
          <ContactList contactsList={contactList} onCardClick={onCardClick} />
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
