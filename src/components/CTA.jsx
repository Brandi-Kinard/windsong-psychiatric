import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './CTA.css';
import '../styles/icons.css';

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
              <span className="cta-button-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Get%20started.png" alt="Sparkles" /></span>
              Get started
            </a>
            <p className="cta-caption">New patients begin here</p>
          </div>
          
          <div className="cta-option">
            <a href="/patient-portal" className="cta-button cta-button-secondary">
              <span className="cta-button-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Patient%20Portal.png" alt="Lock" /></span>
              Patient Portal
            </a>
            <p className="cta-caption">Existing patients sign in</p>
          </div>
        </div>
        
        <div className="cta-animation">
          <DotLottieReact
            src="https://lottie.host/67d8b0a5-8ee0-4a8f-bf42-33a157fd606e/OdFg3dNfIP.lottie"
            loop
            autoplay
            className="tree-animation"
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;