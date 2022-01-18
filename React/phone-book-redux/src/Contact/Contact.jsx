import React from "react";
import { useDispatch } from "react-redux";
import styles from "./Contact.module.css";
import contactImg from "../img/contact-photo.png";
import { setFocusContactId } from "../redux/contactsAction";

function Contact({ firstName, lastName, phone, id }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper} onClick={() => dispatch(setFocusContactId(id))}>
      <img src={contactImg} alt="Contact" />
      <div className={styles.info}>
        <div className={styles.nameWrapper}>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={styles.phone}>{phone}</div>
      </div>
    </div>
  );
}

export default Contact;
