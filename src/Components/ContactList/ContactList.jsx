import React from "react";
import { Box } from "@mui/material";
import ContactCard from "./ContactCard";

const ContactList = ({ contactsList = [], onCardClick = () => {}, }) => {

  return (
    <Box 
      sx={{ 
        display:'flex', 
        flexDirection:'column',
        alignItems:'center',
        border:'2px solid',
        maxWidth:'280px',
        width:'265px',
        height:'400px',
        backgroundColor: 'rgba(100, 100, 100, 0.2)',
        overflow: 'auto'
      }}
    >
      {contactsList.map((contact,key) => (
        <ContactCard 
          contact={contact} 
          key={`contact_number_${key}`} 
          onCardClick={onCardClick}
        />
      ))}
    </Box>
  );
};

export default ContactList;