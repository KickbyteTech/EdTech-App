import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <h1>AI Settings</h1>
    </div>
  );
};

export default Settings;