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
    <Paper 
      sx={{
        width: '100%',  // 100% del ancho del viewport
        height: '100%', // 95vh de la altura del viewport
        overflow: 'hidden', // Asegura que la imagen no sobresalga
        position: 'relative', // Asegura que los elementos secundarios se posicionen relativos a este contenedor
      }}
    >
      <img
        src={Fondo}
        alt=""
        style={{
          objectFit: 'cover',
          width: '100vW', // Cubre todo el ancho del contenedor
          height: '100vH', // Cubre toda la altura del contenedor
          position: 'absolute', // Posiciona la imagen absolutamente dentro del contenedor
        }}
      />
      <Container
        sx={{ 
          display: 'flex',
          width: '100%',
          height: '97vh',
          overflowY: 'auto',
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
        <Box 
          sx={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            height: '100%',
            overflowY: 'visible',
          }}
        >
          <Box sx={{ padding: '1em' }}>
            <Typography 
              variant='h1' 
              sx={{
                textAlign: 'center', 
                fontFamily: 'Helvetica', 
                color: 'white', 
                textShadow: '0.1em 0.1em 0.2em rgba(255, 255, 255, 0.5), -0.1em -0.1em 0.2em rgba(0, 0, 0, 0.5)', // Usando em para el desenfoque de sombra de texto
                fontSize: '3em' // Tamaño relativo del texto
              }}
            >
              Agenda
            </Typography>
          </Box>
          <Box
            sx={{
              display:'flex',
              flexDirection:{
                xs: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
              },
              justifyContent: 'center',
              gap: {
                xs: 0.5,
                sm: 5,
                md: 5,
                lg: 5,
              },
              paddingBottom: {
                xs: 1,
                sm: 'none',
                md: 'none',
                lg: 'none',
              },
            }}
          >
            <ContactList contactsList={contactList} onCardClick={onCardClick} />
            <Box sx={{
              display: 'flex', 
              flexDirection: 'column',
              gap: {
                xs: 1,
                sm: 3,
                md: 3,
                lg: 3,
              },
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              minWidth: '340px',
              height: {
                xs: '60vh',
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
      </Container>
    </Paper>
  );
};

export default Main;