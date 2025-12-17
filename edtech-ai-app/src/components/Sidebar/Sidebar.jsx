import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: '📊 Dashboard', path: '/dashboard' },
    { label: '🎯 AI Roadmap Maker', path: '/roadmap' },
    { label: '🃏 Flashcards', path: '/flashcards' },
    { label: '⏰ Focus Timer', path: '/timer' },
    { label: '📝 Smart Notes', path: '/notes' },
    { label: '⚙️ Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="sidebar">
      <h2>Preppal</h2>
      {user && <p style={{ fontSize: '0.9em', color: '#888', marginBottom: '1rem' }}>Welcome, {user.username}!</p>}
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}
      <button onClick={handleLogout} style={{
        marginTop: 'auto',
        padding: '0.75rem 1rem',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        fontSize: '0.95em',
        width: '100%'
      }}>
        🚪 Logout
      </button>
    </div>
  );
};

export default Sidebar;
