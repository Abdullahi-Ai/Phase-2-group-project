import React, { useEffect, useState } from "react";

const Buy = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await fetch("http://localhost:3001/properties");
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Buy Properties</h1>
      <div className="property-list">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div key={index} className="property-card">
              <h2>{property.title}</h2>
              <p>{property.location}</p>
              <p>Price: {property.price}</p>
              {property.image && (
                <img src={property.image} alt={property.title} width="200" />
              )}
            </div>
          ))
        ) : (
          <p>Loading properties...</p>
        )}
      </div>
    </div>
  );
};

export default Buy;
