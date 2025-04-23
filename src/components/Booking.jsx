import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Booking = ({ properties }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const selectedProperty = properties.find((p) => p.id.toString() === id);
    setProperty(selectedProperty);
  }, [id, properties]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(
      `Booking Confirmed for "${property.title}"\nLocation: ${property.location}\nPrice: KES ${property.price}\nEmail: ${email}\nPhone: ${phone}`
    );
  };

  if (!property) return <p>Loading property...</p>;

  return (
    <div className="booking-form-container">
      <h2>Booking for: {property.title}</h2>
      <img
        src={property.image || "/images/fallback.jpg"}
        alt={property.title}
        className="booking-property-image"
      />
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> KES {property.price}</p>

      <form onSubmit={handleBookingSubmit} className="booking-form">
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Booking;
