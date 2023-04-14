import React from 'react';
import { Card, CardOverflow, AspectRatio, Typography } from '@mui/joy';
import { Box } from '@mui/material';

const ShowContact = ({ contact = {} }) => {

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        width: 280,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 2,  
        margin:1
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
      <Box sx={{ paddingTop:1 }}>
        <Typography level="h6" sx={{ color: 'white', fontSize:20 }}>
          {contact.nombre}
        </Typography>
        <Typography level="h6" sx={{ color: 'white', fontSize:18 }}>
          {contact.numero}
        </Typography>
        <Typography level="h6" sx={{ color: 'white', fontSize: 18}}>
          {contact.direccion}
        </Typography>
      </Box>
    </Card>
  );
};

export default ShowContact;