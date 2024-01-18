import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import InputFile from "../InputFile";

const ModalWithForm = ({ 
  isCreating = false,
  openModal = false, 
  handleCloseModal, 
  value = {},
  handleChange = () => {},
  modalFunction = () => {},
}) => {
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
          {isCreating ? 'Crear Contacto' : 'Editar Contacto'}
          </Typography>
          <TextField
            label="Nombre"
            name="name"
            size="small"
            value={value.name || '' }
            onChange={handleChange}
            sx={{
              width: '300px',
              marginBottom:1
            }}
          />
          <TextField
            label="Numero"
            name="number"
            size="small"
            type="number"
            value={value.number || ''}
            onChange={handleChange}
            sx={{
              width: '300px',
              marginBottom:1
            }}
          />
          <TextField
            label="Direccion"
            name="address"
            size="small"
            value={value.address || ''}
            onChange={handleChange}
            sx={{
              width: '300px',
              marginBottom:1
            }}
          />
          <InputFile 
            label={'Imagen'} 
            onChange={handleChange} 
            name={'img'} 
            value={ value.img || '' } 
          />
          <Button 
            variant="contained"
            onClick={modalFunction} 
          >
            {isCreating ? 'Crear' : 'Editar'}
          </Button>
        </Box>
      </Modal>
  );
};

export default ModalWithForm;