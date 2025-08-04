import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ParticleBackground from '../components/ParticleBackground';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ParticleBackground />
      <Sidebar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;