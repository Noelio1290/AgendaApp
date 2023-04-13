import React, { useState } from 'react';
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import ShowContactList from './Components/ShowContactList/ShowContactList';

function App() {
  const [ contactsList,setContactList ] = useState([
    {
      nombre: 'Noel',
      numero: 5583637930,
      direccion: 'poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/830/266/321/anime-one-piece-monkey-d-luffy-wallpaper-preview.jpg'
    },
    {
      nombre: 'Monse',
      numero: 5559609969,
      direccion: 'poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/700/719/787/anime-one-piece-nico-robin-wallpaper-preview.jpg'
    },
    {
      nombre: 'Armando',
      numero: 5538595115,
      direccion: 'poniente 2 #40 AMSA',
      img:'https://c4.wallpaperflare.com/wallpaper/308/561/294/one-piece-wallpaper-preview.jpg'
    },
  ])

  return (
    <Container>
      <Box>
        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: 80, fontFamily:'inherit',  }}>
          Agenda
        </Typography>
      </Box>
      <Box>
        <Box sx={{ marginTop:1, }}>
          <ShowContactList contactsList={contactsList} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
