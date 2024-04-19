import { v4 as uuid } from 'uuid';

export const initialState = {
  contactList:[],
  selectedContact: {},
  isLoading: false,
};

export const actions = {
  SET_LIST: 'SET_LIST',
  SET_NEW_CONTACT: 'SET_NEW_CONTACT',
  SET_CHANGE_CONTACT: 'SET_CHANGE_CONTACT',
  SET_SELECTED_CONTACT: 'SET_SELECTED_CONTACT',
  RESET_SELECTED_CONTACT: 'RESET_SELECTED_CONTACT',
  SET_LOADER: 'SET_LOADER',
};

export const reducer = (state, action) => {
  switch (action.type) {      
    case actions.SET_LIST:
      return { 
        ...state,
        contactList: action.file,
      };
    case actions.SET_NEW_CONTACT:
      return { 
        ...state,
        selectedContact: {
          _id: uuid(),
          address:'',
          img: '',
          name: '',
          number: '',
        }
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
        selectedContact: {}
      };
      case actions.SET_LOADER:
        return { 
          ...state,
          isLoading: action.file
        };
    default:
      return {...state};
  }
};
