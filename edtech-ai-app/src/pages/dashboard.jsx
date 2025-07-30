import react from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;