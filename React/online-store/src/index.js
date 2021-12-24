import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProductFull from "./components/ProductFull/ProductFull";
import Add from "./components/Add/Add";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<App />} />
        <Route path="admin/add" element={<Add />} />
        <Route path="product/:id" element={<ProductFull />} />
        <Route path="*" element={<Navigate replace to="/main" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
