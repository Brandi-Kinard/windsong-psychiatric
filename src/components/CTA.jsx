import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta" id="cta">
      <div className="cta-container">
        <h2 className="cta-title">Ready to take the first step?</h2>
        <p className="cta-description">
          We're here to help you on your journey to better mental health.
        </p>
        
        <div className="cta-options">
          <div className="cta-option">
            <a href="/new-patient" className="cta-button cta-button-primary">
              <span className="cta-button-icon">✨</span>
              Get started
            </a>
            <p className="cta-caption">New patients begin here</p>
          </div>
          
          <div className="cta-option">
            <a href="/patient-portal" className="cta-button cta-button-secondary">
              <span className="cta-button-icon">🔐</span>
              Patient Portal
            </a>
            <p className="cta-caption">Existing patients sign in</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;