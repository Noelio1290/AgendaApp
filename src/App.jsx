import React, { useState, useEffect, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { Box, Container, Typography } from '@mui/material';
import ContactList from './Components/ContactList';
import SelectedContactWindow from './Components/SelectedContactWindow';
import ButtonSection from './Components/ButtonsSection';
import ModalWithForm from './Components/ModalWithForm';
import { getContactList, addContact, editContact } from './firebase/firebase'

function App() {

  const initialState = {
    contactList:[],
    selectedContact: {
      _id: uuid(),
      address:'',
      img: '',
      name: '',
      number: '',
    },
  };

  const actions = {
    SET_LIST: 'SET_LIST',
    SET_CHANGE_CONTACT: 'SET_CHANGE_CONTACT',
    SET_SELECTED_CONTACT: 'SET_SELECTED_CONTACT',
    RESET_SELECTED_CONTACT: 'RESET_SELECTED_CONTACT',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case actions.SET_LIST:
        return { 
          ...state,
          contactList: action.file
        };
      case actions.SET_CHANGE_CONTACT:
        const { name, value } = action;
        return {
          ...state,
          selectedContact: {
            ...state.selectedContact,
            [name]: value,
          },
        };
      case actions.SET_SELECTED_CONTACT:
        return { 
          ...state,
          selectedContact: action.file
        };
      case actions.RESET_SELECTED_CONTACT:
        return { 
          ...state,
          selectedContact: {_id: uuid()}
        };
      default:
        return state;
    }
  };
  
  //Set ContactList
  const [ state, dispatch] = useReducer(reducer, initialState);

  const { contactList, selectedContact } = state;
  console.log(contactList);
  console.log(selectedContact);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactListSnapshot = await getContactList();
        const formattedContactList = contactListSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        dispatch({ type: actions.SET_LIST, file: formattedContactList });
      } catch (error) {
        console.error("Error fetching contact list:", error);
      }
    };
    fetchData();
  }, [actions.SET_LIST]);

  const handleChangeModal = event => {
    const { name, value } = event.target;
    dispatch({
      type: actions.SET_CHANGE_CONTACT,
      name: name,
      value: value,
    });
  };

  const handleSubmitCreate = async () => {
    try {
      await addContact(selectedContact);
      const contactListSnapshot = await getContactList();
      const formattedContactList = contactListSnapshot.docs.map(doc => ({
        ...doc.data()
      }));
      dispatch({ type: actions.SET_LIST, file: formattedContactList });
      dispatch({ type: actions.RESET_SELECTED_CONTACT });
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };

  const onCardClick = (contact) => {
    dispatch({ type: actions.SET_SELECTED_CONTACT, file: contact })
  };



  //

  const deleteContact = (contact) => {
    const updatedContacts = contactList.filter(Contact => Contact._id !== contact._id);
    dispatch(updatedContacts);
    dispatch({});
  };  

  const onDeleteContact = () => {
    deleteContact(selectedContact);
  };

  //Set buttons active
  const areButtonsActive = Object.keys(selectedContact).length > 1 ;
  console.log(areButtonsActive);

  //Set Modal
  const [ openModal, setOpenModal ] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

   //Set Modal edit
   const [ openModalEdit, setOpenModalEdit ] = useState(false);
   const handleOpenModalEdit = () => setOpenModalEdit(true);
   const handleCloseModalEdit = () => setOpenModalEdit(false);

  return (
    <Container>
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
        modalFunction={editContact}
        setContactList={dispatch}
        label= 'Editando'
        selectedContact={selectedContact}
        setSelectedContact={dispatch}
      />
      <Box>
        <Typography variant='h6' sx={{ textAlign: 'center', fontSize: 70, fontFamily:'inherit', }}>
          Agenda
        </Typography>
      </Box>
      <Box sx={{ display:'flex', flexDirection:'Row', justifyContent:'space-evenly', flexWrap:'wrap' }}>
        <Box sx={{  }}>
          <ContactList contactsList={contactList} onCardClick={onCardClick} />
        </Box>
        <Box sx={{  }}>
          <SelectedContactWindow contact={selectedContact} />
          <ButtonSection 
            handleOpenModal={handleOpenModal} 
            handleOpenModalEdit={handleOpenModalEdit}
            onDeleteContact={onDeleteContact}
            areButtonsActive={areButtonsActive}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
