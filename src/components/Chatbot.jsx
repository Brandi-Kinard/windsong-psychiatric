import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = ({ isOpen, isMinimized, onClose, onMinimize }) => {
  const [messages, setMessages] = useState(() => {
    // Load saved messages from sessionStorage
    const saved = sessionStorage.getItem('chatbotMessages');
    if (saved) {
      return JSON.parse(saved).map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [{
      type: 'bot',
      text: 'Hi! I\'m here to help you with questions about Windsong Psychiatric Associates. How can I assist you today?',
      timestamp: new Date()
    }];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const lastBotMessageRef = useRef(null);

  const quickQuestions = [
    "What insurance do you accept?",
    "How do I schedule an appointment?",
    "What services do you offer?",
    "Where are you located?",
    "Do you offer telehealth?",
    "What are your hours?"
  ];

  const responses = {
    insurance: {
      keywords: ['insurance', 'accept', 'coverage', 'plan', 'medicaid', 'medicare', 'blue cross', 'aetna', 'cigna', 'united'],
      response: 'We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, Medicare, and Medicaid. For a complete list of accepted insurance, please visit our <a href="/insurance" target="_blank">Insurance page</a> or call us at (980) 585-2019.',
      type: 'info'
    },
    appointment: {
      keywords: ['appointment', 'schedule', 'book', 'available', 'new patient'],
      response: 'To schedule an appointment, you can:\n\n1. Call us at (980) 585-2019\n2. Fill out our <a href="/new-patient" target="_blank">New Patient form</a>\n3. Have your provider send us a referral\n\nWe typically see new patients within 1-2 weeks.',
      type: 'action'
    },
    getStarted: {
      keywords: ['get started', 'begin', 'start', 'first step', 'how do i', 'what do i do'],
      response: 'I\'d be happy to help you get started! Here\'s what you can do:\n\n1. Fill out our <a href="/new-patient" target="_blank">New Patient Inquiry Form</a> - it only takes a few minutes\n2. Or call us directly at (980) 585-2019\n3. We\'ll contact you within 1-2 business days to schedule your first appointment\n\nWould you like me to guide you to the new patient form?',
      type: 'action',
      followUp: {
        text: 'Click below to start your new patient inquiry:',
        button: { text: 'Start New Patient Form', link: '/new-patient' }
      }
    },
    services: {
      keywords: ['services', 'offer', 'treatment', 'therapy', 'medication', 'help with'],
      response: 'We offer comprehensive psychiatric services including:\n\n• Psychiatric evaluations\n• Medication management\n• Treatment for depression, anxiety, ADHD, bipolar disorder, and more\n• Both in-person and telehealth appointments\n• Specialized care for adults and adolescents\n\nVisit our <a href="/services" target="_blank">Services page</a> for more details.',
      type: 'info'
    },
    ageQuestions: {
      keywords: ['age', 'years old', 'how old', 'senior', 'elderly', 'child', 'teen', 'adult'],
      response: (input) => {
        const ageMatch = input.match(/(\d+)\s*years?\s*old/i);
        if (ageMatch) {
          const age = parseInt(ageMatch[1]);
          if (age < 13) {
            return 'We specialize in treating adolescents (13+) and adults. For children under 13, we recommend consulting with a child psychiatrist. Please call us at (980) 585-2019 for referral recommendations.';
          } else if (age >= 13 && age < 18) {
            return 'Yes! We provide specialized psychiatric care for adolescents. Our services include evaluation, medication management, and treatment for anxiety, depression, ADHD, and other mental health conditions common in teens. Call (980) 585-2019 to schedule an appointment.';
          } else if (age >= 55) {
            return 'Absolutely! We provide comprehensive psychiatric care for adults of all ages, including those 55 and older. We understand the unique mental health needs that can arise with aging, including mood changes, anxiety, cognitive concerns, and medication management. Call (980) 585-2019 to schedule your appointment.';
          } else {
            return 'Yes! We provide comprehensive psychiatric services for adults. Whether you\'re dealing with anxiety, depression, ADHD, or other mental health concerns, we\'re here to help. Call (980) 585-2019 to schedule an appointment.';
          }
        }
        // Handle general age-related questions
        if (input.includes('senior') || input.includes('elderly')) {
          return 'Yes, we provide psychiatric care for seniors and older adults. We understand the unique mental health needs that come with aging and offer compassionate, specialized care. Call (980) 585-2019 to learn more.';
        }
        return 'We provide psychiatric services for adolescents (13+) and adults of all ages. For specific age-related questions, please call us at (980) 585-2019.';
      },
      type: 'info'
    },
    location: {
      keywords: ['location', 'located', 'address', 'where', 'directions', 'fort mill', 'huntersville', 'baltimore'],
      response: 'We have three convenient locations:\n\n📍 <strong>Fort Mill, SC:</strong> 975 Market Street, Suite 201-F, Fort Mill, SC 29708\n\n📍 <strong>Huntersville, NC:</strong> 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078\n\n📍 <strong>Baltimore, MD:</strong> 33 S. Gay Street, Suite 202, Baltimore, MD 21202\n\nAll offices offer ample parking and easy access. <a href="#" onclick="event.preventDefault(); document.getElementById(\'locations\')?.scrollIntoView({ behavior: \'smooth\' }); return false;">View directions and maps</a> below on this page.',
      type: 'info'
    },
    telehealth: {
      keywords: ['telehealth', 'virtual', 'online', 'video', 'remote'],
      response: 'Yes! We offer telehealth appointments for established patients. This allows you to meet with your provider from the comfort of your home. Telehealth visits are covered by most insurance plans. Ask about this option when scheduling.',
      type: 'info'
    },
    hours: {
      keywords: ['hours', 'open', 'time', 'when', 'business hours'],
      response: 'Our office hours are Monday through Friday. Specific appointment times vary by provider. We also offer some evening appointments for your convenience. Please call (980) 585-2019 to check availability.',
      type: 'info'
    },
    provider: {
      keywords: ['felicia', 'davis', 'provider', 'doctor', 'practitioner', 'fnp', 'psychiatrist', 'nurse', 'name'],
      response: 'Felicia Davis, FNP-C is our psychiatric nurse practitioner. She has extensive experience in mental health care and is dedicated to providing compassionate, personalized treatment. Learn more about her background and approach on our <a href="/meet-felicia-davis" target="_blank">Meet Felicia Davis</a> page.',
      type: 'info'
    },
    greeting: {
      keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'my name is'],
      response: (input) => {
        const nameMatch = input.match(/my name is (\w+)/i);
        if (nameMatch) {
          return `Nice to meet you, ${nameMatch[1]}! I'm here to help you learn about Windsong Psychiatric Associates and our services. What brings you here today?`;
        }
        return 'Hello! Welcome to Windsong Psychiatric Associates. I\'m here to help answer your questions about our services, scheduling, insurance, and more. What can I help you with today?';
      },
      type: 'greeting'
    },
    crisis: {
      keywords: ['crisis', 'emergency', 'suicide', 'hurt', 'kill', 'die', 'hospital', 'urgent', '988'],
      response: '⚠️ If you\'re experiencing a mental health crisis:\n\n🆘 Call 988 (Suicide & Crisis Lifeline)\n🚨 Call 911 for immediate emergency\n🏥 Go to your nearest emergency room\n\nOther crisis resources:\n• Crisis Text Line: Text HOME to 741741\n• SAMHSA Helpline: 1-800-662-4357\n\nYour safety is our priority. Please reach out for help immediately.',
      type: 'crisis'
    },
    conditions: {
      keywords: ['depression', 'anxiety', 'adhd', 'bipolar', 'panic', 'ptsd', 'ocd', 'eating disorder', 'substance', 'addiction'],
      response: (input) => {
        const lower = input.toLowerCase();
        if (lower.includes('depression')) {
          return 'We provide comprehensive treatment for depression, including evaluation, medication management, and ongoing support. Our approach is personalized to each patient\'s needs. <a href="/services" target="_blank">Learn more about our services</a> or call (980) 585-2019 to schedule an evaluation.';
        } else if (lower.includes('anxiety') || lower.includes('panic')) {
          return 'We specialize in treating anxiety disorders, including generalized anxiety, panic disorder, and social anxiety. Treatment may include medication management and therapy referrals. <a href="/services" target="_blank">Learn more</a> or call (980) 585-2019 to schedule an appointment.';
        } else if (lower.includes('adhd')) {
          return 'We offer comprehensive ADHD evaluation and treatment for both adolescents and adults. This includes thorough assessment, medication management, and strategies for managing symptoms. Call (980) 585-2019 to schedule an ADHD evaluation.';
        } else if (lower.includes('bipolar')) {
          return 'We provide specialized care for bipolar disorder, including mood stabilization, medication management, and ongoing monitoring. Our experienced team understands the complexity of bipolar disorder. Call (980) 585-2019 to learn more.';
        }
        return 'We treat a wide range of mental health conditions including depression, anxiety, ADHD, bipolar disorder, PTSD, and more. Visit our <a href="/services" target="_blank">services page</a> or call (980) 585-2019 to discuss your specific needs.';
      },
      type: 'info'
    },
    forms: {
      keywords: ['form', 'paperwork', 'documents', 'patient form', 'intake'],
      response: 'We have several patient forms available online:\n\n• New Patient Inquiry Form\n• Consent for Treatment\n• Release of Information\n• Patient Referral Form\n• Medical Practice Attendance Policy\n• Financial Responsibility Form\n\nYou can access all forms on our <a href="/patient-forms" target="_blank">Patient Forms page</a>. Completing forms online saves time during your visit!',
      type: 'info'
    },
    payment: {
      keywords: ['cost', 'price', 'payment', 'pay', 'fee', 'charge', 'expensive', 'afford'],
      response: 'We accept most major insurance plans and strive to make mental health care accessible. Payment options include:\n\n• Insurance (we\'ll verify your coverage)\n• Credit/debit cards\n• Payment plans may be available\n\nFor specific cost information or to verify insurance coverage, please call our billing department at (980) 585-2019. You can also view our Policies & Fees by clicking the "Policies & Fees" button at the bottom of your screen.',
      type: 'info'
    },
    contact: {
      keywords: ['phone', 'call', 'email', 'contact', 'reach', 'fax'],
      response: 'Here\'s how to reach us:\n\n📞 Phone: (980) 585-2019\n📠 Fax: (980) 585-2016\n✉️ Email: contact@windsongpsychiatric.com\n\nOffice hours: Monday-Friday (appointment times vary)\n\nFor fastest response, please call during business hours.',
      type: 'info'
    }
  };

  const scrollToLatestBot = () => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      if (lastBotMessageRef.current) {
        const container = chatContainerRef.current;
        const message = lastBotMessageRef.current;
        if (container && message) {
          // Calculate position to show bot message at top with some padding
          const messageTop = message.offsetTop;
          
          // Scroll to show the bot message at the top of the visible area
          container.scrollTop = messageTop - 20; // 20px padding from top
        }
      }
    }, 100);
  };

  useEffect(() => {
    // Check if the last message is from bot
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.type === 'bot') {
      scrollToLatestBot();
    }
    // Save messages to sessionStorage
    const messagesToSave = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    sessionStorage.setItem('chatbotMessages', JSON.stringify(messagesToSave));
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'quick-replies',
          options: quickQuestions,
          timestamp: new Date()
        }]);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const findResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Check for crisis keywords first
    if (responses.crisis.keywords.some(keyword => lowerInput.includes(keyword))) {
      return { text: responses.crisis.response, type: 'crisis' };
    }
    
    // Check greeting patterns
    if (responses.greeting.keywords.some(keyword => lowerInput.includes(keyword))) {
      const response = responses.greeting.response(input);
      return { text: response, type: 'greeting' };
    }
    
    // Check age-related questions
    if (responses.ageQuestions.keywords.some(keyword => lowerInput.includes(keyword))) {
      return { 
        text: responses.ageQuestions.response(input),
        type: 'info'
      };
    }
    
    // Check condition-specific questions
    if (responses.conditions.keywords.some(keyword => lowerInput.includes(keyword))) {
      return { 
        text: responses.conditions.response(input),
        type: 'info'
      };
    }
    
    // Check other responses
    for (const [key, data] of Object.entries(responses)) {
      if (['crisis', 'greeting', 'ageQuestions', 'conditions'].includes(key)) continue;
      
      if (data.keywords.some(keyword => lowerInput.includes(keyword))) {
        return { 
          text: typeof data.response === 'function' ? data.response(input) : data.response,
          type: data.type,
          followUp: data.followUp
        };
      }
    }
    
    // Default response
    return { 
      text: "I'd be happy to help you with that. You can explore our website for more information about our <a href='/services' target='_blank'>services</a>, <a href='/insurance' target='_blank'>insurance</a>, and <a href='/patient-forms' target='_blank'>patient forms</a>. For specific questions or to schedule an appointment, please call us at (980) 585-2019.",
      type: 'default'
    };
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responseData = findResponse(text);
      const botResponse = {
        type: 'bot',
        text: responseData.text,
        timestamp: new Date(),
        responseType: responseData.type
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Show follow-up action if available
      if (responseData.followUp) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'action',
            text: responseData.followUp.text,
            button: responseData.followUp.button,
            timestamp: new Date()
          }]);
        }, 500);
      }

      // Show quick replies after bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'quick-replies',
          options: quickQuestions,
          timestamp: new Date()
        }]);
      }, responseData.followUp ? 1000 : 500);
    }, 1000);
  };

  const handleQuickReply = (question) => {
    // Remove quick replies when one is clicked
    setMessages(prev => prev.filter(msg => msg.type !== 'quick-replies'));
    handleSend(question);
  };

  if (!isOpen) return null;

  return (
    <div className={`chatbot-wrapper ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <img 
              src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Help.png" 
              alt="Chatbot" 
              className="chatbot-avatar"
            />
            <div>
              <h3>Windsong Assistant</h3>
              <span className="chatbot-status">🟢 Online</span>
            </div>
          </div>
          <div className="chatbot-header-buttons">
            <button className="chatbot-minimize" onClick={onMinimize}>−</button>
            <button className="chatbot-close" onClick={onClose}>✕</button>
          </div>
        </div>
        
        <div className="chatbot-messages" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === 'bot' && (
                <div 
                  className="message bot-message" 
                  ref={(() => {
                    // Find the last bot message index
                    const lastBotIndex = messages.map((m, i) => m.type === 'bot' ? i : -1).filter(i => i !== -1).pop();
                    return index === lastBotIndex ? lastBotMessageRef : null;
                  })()}
                >
                  <div className="message-content" dangerouslySetInnerHTML={{ __html: message.text }} />
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )}
              {message.type === 'user' && (
                <div className="message user-message">
                  <div className="message-content">{message.text}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )}
              {message.type === 'quick-replies' && (
                <div className="quick-replies">
                  {message.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className="quick-reply-button"
                      onClick={() => handleQuickReply(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {message.type === 'action' && (
                <div className="action-message">
                  <p>{message.text}</p>
                  <a href={message.button.link} target="_blank" rel="noopener noreferrer" className="action-button">
                    {message.button.text}
                  </a>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message bot-message typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chatbot-input-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-send" disabled={!inputValue.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;