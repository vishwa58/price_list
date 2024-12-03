// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PriceCatalog from './pages/PriceCatalog';
import HistoricalData from './pages/HistoricalData';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PriceCatalog />} />
        <Route path="/historical" element={<HistoricalData />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
