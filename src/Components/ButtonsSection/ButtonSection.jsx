import React from "react";
import { Box, Button, Typography } from "@mui/material";

const ButtonSection = (
  { 
    handleOpenModal, 
    handleOpenModalEdit, 
    onDeleteContact, 
    areButtonsActive = false,
  }) => {

  return (
    <Box 
      sx={{ 
        display:'flex', 
        flexDirection:'column',
        alignItems:'center',
        border:'1px solid',
        borderColor: 'white',
        maxWidth:'330px',
        width:'350px',
        height:'120px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        marginBottom:2
      }}
    >
      <Box>
        <Typography sx={{ textAlign: 'center', color: 'white', marginTop:1, fontSize: 22 }}>
          Opciones:
        </Typography>
        <Button variant="contained" color="success" onClick={handleOpenModal} >
          Crear
        </Button>
        <Button disabled={!areButtonsActive} variant="contained" onClick={handleOpenModalEdit} sx={{ margin:1 }} >
          Editar
        </Button>
        <Button disabled={!areButtonsActive} variant="contained" color="error" onClick={onDeleteContact} >
          Borrar
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonSection;