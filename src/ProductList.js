import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import {Link} from 'react-router-dom';

function ProductList() {
  const [data, setData] = useState([]);

  // Function to fetch product data
  const fetchData = async () => {
    try {
      let result = await fetch("https://fakestoreapi.com/products");
      result = await result.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch("https://fakestoreapi.com/products/" + id, {
      method: "DELETE"
    });
    result = await result.json();
    console.warn(result);
    fetchData();
  }

  console.warn("ProductList", data);

  return (
    <div>
      <Header />
      <div className="col-sm-8 offset-sm-2">
        <h1>Product List</h1>
        <Table className="table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Reviews</th>
              <td>Operations</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>{item.rating.rate}</td>
                <td>{item.rating.count}</td>
                <td><span onClick={() => { deleteOperation(item.id) }} className="delete">Delete</span></td>
                <td><Link to={"Update/"+item.id}><span className="update">Update</span></Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductList;
