import { GET_ALL, FOCUS_CONTACT_ID } from "./types";

const initialState = {
  contacts: [],
  focusContactId: null,
};

export const contactsReducer = (state = [initialState], action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        contacts: action.payload,
      };
    case FOCUS_CONTACT_ID:
      return {
        ...state,
        focusContactId: action.payload,
      };
    default:
      return state;
  }
};
