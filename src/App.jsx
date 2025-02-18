import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import HardwareAssets from './pages/HardwareAssets/HardwareAssets';
//import SoftwareAssets from "@/pages/SoftwareAssets/SoftwareAssets.jsx";

// import SoftwareAssets from './pages/SoftwareAssets/SoftwareAssets';
import SoftwareAssets from './pages/SoftwareAssets/SotwareAssets';
import EditHardware from './pages/HardwareAssets/EditHardware';
 // <-- Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path='/HardwareAssets' element={<Layout><HardwareAssets /></Layout>} />
        <Route path='/SoftwareAssets' element={<Layout><SoftwareAssets /></Layout>} />
        <Route path='/EditHardware/:id' element={<Layout><EditHardware /></Layout>} /> 
      </Routes>
    </Router>
  );
}

export default App;
