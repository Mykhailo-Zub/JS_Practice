import axios from "axios";

const GET = "Read";
const POST = "Create";

const data = {
  table: "products",
};

const customRequest = axios.create({
  baseURL: "https://api.m3o.com/v1/db/",
  headers: { "Content-Type": "application/json", Authorization: "Bearer ZGQ2NDgwNmYtZWJlNC00NDIwLWFhOWEtOTM5MTFkZDc1ZGFl" },
});

export function getAllProducts() {
  return customRequest.post(GET, data).then((res) => res.data.records);
}

export function getSelectedProduct(id) {
  const requestData = { ...data, id };
  return customRequest.post(GET, requestData).then((res) => res.data.records);
}

export function saveProduct(product) {
  const requestData = { ...data, record: product };
  return customRequest.post(POST, requestData);
}
