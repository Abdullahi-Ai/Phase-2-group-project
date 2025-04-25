import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = ({ properties, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedInUser");

  const handleBook = async (property) => {
    if (!isLoggedIn) {
      alert("Please log in to book this property.");
      navigate("/Login");
      return;
    }
    if (property.booked) {
      alert("Sorry, this property is already booked.");
      return;
    }

    try {
      await fetch(`http://localhost:3000/properties/${property.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booked: true }),
      });
      navigate(`/booking/${property.id}`);
    } catch (error) {
      console.error("Error booking property:", error);
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

              <button
                onClick={() => handleBook(property)}
                className="book-btn"
                disabled={property.booked} 
              >
                {property.booked ? "Already Booked" : "Book Now"}
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
        <p>Our main branch office</p>
        <iframe 
          title="Main office location on Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.749647552659!2d36.8385488759022!3d-1.3261514986612715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1150747fb5e7%3A0xf871ccee8221c8ff!2sReal%20Estate%20-%20South%20C!5e0!3m2!1sen!2ske!4v1745481228186!5m2!1sen!2ske" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="footer-bottom">
          <p>&copy; 2025 NestQuest. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
