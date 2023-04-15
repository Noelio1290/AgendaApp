import React from "react";
import { Card, CardOverflow, AspectRatio, Typography, CardContent } from '@mui/joy';

const ContactCard = ({ contact = {}, onCardClick = () => {}, }) => {

  return (
    <Card
      orientation="horizontal"
      variant="outlined" 
      sx={{ 
        display:'flex',
        width: '260px', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 2, 
        margin:1,
        cursor: 'pointer',
      }}
      onClick={() => onCardClick(contact)}
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: '70px', marginRight:1 }}>
          <img
            src={contact.img}
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent 
        sx={{ 
          display:'flex', 
          textAlign: 'center', 
          alignItems:'center' 
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white', 
            textAlign: 'center', 
            display:'flex', 
            alignItems:'center' 
          }}
        >
          {contact.nombre}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContactCard;