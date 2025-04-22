import React from 'react';

const Home = ({ properties, searchTerm, setSearchTerm }) => {
  // Filter properties based on search term
  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h2>Welcome to Our Real Estate Website</h2>
      <p>Find your dream home with us.</p>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          className="search-input"
        />
      </div>

      {/* Display filtered properties */}
      <div className="property-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property, index) => (
            <div key={index} className="property-card">
              <h3>{property.title}</h3>
              <p>{property.location}</p>
              <p>Price: {property.price}</p>
              {property.image && (
                <img src={property.image} alt={property.title} width="200" />
              )}
            </div>
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
