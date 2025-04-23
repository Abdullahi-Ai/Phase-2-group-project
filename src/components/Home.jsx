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
    </div>
  );
};

export default Home;
