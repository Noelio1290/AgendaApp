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
        minWidth: '300px',
        height: '240px',
        maxHeight: '230px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid',
        borderColor: 'white',
        marginBottom:1
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: '300px',
          height: '100%',
        }}
      >
        <Typography variant="h6" sx={{ textAlign: 'center', fontFamily:'Helvetica', color: 'white', fontSize:20 }}>
          {contact.name}
        </Typography>
        {!contact.number ? 
          <></> 
          :
          <Typography variant="h6" sx={{ fontFamily:'Helvetica', color: 'white', fontSize:14 }}>
            Numero: {contact.number}
          </Typography>
        }
        {!contact.address ?
          <></>
          :
          <Typography variant="h6" sx={{ fontFamily:'Helvetica', color: 'white', fontSize: 14 }}>
            Direccion: {contact.address}
          </Typography>
        }
      </Box>
    </Card>
  );
};

export default SelectedContactWindow;