export const focusContactId = (state) => state.contactsReducer.focusContactId;

export const contactsSelector = (state) => state.contactsReducer.contacts;

export const editSelector = (state) => {
  const reducer = state.editPopupComponentReducer;
  return {
    firstName: reducer.firstNameForm,
    lastName: reducer.lastNameForm,
    phone: reducer.phoneForm,
    id: focusContactId(state),
  };
};

export const focusContact = (state) => {
  const contacts = contactsSelector(state);
  const id = focusContactId(state);
  return contacts.find((el) => el.id === id) || {};
};
