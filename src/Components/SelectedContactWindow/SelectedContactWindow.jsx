import React from 'react';
import { Card, CardOverflow, AspectRatio, Typography } from '@mui/joy';
import { Box } from '@mui/material';

const SelectedContactWindow = ({ contact = {} }) => {

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        width: 280,
        height:250,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 2,
        marginBottom:1
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={contact.img}
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <Box sx={{ }}>
        <Typography variant="h6" sx={{ color: 'white', fontSize:22 }}>
          {contact.nombre}
        </Typography>
        <Typography variant="h6" sx={{ color: 'white', fontSize:16 }}>
          Numero: {contact.numero}
        </Typography>
        <Typography variant="h6" sx={{ color: 'white', fontSize: 16 }}>
          Direccion: {contact.direccion}
        </Typography>
      </Box>
    </Card>
  );
};

export default SelectedContactWindow;