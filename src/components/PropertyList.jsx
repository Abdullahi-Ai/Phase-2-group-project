
import React from 'react';
function PropertyList({ properties }) {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property">
          <h2>{property.title}</h2>
          <p>{property.location}</p>
          <p>{property.price}</p>
          <p>{property.status}</p>
          <p>{property.type}</p>
          <p>{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms</p>
          <img
            src={property.image} 
            alt={property.title} 
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
}