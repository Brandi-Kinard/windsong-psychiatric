import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Compassionate Mental Health Care</h1>
          <p className="hero-subtitle">We're here to support your mental wellness journey</p>
          <a href="/new-patient" className="hero-cta">Get Started</a>
        </div>
        <div className="hero-illustration">
          <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/final-people-banner.png" alt="Mental health support illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;