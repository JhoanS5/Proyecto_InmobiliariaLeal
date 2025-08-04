import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyCatalog from './components/PropertyCatalog';
import PropertyDetail from './components/PropertyDetail';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<PropertyCatalog />} />
          <Route path="/propiedades/:id" element={<PropertyDetail />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;