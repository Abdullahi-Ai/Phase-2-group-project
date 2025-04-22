import React from "react";

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img src={property.imageUrl} alt={property.name} />
      <h3>{property.name}</h3>
      <p>{property.description}</p>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
    </div>
  );
}

export default PropertyCard;
