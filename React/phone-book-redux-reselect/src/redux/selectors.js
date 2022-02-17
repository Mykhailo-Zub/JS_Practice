import { createSelector } from "reselect";

export const focusContactId = (state) => state.contactsReducer.focusContactId;

export const contactsSelector = (state) => state.contactsReducer.contacts;

export const firstNameSelector = (state) => state.editPopupComponentReducer.firstNameForm;

export const lastNameSelector = (state) => state.editPopupComponentReducer.lastNameForm;

export const phoneSelector = (state) => state.editPopupComponentReducer.phoneForm;

const emptyContact = {};

export const focusContact = createSelector(contactsSelector, focusContactId, (contacts, id) => contacts.find((el) => el.id === id) || emptyContact);
