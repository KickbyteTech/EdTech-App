import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    
    if (result.status === 'ok') {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await register(username, email, password);
    
    if (result.status === 'ok') {
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
      setIsLogin(true);
      alert('Registration successful! Please login.');
    } else {
      setError(result.error || 'Registration failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <>
            <h2>Welcome Back 👋</h2>
            <form onSubmit={handleLoginSubmit}>
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
              {error && <div className="error-message">{error}</div>}
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p>
              Don't have an account?{' '}
              <span onClick={() => { setIsLogin(false); setError(""); }} style={{ cursor: 'pointer', color: '#4f46e5', fontWeight: 'bold' }}>
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Create Account ✨</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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
              {error && <div className="error-message">{error}</div>}
              <button type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <p>
              Already have an account?{' '}
              <span onClick={() => { setIsLogin(true); setError(""); }} style={{ cursor: 'pointer', color: '#4f46e5', fontWeight: 'bold' }}>
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
