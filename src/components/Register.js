import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [inputs, setInputs] = useState({});

  const Navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/my-web-app/register.php", inputs)
      .then(function (response) {
        console.log(response.data);
        Navigate("/");
      });
  };

  return (
    <div className="registerpage">

      <form onSubmit={handleRegister} className="registerform">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="usernameInput"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="emailInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="passwordInput"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          className="passwordInput"
          onChange={(e) => setCPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">Register</button>
      </form>
    </div>
  );
}

export default Register;
