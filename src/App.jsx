import React from 'react';
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
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Insurance />
      <Benefits />
      <Stats />
      <Provider />
      <Services />
      <Locations />
      <CTA />
      <Footer />
      <FixedButtons />
    </div>
  );
}

export default App;