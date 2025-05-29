import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PatientForms.css';

const PatientForms = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Check for various form submissions
    let message = '';
    
    if (sessionStorage.getItem('referralSubmitted') === 'true') {
      message = 'Patient referral form was successfully submitted!';
      sessionStorage.removeItem('referralSubmitted');
    } else if (sessionStorage.getItem('consentSubmitted') === 'true') {
      message = 'Consent for treatment form was successfully submitted!';
      sessionStorage.removeItem('consentSubmitted');
    } else if (sessionStorage.getItem('releaseSubmitted') === 'true') {
      message = 'Release of information form was successfully submitted!';
      sessionStorage.removeItem('releaseSubmitted');
    } else if (sessionStorage.getItem('neurolepticSubmitted') === 'true') {
      message = 'Neuroleptic consent form was successfully submitted!';
      sessionStorage.removeItem('neurolepticSubmitted');
    }

    if (message) {
      setToastMessage(message);
      setShowToast(true);
      
      // Hide toast after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const forms = [
    {
      title: 'General Consent for Care and Treatment',
      link: '/consent-for-treatment',
      external: false
    },
    {
      title: 'Authorization for Release of Medical Information',
      link: '/release-of-information',
      external: false
    },
    {
      title: 'Neuroleptic Consent Form',
      link: '/neuroleptic-consent',
      external: false
    },
    {
      title: 'Patient Referral',
      link: '/patient-referral',
      external: false
    }
  ];

  return (
    <div className="patient-forms-page">
      {showToast && (
        <div className="toast success-toast">
          ✓ {toastMessage}
        </div>
      )}
      
      <div className="patient-forms-container">
        <h1>Patient Forms</h1>
        
        <div className="forms-grid">
          {forms.map((form, index) => (
            <div key={index} className="form-card">
              <h3>{form.title}</h3>
              {form.external ? (
                <a 
                  href={form.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="form-button"
                >
                  Form
                </a>
              ) : (
                <Link to={form.link} className="form-button">
                  Form
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientForms;