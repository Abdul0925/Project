import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
function Home() {
  const location = useLocation();
  const username = location.state?.username;

  const [inputs, setInputs] = useState({});

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  function getPost() {
    axios
      .get("http://localhost/my-web-app/login.php?username=$username")
      .then(function (response) {
        console.log(response.data);
        setPosts(response.data);
        console.log(posts);
      });
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value, username: username }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setInputs((values) => ({ ...values, username: username }));
    console.log(inputs);
    axios
      .post("http://localhost/my-web-app/addpost.php", inputs)
      .then(function (response) {
        console.log("Hello");
        console.log("Status:", response.data.status);
      });
      getPost();
    alert("Post Published successfully");
  };


  function handleDelete(){

  }
  return (
    <>
      {username ? (
        <div>
          <div>
            <Link to="/">Logut</Link>
            <h2>Home</h2>
            <p>Welcome {username}!</p>
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

          <h2>All Blogs</h2>

          {posts.length > 0 ? (
            posts
              .filter((post) => post.username === username) // Filter posts based on username
              .map((post) => (
                <div key={post.id} className="post-container">
                    
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <button>Update</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      ) : (
        <div>Please login</div>
      )}
    </>
  );
}

export default Home;
