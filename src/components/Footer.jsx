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
            <h3 className="footer-logo">Windsong Psychiatric</h3>
            <p className="footer-tagline">Compassionate mental health care</p>
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
              <li>Serving NC & SC</li>
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
              <li><a href="https://patientonlineportal.com/" target="_blank" rel="noopener noreferrer">Patient Portal</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Hours</h4>
            <ul className="footer-list">
              <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
              <li>Saturday: By Appointment</li>
              <li>Sunday: Closed</li>
              <li>Virtual appointments available</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Windsong Psychiatric. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="footer-divider">|</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;