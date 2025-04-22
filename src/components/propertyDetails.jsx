import React from "react";
import { useParams } from "react-router-dom";

function PropertyDetails({ properties }) {
  const { id } = useParams(); 
  const property = properties.find((property) => property.id === parseInt(id));

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="property-details">
      <h1>{property.name}</h1>
      <img
        src={property.imageUrl}
        alt={property.name}
        className="property-detail-image"
      />
      <div className="property-info">
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> ${property.price}</p>
        <p><strong>Description:</strong> {property.description}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Size:</strong> {property.size} sq ft</p>
      </div>
    </div>
  );
}

export default PropertyDetails;
