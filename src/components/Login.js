import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'
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
        console.log("Status:", response.data);
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
    <div className="loginpage">
      <form onSubmit={handleLogin} className="loginform">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="usernameInput"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="passwordInput"
        />
        <button type="submit" className="loginButton">Login</button>
      </form>
      
    </div>
      <p>
        Dont have an account, <Link to="/register">Register Now</Link>{" "}
      </p>
          </>
  );
}

export default Login;
