import React, { useState, useEffect } from 'react';
import './FixedButtons.css';
import '../styles/icons.css';
import PoliciesModal from './PoliciesModal';
import Chatbot from './Chatbot';

const FixedButtons = () => {
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);
  
  // Load chatbot state from sessionStorage
  const [isChatbotOpen, setIsChatbotOpen] = useState(() => {
    return sessionStorage.getItem('chatbotOpen') === 'true';
  });
  const [isChatbotMinimized, setIsChatbotMinimized] = useState(() => {
    return sessionStorage.getItem('chatbotMinimized') === 'true';
  });

  // Monitor sessionStorage changes (for when user navigates back/forward)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsChatbotOpen(sessionStorage.getItem('chatbotOpen') === 'true');
      setIsChatbotMinimized(sessionStorage.getItem('chatbotMinimized') === 'true');
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case of same-origin changes
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Save chatbot state to sessionStorage whenever it changes
  const handleChatbotOpenChange = (isOpen) => {
    setIsChatbotOpen(isOpen);
    sessionStorage.setItem('chatbotOpen', isOpen.toString());
  };

  const handleChatbotMinimizedChange = (isMinimized) => {
    setIsChatbotMinimized(isMinimized);
    sessionStorage.setItem('chatbotMinimized', isMinimized.toString());
  };

  return (
    <>
      <button 
        className="fixed-button fixed-button-help"
        onClick={() => {
          if (isChatbotOpen) {
            // If chat is open, minimize it
            handleChatbotMinimizedChange(!isChatbotMinimized);
          } else {
            // If chat is closed, open it
            handleChatbotOpenChange(true);
            handleChatbotMinimizedChange(false);
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
          handleChatbotOpenChange(false);
          handleChatbotMinimizedChange(false);
          // Clear the messages when fully closing
          sessionStorage.removeItem('chatbotMessages');
        }}
        onMinimize={() => {
          handleChatbotMinimizedChange(true);
        }}
      />
    </>
  );
};

export default FixedButtons;