import React, { useState } from 'react';
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import ContactList from './Components/ContactList';
import ShowContact from './Components/ShowContact';
import ButtonSection from './Components/ButtonsSection';
import ModalWithForm from './Components/ModalWithForm';

function App() {
  //Set ContactList
  const [ contactsList,setContactList ] = useState([
    {
      nombre: 'Noel Zamora Islas',
      numero: 5583637930,
      direccion: 'Poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/830/266/321/anime-one-piece-monkey-d-luffy-wallpaper-preview.jpg'
    },
    {
      nombre: 'Monserrat Gordillo Soriano',
      numero: 5559609969,
      direccion: 'Poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/700/719/787/anime-one-piece-nico-robin-wallpaper-preview.jpg'
    },
    {
      nombre: 'Armando',
      numero: 5538595115,
      direccion: 'Espiridion Moreno 103 Constitucion de laRepublica',
      img:'https://c4.wallpaperflare.com/wallpaper/308/561/294/one-piece-wallpaper-preview.jpg'
    },
  ]);

  const addContact = (contact) => {
    setContactList([ ...contactsList, contact ])
  };

  const deleteContact = (contact) => {
    const updatedContacts = contactsList.filter(Contact => Contact.nombre !== contact.nombre);
    setContactList(updatedContacts);
  };

  //Set SeletedContact
  const [selectedContact, setSelectedContact] = useState({});

  const onCardClick = (contact) => {
    setSelectedContact(contact)
  };

  //Set Modal
  const [ openModal, setOpenModal ] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container>
      <ModalWithForm openModal={openModal} handleCloseModal={handleCloseModal} addContact={addContact} />
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
          <ShowContact contact={selectedContact} />
          <ButtonSection 
            handleOpenModal={handleOpenModal} 
            selectedContact={selectedContact} 
            deleteContact={deleteContact} 
            setSelectedContact={setSelectedContact}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
