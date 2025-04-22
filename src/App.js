import React, { useState, useEffect } from "react";
import "./App.css"
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state

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
      <h1>Real Estate</h1>
      
      {/* Render the Home component and pass properties and searchTerm */}
      <Home 
        properties={properties}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Render other components */}
      <div className="components"> 
        <About /> {/* This will display your home page content */}
        <Services /> {/* This will display your home Services content */}
        <Contact /> {/* This will display your home Services content */}
      </div>
    </div>
  );
}

export default App;