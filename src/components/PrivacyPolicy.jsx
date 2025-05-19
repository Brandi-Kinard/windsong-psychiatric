import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>Privacy policy</h1>
          <p className="hero-subtitle">Your privacy is paramount. We adhere to all HIPAA regulations to ensure your personal and health information remains confidential.</p>
        </div>
      </div>

      <div className="privacy-content">
        <div className="privacy-container">
          <section className="policy-section">
            <h2>Information we collect</h2>
            <ul>
              <li><strong>Personal information:</strong> Name, contact details, and health information necessary for treatment</li>
              <li><strong>Technical information:</strong> IP addresses, browser types, and website usage statistics</li>
              <li><strong>Demographic information:</strong> Age, gender, and location to better understand our patient population</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>How we protect your information</h2>
            <ul>
              <li>Encrypted data transmission using SSL protocols</li>
              <li>Secure servers with restricted access</li>
              <li>Regular security audits and updates</li>
              <li>Ongoing training on privacy and security best practices</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Request corrections to your records</li>
              <li>Opt-out of certain communications</li>
              <li>Request restrictions on how we use your information</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Third-party disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul>
              <li>When necessary for treatment coordination with other healthcare providers</li>
              <li>For payment processing and insurance claims</li>
              <li>When required by law or court order</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <div className="back-button-container">
            <a href="/" className="back-to-home">Back to home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;