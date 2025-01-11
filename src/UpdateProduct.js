import Header from "./Header";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from "react";

function UpdateProduct(props) {
  const location = useLocation(); // Access location
  const navigate = useNavigate(); // Navigate programmatically
  const params = useParams(); // Access route parameters

  const [title, SetTitle] = useState("");
  const [price, SetPrice] = useState("");
  const [category, SetCategory] = useState("");

  const [data, setData] = useState({}); // Initialize with an empty object

  // Fetch data wrapped in useCallback to prevent unnecessary re-creation
  const fetchData = useCallback(async () => {
    try {
      let result = await fetch("https://fakestoreapi.com/products/" + params.id);
      result = await result.json();
      setData(result);
      SetTitle(result.title);
      SetPrice(result.price);
      SetCategory(result.category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle product update
  async function editProduct(id) {
    const updatedProduct = {
      title: title,
      price: price,
      category: category
    };

    try {
      let result = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!result.ok) {
        throw new Error("Failed to update product");
      }

      const updatedData = await result.json();
      alert("Product has been updated successfully!");
      console.log("Updated Product: ", updatedData);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  }

  return (
    <div>
      <Header />
      <h1>Update Product</h1>
      <input 
        type="text" 
        onChange={(e) => SetTitle(e.target.value)} 
        value={title || ""} 
      /> <br /> <br />
      
      <input 
        type="text" 
        onChange={(e) => SetPrice(e.target.value)} 
        value={price || ""} 
      /> <br /> <br />
      
      <input 
        type="text" 
        onChange={(e) => SetCategory(e.target.value)} 
        value={category || ""} 
      /> <br /> <br />
      
      <button onClick={() => editProduct(data.id)}>Update</button>
    </div>
  );
}

export default UpdateProduct;
