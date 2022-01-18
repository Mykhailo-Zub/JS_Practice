import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeletePopup } from "../redux/deletePopupHandlerAction";
import { setFocusContactId } from "../redux/contactsAction";
import Button from "../Button/Button";
import styles from "./FullContact.module.css";
import contactImg from "../img/contact-photo.png";
import backImg from "../img/back.png";
import { setIsEditPopup } from "../redux/editPopupComponentAction";

function FullContact() {
  const dispatch = useDispatch();

  const { contacts, focusContactId } = useSelector((store) => store.contactsReducer);

  const contact = useMemo(() => {
    return contacts.find((el) => el.id === focusContactId);
  }, [contacts, focusContactId]);

  const { firstName = null, lastName = null, phone = null } = contact || {};

  const editContact = useCallback(() => {
    dispatch(setIsEditPopup(true));
  }, [dispatch]);

  const deleteContact = useCallback(() => {
    dispatch(setIsDeletePopup(true));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.blur}>
        <div className={styles.back} onClick={() => dispatch(setFocusContactId(null))}>
          <div className={styles.arrow}>
            <img src={backImg} alt="back" />
          </div>
          <div>Back</div>
        </div>
        <img src={contactImg} alt="Contact" />
        <div className={styles.nameWrapper}>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={styles.phone}>{phone}</div>
        <div className={styles.phoneType}>Mobile</div>
        <div className={styles.buttons}>
          <Button text="Edit contact" clickHandler={editContact} />
          <Button clickHandler={deleteContact} text="Delete contact" isRed={true} />
        </div>
      </div>
    </div>
  );
}

export default FullContact;
