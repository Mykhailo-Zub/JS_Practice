import React, { useEffect } from "react";
import Contacts from "./Contacts/Contacts";
import EditPopup from "./EditPopup/EditPopup";
import DeletePopup from "./DeletePopup/DeletePopup";
import FullContact from "./FullContact/FullContact";
import { connect } from "react-redux";
import { getContactsToStore } from "./redux/contactsAction";
import { editSelector } from "./redux/selectors";

function App({ focusContactId, isDeletePopup, isEditPopup, getAndSetContacts }) {
  useEffect(() => {
    getAndSetContacts();
  }, [getAndSetContacts]);

  return (
    <>
      {isEditPopup ? <EditPopup /> : null}
      {isDeletePopup ? <DeletePopup /> : null}
      {focusContactId ? <FullContact /> : <Contacts />}
    </>
  );
}

const mapStateToProps = (state) => {
  const { id } = editSelector(state);
  return {
    focusContactId: id,
    isDeletePopup: state.deletePopupHandlerReducer.isDeletePopup,
    isEditPopup: state.editPopupComponentReducer.isEditPopup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAndSetContacts: () => dispatch(getContactsToStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
