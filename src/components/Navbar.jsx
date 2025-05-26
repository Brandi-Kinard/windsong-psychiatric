import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/meet-felicia-davis', text: 'About' },
    { to: '/services', text: 'Services' },
    { to: '/patient-forms', text: 'Patient Forms' }
  ];

  const isActive = (to) => {
    if (to === '/') {
      return location.pathname === '/';
    }
    return location.pathname === to;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <DotLottieReact
            src="https://lottie.host/19b9ab05-06a8-4f8a-bda3-2ea9c9390a67/kAmZcU6xAF.lottie"
            loop
            autoplay
            className="nav-logo-lottie"
          />
          <span className="nav-logo-primary">Windsong</span>
          <span className="nav-logo-secondary">Psychiatric Associates</span>
        </Link>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.to} 
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </Link>
          ))}
          <div className="nav-portal-container">
            <a 
              href="https://patientonlineportal.com/" 
              className="nav-link nav-link-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Patient Portal
            </a>
            <span className="nav-portal-caption">Existing patients sign in</span>
          </div>
        </div>
        
        <div className="nav-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="nav-menu-bar"></span>
          <span className="nav-menu-bar"></span>
          <span className="nav-menu-bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;