import React from 'react';
import { Card, CardOverflow, AspectRatio, Typography } from '@mui/joy';
import { Box } from '@mui/material';
import Contact from '../../Contact.png';
import noImage from '../../noImage.jpg';

const SelectedContactWindow = ({ contact = {} }) => {

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        minWidth: '85%',
        height: 'auto', // Cambiado a altura automática para adaptarse al contenido interno
        maxHeight: '230px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid',
        borderColor: 'white',
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          {contact.img === undefined ?
            <img
            src={Contact}
            alt=""
            />
            :
            <img
            src={contact.img === '' ? noImage : contact.img}
            alt=""
            />
          }
        </AspectRatio>
      </CardOverflow>
      <Box 
        sx={{
          display: 'flex',
          flexFlow: 'column',
          width: '100%', // Cambiado a ancho del 100% para adaptarse al contenedor padre
          minHeight: '15vH',
          
        }}
      >
        <Typography variant="h6" sx={{ 
          textAlign: 'center', 
          fontFamily: 'Helvetica', 
          color: 'white', 
          fontSize: '1em', // Tamaño relativo del texto
        }}>
          {contact.name}
        </Typography>
        {!contact.number ? 
          <></> 
          :
          <Typography 
            variant="h6"
            sx={{ 
              fontFamily: 'Helvetica', 
              color: 'white', 
              fontSize: '0.8em', // Tamaño relativo del texto
            }}
          >
            Numero: {contact.number}
          </Typography>
        }
        {!contact.address ?
          <></>
          :
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Helvetica', 
              color: 'white', 
              fontSize: '0.8em', // Tamaño relativo del texto
            }}
          >
            Direccion: {contact.address}
          </Typography>
        }
      </Box>
    </Card>
  );
};

export default SelectedContactWindow;