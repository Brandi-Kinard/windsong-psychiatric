import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/meet-felicia-davis', text: 'About' },
    { to: '/services', text: 'Services' }
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
          <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/tree-bw.png" alt="Windsong Psychiatric" />
          <span className="nav-logo-primary">Windsong</span>
          <span className="nav-logo-secondary">Family & Psychiatric Associates, PLLC</span>
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