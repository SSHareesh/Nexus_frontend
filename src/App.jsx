import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import HardwareAssets from './pages/HardwareAssets/HardwareAssets';
//import SoftwareAssets from "@/pages/SoftwareAssets/SoftwareAssets.jsx";
import EditSoftwareAssets from './pages/SoftwareAssets/EditSoftwareAssets';
import SoftwareAssets from './pages/SoftwareAssets/SotwareAssets';
import EditHardware from './pages/EditHardware/EditHardware';
import AddSoftware from './pages/SoftwareAssets/AddSoftware';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path='/HardwareAssets' element={<Layout><HardwareAssets /></Layout>} />
        <Route path='/SoftwareAssets' element={<Layout><SoftwareAssets /></Layout>} />
        <Route path='/EditHardware/:id' element={<Layout><EditHardware /></Layout>} />
        <Route path="/EditSoftwareAssets/:id" element={<Layout><EditSoftwareAssets /></Layout>} />
        <Route path='/AddSoftware' element={<Layout><AddSoftware /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
