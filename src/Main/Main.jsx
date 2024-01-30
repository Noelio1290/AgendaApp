import React, { useState, useReducer, useEffect } from "react";
import { Box, Typography, Paper, Container } from '@mui/material';
import ContactList from '../Components/ContactList';
import SelectedContactWindow from '../Components/SelectedContactWindow';
import ButtonSection from '../Components/ButtonsSection';
import ModalWithForm from '../Components/ModalWithForm';
import { reducer, initialState, actions } from '../Utils/Commons';
import { getContactList, addContact, editContact, deleteContact } from '../firebase/firebase';
import Fondo from '../Fondo.jpg';

const Main = () => {
  const [ state, dispatch] = useReducer(reducer, initialState);

  const { contactList, selectedContact } = state;

  useEffect(() => {
    const fetchContactList = async () => {
      try {
        const contactListSnapshot = await getContactList();
        const formattedContactList = contactListSnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            ...docData,
            id: doc.id
          };
        });
        dispatch({ type: actions.SET_LIST, file: formattedContactList });
      } catch (error) {
        console.error("Error fetching contact list:", error);
      };
    };

    fetchContactList();
  }, []);

  // Handler Modal
  const handleChangeModal = event => {
    const { name, value } = event.target;
    dispatch({
      type: actions.SET_CHANGE_CONTACT,
      name: name,
      value: value,
    });
  };

  // Set Modal Create
  const [ openModal, setOpenModal ] = useState(false);

  const handleOpenModal = () => {
    dispatch({ type: actions.SET_NEW_CONTACT });
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    dispatch({ type: actions.RESET_SELECTED_CONTACT });
    setOpenModal(false);
  };

  const handleSubmitCreate = async () => {
    try {
      await addContact(selectedContact);
      const contactListSnapshot = await getContactList();
      const formattedContactList = contactListSnapshot.docs.map(doc => ({
        ...doc.data()
      }));
      dispatch({ type: actions.SET_LIST, file: formattedContactList });
      dispatch({ type: actions.RESET_SELECTED_CONTACT});
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };

  //Set Modal edit
  const [ openModalEdit, setOpenModalEdit ] = useState(false);

  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const handleSubmitEdit = async () => {
    try {
      await editContact(selectedContact);
      const contactListSnapshot = await getContactList();
      const formattedContactList = contactListSnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id
        };
      });
      dispatch({ type: actions.SET_LIST, file: formattedContactList });
      dispatch({ type: actions.RESET_SELECTED_CONTACT});
      handleCloseModalEdit();
    } catch (error) {
      console.error("Error al editar el contacto:", error);
    }
  };

  // Handler delete contact
  const onDeleteContact = async () => {
    try {
      await deleteContact(selectedContact._id);
      const contactListSnapshot = await getContactList();
      const formattedContactList = contactListSnapshot.docs.map(doc => ({
        ...doc.data()
      }));
      dispatch({ type: actions.SET_LIST, file: formattedContactList });
      dispatch({ type: actions.RESET_SELECTED_CONTACT});
      handleCloseModalEdit();
    } catch (error) {
      console.error("Error al borrar el contacto:", error);
    }
  };

  // Set selected contact
  const onCardClick = (contact) => {
    dispatch({ type: actions.SET_SELECTED_CONTACT, file: contact })
  };

  //Set buttons active
  const areButtonsActive = Object.keys(selectedContact || {}).length > 0 ; 

  return (
    <Container
      sx={{ 
        display: 'flex',
        width: '100%',
        height: '97vh',
      }}>
      <Paper 
        sx={{
          width: '100%',  // 100% del ancho del viewport
          height: '100%', // 95vh de la altura del viewport
          overflow: 'hidden', // Asegura que la imagen no sobresalga
          position: 'relative', // Asegura que los elementos secundarios se posicionen relativos a este contenedor
        }}
      >
        <ModalWithForm
          isCreating
          openModal={openModal} 
          handleCloseModal={handleCloseModal} 
          value={selectedContact}
          handleChange={handleChangeModal}
          modalFunction={handleSubmitCreate}
        />
        <ModalWithForm 
          openModal={openModalEdit} 
          handleCloseModal={handleCloseModalEdit}
          value={selectedContact}
          handleChange={handleChangeModal}
          modalFunction={handleSubmitEdit}
        />
        <img
          src={Fondo}
          alt=""
          style={{
            objectFit: 'cover',
            width: '100%', // Cubre todo el ancho del contenedor
            height: '100%', // Cubre toda la altura del contenedor
            position: 'absolute', // Posiciona la imagen absolutamente dentro del contenedor
          }}
        />
        <Box 
          sx={{
            position: 'relative', 
            zIndex: 1,
            width: '100%',
            height: '100%',
          }}
        >
          <Box sx={{ padding: 1 }}>
            <Typography variant='h1' sx={{ textAlign: 'center', fontFamily:'Helvetica', color: 'white', textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5), -2px -2px 4px rgba(0, 0, 0, 0.5)', }}>
              Agenda
            </Typography>
          </Box>
          <Box sx={{ display:'flex', flexDirection:'Row', justifyContent:'space-evenly', flexWrap:'wrap' }}>
            <Box>
              <ContactList contactsList={contactList} onCardClick={onCardClick} />
            </Box>
            <Box sx={{
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              minWidth: '360px',
              maxWidth: '370px',
              height: '380px',
              maxHeight: '380px',
              border:'1px solid',
              borderColor: 'white',
              borderRadius: '10px',
              background: 'transparent',
              backdropFilter: 'blur(10px)',
              marginBottom:1,
              paddingTop: 1,
             }}>
              <SelectedContactWindow contact={selectedContact} />
              <ButtonSection 
                handleOpenModal={handleOpenModal} 
                handleOpenModalEdit={handleOpenModalEdit}
                onDeleteContact={onDeleteContact}
                areButtonsActive={areButtonsActive}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Main;