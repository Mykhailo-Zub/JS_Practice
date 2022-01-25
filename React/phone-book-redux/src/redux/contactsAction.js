import { deleteSelectedContact, getAllContacts, saveContact } from "../requests";
import { setIsDeletePopup } from "./deletePopupHandlerAction";
import {
  setFirstNameForm,
  setIsEditPopup,
  setLastNameForm,
  setPhoneForm,
  setPhoneOk,
  setLastNameOk,
  setFirstNameOk,
} from "./editPopupComponentAction";
import mainAction from "./mainAction";
import { GET_ALL, FOCUS_CONTACT_ID } from "./types";

const getAll = (contacts) => {
  return mainAction(GET_ALL, contacts);
};

const setFocusContact = (id) => {
  return mainAction(FOCUS_CONTACT_ID, id);
};

export const getContactsToStore = () => (dispatch) => getAllContacts().then((data) => dispatch(getAll(data)));

export const setFocusContactId = (id) => (dispatch, getState) => {
  dispatch(setFocusContact(id));
  const { firstName, lastName, phone } = getState().contactsReducer.contacts.find((el) => el.id === id) || {};
  dispatch(setFirstNameForm(firstName));
  dispatch(setLastNameForm(lastName));
  dispatch(setPhoneForm(phone ? phone.toString().slice(1) : phone));
  if (!id) {
    dispatch(setPhoneOk(true));
    dispatch(setLastNameOk(true));
    dispatch(setFirstNameOk(true));
  }
};

export const saveContactInfo = () => (dispatch, getState) => {
  const firstName = getState().editPopupComponentReducer.firstNameForm;
  const firstNameOk = getState().editPopupComponentReducer.firstNameOk;
  const lastName = getState().editPopupComponentReducer.lastNameForm;
  const lastNameOk = getState().editPopupComponentReducer.lastNameOk;
  const phone = getState().editPopupComponentReducer.phoneForm;
  const phoneOk = getState().editPopupComponentReducer.phoneOk;
  const id = getState().contactsReducer.focusContactId;
  if (firstName && firstNameOk && lastName && lastNameOk && phone && phoneOk) {
    const contact = { firstName, lastName, phone: "+" + phone };
    saveContact(contact, id).then(() => {
      dispatch(setFocusContactId(null));
      dispatch(setIsEditPopup(false));
      dispatch(getContactsToStore());
    });
  }
};

export const deleteContact = () => (dispatch, getState) => {
  const id = getState().contactsReducer.focusContactId;
  deleteSelectedContact(id).then(() => {
    dispatch(setFocusContactId(null));
    dispatch(setIsDeletePopup(false));
    dispatch(getContactsToStore());
  });
};