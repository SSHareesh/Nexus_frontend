import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
// import NavBar from './components/layout/Navbar';
import HardwareAssets from './pages/HardwareAssets/HardwareAssets';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path='/HardwareAssets' element={<Layout><HardwareAssets /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;