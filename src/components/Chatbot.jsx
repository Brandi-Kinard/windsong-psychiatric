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
    // Quick responses for basic functionality
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'hey there', 'what\'s up'],
      priority: 10,
      response: (input) => {
        const nameMatch = input.match(/my name is (\w+)/i);
        if (nameMatch) {
          return `Nice to meet you, ${nameMatch[1]}! I'm here to help you learn about Windsong Psychiatric Associates and our services. What brings you here today?`;
        }
        if (input.toLowerCase().includes('what\'s up')) {
          return 'Hello! I\'m here to help you with questions about Windsong Psychiatric Associates. How can I assist you today?';
        }
        return 'Hello! Welcome to Windsong Psychiatric Associates. I\'m here to help answer your questions about our services, scheduling, insurance, and more. What can I help you with today?';
      },
      type: 'greeting'
    },

    // Help and support requests
    generalHelp: {
      keywords: ['i need help', 'need help', 'can you help me out', 'help me', 'can you help', 'looking for help'],
      priority: 9,
      response: 'I\'d be happy to help you! I can answer questions about:\n\n• <strong>Scheduling appointments</strong> and new patient process\n• <strong>Services we offer</strong> and conditions we treat  \n• <strong>Insurance coverage</strong> and pricing\n• <strong>Office locations</strong> and hours\n• <strong>Forms and policies</strong>\n• <strong>Provider information</strong>\n\nWhat specific information are you looking for? Or you can call us directly at (980) 585-2019.',
      type: 'support'
    },

    // Insurance - comprehensive coverage
    insurance: {
      keywords: ['insurance', 'coverage', 'do you accept', 'do you take', 'blue cross', 'aetna', 'cigna', 'united', 'medicare', 'medicaid', 'tricare', 'humana'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = 'Yes! We accept most major insurance plans:\n\n';
        
        // Specific plan mentions
        if (lower.includes('blue cross')) {
          response += '✅ <strong>Blue Cross Blue Shield</strong> - Yes, we accept this\n';
        }
        if (lower.includes('aetna')) {
          response += '✅ <strong>Aetna</strong> - Yes, we accept this\n';
        }
        if (lower.includes('cigna')) {
          response += '✅ <strong>Cigna</strong> - Yes, we accept this\n';
        }
        if (lower.includes('united')) {
          response += '✅ <strong>United Healthcare</strong> - Yes, we accept this\n';
        }
        if (lower.includes('medicare')) {
          response += '✅ <strong>Medicare</strong> - Yes, we accept this\n';
        }
        if (lower.includes('medicaid')) {
          response += '✅ <strong>Medicaid</strong> - Yes, we accept this\n';
        }
        if (lower.includes('tricare')) {
          response += '✅ <strong>Tricare</strong> - Yes, we accept this\n';
        }
        if (lower.includes('humana')) {
          response += '✅ <strong>Humana</strong> - Yes, we accept this\n';
        }
        
        response += '\n<strong>Other plans we accept:</strong>\n• Partners and many other major carriers\n\n<strong>We verify your coverage</strong> before your appointment to let you know about copayments, deductibles, and coverage details.\n\nFor specific insurance verification, call (980) 585-2019 or visit our <a href="/#insurance">Insurance section</a>.';
        
        return response;
      },
      type: 'info'
    },
    // Appointment scheduling
    appointment: {
      keywords: ['appointment', 'schedule', 'book', 'how do i schedule', 'i\'m looking for a doctor', 'my mom needs psychiatric help'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('my mom') || lower.includes('someone else')) {
          response = 'I can help you get care set up! To schedule an appointment for someone else:\n\n';
        } else {
          response = 'To schedule an appointment, you can:\n\n';
        }
        
        response += '<strong>3 Easy Ways:</strong>\n1. <strong>Call us</strong> at (980) 585-2019\n2. <strong>Fill out</strong> our <a href="/new-patient">New Patient form</a> online\n3. <strong>Have your provider</strong> send us a referral\n\n<strong>Timeline:</strong> New patients typically seen within 1-2 weeks.\n\nWhich method works best for you?';
        
        return response;
      },
      type: 'action'
    },

    // Services offered - comprehensive
    services: {
      keywords: ['services', 'what do you offer', 'what services', 'treatment', 'help with'],
      priority: 8,
      response: 'We offer comprehensive psychiatric services:\n\n<strong>Core Services:</strong>\n• <strong>Psychiatric Evaluations</strong> - comprehensive assessments and treatment planning\n• <strong>Medication Management</strong> - expert psychiatric medication evaluation and monitoring\n• <strong>Telemedicine</strong> - convenient virtual appointments with HIPAA-compliant platform\n• <strong>Specialized Care</strong> - focused treatment for anxiety, depression, ADHD, trauma, autism spectrum disorders, conduct disorders, and other conditions\n• <strong>Injections</strong> - long-acting antipsychotics, mood stabilizers, and B12 vitamin injections\n• <strong>Prevention & Wellness</strong> - proactive mental health strategies and patient advocacy\n\n<strong>Geriatric Specialty Care:</strong>\n• In-home visits and facility visits\n• Dementia care and cognitive assessments\n• Family support and education\n• Coordination with medical providers\n• End-of-life mental health support\n\n<strong>We treat:</strong> Depression, bipolar disorder, anxiety, OCD, PTSD, schizophrenia, ADHD, autism spectrum disorders, conduct disorders, insomnia, adjustment disorder, grief, dementia, and more.\n\nVisit our <a href="/#services">Services section</a> for complete details or call (980) 585-2019.',
      type: 'info'
    },

    // Specific condition treatment
    conditionTreatment: {
      keywords: ['do you treat', 'can you help with', 'anxiety', 'depression', 'adhd', 'bipolar', 'ptsd', 'schizophrenia', 'autism', 'conduct', 'what about', 'medication', 'prescribe'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('anxiety')) {
          response = '✅ <strong>Yes, we treat anxiety!</strong> We provide comprehensive anxiety treatment including:\n• Medication management\n• Evidence-based approaches\n• Coping strategies\n• Regular monitoring and support';
        } else if (lower.includes('depression')) {
          response = '✅ <strong>Yes, we treat depression!</strong> Our depression care includes:\n• Psychiatric evaluations\n• Medication management\n• Treatment plan development\n• Ongoing support and monitoring';
        } else if (lower.includes('adhd')) {
          response = '✅ <strong>Yes, we treat ADHD!</strong> Our ADHD services include:\n• Comprehensive evaluations\n• Medication management\n• Treatment for children, teens and adults\n• Focus and attention strategies';
        } else if (lower.includes('bipolar')) {
          response = '✅ <strong>Yes, we treat bipolar disorder!</strong> We provide:\n• Mood stabilization\n• Medication management\n• Long-term support\n• Crisis intervention when needed';
        } else if (lower.includes('ptsd')) {
          response = '✅ <strong>Yes, we treat PTSD and trauma!</strong> Our trauma care includes:\n• Trauma-informed treatment\n• Evidence-based approaches\n• Medication when appropriate\n• Supportive therapy options';
        } else if (lower.includes('autism')) {
          response = '✅ <strong>Yes, we treat autism spectrum disorders!</strong> Our autism care includes:\n• Comprehensive evaluations\n• Medication management for co-occurring conditions\n• Support for anxiety and ADHD symptoms\n• Family guidance and education';
        } else if (lower.includes('conduct')) {
          response = '✅ <strong>Yes, we manage conduct disorders!</strong> Our approach includes:\n• Behavioral assessments\n• Medication when appropriate\n• Family involvement strategies\n• School collaboration support';
        } else if (lower.includes('prescribe') || lower.includes('medication')) {
          response = '✅ <strong>Yes, we prescribe medication!</strong> As a psychiatric nurse practitioner, Felicia Davis can:\n• Prescribe psychiatric medications\n• Monitor medication effectiveness\n• Adjust dosages as needed\n• Provide medication education';
        } else {
          response = '✅ <strong>We treat many mental health conditions</strong> including anxiety, depression, ADHD, bipolar disorder, PTSD, schizophrenia, autism spectrum disorders, conduct disorders, insomnia, and more.';
        }
        
        response += '\n\nWe specialize in <strong>pediatric patients (ages 4+), adolescents, adults, and seniors</strong>. Call (980) 585-2019 to discuss your specific needs.';
        
        return response;
      },
      type: 'info'
    },

    // Provider information - Felicia Davis
    providerInfo: {
      keywords: ['felicia davis', 'who is', 'provider', 'doctor', 'psychiatrist', 'nurse practitioner', 'qualifications', 'experience', 'background', 'credentials', 'are you a psychiatrist'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('psychiatrist or nurse practitioner') || lower.includes('are you a psychiatrist')) {
          response = '<strong>Felicia Davis is a Psychiatric Nurse Practitioner (PMHNP-BC).</strong> She\'s also board-certified as a Family Nurse Practitioner (FNP-BC).\n\n';
        }
        
        response += '<strong>Felicia Davis, MSN, PMHNP-BC, FNP-BC</strong> is our experienced psychiatric nurse practitioner:\n\n<strong>Educational Background:</strong>\n• Bachelor of Arts in Sociology and Criminal Justice (Norfolk State University)\n• Bachelor of Science in Nursing (Winston-Salem State University)\n• Master of Science in Nursing (Winston-Salem State University)\n• Post-Master\'s Certificate in Psychiatric Mental Health Nursing (Husson University)\n\n<strong>Clinical Experience (Over a Decade):</strong>\n• Inpatient forensic psychiatry units\n• Community mental health centers\n• Outpatient psychiatric clinics\n• Emergency departments (psychiatric assessments and consultations)\n• Specialized in pediatric and geriatric populations\n\n<strong>Current Practice:</strong>\n• Outpatient psychiatric care for all ages\n• Focus on chronic mental illness support\n• Crisis stabilization\n• Addiction recovery guidance\n\n<strong>Mission:</strong> "All To Thee I Owe" - expanding access to compassionate, evidence-based care for underserved populations.\n\nLearn more on our <a href="/meet-felicia-davis">Meet Felicia Davis</a> page.';
        
        return response;
      },
      type: 'info'
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
        
        response += '• Check-ups for your mental health\n• Help with medications\n• Treatment for feeling sad, worried, or having trouble focusing\n• Help with autism and behavior problems\n• Appointments you can do from home (telehealth)\n• Help for young children (ages 4+), teens, and adults\n\n';
        
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
          if (age < 4) {
            return 'We serve pediatric patients ages 4 and up. For children under 4, we recommend consulting with a child psychiatrist. Please call us at (980) 585-2019 for referral recommendations.';
          } else if (age >= 4 && age < 13) {
            return 'Yes! We provide specialized psychiatric care for children ages 4 and up. Our services include evaluation, medication management, and treatment for ADHD, anxiety, autism spectrum disorders, conduct disorders, and other childhood mental health conditions. Call (980) 585-2019 to schedule an appointment.';
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
        return 'We provide psychiatric services for pediatric patients (ages 4+), adolescents, adults, and seniors. For specific age-related questions, please call us at (980) 585-2019.';
      },
      type: 'info'
    },
    location: {
      keywords: ['location', 'located', 'address', 'where', 'directions', 'fort mill', 'huntersville', 'baltimore'],
      response: 'We have three convenient locations:\n\n📍 <strong>Fort Mill, SC:</strong> 975 Market Street, Suite 201-F, Fort Mill, SC 29708\n\n📍 <strong>Huntersville, NC:</strong> 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078\n\n📍 <strong>Baltimore, MD:</strong> 175 W Ostend St, Suite 102, Baltimore, MD 21230\n\nAll offices offer ample parking and easy access. <a href="/#locations">View directions and maps</a> for detailed location information.',
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
      keywords: ['depression', 'anxiety', 'adhd', 'bipolar', 'panic', 'ptsd', 'ocd', 'eating disorder', 'substance', 'addiction', 'sad', 'worried', 'scared', 'nervous', 'cant focus', 'trouble focusing', 'moody', 'mood swings', 'cant sleep', 'sleeping problems', 'feeling down', 'feeling low', 'panic attacks', 'racing thoughts', 'can\'t concentrate', 'hyperactive', 'restless', 'trauma', 'flashbacks', 'nightmares', 'autism', 'behavior', 'conduct'],
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
        } else if (lower.includes('autism')) {
          response = 'We help children and adults with autism spectrum disorders. We can help with related challenges like anxiety, ADHD symptoms, and provide support for you and your family. ';
        } else if (lower.includes('behavior') || lower.includes('conduct')) {
          response = 'We help children with behavior problems and conduct disorders. We work with families to find the right approach, which may include medication and behavior strategies. ';
        } else if (lower.includes('cant sleep') || lower.includes('sleeping problems')) {
          response = 'We can help if you have trouble sleeping. Sometimes sleep problems are connected to feeling worried or sad. ';
        } else {
          response = 'We help people with many different mental health problems like feeling sad, worried, having trouble focusing, autism, behavior problems, and more. ';
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
      keywords: ['form', 'paperwork', 'documents', 'patient form', 'intake', 'fill out', 'complete'],
      response: 'We have several patient forms available online to streamline your visit:\n\n• <strong>New Patient Inquiry Form</strong> - for scheduling and intake\n• <strong>Consent for Treatment</strong> - required for care\n• <strong>Release of Information</strong> - for sharing records\n• <strong>Patient Referral Form</strong> - comprehensive information\n• <strong>Attendance Policy</strong> - practice guidelines\n• <strong>Financial Responsibility</strong> - payment policies\n\nAccess all forms on our <a href="/patient-forms">Patient Forms page</a>. Completing forms online in advance saves time during your visit!',
      type: 'info'
    },
    // Emotional support and validation responses
    emotionalSupport: {
      keywords: ['dont feel well', 'don\'t feel well', 'not feeling well', 'feel bad', 'feeling bad', 'feel terrible', 'feeling terrible', 'struggling', 'having a hard time', 'going through a tough time', 'really struggling', 'feel lost', 'feeling lost', 'feel hopeless', 'feeling hopeless', 'feel overwhelmed', 'feeling overwhelmed', 'having trouble', 'need help', 'feel alone', 'feeling alone', 'feel empty', 'feeling empty', 'hurting', 'in pain', 'feel broken', 'feeling broken', 'not doing well', 'doing badly', 'feel awful', 'feeling awful'],
      response: (input) => {
        const lower = input.toLowerCase();
        let response = 'I\'m sorry you\'re not feeling well right now. ';
        
        if (lower.includes('struggling') || lower.includes('hard time') || lower.includes('tough time')) {
          response += 'It sounds like you\'re going through a really difficult time, and that takes a lot of strength to reach out. ';
        } else if (lower.includes('alone') || lower.includes('lost') || lower.includes('empty')) {
          response += 'Feeling this way can be really isolating and scary. You\'re not alone in this. ';
        } else if (lower.includes('overwhelmed') || lower.includes('hopeless') || lower.includes('broken')) {
          response += 'Those feelings can be incredibly heavy to carry. It\'s brave of you to reach out. ';
        } else {
          response += 'Your feelings are valid, and it\'s important that you\'re reaching out. ';
        }
        
        response += '\n\nWe understand how hard it can be to take that first step toward getting help. At Windsong, we create a safe, caring space where you can talk about what you\'re going through without judgment.\n\n';
        
        if (lower.includes('need help') || lower.includes('dont know') || lower.includes('don\'t know')) {
          response += 'Taking the step to get help shows real courage. ';
        }
        
        response += 'Would you like to:\n• <a href=\"/new-patient\">Fill out our new patient form</a> to get started\n• Call us at (980) 585-2019 to speak with someone right away\n• Learn more about <a href=\"/#services\">how we can help</a>\n\nYou don\'t have to go through this alone. We\'re here to support you.';
        
        return response;
      },
      type: 'support'
    },
    // Attendance policy and procedures
    attendancePolicy: {
      keywords: ['attendance policy', 'attendance', 'missed appointment', 'no show', 'cancel appointment', 'cancellation policy', 'reschedule', 'late', 'tardy', 'policy', 'where can i find the attendance policy', 'attendance rules', 'appointment rules'],
      response: 'Our attendance policy helps ensure quality care for all patients:\n\n<strong>Key Requirements:</strong>\n• <strong>24 hours notice</strong> required for cancellations or rescheduling\n• Arriving more than 15 minutes late may require rescheduling\n• Late cancellations (under 24 hrs): $50 fee\n• No-show appointments: $100 fee\n• After 2 missed appointments, continued care may be discontinued\n\n<strong>Find complete details in:</strong>\n• <strong>"Policies & Fees"</strong> button at bottom of your screen\n• <a href="/attendance-policy">Medical Practice Attendance Policy</a> form\n\nCall (980) 585-2019 for specific questions about your situation.',
      type: 'info'
    },
    
    // Session costs and pricing (directs to actual fee location)
    sessionCosts: {
      keywords: ['how much', 'cost', 'price', 'session cost', 'appointment cost', 'fees', 'pay for session', 'pay for appointment', 'what does it cost', 'pricing', 'expensive', 'charges', 'bill', 'billing', 'what are the fees'],
      response: 'You can find our complete fee schedule and pricing information in our <strong>Policies & Fees</strong> section:\n\n<strong>Current Self-Pay Fees:</strong>\n• New patient visit: $350\n• Follow-up visit: $250\n• Forms completion: $10 per page\n\n<strong>Cancellation & No-Show Fees:</strong>\n• Late cancellation (under 24 hours): $50\n• No-show appointment: $100\n\n<strong>Payment Options:</strong>\n• Most major insurance plans (we verify coverage before appointments)\n• Check, credit/debit cards, HSA/FSA cards\n• Payment due at time of service\n\n<strong>Important:</strong> We understand emergencies happen - fees may be waived for unforeseen circumstances on a case-by-case basis.\n\nClick the <strong>"Policies & Fees"</strong> button at the bottom of your screen to see complete details, or call (980) 585-2019 for insurance verification.',
      type: 'info'
    },
    
    // Provider information
    providerInfo: {
      keywords: ['felicia davis', 'provider', 'doctor', 'nurse practitioner', 'psychiatrist', 'who is', 'qualifications', 'experience', 'background', 'credentials', 'pmhnp', 'fnp'],
      response: 'Felicia Davis, MSN, PMHNP-BC, FNP-BC is our experienced psychiatric nurse practitioner:\n\n• <strong>Board-certified</strong> in both psychiatric and family medicine\n• <strong>Over a decade</strong> of mental health experience\n• <strong>Comprehensive background</strong>: inpatient, outpatient, emergency, and community settings\n• <strong>All ages welcome</strong>: specializes in pediatric and geriatric care\n• <strong>Evidence-based approach</strong> with compassionate, individualized care\n\nHer mission is expanding access to quality mental health care for underserved populations. Learn more about her background on our <a href="/meet-felicia-davis">Meet Felicia Davis</a> page.',
      type: 'info'
    },
    
    // Comprehensive services with detailed conditions
    servicesDetailed: {
      keywords: ['conditions we treat', 'what conditions', 'what mental health', 'disorders', 'illnesses', 'problems'],
      priority: 7,
      response: 'We treat a wide range of mental health conditions:\n\n<strong>Mood Disorders:</strong>\n• Depression and Major Depressive Disorder\n• Bipolar Disorder\n• Mood swings and emotional instability\n\n<strong>Anxiety & Stress Disorders:</strong>\n• Generalized Anxiety Disorder\n• Panic Attacks and Panic Disorder\n• OCD (Obsessive-Compulsive Disorder)\n• PTSD and Trauma-related conditions\n\n<strong>Neurodevelopmental & Cognitive:</strong>\n• ADHD (attention and focus issues)\n• Autism Spectrum Disorders\n• Conduct Disorders\n• Dementia and cognitive decline\n• Memory concerns and cognitive assessments\n\n<strong>Psychotic Disorders:</strong>\n• Schizophrenia\n• Schizoaffective Disorder\n• Thought disorders and reality perception issues\n\n<strong>Other Conditions:</strong>\n• Insomnia and sleep disorders\n• Adjustment Disorder (difficulty coping with change)\n• Grief and bereavement support\n\n<strong>We provide:</strong> Evidence-based treatments, individualized treatment plans, holistic approaches, and long-term management strategies.\n\nCall (980) 585-2019 to discuss your specific situation.',
      type: 'info'
    },
    
    // Office hours and availability  
    hours: {
      keywords: ['hours', 'open', 'time', 'when', 'business hours', 'office hours', 'available', 'schedule', 'what time'],
      response: 'Our office hours are:\n\n<strong>Monday - Thursday:</strong> 8:00 AM – 7:00 PM\n<strong>Friday:</strong> Closed\n<strong>Saturday:</strong> By appointment only\n<strong>Sunday:</strong> Closed\n\n<strong>All three locations</strong> (Fort Mill SC, Huntersville NC, Baltimore MD) follow the same schedule.\n\n<strong>Telemedicine</strong> appointments available during regular hours throughout NC, SC, MD, GA, VA, DC, and FL.\n\nFor appointments and inquiries, call (980) 585-2019 during business hours.',
      type: 'info'
    },
    
    // New patient process
    newPatient: {
      keywords: ['new patient', 'first time', 'getting started', 'how to start', 'first appointment', 'new here', 'begin treatment', 'start care'],
      response: 'Welcome! Getting started is simple:\n\n<strong>Step 1:</strong> Complete our <a href="/new-patient">New Patient Form</a> online (saves time!)\n<strong>Step 2:</strong> We\'ll call you within 1-2 business days to schedule\n<strong>Step 3:</strong> Bring insurance card and ID to your first visit\n\n<strong>What to expect:</strong>\n• Comprehensive evaluation and assessment\n• Discussion of your concerns and goals\n• Development of individualized treatment plan\n• Questions about insurance and next steps\n\n<strong>New patients typically seen within 1-2 weeks.</strong> Call (980) 585-2019 with questions or to schedule directly.',
      type: 'action',
      followUp: {
        text: 'Ready to get started?',
        button: { text: 'Complete New Patient Form', link: '/new-patient' }
      }
    },
    
    // Insurance coverage
    insuranceDetailed: {
      keywords: ['insurance', 'coverage', 'accept', 'medicaid', 'medicare', 'blue cross', 'aetna', 'cigna', 'united', 'tricare', 'humana', 'covered', 'benefits'],
      response: 'We accept most major insurance plans including:\n\n• Blue Cross Blue Shield\n• Aetna, Cigna, United Healthcare\n• Medicare and Medicaid\n• Tricare, Humana\n• Partners and many others\n\n<strong>We verify your coverage</strong> before your appointment and will let you know about:\n• Copayments and deductibles\n• Coverage details\n• Any prior authorization requirements\n\nFor specific insurance verification, call (980) 585-2019. Visit our <a href="/#insurance">Insurance section</a> for the complete list.',
      type: 'info'
    },
    
    // Age and eligibility
    ageEligibility: {
      keywords: ['age', 'how old', 'children', 'kids', 'teens', 'adolescent', 'adult', 'seniors', 'elderly', '13', 'minimum age', 'what ages', 'ages do you', 'age range', 'serve ages'],
      response: 'We provide psychiatric care for:\n\n• <strong>Pediatric patients ages 4 and older</strong>\n• <strong>Adolescents and teenagers</strong>\n• <strong>Adults of all ages</strong>\n• <strong>Seniors and elderly patients</strong>\n\n<strong>Specialized experience with:</strong>\n• Childhood mental health concerns (ages 4+)\n• Teenage mental health concerns\n• Adult psychiatric conditions\n• Geriatric psychiatry (including dementia care)\n• Age-appropriate treatment approaches\n\nFor children under 4, we can provide referrals to appropriate specialists. Call (980) 585-2019 to discuss your specific needs.',
      type: 'info'
    },
    
    // Cancellation fees and policies
    cancellationFees: {
      keywords: ['cancellation fee', 'cancel fee', 'no show fee', 'missed appointment fee', 'late cancellation', 'charged for canceling', 'fee for missing', 'cancel charge'],
      response: 'Here are our cancellation fee details:\n\n<strong>Late Cancellation</strong> (less than 24 hours notice): $50 fee\n<strong>No-Show</strong> (missed without notice): $100 fee\n\n<strong>Important notes:</strong>\n• Emergency situations handled case-by-case\n• Fees may be waived for unforeseen circumstances\n• Payment due at time of service\n• Not covered by insurance\n\nFind complete policy details by clicking <strong>"Policies & Fees"</strong> at the bottom of your screen, or call (980) 585-2019 to discuss your specific situation.',
      type: 'info'
    },
    
    // Office hours and scheduling
    officeHours: {
      keywords: ['office hours', 'hours', 'open', 'when are you available', 'are you open on weekends', 'evening appointments', 'what time', 'are you closed on friday'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = 'Our <strong>office hours</strong> are:\n\n<strong>Monday - Thursday:</strong> 8:00 AM – 7:00 PM\n<strong>Friday:</strong> Closed\n<strong>Saturday:</strong> By appointment only\n<strong>Sunday:</strong> Closed\n\n<strong>All three locations</strong> follow the same schedule.\n\n';
        
        if (lower.includes('weekend') || lower.includes('saturday')) {
          response += '<strong>Weekend availability:</strong> Saturday appointments are available by special arrangement.\n\n';
        }
        if (lower.includes('evening')) {
          response += '<strong>Evening hours:</strong> We offer appointments until 7:00 PM Monday-Thursday.\n\n';
        }
        if (lower.includes('friday')) {
          response += '<strong>Friday:</strong> Yes, we are closed on Fridays.\n\n';
        }
        
        response += '<strong>Telemedicine</strong> appointments available during regular hours. Call (980) 585-2019 to schedule!';
        
        return response;
      },
      type: 'info'
    },

    // Age and eligibility - comprehensive  
    ageEligibilityComprehensive: {
      keywords: ['age', 'children', 'kids', 'teenagers', 'teens', 'seniors', 'elderly', 'minimum age', 'do you see children', 'can you help seniors', 'i\'m 15', 'pediatric', 'what ages', 'ages do you', 'age range', 'serve ages'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('children') || lower.includes('kids') || lower.includes('pediatric')) {
          response = '<strong>Children ages 4 and up:</strong> Yes! We provide pediatric psychiatric care starting at age 4. We help with ADHD, anxiety, autism spectrum disorders, conduct disorders, and more.\n\n';
        }
        
        if (lower.includes('15') || lower.includes('teen')) {
          response += '✅ <strong>Yes! We see teenagers and adolescents.</strong> We have specialized experience with:\n• Teen anxiety and depression\n• ADHD in adolescents\n• Autism spectrum disorders\n• School and social stress\n• Family involvement when appropriate\n\n';
        }
        
        if (lower.includes('senior') || lower.includes('elderly')) {
          response += '✅ <strong>Absolutely! We provide comprehensive care for seniors</strong> including:\n• Geriatric psychiatry\n• Dementia and cognitive concerns\n• Medication management for older adults\n• In-home and facility visits when needed\n\n';
        }
        
        response += '<strong>We serve:</strong>\n• <strong>Children</strong> ages 4 and older\n• <strong>Adolescents and teenagers</strong>\n• <strong>Adults</strong> of all ages\n• <strong>Seniors</strong> and elderly patients\n\nCall (980) 585-2019 to discuss your specific needs!';
        
        return response;
      },
      type: 'info'
    },

    // New patient process - detailed
    newPatient: {
      keywords: ['new patient', 'i\'m a new patient', 'first time', 'getting started', 'how do i start', 'what do i bring', 'first appointment', 'what should i expect', 'do i need a referral', 'never been to a psychiatrist'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('never been') || lower.includes('what should i expect')) {
          response = '<strong>First time seeing a psychiatrist?</strong> That\'s completely normal! Here\'s what to expect:\n\n';
        } else {
          response = '<strong>Welcome!</strong> Getting started as a new patient is simple:\n\n';
        }
        
        response += '<strong>Step 1: Getting Started</strong>\n• Fill out our <a href="/new-patient">New Patient Form</a> online (saves time!)\n• Or call us at (980) 585-2019 to schedule directly\n• No referral required!\n\n';
        
        if (lower.includes('what do i bring') || lower.includes('bring to')) {
          response += '<strong>What to bring:</strong>\n• Insurance card and photo ID\n• List of current medications\n• Previous mental health records (if available)\n• Any specific concerns or questions\n\n';
        }
        
        if (lower.includes('what should i expect') || lower.includes('first visit')) {
          response += '<strong>Your first visit:</strong>\n• Comprehensive evaluation (usually 60-90 minutes)\n• Discussion of your concerns and goals\n• Review of medical and mental health history\n• Development of personalized treatment plan\n• Questions about next steps\n\n';
        }
        
        response += '<strong>Timeline:</strong> New patients typically seen within 1-2 weeks!\n\nReady to get started?';
        
        return response;
      },
      type: 'action',
      followUp: {
        text: 'Ready to begin your mental health journey?',
        button: { text: 'Start New Patient Form', link: '/new-patient' }
      }
    },

    // Forms and paperwork
    forms: {
      keywords: ['forms', 'paperwork', 'documents', 'patient forms', 'fill out', 'complete', 'what forms do i need', 'where are your patient forms', 'can i fill out forms online', 'financial responsibility form'],
      priority: 7,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = 'We have several patient forms available online:\n\n';
        
        if (lower.includes('financial responsibility')) {
          response += '<strong>Financial Responsibility Form</strong> covers payment policies, fees, and insurance information.\n\n';
        }
        
        response += '<strong>Available Forms:</strong>\n• <strong>New Patient Inquiry Form</strong> - for scheduling and intake\n• <strong>Consent for Treatment</strong> - required for care\n• <strong>Release of Information</strong> - for sharing records\n• <strong>Patient Referral Form</strong> - comprehensive information\n• <strong>Attendance Policy</strong> - practice guidelines\n• <strong>Financial Responsibility</strong> - payment policies\n\n<strong>Benefits of completing online:</strong>\n• Saves time during your visit\n• More convenient\n• Secure and confidential\n\nAccess all forms at our <a href="/patient-forms">Patient Forms page</a>!';
        
        return response;
      },
      type: 'info'
    },

    // Location and contact - comprehensive
    locationContact: {
      keywords: ['location', 'where are you located', 'address', 'phone number', 'how do i contact you', 'multiple locations', 'baltimore', 'fort mill', 'huntersville', 'are you in baltimore'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('baltimore')) {
          response = '✅ <strong>Yes, we have a Baltimore location!</strong>\n\n📍 <strong>Baltimore, MD:</strong> 175 W Ostend St, Suite 102, Baltimore, MD 21230\n\n';
        }
        
        if (lower.includes('fort mill')) {
          response += '📍 <strong>Fort Mill, SC:</strong> 975 Market Street, Suite 201-F, Fort Mill, SC 29708\n\n';
        }
        
        if (lower.includes('huntersville')) {
          response += '📍 <strong>Huntersville, NC:</strong> 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078\n\n';
        }
        
        if (!lower.includes('baltimore') && !lower.includes('fort mill') && !lower.includes('huntersville')) {
          response = '<strong>We have three convenient locations plus virtual care:</strong>\n\n📍 <strong>Huntersville, NC:</strong> 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078\n\n📍 <strong>Fort Mill, SC:</strong> 975 Market Street, Suite 201-F, Fort Mill, SC 29708\n\n📍 <strong>Baltimore, MD:</strong> 175 W Ostend St, Suite 102, Baltimore, MD 21230\n\n💻 <strong>Virtual Care:</strong> Available throughout NC, SC, MD, GA, VA, DC, FL\n\n';
        }
        
        response += '<strong>Contact Information:</strong>\n📞 <strong>Phone:</strong> (980) 585-2019\n📠 <strong>Fax:</strong> (980) 585-2016\n✉️ <strong>Email:</strong> contact@windsongpsychiatric.com\n\n<strong>Office Hours (All Locations):</strong>\n• Monday–Thursday: 8:00 AM – 7:00 PM\n• Friday: Closed\n• Saturday: By appointment only (case-by-case basis)\n• Sunday: Closed\n\n<strong>All locations</strong> offer ample parking and easy access. View <a href="/#locations">directions and maps</a> for details!';
        
        return response;
      },
      type: 'info'
    },

    // Telehealth comprehensive
    telehealth: {
      keywords: ['telehealth', 'virtual appointments', 'telemedicine', 'online', 'video', 'phone appointment', 'can i have a phone appointment', 'do you see patients online', 'remote'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '✅ <strong>Yes! We offer telehealth appointments.</strong>\n\n';
        
        if (lower.includes('phone')) {
          response += '<strong>Phone and video options available</strong> - whatever works best for you!\n\n';
        }
        
        response += '<strong>Telehealth Benefits:</strong>\n• Meet with your provider from anywhere\n• No travel time or parking hassles\n• Great for follow-up appointments\n• Most insurance plans cover virtual visits\n• Same quality care as in-person\n\n<strong>Available in:</strong> NC, SC, MD, GA, VA, DC, and FL\n\n<strong>Perfect if you:</strong>\n• Live far from our offices\n• Have transportation challenges\n• Prefer the comfort of home\n• Have a busy schedule\n\n<strong>Same office hours:</strong> Monday-Thursday 8 AM - 7 PM\n\nAsk about telehealth when you call (980) 585-2019 to schedule!';
        
        return response;
      },
      type: 'info'
    },

    // Specific service questions
    specificServices: {
      keywords: ['injections', 'do you offer injections', 'b12 shots', 'can i get b12 shots', 'cognitive assessments', 'do you do cognitive assessments'],
      priority: 8,
      response: (input) => {
        const lower = input.toLowerCase();
        let response = '';
        
        if (lower.includes('injection') || lower.includes('b12')) {
          response = '✅ <strong>Yes! We offer several types of injections:</strong>\n\n• <strong>Long-acting antipsychotics</strong> - monthly medication options\n• <strong>B12 vitamin injections</strong> - for energy and wellness\n• <strong>Mood stabilizer injections</strong>\n\n<strong>Benefits:</strong>\n• Improved medication compliance\n• Steady medication levels\n• Less frequent dosing\n\n';
        }
        
        if (lower.includes('cognitive assessment')) {
          response += '✅ <strong>Yes! We provide cognitive assessments</strong> for:\n\n• Memory concerns\n• Attention and focus issues\n• Dementia screening\n• ADHD evaluation\n• Post-injury cognitive function\n\n<strong>What\'s included:</strong>\n• Comprehensive testing\n• Detailed evaluation\n• Treatment recommendations\n• Follow-up planning\n\n';
        }
        
        response += 'Call (980) 585-2019 to discuss these services and schedule an appointment!';
        
        return response;
      },
      type: 'info'
    },

    // Why choose Windsong - benefits and approach
    whyChoose: {
      keywords: ['why choose', 'why windsong', 'what makes you different', 'benefits', 'advantages', 'why should i choose', 'what sets you apart'],
      priority: 7,
      response: '<strong>Why Choose Windsong Psychiatric Associates?</strong>\n\n<strong>🧠 Care for Every Age:</strong>\n• Specialized mental health care for children (ages 4+), adolescents, adults, and seniors\n• Age-appropriate treatment approaches tailored to your life stage\n\n<strong>👩‍⚕️ Experienced Provider:</strong>\n• Board-certified psychiatric provider with over a decade of experience\n• Extensive background in inpatient, outpatient, emergency, and community settings\n• Specialized expertise in pediatric and geriatric populations\n\n<strong>🤝 Whole-Person Approach:</strong>\n• We treat the whole person, not just symptoms\n• Integrate physical health, lifestyle, and environmental factors\n• Evidence-based care that puts you first\n• Compassionate, individualized treatment plans\n\n<strong>Our Mission:</strong> Expanding access to quality mental health care, especially for underserved populations. Every person deserves dignity, hope, and the opportunity to heal.\n\n<strong>"All To Thee I Owe"</strong> - our guiding principle of gratitude, purpose, and service.\n\nReady to experience the difference? Call (980) 585-2019 or <a href="/new-patient">get started online</a>.',
      type: 'info'
    },

    // Crisis resources and helpful resources
    crisisResources: {
      keywords: ['crisis resources', 'hotlines', 'emergency numbers', 'suicide hotline', '988', 'crisis help', 'mental health emergency'],
      priority: 10,
      response: '⚠️ <strong>Crisis & Emergency Resources Available 24/7:</strong>\n\n🆘 <strong>Life-Threatening Emergency:</strong> 911\n\n☎️ <strong>Mental Health Crisis:</strong> 988 (Suicide & Crisis Lifeline)\n\n<strong>Other Important Resources:</strong>\n• National Suicide Hotline: 1-800-273-TALK (8255)\n• National Sexual Assault Hotline: 1-800-656-HOPE (4673)\n• National Domestic Violence Hotline: 1-800-799-SAFE (7233)\n• National Council on Alcoholism & Drug Dependency: 1-800-622-2255\n\n<strong>Remember:</strong> If you\'re having thoughts of self-harm or experiencing a mental health emergency, please reach out immediately. You don\'t have to face this alone.\n\nFor more resources, visit our <a href="/helpful-resources">Helpful Resources</a> page.',
      type: 'crisis'
    },

    contact: {
      keywords: ['phone', 'call', 'email', 'contact', 'reach', 'fax'],
      priority: 6,
      response: 'Here\'s how to reach us:\n\n📞 <strong>Phone:</strong> (980) 585-2019\n📠 <strong>Fax:</strong> (980) 585-2016\n✉️ <strong>Email:</strong> contact@windsongpsychiatric.com\n\n<strong>Office Hours:</strong> Monday-Thursday 8:00 AM – 7:00 PM\n\nFor fastest response, please call during business hours. We typically respond to new patient inquiries within 1-2 business days.',
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

  // Handle link clicks within chatbot messages
  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    if (href) {
      // Save current scroll position before navigating
      if (chatContainerRef.current) {
        sessionStorage.setItem('chatbotScrollPosition', chatContainerRef.current.scrollTop.toString());
      }
      
      // Check if we're on mobile/tablet (comprehensive detection)
      const isMobile = window.innerWidth <= 767 || (window.innerWidth <= 767 && window.innerHeight <= 430);
      const isTablet = (window.innerWidth > 767 && window.innerWidth <= 1024) || 
                      (window.innerWidth >= 768 && window.innerWidth <= 1024);
      const isMobileOrTablet = isMobile || isTablet;
      
      if (isMobileOrTablet) {
        // On mobile/tablet, minimize the chatbot before navigation
        onMinimize();
      }
      
      // Navigate in the same tab
      window.location.href = href;
    }
  };

  // Add click handlers to links in bot messages after they're rendered
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const links = chatContainer.querySelectorAll('.message-content a');
      links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
      });

      // Cleanup event listeners
      return () => {
        links.forEach(link => {
          link.removeEventListener('click', handleLinkClick);
        });
      };
    }
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
    
    // Restore scroll position when chatbot is reopened (only if there are existing messages)
    if (isOpen && messages.length > 1) {
      const savedScrollPosition = sessionStorage.getItem('chatbotScrollPosition');
      if (savedScrollPosition && chatContainerRef.current) {
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = parseInt(savedScrollPosition, 10);
          }
        }, 200); // Small delay to ensure DOM is rendered
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Improved response matching with scoring system
  const findResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    // Crisis detection - always highest priority
    if (responses.crisis && responses.crisis.keywords.some(keyword => lowerInput.includes(keyword))) {
      return { text: responses.crisis.response, type: 'crisis' };
    }
    
    // Crisis resources - also high priority
    if (responses.crisisResources && responses.crisisResources.keywords.some(keyword => lowerInput.includes(keyword))) {
      return { text: responses.crisisResources.response, type: 'crisis' };
    }
    
    // Emotional support - second highest priority  
    if (responses.emotionalSupport && responses.emotionalSupport.keywords.some(keyword => lowerInput.includes(keyword))) {
      return { 
        text: responses.emotionalSupport.response(input),
        type: 'support'
      };
    }
    
    // Score all other responses
    for (const [key, data] of Object.entries(responses)) {
      if (['crisis', 'crisisResources', 'emotionalSupport'].includes(key)) continue;
      
      let score = 0;
      let keywordMatches = 0;
      
      // Check keyword matches
      if (data.keywords) {
        for (const keyword of data.keywords) {
          if (lowerInput.includes(keyword.toLowerCase())) {
            keywordMatches++;
            // Longer keywords get higher scores
            score += keyword.length;
            // Exact phrase matches get bonus points
            if (lowerInput === keyword.toLowerCase()) {
              score += 50;
            }
          }
        }
      }
      
      // Apply priority multiplier if exists
      if (data.priority) {
        score *= data.priority;
      }
      
      // Bonus for multiple keyword matches
      if (keywordMatches > 1) {
        score += keywordMatches * 10;
      }
      
      // Update best match if this score is higher
      if (score > bestScore && score > 0) {
        bestScore = score;
        bestMatch = { key, data, score };
      }
    }
    
    // Return best match if found
    if (bestMatch) {
      const responseText = typeof bestMatch.data.response === 'function' 
        ? bestMatch.data.response(input) 
        : bestMatch.data.response;
        
      return {
        text: responseText,
        type: bestMatch.data.type,
        followUp: bestMatch.data.followUp
      };
    }
    
    // Fallback responses for common unhandled cases
    if (lowerInput.includes('california') || lowerInput.includes('west coast') || lowerInput.includes('texas') || lowerInput.includes('florida')) {
      return {
        text: "We currently have locations in <strong>North Carolina</strong> (Fort Mill and Huntersville), <strong>South Carolina</strong> (Fort Mill), and <strong>Maryland</strong> (Baltimore). We also offer <strong>telemedicine</strong> services in NC, SC, MD, GA, VA, DC, and FL.\n\nIf you're in another state, I'd recommend contacting us at (980) 585-2019 to discuss telehealth options if available in your area.",
        type: 'info'
      };
    }
    
    // Age qualification questions
    if (lowerInput.match(/i'?m \d+/) || lowerInput.match(/\d+ years? old/)) {
      const ageMatch = lowerInput.match(/(\d+)/);
      if (ageMatch) {
        const age = parseInt(ageMatch[1]);
        if (age < 4) {
          return {
            text: "We serve pediatric patients starting at age 4. For children under 4, we recommend consulting with your pediatrician for appropriate referrals. Please call us at (980) 585-2019 for more information.",
            type: 'info'
          };
        } else {
          return {
            text: `✅ <strong>Yes, at ${age} you definitely qualify for our services!</strong> We provide psychiatric care for children (ages 4+), adolescents, adults, and seniors.\n\nWe offer comprehensive treatment for anxiety, depression, ADHD, autism spectrum disorders, conduct disorders, and many other conditions. Ready to get started? Call (980) 585-2019 or fill out our <a href="/new-patient">New Patient Form</a>.`,
            type: 'info'
          };
        }
      }
    }
    
    // Default response with better guidance
    return { 
      text: "I'd be happy to help you with that! I can answer questions about:\n\n• <strong>Scheduling</strong> appointments and new patient process\n• <strong>Services</strong> we offer and conditions we treat\n• <strong>Insurance</strong> coverage and pricing\n• <strong>Locations</strong> and office hours\n• <strong>Provider</strong> information\n\nWhat specific information are you looking for? You can also explore our website or call us at (980) 585-2019.",
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
            <button className="chatbot-back-mobile" onClick={onMinimize}>←</button>
            <img 
              src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Help.png" 
              alt="Chatbot" 
              className="chatbot-avatar"
            />
            <div>
              <h3 className="chatbot-title">
                <span className="chatbot-title-desktop">Windsong Assistant</span>
                <span className="chatbot-title-mobile">Chat</span>
              </h3>
              <span className="chatbot-status">🟢 Online</span>
            </div>
          </div>
          <div className="chatbot-header-buttons">
            <button className="chatbot-minimize chatbot-minimize-desktop" onClick={onMinimize}>−</button>
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
                  <a 
                    href={message.button.link} 
                    className="action-button"
                    onClick={(e) => {
                      e.preventDefault();
                      // Save current scroll position before navigating
                      if (chatContainerRef.current) {
                        sessionStorage.setItem('chatbotScrollPosition', chatContainerRef.current.scrollTop.toString());
                      }
                      // Check if we're on mobile/tablet (comprehensive detection)
                      const isMobile = window.innerWidth <= 767 || (window.innerWidth <= 767 && window.innerHeight <= 430);
                      const isTablet = (window.innerWidth > 767 && window.innerWidth <= 1024) || 
                                      (window.innerWidth >= 768 && window.innerWidth <= 1024);
                      const isMobileOrTablet = isMobile || isTablet;
                      if (isMobileOrTablet) {
                        onMinimize();
                      }
                      window.location.href = message.button.link;
                    }}
                  >
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