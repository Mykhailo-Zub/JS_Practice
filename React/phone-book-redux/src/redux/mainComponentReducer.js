import { EDIT_POPUP, DELETE_POPUP, FOCUS_CONTACT_ID } from "./types";

const initialState = {
  isEditPopup: false,
  isDeletePopup: false,
  focusContactId: null,
};

export const mainComponentReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_POPUP:
      return {
        ...state,
        isEditPopup: action.payload,
      };
    case DELETE_POPUP:
      return {
        ...state,
        isDeletePopup: action.payload,
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
