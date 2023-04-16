import React from "react";
import { Box, Button, Typography } from "@mui/material";

const ButtonSection = ({ handleOpenModal, selectedContact, setSelectedContact, deleteContact, }) => {
  const onDeleteContact = () => {
    deleteContact(selectedContact);
    setSelectedContact({})
  };

  return (
    <Box 
      sx={{ 
        display:'flex', 
        flexDirection:'column',
        alignItems:'center',
        border:'2px solid',
        maxWidth:'312px',
        width:'312px',
        height:'120px',
        backgroundColor: 'rgba(100, 100, 100, 0.2)',
        borderRadius: '8px',
        marginBottom:2
      }}
    >
      <Box>
        <Typography sx={{ textAlign: 'center', marginTop:2, fontSize: 22 }}>
          Opciones:
        </Typography>
        <Button variant="outlined" color="success" onClick={handleOpenModal} >
          Crear
        </Button>
        <Button variant="outlined" sx={{ margin:1 }}>
          Editar
        </Button>
        <Button variant="outlined" color="error" onClick={onDeleteContact} >
          Borrar
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonSection;