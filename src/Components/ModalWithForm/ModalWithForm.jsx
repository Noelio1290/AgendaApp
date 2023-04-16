import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import InputFile from "../InputFile";

const ModalWithForm = ({ openModal, handleCloseModal, addContact }) => {
  const [contact, setContact] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setContact(preventState => ({ ...preventState, [name]: value }));
  };

  const handleSubmit = () => {
    addContact(contact);
    handleCloseModal();
    setContact({})
  };

  return (
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '340px',
            height: '550px',
            bgcolor: 'background.paper',
            border: '2px solid',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
          }}
        >
          <Typography variant="h6" sx={{ marginTop:2, marginBottom:2 }}>
            Datos:
          </Typography>
          <TextField
            label="Nombre"
            name="nombre"
            size="small"
            value={contact.nombre || ''}
            onChange={handleChange}
            sx={{
              width: '300px',
              marginBottom:1
            }}
          />
          <TextField
            label="Numero"
            name="numero"
            size="small"
            type="number"
            value={contact.numero || ''}
            onChange={handleChange}
            sx={{
              width: '300px',
              marginBottom:1
            }}
          />
          <TextField
            label="Direccion"
            name="direccion"
            size="small"
            value={contact.direccion || ''}
            onChange={handleChange}
            sx={{
              width: '300px',
              marginBottom:1
            }}
          />
          <InputFile label={'Imagen'} onChange={handleChange} name={'img'} contact={contact.img || ''} />
          <Button 
            variant="contained"
            onClick={handleSubmit} 
          >
            Guardar
          </Button>
        </Box>
      </Modal>
  );
};

export default ModalWithForm;