import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function AddProduct() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function addProduct() {
    console.warn(name, file, price, description);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("file", file);

    try {
      let result = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          price,
          description
        }),
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(`HTTP error! Status: ${result.status}, Message: ${errorData.message}`);
      }

      let data = await result.json();
      console.warn("Product Added Successfully:", data);
      alert("Product has been added successfully!");
      navigate("/Add"); // Redirect to home or product list page
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product. Please try again.");
    }
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Add Product</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Name"
        />
        <br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
          placeholder="File"
        />
        <br />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          placeholder="Price"
        />
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Description"
        />
        <br />
        <button className="btn btn-primary" onClick={addProduct}>
          Add Product
        </button>
      </div>
    </>
  );
}

export default AddProduct;
