import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta" id="cta">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Take the First Step?</h2>
        <p className="cta-description">
          We're here to help you on your journey to better mental health. 
          Choose the option that best fits your needs.
        </p>
        
        <div className="cta-buttons">
          <a href="tel:9805852019" className="cta-button cta-button-primary">
            <span className="cta-button-icon">📞</span>
            Call 980-585-2019
          </a>
          
          <a href="/patient-portal" className="cta-button cta-button-secondary">
            <span className="cta-button-icon">🔐</span>
            Access Patient Portal
          </a>
        </div>
        
        <p className="cta-note">New patients: Call for initial consultation</p>
      </div>
    </section>
  );
};

export default CTA;