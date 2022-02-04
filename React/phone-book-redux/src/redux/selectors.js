export const editSelector = (state) => {
  const reducer = state.editPopupComponentReducer;
  return {
    firstName: reducer.firstNameForm,
    lastName: reducer.lastNameForm,
    phone: reducer.phoneForm,
    id: state.contactsReducer.focusContactId,
  };
};

export const focusContact = (state) => {
  const reducer = state.contactsReducer;
  const id = reducer.focusContactId;
  return reducer.contacts.find((el) => el.id === id) || {};
};
