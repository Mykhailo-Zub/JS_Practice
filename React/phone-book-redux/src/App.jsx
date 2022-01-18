import React, { useEffect } from "react";
import Contacts from "./Contacts/Contacts";
import EditPopup from "./EditPopup/EditPopup";
import DeletePopup from "./DeletePopup/DeletePopup";
import FullContact from "./FullContact/FullContact";
import { useDispatch, useSelector } from "react-redux";
import { getContactsToStore } from "./redux/contactsAction";

function App() {
  const dispatch = useDispatch();

  const { focusContactId } = useSelector((store) => store.contactsReducer);
  const { isDeletePopup } = useSelector((store) => store.deletePopupHandlerReducer);
  const { isEditPopup } = useSelector((store) => store.editPopupComponentReducer);

  const getAndSetContacts = () => {
    dispatch(getContactsToStore());
  };

  useEffect(() => {
    getAndSetContacts();
  }, []);

  return (
    <>
      {isEditPopup ? <EditPopup /> : null}
      {isDeletePopup ? <DeletePopup /> : null}
      {focusContactId ? <FullContact /> : <Contacts />}
    </>
  );
}

export default App;
