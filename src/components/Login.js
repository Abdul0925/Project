import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({});

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
        localStorage.setItem("token", response.data.token);
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
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
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
