import React from "react";
import Contact from "../Contact/Contact";
import Button from "../Button/Button";
import styles from "./Contacts.module.css";
import contactsImg from "../img/contact-list.png";

function Contacts({ contacts, addButton, fullContactHandler }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blur}>
        <div className={styles.header}>
          <img src={contactsImg} alt="Contacts" />
          <div>Contacts</div>
        </div>
        <div className={styles.contacts}>
          {contacts?.map((el) => {
            const { firstName, lastName, phone, id } = el;
            return <Contact firstName={firstName} lastName={lastName} phone={phone} id={id} key={id} clickHandler={fullContactHandler} />;
          })}
        </div>
        <Button additionalClass={styles.addBtn} clickHandler={addButton} />
      </div>
    </div>
  );
}

export default Contacts;
