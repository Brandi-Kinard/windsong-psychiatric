import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Benefits from './components/Benefits';
import Provider from './components/Provider';
import Services from './components/Services';
import Locations from './components/Locations';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FixedButtons from './components/FixedButtons';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Stats />
      <Benefits />
      <Provider />
      <Services />
      <Locations />
      <CTA />
      <Contact />
      <Footer />
      <FixedButtons />
    </div>
  );
}

export default App;