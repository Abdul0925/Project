import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
function Home() {
  const location = useLocation();
  const username = location.state?.username;
  
  const [inputs, setInputs] = useState({});
  
  const [posts, setPosts] = useState([]);
  // const [postsList, setPostsList] = useState(posts);

  const [editPostId, setEditPostId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  useEffect(() => {
    getPost();
  }, []);


  const handleUpdate = async (postId) => {
    try {
      await axios.put(`http://localhost/my-web-app/updatePost.php`, {
        id: postId,
        ...editForm
      });

     
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, ...editForm } : post
      ));

      
      setEditPostId(null);
      setEditForm({ title: '', description: '' });
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update the post.');
    }
  };


  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

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
      alert("Post Published successfully");
      getPost();
  };

  const handleDelete = async (postId) => {
    try {
    
      await axios.delete(`http://localhost/my-web-app/deletePost.php`, {
        data: { id: postId },
      });

    
      setPosts(posts.filter(post => post.id !== postId));
      alert('Post delete successfully');
      getPost();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post.');
    }
  };

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
          .filter(post => post.username === username)
          .map(post => (
            <div key={post.id} className="post-container">
              {editPostId === post.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Edit Title"
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    placeholder="Edit Description"
                  />
                  <button onClick={() => handleUpdate(post.id)}>Save</button>
                  <button onClick={() => setEditPostId(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <button onClick={() => setEditPostId(post.id)}>Edit</button>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </>
              )}
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
