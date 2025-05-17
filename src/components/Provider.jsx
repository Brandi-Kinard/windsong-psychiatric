import React from 'react';
import './Provider.css';

const Provider = () => {
  return (
    <section className="provider" id="provider">
      <div className="provider-container">
        <div className="provider-content">
          <div className="provider-info">
            <h2 className="provider-title">A provider who gets you</h2>
            
            <ul className="provider-features">
              <li className="provider-feature">
                <span className="checkmark">✓</span>
                Board-certified expertise
              </li>
              <li className="provider-feature">
                <span className="checkmark">✓</span>
                Evidence-based treatment
              </li>
              <li className="provider-feature">
                <span className="checkmark">✓</span>
                Compassionate care
              </li>
            </ul>
            
            <p className="provider-description">
              Felicia Davis brings over a decade of experience in psychiatric care, 
              combining cutting-edge medical knowledge with a warm, personal approach. 
              She believes in treating each patient as a unique individual, not just a diagnosis.
            </p>
            
            <a href="/meet-felicia-davis" className="provider-link">
              Meet Felicia Davis →
            </a>
          </div>
          
          <div className="provider-image">
            <div className="image-background"></div>
            <div className="image-placeholder">
              <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/felicia-davis.avif" alt="Felicia Davis, Psychiatric Provider" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Provider;