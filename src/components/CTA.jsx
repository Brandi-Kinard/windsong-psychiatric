import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import './CTA.css';
import '../styles/icons.css';

const CTA = () => {
  return (
    <section className="cta" id="cta">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Take the First Step?</h2>
        <p className="cta-description">
          We're here to help you on your journey to better mental health.
        </p>
        
        <div className="cta-options">
          <div className="cta-option">
            <Link to="/new-patient" className="cta-button cta-button-primary">
              <span className="cta-button-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Get%20started.png" alt="Sparkles" /></span>
              Get started
            </Link>
            <p className="cta-caption">New patients begin here</p>
          </div>
          
          <div className="cta-option">
            <a href="https://patientonlineportal.com/" className="cta-button cta-button-secondary" target="_blank" rel="noopener noreferrer">
              <span className="cta-button-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Patient%20Portal.png" alt="Lock" /></span>
              Patient Portal
            </a>
            <p className="cta-caption">Existing patients sign in</p>
          </div>
        </div>
        
        <div className="cta-animation">
          <DotLottieReact
            src="https://lottie.host/7947034b-320f-4bff-a596-9744921e1025/sU7ZTuiwsd.lottie"
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