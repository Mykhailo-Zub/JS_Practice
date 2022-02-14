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
  const reducer = state.contactsReducer;
  const id = focusContactId(state);
  return reducer.contacts.find((el) => el.id === id) || {};
};

export const focusContactId = (state) => {
  return state.contactsReducer.focusContactId;
};