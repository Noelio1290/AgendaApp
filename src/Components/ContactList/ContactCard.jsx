import React from "react";
import { Card, CardOverflow, AspectRatio, Typography, CardContent } from '@mui/joy';

const ContactCard = ({ contact = {}, onCardClick = () => {}, }) => {

  return (
    <Card
      orientation="horizontal"
      variant="outlined" 
      sx={{ 
        display:'flex',
        width: '90%', 
        minWidth: '250px', 
        maxWidth: '200px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 2, 
        marginBottom: .5,
        cursor: 'pointer',
      }}
      onClick={() => onCardClick(contact)}
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: '60px', marginRight:1 }}>
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
          {contact.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContactCard;