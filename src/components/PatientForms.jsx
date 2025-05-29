import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PatientForms.css';

const PatientForms = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Check if we need to show the success toast
    if (sessionStorage.getItem('referralSubmitted') === 'true') {
      setShowToast(true);
      sessionStorage.removeItem('referralSubmitted');
      
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
      link: 'https://form.jotform.com/242107489968067',
      external: true
    },
    {
      title: 'Authorization for Release of Medical Information',
      link: 'https://form.jotform.com/242108969025055',
      external: true
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
          ✓ Patient referral form was successfully submitted!
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