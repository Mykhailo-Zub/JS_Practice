import React, { useCallback, useEffect, useMemo } from "react";
import Contacts from "./Contacts/Contacts";
import EditPopup from "./EditPopup/EditPopup";
import DeletePopup from "./DeletePopup/DeletePopup";
import FullContact from "./FullContact/FullContact";
import { deleteSelectedContact, saveContact } from "./requests";
import { useDispatch, useSelector } from "react-redux";
import getContactsToStore from "./redux/contactsAction";
import { setFocusContactId, setIsEditPopup, setIsDeletePopup } from "./redux/mainComponentAction";

function App() {
  const dispatch = useDispatch();

  const contacts = useSelector((store) => store.contactsReducer);
  const { isEditPopup, isDeletePopup, focusContactId } = useSelector((store) => store.mainComponentReducer);

  const getAndSetContacts = () => {
    dispatch(getContactsToStore());
  };

  useEffect(() => {
    getAndSetContacts();
  }, []);

  const fullContactHandler = useCallback(
    (id) => {
      dispatch(setFocusContactId(id));
    },
    [dispatch]
  );

  const editHandler = useCallback(() => {
    dispatch(setIsEditPopup(true));
  }, [dispatch]);

  const deleteHandler = useCallback(() => {
    dispatch(setIsDeletePopup(true));
  }, [dispatch]);

  const backHandler = useCallback(() => {
    dispatch(setFocusContactId(null));
  }, [dispatch]);

  const popupCloseHandler = useCallback(() => {
    dispatch(setIsEditPopup(false));
    dispatch(setIsDeletePopup(false));
  }, [dispatch]);

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

  const focusContact = useMemo(() => {
    return contacts.find((el) => el.id === focusContactId);
  }, [contacts, focusContactId]);

  const editPopPortal = <EditPopup contact={focusContact} confirmHandler={saveConfirmHandler} closeHandler={popupCloseHandler} />;

  const deletePopPortal = <DeletePopup contact={focusContact} confirmHandler={deleteConfirmHandler} closeHandler={popupCloseHandler} />;

  const fullContactComponent = <FullContact contact={focusContact} editContact={editHandler} deleteContact={deleteHandler} goBack={backHandler} />;

  const contactsComponent = <Contacts contacts={contacts} fullContactHandler={fullContactHandler} addButton={editHandler} />;

  return (
    <>
      {isEditPopup ? editPopPortal : null}
      {isDeletePopup ? deletePopPortal : null}
      {focusContactId ? fullContactComponent : contactsComponent}
    </>
  );
}

export default App;
