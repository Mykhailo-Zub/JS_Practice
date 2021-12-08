import React from "react";
import styles from "./Contact.module.css";
import contactImg from "../img/contact-photo.png";

function Contact({ firstName, lastName, phone, id, clickHandler }) {
  return (
    <div className={styles.wrapper} onClick={() => clickHandler(id)}>
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
