import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Benefits from './components/Benefits';
import Provider from './components/Provider';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
      <Contact />
      <Footer />
    </div>
  );
}

export default App;