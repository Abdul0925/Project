import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
function Home() {
  const location = useLocation();
  const username = location.state?.username;

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputs((values) => ({ ...values, username: username }));
    console.log(inputs);
    axios
      .post("http://localhost/my-web-app/addpost.php", inputs)
      .then(function (response) {
        console.log("Hello");
        console.log("Status:", response.data.status);
      });
  };

  return (
    <>
      {username ? (
        <div>
          <div>
            <Link to="/">Logut</Link>
            <h2>Home</h2>
            <p>Welcome {username}! You can perform CRUD operations here.</p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                type="text"
                placeholder="Enter Title"
                onChange={handleChange}
                className="titleInput"
              />
              <input
                name="description"
                type="text"
                placeholder="Enter Desciption"
                onChange={handleChange}
                className="descriptionInput"
              />

              <button className="addButton">Add Notes</button>
            </form>
          </div>
          <div className=""></div>
        </div>
      ) : (
        <div>Please login</div>
      )}
    </>
  );
}

export default Home;
