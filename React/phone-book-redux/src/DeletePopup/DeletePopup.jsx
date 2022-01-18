import React, { useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import styles from "./DeletePopup.module.css";
import { deleteContact, setFocusContactId } from "../redux/contactsAction";
import { setIsDeletePopup } from "../redux/deletePopupHandlerAction";

const popUpParent = document.body;

function DeletePopup() {
  const dispatch = useDispatch();

  const { contacts, focusContactId } = useSelector((store) => store.contactsReducer);

  const contact = useMemo(() => {
    return contacts.find((el) => el.id === focusContactId);
  }, [contacts, focusContactId]);

  const { firstName, lastName } = contact || {};

  const popupCloseHandler = useCallback(() => {
    dispatch(setIsDeletePopup(false));
  }, [dispatch]);

  const deleteConfirmHandler = useCallback(() => {
    dispatch(deleteContact(focusContactId));
    dispatch(setFocusContactId(null));
    popupCloseHandler();
  }, [dispatch, popupCloseHandler, focusContactId]);

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        Do you realy want to delete{" "}
        <span>
          {firstName} {lastName}
        </span>
        ?
      </div>
      <div className={styles.buttons}>
        <Button clickHandler={deleteConfirmHandler} isRed={true} text="Yes, delete" />
        <Button clickHandler={popupCloseHandler} text="No, go back" />
      </div>
    </div>,
    popUpParent
  );
}

export default DeletePopup;
