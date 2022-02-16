import { createSelector } from "reselect";

const focusContactIdSelector = (state) => state.contactsReducer.focusContactId;

const contacts = (state) => state.contactsReducer.contacts;

const edit = (state) => {
  const reducer = state.editPopupComponentReducer;
  return {
    firstName: reducer.firstNameForm,
    lastName: reducer.lastNameForm,
    phone: reducer.phoneForm,
    id: focusContactId(state),
  };
};

export const focusContactId = createSelector(focusContactIdSelector, (id) => id);

export const contactsSelector = createSelector(contacts, (contacts) => contacts);

export const editSelector = createSelector(edit, (editForm) => editForm);

export const focusContact = createSelector(contacts, focusContactIdSelector, (contacts, id) => contacts.find((el) => el.id === id) || {});
