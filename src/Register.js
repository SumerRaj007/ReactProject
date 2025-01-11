import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Header from './Header';

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // to force redirect to add page when click on register page link
  useEffect(()=>{
    if(localStorage.getItem("user-info"))
    {
      navigate("/Add")
    }
  },[])

  async function signUp() {
    let item = { name, email, password }; // Using name, email, and password
    try {
      let result = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });

      if (!result.ok) {
        const errorText = await result.text();
        console.error(`HTTP error! status: ${result.status}, message: ${errorText}`);
        throw new Error(`Failed to register. Status: ${result.status}`);
      }

      let data = await result.json();
      console.warn("Registration Success:", data);
      alert("User registered successfully!");
      localStorage.setItem("user-info", JSON.stringify(data)); // to store locally;
      navigate("/Add"); 
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Failed to sign up. Please try again.");
    }
  }

  return (
    <>
    <Header />
    <div className="col-sm-6 offset-sm-3">
      <h1>Sign Up</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
        placeholder="Name"
      />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="Password"
      />
      <br />
      <button className="btn btn-primary" onClick={signUp}>
        Sign Up
      </button>
    </div>
    </>
  );
}

export default Register;
