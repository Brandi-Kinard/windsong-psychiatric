import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#services', text: 'Services' },
    { href: '#contact', text: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/tree-bw.png" alt="Windsong Psychiatric" />
          <span className="nav-logo-primary">Windsong</span>
          <span className="nav-logo-secondary">Family & Psychiatric Associates, PLLC</span>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </a>
          ))}
          <a 
            href="/patient-portal" 
            className="nav-link nav-link-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            Patient Portal
          </a>
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