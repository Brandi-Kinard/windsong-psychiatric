import React, { useState } from 'react';
import './FixedButtons.css';
import '../styles/icons.css';
import PoliciesModal from './PoliciesModal';
import Chatbot from './Chatbot';

const FixedButtons = () => {
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotMinimized, setIsChatbotMinimized] = useState(false);

  return (
    <>
      <button 
        className="fixed-button fixed-button-help"
        onClick={() => {
          if (isChatbotOpen) {
            // If chat is open, minimize it
            setIsChatbotMinimized(!isChatbotMinimized);
          } else {
            // If chat is closed, open it
            setIsChatbotOpen(true);
            setIsChatbotMinimized(false);
          }
        }}
        aria-label="Get help"
      >
        <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Help.png" alt="Chat bubble" /> 
        Help
      </button>
      
      <button 
        className="fixed-button fixed-button-policies"
        onClick={() => setIsPoliciesModalOpen(true)}
        aria-label="View policies and fees"
      >
        <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/branch.png" alt="Branch" /> Policies & Fees
      </button>
      
      <PoliciesModal 
        isOpen={isPoliciesModalOpen} 
        onClose={() => setIsPoliciesModalOpen(false)} 
      />
      
      <Chatbot 
        isOpen={isChatbotOpen} 
        isMinimized={isChatbotMinimized}
        onClose={() => {
          setIsChatbotOpen(false);
          setIsChatbotMinimized(false);
        }}
        onMinimize={() => {
          setIsChatbotMinimized(true);
        }}
      />
    </>
  );
};

export default FixedButtons;