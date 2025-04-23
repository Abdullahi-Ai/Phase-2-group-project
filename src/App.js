import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProperties = async () => {
    try {
      const response = await fetch("http://localhost:3001/properties");
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

  return (
    <div className="App">
      <nav className="navbar">
        <h2 className="primedwell">NestQuest</h2>
        <div className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/Login">Login</Link>
          <Link to="/SignUp">SignUp</Link>
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
      </Routes>
    </div>
  );
}

export default App;