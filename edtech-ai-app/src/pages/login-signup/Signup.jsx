import React, { useState } from 'react';
import './Auth.css';

export default function Signup({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      alert('Registration successful! Please login.');
      switchToLogin();
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account ✨</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign Up</button>
      </form>
      <p onClick={switchToLogin} style={{cursor: 'pointer', color: 'blue'}}>
        Already have an account? Login
      </p>
    </div>
  );
}