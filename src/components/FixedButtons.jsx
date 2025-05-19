import React, { useState } from 'react';
import './FixedButtons.css';
import '../styles/icons.css';
import PoliciesModal from './PoliciesModal';

const FixedButtons = () => {
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);

  return (
    <>
      <button 
        className="fixed-button fixed-button-help"
        onClick={() => alert('Help functionality coming soon!')}
        aria-label="Get help"
      >
        <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Help.png" alt="Chat bubble" /> Help
      </button>
      
      <button 
        className="fixed-button fixed-button-policies"
        onClick={() => setIsPoliciesModalOpen(true)}
        aria-label="View policies and fees"
      >
        <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/branch.png" alt="Branch" /> Policies & fees
      </button>
      
      <PoliciesModal 
        isOpen={isPoliciesModalOpen} 
        onClose={() => setIsPoliciesModalOpen(false)} 
      />
    </>
  );
};

export default FixedButtons;