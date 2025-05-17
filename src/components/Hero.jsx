import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Compassionate Mental Health Care</h1>
        <p className="hero-subtitle">We're here to support your mental wellness journey</p>
        <a href="#contact" className="hero-cta">Schedule Appointment</a>
      </div>
    </section>
  );
};

export default Hero;