import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Contacts from "./Contacts/Contacts";
import ReactDOM from "react-dom";
import EditPopup from "./EditPopup/EditPopup";
import DeletePopup from "./DeletePopup/DeletePopup";
import FullContact from "./FullContact/FullContact";

const popUpParent = document.body;

const GET = "Read";
const POST = "Create";
const PUT = "Update";
const DELETE = "Delete";

function sendRequestToDB(operation, contact, id) {
  const data = {
    table: "contacts",
  };
  if (contact) {
    data.record = contact;
  }
  if (id) {
    data.id = id;
  }
  const requestData = JSON.stringify(data);
  const url = `https://api.m3o.com/v1/db/${operation}`;
  return axios.post(url, requestData, {
    headers: { "Content-Type": "application/json", Authorization: "Bearer ZGQ2NDgwNmYtZWJlNC00NDIwLWFhOWEtOTM5MTFkZDc1ZGFl" },
  });
}

function App() {
  const [contacts, setContacts] = useState([]);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isFullContact, setIsFullContact] = useState(false);
  const [focusContact, setFocusContact] = useState(null);

  const getAndSetContacts = () => {
    sendRequestToDB(GET).then((res) => {
      setContacts(res.data.records);
    });
  };

  useEffect(() => {
    getAndSetContacts();
  }, []);

  const fullContactHandler = useCallback(
    (id) => {
      setFocusContact(contacts.find((el) => el.id === id));
      setIsFullContact(true);
    },
    [contacts]
  );

  const editHandler = useCallback(() => {
    setIsEditPopup(true);
  }, []);

  const deleteHandler = useCallback(() => {
    setIsDeletePopup(true);
  }, []);

  const backHandler = useCallback(() => {
    setFocusContact(null);
    setIsFullContact(false);
  }, []);

  const popupCloseHandler = useCallback(() => {
    setIsEditPopup(false);
    setIsDeletePopup(false);
  }, []);

  const deleteConfirmHandler = useCallback(() => {
    const { id } = focusContact;
    sendRequestToDB(DELETE, null, id).then(() => {
      getAndSetContacts();
    });
    popupCloseHandler();
    backHandler();
  }, [focusContact, backHandler, popupCloseHandler]);

  const saveConfirmHandler = useCallback(
    (contact) => {
      const { id = null } = focusContact || {};
      sendRequestToDB(id ? PUT : POST, contact, id).then(() => {
        getAndSetContacts();
      });
      popupCloseHandler();
      backHandler();
    },
    [focusContact, backHandler, popupCloseHandler]
  );

  const editPopPortal = ReactDOM.createPortal(
    <EditPopup contact={focusContact} confirmHandler={saveConfirmHandler} closeHandler={popupCloseHandler} />,
    popUpParent
  );
  const deletePopPortal = ReactDOM.createPortal(
    <DeletePopup contact={focusContact} confirmHandler={deleteConfirmHandler} closeHandler={popupCloseHandler} />,
    popUpParent
  );

  if (isFullContact) {
    return (
      <>
        {isEditPopup ? editPopPortal : ""}
        {isDeletePopup ? deletePopPortal : ""}
        <FullContact contact={focusContact} editContact={editHandler} deleteContact={deleteHandler} goBack={backHandler} />
      </>
    );
  } else {
    return (
      <>
        {isEditPopup ? editPopPortal : ""}
        <Contacts contacts={contacts} fullContactHandler={fullContactHandler} addButton={setIsEditPopup} />
      </>
    );
  }
}

export default App;
