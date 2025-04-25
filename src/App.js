import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Booking from "./components/Booking";

function App() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await fetch("http://localhost:3000/properties");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const isLoggedIn = localStorage.getItem("loggedInUser");

  return (
    <div className="App">
      <nav className="navbar">
        <h2 className="primedwell">NestQuest</h2>
        <div className="navlinks">
          <Link to="/">Home</Link>
          {!isLoggedIn && <Link to="/Login">Login</Link>}
          {!isLoggedIn && <Link to="/SignUp">SignUp</Link>}
          {isLoggedIn && (
            <button
              onClick={() => {
                localStorage.removeItem("loggedInUser");
                navigate("/Login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              properties={properties}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        {/* Make sure to match the correct route path */}
        <Route path="/booking/:id" element={<Booking properties={properties} />} />
      </Routes>
    </div>
  );
}

export default App;
