import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Insurance from './components/Insurance';
import Stats from './components/Stats';
import Benefits from './components/Benefits';
import Provider from './components/Provider';
import Services from './components/Services';
import Locations from './components/Locations';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FixedButtons from './components/FixedButtons';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Insurance />
      <Benefits />
      <Stats />
      <Provider />
      <Services />
      <Locations />
      <CTA />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meet-felicia-davis" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
        <Footer />
        <FixedButtons />
      </div>
    </Router>
  );
}

export default App;