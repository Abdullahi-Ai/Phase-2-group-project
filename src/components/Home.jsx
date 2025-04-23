import React from 'react';

const Home = ({ properties, searchTerm, setSearchTerm }) => {
  console.log("Fetched properties:", properties);
  const filteredProperties = properties.filter(
    (property) =>
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="home-container">
      <h1>Find your dream home with us.</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Property List */}
      <div className="property-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <h3>{property.title}</h3>
              <p>{property.location}</p>
              <p>Price: KES {property.price}</p>
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.title}
                  width="200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/fallback.jpg"; 
                  }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;