import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Compassionate Mental Health Care</h1>
          <p className="hero-subtitle">Windsong Psychiatric Associates is here to support your mental wellness journey</p>
          <div className="hero-cta-wrapper">
            <Link to="/new-patient" className="hero-cta">
              <span className="hero-cta-icon">
                <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Get%20started.png" alt="Sparkles" />
              </span>
              Get started
            </Link>
            <p className="hero-cta-caption">New patients begin here</p>
          </div>
        </div>
        <div className="hero-illustration">
          <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/uodated-peep-banner.png" alt="Mental health support illustration" />
          <div className="hero-illustration-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;