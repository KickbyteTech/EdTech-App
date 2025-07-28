import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // optional

const Sidebar = () => {
  const navItems = [
    { label: '📊 Dashboard', path: '/dashboard' },
    { label: '⏰ Focus Timer', path: '/timer' },
    { label: '🤖 AI Summarizer', path: '/summarizer' },
    { label: '🃏 Flashcards', path: '/flashcards' },
    { label: '📝 Smart Notes', path: '/notes' },
    { label: '📈 Progress', path: '/progress' },
    { label: '👥 Study Groups', path: '/groups' },
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
