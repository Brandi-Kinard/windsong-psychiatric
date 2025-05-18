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
import './App.css';

function Home() {
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meet-felicia-davis" element={<About />} />
        </Routes>
        <Footer />
        <FixedButtons />
      </div>
    </Router>
  );
}

export default App;