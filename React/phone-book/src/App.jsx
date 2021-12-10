import React, { useCallback, useEffect, useState } from "react";
import Contacts from "./Contacts/Contacts";
import EditPopup from "./EditPopup/EditPopup";
import DeletePopup from "./DeletePopup/DeletePopup";
import FullContact from "./FullContact/FullContact";
import { deleteSelectedContact, getAllContacts, saveContact } from "./requests";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [focusContactId, setFocusContactId] = useState(null);

  const getAndSetContacts = () => {
    getAllContacts().then(setContacts);
  };

  useEffect(() => {
    getAndSetContacts();
  }, []);

  const fullContactHandler = useCallback((id) => {
    setFocusContactId(id);
  }, []);

  const editHandler = useCallback(() => {
    setIsEditPopup(true);
  }, []);

  const deleteHandler = useCallback(() => {
    setIsDeletePopup(true);
  }, []);

  const backHandler = useCallback(() => {
    setFocusContactId(null);
  }, []);

  const popupCloseHandler = useCallback(() => {
    setIsEditPopup(false);
    setIsDeletePopup(false);
  }, []);

  const deleteConfirmHandler = useCallback(() => {
    deleteSelectedContact(focusContactId).then(() => {
      getAndSetContacts();
    });
    popupCloseHandler();
    backHandler();
  }, [focusContactId, backHandler, popupCloseHandler]);

  const saveConfirmHandler = useCallback(
    (contact) => {
      saveContact(contact, focusContactId).then(() => {
        getAndSetContacts();
      });
      popupCloseHandler();
      backHandler();
    },
    [focusContactId, backHandler, popupCloseHandler]
  );

  const focusContact = contacts.find((el) => el.id === focusContactId);

  const editPopPortal = <EditPopup contact={focusContact} confirmHandler={saveConfirmHandler} closeHandler={popupCloseHandler} />;

  const deletePopPortal = <DeletePopup contact={focusContact} confirmHandler={deleteConfirmHandler} closeHandler={popupCloseHandler} />;

  if (focusContactId) {
    return (
      <>
        {isEditPopup ? editPopPortal : null}
        {isDeletePopup ? deletePopPortal : null}
        <FullContact contact={focusContact} editContact={editHandler} deleteContact={deleteHandler} goBack={backHandler} />
      </>
    );
  } else {
    return (
      <>
        {isEditPopup ? editPopPortal : null}
        <Contacts contacts={contacts} fullContactHandler={fullContactHandler} addButton={editHandler} />
      </>
    );
  }
}

export default App;
