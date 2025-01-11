import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Table } from "react-bootstrap";

function SearchProduct() {
  const [data, setData] = useState([]); // All products
  const [searchKey, setSearchKey] = useState(""); // User input
  const [filteredData, setFilteredData] = useState([]); // Filtered results

  // Fetch all products once when the component loads
  useEffect(() => {
    async function fetchProducts() {
      try {
        let result = await fetch("https://fakestoreapi.com/products/");
        result = await result.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Search handler to filter products based on the search key
  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Search Component</h1>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={handleKeyPress}
          className="form-control"
          placeholder="Search product"
        />
        {
          data.length > 0 ?
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
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.rating.rate}</td>
                    <td>{item.rating.count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            : null
        }
      </div>
    </div>
  );
}

export default SearchProduct;
