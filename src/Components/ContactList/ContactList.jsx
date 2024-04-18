import React from "react";
import { Box, Typography } from "@mui/material";
import ContactCard from "./ContactCard";

const ContactList = ({ contactsList = [], onCardClick = () => {}, }) => {

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        width: '40%',
        minWidth: '340px',
        height: {
          xs: '40vh',
          sm: '75vh',
          md: '75vh',
          lg: '75vh',
        },
        border: '1px solid',
        borderColor: 'white',
        borderRadius: '10px',
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        paddingTop: 0.5,
        paddingBottom: 0.5,
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          textAlign: 'center', 
          fontFamily: 'Helvetica', 
          color: 'white', 
          fontSize: '2em', // Tamaño relativo del texto
        }}
      >
        Contactos:
      </Typography>
      <Box 
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          overflowY: 'visible',
          overflowX: 'hidden',
        }}>
        {contactsList.map((contact,key) => (
          <ContactCard 
            contact={contact} 
            key={`contact_number_${key}`} 
            onCardClick={onCardClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ContactList;