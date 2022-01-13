import { EDIT_POPUP, DELETE_POPUP, FOCUS_CONTACT_ID } from "./types";

export const setIsEditPopup = (isPopup) => {
  return {
    type: EDIT_POPUP,
    payload: isPopup,
  };
};

export const setIsDeletePopup = (isPopup) => {
  return {
    type: DELETE_POPUP,
    payload: isPopup,
  };
};

export const setFocusContactId = (id) => {
  return {
    type: FOCUS_CONTACT_ID,
    payload: id,
  };
};
