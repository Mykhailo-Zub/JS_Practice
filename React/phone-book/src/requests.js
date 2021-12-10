import axios from "axios";

const GET = "Read";
const POST = "Create";
const PUT = "Update";
const DELETE = "Delete";

function sendRequestToDB(operation, contact, id) {
  let contacts;
  const data = {
    table: "contacts",
  };
  if (contact) {
    data.record = contact;
  }
  if (id) {
    data.id = id;
  }
  const url = `https://api.m3o.com/v1/db/${operation}`;
  contacts = axios
    .post(url, data, {
      headers: { "Content-Type": "application/json", Authorization: "Bearer ZGQ2NDgwNmYtZWJlNC00NDIwLWFhOWEtOTM5MTFkZDc1ZGFl" },
    })
    .then((res) => res.data.records);
  return contacts;
}

export function getAllContacts() {
  return sendRequestToDB(GET);
}

export function deleteSelectedContact(id) {
  return sendRequestToDB(DELETE, null, id);
}

export function saveContact(contact, id) {
  return sendRequestToDB(id ? PUT : POST, contact, id);
}
