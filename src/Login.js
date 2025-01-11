import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

   // to force redirect to add page when click on register page link
   useEffect(()=>{
    if(localStorage.getItem("user-info"))
    {
      navigate("/Add")
    }
  },[])

  async function login() {
    let item = { email, password };
    console.warn("Login info:", item);

    try {
      // Using a mock API for testing login
      let result = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(`HTTP error! Status: ${result.status}, Message: ${errorData.error}`);
      }

      let data = await result.json();
      console.warn("Login Success:", data);

      // Storing user info to localStorage
      localStorage.setItem("user-info", JSON.stringify(data));
      alert("Login successful!");
      navigate("/Add");  // Redirect to Add page after login
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Failed to login. Please check your credentials.");
    }
  }

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Login Page</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <br />
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
