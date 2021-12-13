import axios from "axios";

const GET = "Read";
const POST = "Create";
const PUT = "Update";
const DELETE = "Delete";

const data = {
  table: "contacts",
};

const customRequest = axios.create({
  baseURL: "https://api.m3o.com/v1/db/",
  headers: { "Content-Type": "application/json", Authorization: "Bearer ZGQ2NDgwNmYtZWJlNC00NDIwLWFhOWEtOTM5MTFkZDc1ZGFl" },
});

export function getAllContacts() {
  return customRequest.post(GET, data).then((res) => res.data.records);
}

export function deleteSelectedContact(id) {
  const requestData = { ...data, id };
  return customRequest.post(DELETE, requestData);
}

export function saveContact(contact, id) {
  const requestData = { ...data, id, record: contact };
  return customRequest.post(id ? PUT : POST, requestData);
}
