// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional: Add styling if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Real Estate</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
