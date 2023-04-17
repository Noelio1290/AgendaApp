import React, { useState } from 'react';
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import ContactList from './Components/ContactList';
import SelectedContactWindow from './Components/SelectedContactWindow';
import ButtonSection from './Components/ButtonsSection';
import ModalWithForm from './Components/ModalWithForm';

function App() {
  //Set ContactList
  const [ contactsList,setContactList ] = useState([
    {
      _id:'f610d4d9-b9ab-4f6f-aad7-85d115090c3c',
      nombre: 'Noel Zamora Islas',
      numero: 5583637930,
      direccion: 'Poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/830/266/321/anime-one-piece-monkey-d-luffy-wallpaper-preview.jpg'
    },
    {
      _id:'48f6f291-830b-41b3-a637-c66e0ffa10f0',
      nombre: 'Monserrat Gordillo Soriano',
      numero: 5559609969,
      direccion: 'Poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/700/719/787/anime-one-piece-nico-robin-wallpaper-preview.jpg'
    },
    {
      _id:'191eeae5-c1b9-47d4-9833-bae6cca97d6c',
      nombre: 'Armando',
      numero: 5538595115,
      direccion: 'Espiridion Moreno 103 Constitucion de laRepublica',
      img:'https://c4.wallpaperflare.com/wallpaper/308/561/294/one-piece-wallpaper-preview.jpg'
    },
  ]);

  const addContact = (contact) => {
    setContactList([ ...contactsList, contact ])
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
    const updatedContacts = contactsList.filter(Contact => Contact.nombre !== contact.nombre);
    setContactList(updatedContacts);
    setSelectedContact({});
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
            selectedContact={selectedContact} 
            deleteContact={deleteContact}
            areButtonsActive={areButtonsActive}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
