import React, { useState } from 'react';
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import ContactList from './Components/ContactList/ContactList';
import ShowContact from './Components/ShowContact/ShowContact';

function App() {
  const [ contactsList,setContactList ] = useState([
    {
      nombre: 'Noel',
      numero: 5583637930,
      direccion: 'Poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/830/266/321/anime-one-piece-monkey-d-luffy-wallpaper-preview.jpg'
    },
    {
      nombre: 'Monse',
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
  const [selectedContact, setSelectedContact] = useState({});

  const onCardClick = (contact) => {
    setSelectedContact(contact)
    console.log(contact)
  };

  return (
    <Container>
      <Box>
        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: 80, fontFamily:'inherit', }}>
          Agenda
        </Typography>
      </Box>
      <Box sx={{ display:'flex', flexDirection:'Row', justifyContent:'space-evenly', flexWrap:'wrap' }}>
        <Box sx={{  }}>
          <ContactList contactsList={contactsList} onCardClick={onCardClick} />
        </Box>
        <Box sx={{  }}>
          <ShowContact contact={selectedContact} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
