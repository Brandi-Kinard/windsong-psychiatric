import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Windsong Psychiatric Associates</h3>
            <p className="footer-tagline">Compassionate Mental Health Care</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list">
              <li>
                <a href="tel:9805852019">(980) 585-2019</a>
              </li>
              <li>
                <a href="mailto:contact@windsongpsychiatric.com">contact@windsongpsychiatric.com</a>
              </li>
              <li>Fax: (980) 585-2016</li>
              <li>Serving NC, SC, GA, VA, MD, DC, FL</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/meet-felicia-davis">Meet Felicia Davis</Link></li>
              <li>
                {location.pathname === '/' ? (
                  <a href="#locations">Locations</a>
                ) : (
                  <Link to="/#locations" state={{ fromOtherPage: true }}>Locations</Link>
                )}
              </li>
              <li><Link to="/helpful-resources">Helpful Resources</Link></li>
              <li><Link to="/patient-forms">Patient Forms</Link></li>
              <li><a href="https://patientonlineportal.com/" target="_blank" rel="noopener noreferrer">Patient Portal</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Hours</h4>
            <ul className="footer-list">
              <li>Monday–Thursday: 8:00 AM – 7:00 PM</li>
              <li>Friday–Sunday: Closed</li>
              <li>Virtual appointments available</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Copyright &copy; {currentYear} Windsong Family & Psychiatric Associates, PLLC</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-divider">|</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;