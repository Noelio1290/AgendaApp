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
        width: '100%',
        minWidth: '340px',
        maxWidth: '350px',
        height: '97%',
        border:'1px solid',
        borderColor: 'white',
        borderRadius: '10px',
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        marginBottom:1,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', fontFamily:'Helvetica', color: 'white', fontSize: 24, marginTop:1, }} >
        Contactos:
      </Typography>
      <Box 
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          width: '95%',
          minWidth: '95%',
          height: '85%',
          overflowY: 'auto',
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