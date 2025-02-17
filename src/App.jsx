import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import HardwareAssets from './pages/HardwareAssets/HardwareAssets';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,  // Opt-in to React v7 transition behavior
      }}
    >
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/HardwareAssets" element={<Layout><HardwareAssets /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
