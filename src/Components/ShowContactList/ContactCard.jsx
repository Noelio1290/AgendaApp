import React from "react";
import { Card, CardOverflow, AspectRatio, Typography, CardContent } from '@mui/joy';

const ContactCard = ({ contact = {} }) => {

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ 
        width: '210px', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 2, 
        margin:1,
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: '90px' }}>
          <img
            src={contact.img}
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ textAlign: 'center', alignItems:'center' }}>
        <Typography variant="h6" sx={{ color: 'white', paddingTop:2 }}>
          {contact.nombre}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContactCard;