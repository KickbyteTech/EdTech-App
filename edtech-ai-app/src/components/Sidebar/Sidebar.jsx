import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { label: '📊 Dashboard', path: '/dashboard' },
    { label: '🎯 AI Roadmap Maker', path: '/roadmap' },
    { label: '🃏 Flashcards', path: '/flashcards' },
    { label: '⏰ Focus Timer', path: '/timer' },
    { label: '📝 Smart Notes', path: '/notes' },
    { label: '⚙️ Settings', path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <h2>Preppal</h2>
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
    </div>
  );
};

export default Sidebar;
