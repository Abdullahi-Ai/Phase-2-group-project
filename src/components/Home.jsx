import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = ({ properties, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedInUser");

  const handleBook = (property) => {
    if (isLoggedIn) {
      navigate(`/booking/${property.id}`);
    } else {
      alert("Please log in to book this property.");
      navigate("/Login");
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Find your dream home with us</h1>

      {/* Search */}
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

              <img
                src={property.image || "/images/fallback.jpg"}
                alt={property.title}
                className="property-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/fallback.jpg";
                }}
              />

              <button onClick={() => handleBook(property)} className="book-btn">
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-about">
            <h4>About Us</h4>
            <p>
              NestQuest is a leading real estate platform connecting you to
              dream homes in prime locations. We ensure a smooth and seamless
              property booking experience for all our users.
            </p>
          </div>

          <div className="footer-contact">
            <h4>Contact Details</h4>
            <p>Email: support@nestquest.com</p>
            <p>Phone: +254 700 000 000</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/services">Services</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 NestQuest. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
