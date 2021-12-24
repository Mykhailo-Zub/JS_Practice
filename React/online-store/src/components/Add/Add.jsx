import React, { useState } from "react";
import { saveProduct } from "../../requests";

function Add() {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productAbout, setProductAbout] = useState(null);

  const saveProductHandler = () => {
    const product = {
      img: productImage,
      name: productName,
      description: productDescription,
      price: productPrice,
      about: productAbout,
    };
    saveProduct(product);
  };
  return (
    <div>
      <label>
        Image link
        <input onChange={(e) => setProductImage(e.target.value)} value={productImage} type="text" />
      </label>
      <label>
        Name
        <input onChange={(e) => setProductName(e.target.value)} value={productName} type="text" />
      </label>
      <label>
        Description
        <textarea onChange={(e) => setProductDescription(e.target.value)} value={productDescription} />
      </label>
      <label>
        Price
        <input onChange={(e) => setProductPrice(e.target.value)} value={productPrice} type="text" />
      </label>
      <label>
        About
        <textarea onChange={(e) => setProductAbout(e.target.value)} value={productAbout} />
      </label>
      <button onClick={saveProductHandler}>Save</button>
    </div>
  );
}

export default Add;
