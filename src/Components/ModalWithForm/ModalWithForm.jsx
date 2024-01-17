import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import InputFile from "../InputFile";
import { getContactList } from "../../firebase/firebase";

const ModalWithForm = ({ 
  openModal = false, 
  handleCloseModal = () => {}, 
  modalFunction = () => {}, 
  setContactList = () => {},
  label = '',
  selectedContact = {},
  setSelectedContact = () => {},
}) => {
  const [contact, setContact] = useState({ _id:uuid() });

  console.log(contact, label);

  useEffect(() => {
    if (openModal && label === 'Editando') {
      setContact({ ...selectedContact });
    }
  }, [openModal, label, selectedContact]);

  const handleChange = event => {
    const { name, value } = event.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await modalFunction(contact);
      const contactListSnapshot = await getContactList();
      const formattedContactList = contactListSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log(formattedContactList);
      setContactList(formattedContactList);
      setSelectedContact({});
      handleCloseModal();
      setContact({ _id: uuid() });
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };
  useEffect(()=>{
    if(openModal && label === 'Editando') setContact({ ...selectedContact})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

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
            name="name"
            size="small"
            value={contact?.name || '' }
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
            value={contact?.number || ''}
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
            value={contact?.address || ''}
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
            value={ contact?.img || '' } 
          />
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