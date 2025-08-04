import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Settings = () => {
  return (
    <div className="settings">
      <ParticleBackground />
      <Sidebar />
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;