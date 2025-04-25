import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Save user to localStorage
        navigate('/'); // Redirect to Home
      } else {
        setLoginError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {loginError && <p className="error">{loginError}</p>}
      </form>

      {loading && <div className="loading-spinner">Loading...</div>}
    </div>
  );
};

export default Login;
