import { deleteSelectedContact, getAllContacts, saveContact } from "../requests";
import mainAction from "./mainAction";
import { GET_ALL, FOCUS_CONTACT_ID } from "./types";

const getAll = (contacts) => {
  return mainAction(GET_ALL, contacts);
};

export const setFocusContactId = (id) => {
  return mainAction(FOCUS_CONTACT_ID, id);
};

export const getContactsToStore = () => (dispatch) => getAllContacts().then((data) => dispatch(getAll(data)));

export const saveContactInfo = (contact, id) => (dispatch) => saveContact(contact, id).then(() => dispatch(getContactsToStore()));

export const deleteContact = (id) => (dispatch) => deleteSelectedContact(id).then(() => dispatch(getContactsToStore()));
