import React from "react";
import Button from "../Button/Button";
import styles from "./FullContact.module.css";
import contactImg from "../img/contact-photo.png";
import backImg from "../img/back.png";

function FullContact({ contact, editContact, deleteContact, goBack }) {
  const { firstName, lastName, phone } = contact;
  return (
    <div className={styles.wrapper}>
      <div className={styles.blur}>
        <div className={styles.back} onClick={goBack}>
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
