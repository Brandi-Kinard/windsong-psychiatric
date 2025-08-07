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
      keywords: ['insurance', 'accept', 'coverage', 'plan', 'medicaid', 'medicare', 'blue cross', 'aetna', 'cigna', 'united', 'covered', 'pay for', 'cost', 'money', 'afford', 'expensive'],
      response: 'We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, Medicare, and Medicaid. For a complete list of accepted insurance, please see our <a href="/#insurance">Insurance section</a> or call us at (980) 585-2019.',
      type: 'info'
    },
    appointment: {
      keywords: ['appointment', 'schedule', 'book', 'available', 'new patient', 'see someone', 'talk to doctor', 'meet', 'visit', 'come in'],
      response: 'To schedule an appointment, you can:\n\n1. Call us at (980) 585-2019\n2. Fill out our <a href="/new-patient">New Patient form</a>\n3. Have your provider send us a referral\n\nWe typically see new patients within 1-2 weeks.',
      type: 'action'
    },
    getStarted: {
      keywords: ['get started', 'begin', 'start', 'first step', 'how do i', 'what do i do', 'need help', 'what now', 'where do i start', 'how to begin', 'first time', 'new here', 'dont know what to do', 'help me start'],
      response: (input) => {
        const lower = input.toLowerCase();
        let response = 'I\'d be happy to help you get started! ';
        
        if (lower.includes('first time') || lower.includes('new')) {
          response += 'Since you\'re new, ';
        }
        
        response += 'Here\'s what you can do:\n\n1. Fill out our <a href="/new-patient">New Patient Form</a> - it\'s easy and takes just a few minutes\n2. Or call us at (980) 585-2019 to talk to someone right away\n3. We\'ll call you back within 1-2 days to set up your first visit\n\n';
        
        if (lower.includes('dont know') || lower.includes('confused') || lower.includes('help')) {
          response += 'Don\'t worry - we make it simple! ';
        }
        
        response += 'Would you like me to take you to the form now?';
        
        return response;
      },
      type: 'action',
      followUp: {
        text: 'Click below to start your new patient form:',
        button: { text: 'Start New Patient Form', link: '/new-patient' }
      }
    },
    services: {
      keywords: ['services', 'offer', 'treatment', 'therapy', 'medication', 'help with', 'what do you do', 'can you help', 'do you treat', 'what kind of help', 'mental health help', 'psychiatric help', 'counseling', 'what services'],
      response: (input) => {
        const lower = input.toLowerCase();
        let response = 'We help people with mental health concerns. ';
        
        if (lower.includes('what do you do') || lower.includes('what kind')) {
          response += 'Here\'s what we do:\n\n';
        } else {
          response += 'Our services include:\n\n';
        }
        
        response += '• Check-ups for your mental health\n• Help with medications\n• Treatment for feeling sad, worried, or having trouble focusing\n• Appointments you can do from home (telehealth)\n• Help for teens and adults\n\n';
        
        if (lower.includes('can you help') || lower.includes('help with')) {
          response += 'We can probably help you! ';
        }
        
        response += 'Call (980) 585-2019 to talk about how we can help, or visit our <a href="/#services">Services section</a> for more details.';
        
        return response;
      },
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
      response: 'We have three convenient locations:\n\n📍 <strong>Fort Mill, SC:</strong> 975 Market Street, Suite 201-F, Fort Mill, SC 29708\n\n📍 <strong>Huntersville, NC:</strong> 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078\n\n📍 <strong>Baltimore, MD:</strong> 33 S. Gay Street, Suite 202, Baltimore, MD 21202\n\nAll offices offer ample parking and easy access. <a href="/#locations">View directions and maps</a> for detailed location information.',
      type: 'info'
    },
    telehealth: {
      keywords: ['telehealth', 'virtual', 'online', 'video', 'remote', 'phone call', 'phone', 'call', 'computer', 'home', 'zoom', 'facetime', 'video chat', 'talk online', 'meet online', 'see doctor online', 'virtual help', 'help online', 'online help', 'talk over phone', 'phone appointment', 'video appointment', 'from home', 'dont want to come in', 'cant come in', 'stay home'],
      response: (input) => {
        const lower = input.toLowerCase();
        let response = 'Yes! We offer telehealth (virtual) appointments. ';
        
        if (lower.includes('phone') || lower.includes('call')) {
          response += 'You can talk to your doctor over the phone or video call. ';
        } else if (lower.includes('home') || lower.includes('stay home') || lower.includes('dont want to come') || lower.includes('cant come')) {
          response += 'You can see your doctor from home using your phone or computer. ';
        } else {
          response += 'You can meet with your provider using video chat from anywhere. ';
        }
        
        response += 'This is great if you:\n\n• Want to stay home\n• Live far away\n• Have trouble getting to the office\n• Feel more comfortable at home\n\nMost insurance plans cover virtual visits. ';
        
        if (lower.includes('how') || lower.includes('start') || lower.includes('get')) {
          response += '\n\n<strong>Ready to get started?</strong> Call us at (980) 585-2019 and ask about telehealth when you schedule!';
        } else {
          response += 'Ask about telehealth when you call (980) 585-2019 to schedule!';
        }
        
        return response;
      },
      type: 'info'
    },
    hours: {
      keywords: ['hours', 'open', 'time', 'when', 'business hours'],
      response: 'Our office hours are Monday through Friday. Specific appointment times vary by provider. We also offer some evening appointments for your convenience. Please call (980) 585-2019 to check availability.',
      type: 'info'
    },
    provider: {
      keywords: ['felicia', 'davis', 'provider', 'doctor', 'practitioner', 'fnp', 'psychiatrist', 'nurse', 'name'],
      response: 'Felicia Davis, FNP-C is our psychiatric nurse practitioner. She has extensive experience in mental health care and is dedicated to providing compassionate, personalized treatment. Learn more about her background and approach on our <a href="/meet-felicia-davis">Meet Felicia Davis</a> page.',
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
      keywords: ['depression', 'anxiety', 'adhd', 'bipolar', 'panic', 'ptsd', 'ocd', 'eating disorder', 'substance', 'addiction', 'sad', 'worried', 'scared', 'nervous', 'cant focus', 'trouble focusing', 'moody', 'mood swings', 'cant sleep', 'sleeping problems', 'feeling down', 'feeling low', 'panic attacks', 'racing thoughts', 'can\'t concentrate', 'hyperactive', 'restless', 'trauma', 'flashbacks', 'nightmares'],
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('depression') || lower.includes('sad') || lower.includes('feeling down') || lower.includes('feeling low')) {
          response = 'We help people who feel sad or depressed. We can check what\'s wrong and help you feel better with medicine or talking. ';
        } else if (lower.includes('anxiety') || lower.includes('worried') || lower.includes('scared') || lower.includes('nervous') || lower.includes('panic')) {
          response = 'We help people who worry a lot or feel scared. If you have panic attacks or feel nervous often, we can help you feel calmer. ';
        } else if (lower.includes('adhd') || lower.includes('cant focus') || lower.includes('trouble focusing') || lower.includes('can\'t concentrate') || lower.includes('hyperactive') || lower.includes('restless')) {
          response = 'We help people who have trouble focusing or sitting still. This might be ADHD. We can test you and help you concentrate better with medicine or other ways. ';
        } else if (lower.includes('bipolar') || lower.includes('mood swings') || lower.includes('moody')) {
          response = 'We help people whose mood changes a lot (sometimes very happy, sometimes very sad). This might be bipolar disorder. We can help keep your mood more steady. ';
        } else if (lower.includes('ptsd') || lower.includes('trauma') || lower.includes('flashbacks') || lower.includes('nightmares')) {
          response = 'We help people who have been through scary or bad things. If you have bad dreams or scary memories, we can help you feel safer. ';
        } else if (lower.includes('cant sleep') || lower.includes('sleeping problems')) {
          response = 'We can help if you have trouble sleeping. Sometimes sleep problems are connected to feeling worried or sad. ';
        } else {
          response = 'We help people with many different mental health problems like feeling sad, worried, having trouble focusing, and more. ';
        }
        
        response += '\n\nWe want to help you feel better. ';
        
        if (lower.includes('do you treat') || lower.includes('can you help')) {
          response += 'Yes, we can probably help you! ';
        }
        
        response += 'Call (980) 585-2019 to talk about how we can help you, or <a href="/#services">learn more about our services</a>.';
        
        return response;
      },
      type: 'info'
    },
    forms: {
      keywords: ['form', 'paperwork', 'documents', 'patient form', 'intake'],
      response: 'We have several patient forms available online:\n\n• New Patient Inquiry Form\n• Consent for Treatment\n• Release of Information\n• Patient Referral Form\n• Medical Practice Attendance Policy\n• Financial Responsibility Form\n\nYou can access all forms on our <a href="/patient-forms">Patient Forms page</a>. Completing forms online saves time during your visit!',
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
    
    // Check telehealth-specific questions
    if (responses.telehealth.keywords.some(keyword => lowerInput.includes(keyword))) {
      return { 
        text: responses.telehealth.response(input),
        type: 'info'
      };
    }
    
    // Check other responses
    for (const [key, data] of Object.entries(responses)) {
      if (['crisis', 'greeting', 'ageQuestions', 'conditions', 'telehealth'].includes(key)) continue;
      
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
      text: "I'd be happy to help you with that. You can explore our website for more information about our <a href='/#services'>services</a>, <a href='/#insurance'>insurance</a>, and <a href='/patient-forms'>patient forms</a>. For specific questions or to schedule an appointment, please call us at (980) 585-2019.",
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

  const handleOverlayClick = (e) => {
    // Only close if clicking on the overlay background (not the container)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`chatbot-wrapper ${isMinimized ? 'minimized' : ''}`} onClick={handleOverlayClick}>
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
                  <a href={message.button.link} className="action-button">
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