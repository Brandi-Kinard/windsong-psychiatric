import React from 'react';
import './FixedButtons.css';

const FixedButtons = () => {
  return (
    <>
      <button 
        className="fixed-button fixed-button-help"
        onClick={() => alert('Help functionality coming soon!')}
        aria-label="Get help"
      >
        💬 Help
      </button>
      
      <button 
        className="fixed-button fixed-button-policies"
        onClick={() => window.location.href = '/policies'}
        aria-label="View policies"
      >
        📋 Policies
      </button>
    </>
  );
};

export default FixedButtons;