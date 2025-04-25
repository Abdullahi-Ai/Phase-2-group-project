import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpError('');
    setSignUpSuccess('');

    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        setSignUpError("User with this email already exists.");
        return;
      }
      const newUser = { email, password };
      const postResponse = await fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!postResponse.ok) {
        throw new Error("Failed to sign up user");
      }

      const newUserData = await postResponse.json();
      setSignUpSuccess("Sign-up successful!");
      console.log("New user:", newUserData);
    } catch (error) {
      console.error("Sign-up error:", error);
      setSignUpError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignUp} className="sign-up-form">
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

        <button type="submit">Sign Up</button>

        {signUpError && <p className="error">{signUpError}</p>}
        {signUpSuccess && <p className="success">{signUpSuccess}</p>}
      </form>
    </div>
  );
};

export default SignUp;
