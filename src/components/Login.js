import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inputs, setInputs] = useState({});
    const location = useLocation();
    
  const Navigate = useNavigate();
  
  



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/my-web-app/login.php", inputs)
      .then(function (response) {
        console.log("Hello");
        console.log("Status:", response.data.status);
        localStorage.setItem('token', response.data.token);
        if (response.data.status === 1) {
          Navigate("/home", {
            state: { username: response.data.user.username },
          });
        } else {
          alert("Username is not exist");
        }
      });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          // value={username}
          name="username"
          onChange={handleChange}
          // onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          // value={password}
          name="password"
          onChange={handleChange}
          // onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Dont have an account, <Link to="/register">Register Now</Link>{" "}
      </p>
    </>
  );
}

export default Login;
