import React from "react";
import { Link, BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./pages/NotFound";
import history from "./history";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div>
        {/* <h1>Hello</h1> */}
        <div>
          <h1>Welcome to My Web App</h1>
          {/* <Link to="/register">Register</Link> */}
          <br />
          {/* <Link to="/login">Login</Link> */}
        </div>
        {/* <Routes>
          <Route path="/" exact component={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard">
            {isAuthenticated ? <Home /> : <Link to="/login" />}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes> */}
        <Routes>
          {/* <Route path="/" element={<Home />} exact></Route> */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>

          {/* {isAuthenticated ? <Home /> : <Route to="/login" />} */}

          {/* <Route path="/room/:userId/:roomCode" element={<User />}></Route> */}
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
