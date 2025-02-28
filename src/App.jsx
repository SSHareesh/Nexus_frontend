import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import HardwareAssets from './pages/HardwareAssets/HardwareAssets';
import AddHardwareAsset from './pages/HardwareAssets/AddHardwareAsset';
import EditSoftwareAssets from './pages/SoftwareAssets/EditSoftwareAssets';
import SoftwareAssets from './pages/SoftwareAssets/SoftwareAssets';
import EditHardware from './pages/HardwareAssets/EditHardware';
import AddSoftware from './pages/SoftwareAssets/AddSoftware';
import Users from './pages/Users/Users';
import MaintenanceRecords from './pages/Maintenance/Maintenance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path='/HardwareAssets' element={<Layout><HardwareAssets /></Layout>} />
        <Route path='/AddHardwareAsset' element={<Layout><AddHardwareAsset /></Layout>} />
        <Route path='/SoftwareAssets' element={<Layout><SoftwareAssets /></Layout>} />
        <Route path='/EditHardware/:id' element={<Layout><EditHardware /></Layout>} />
        <Route path="/EditSoftwareAssets/:id" element={<Layout><EditSoftwareAssets /></Layout>} />
        <Route path='/AddSoftware' element={<Layout><AddSoftware /></Layout>} />
        <Route path='/Users' element={<Layout><Users /></Layout>} />
        <Route path='/MaintenanceRecords' element={<Layout><MaintenanceRecords /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;
