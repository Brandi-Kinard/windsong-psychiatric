import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './NewPatientForm.css';

const NewPatientFormFixed = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_idvcxum';
  const EMAILJS_TEMPLATE_ID = 'template_xjaha0n';
  const EMAILJS_PUBLIC_KEY = 'wFQLtLxDwWnkGF0TF';
  const RECIPIENT_EMAIL = 'brandiellenkinard@gmail.com';
  
  const [formData, setFormData] = useState({
    seekingCareFor: '',
    supportType: [],
    previousCare: '',
    appointmentType: '',
    providerGender: '',
    availability: [],
    name: '',
    email: '',
    phone: '',
    preferredContact: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    insuranceProvider: '',
    otherInsurance: '',
    subscriberId: '',
    notes: ''
  });

  const totalSteps = 7;
  const progressPercentage = currentStep <= totalSteps ? ((currentStep - 1) / totalSteps) * 100 : 100;

  const conditions = [
    'Anxiety',
    'Depression',
    'Bipolar disorder',
    'ADHD',
    'PTSD (Trauma)',
    'OCD',
    'Schizophrenia',
    'Insomnia',
    'Adjustment disorder',
    'Grief',
    'Dementia',
    'Other'
  ];

  const timeSlots = [
    'Morning (8AM - 12PM)',
    'Afternoon (12PM - 5PM)'
  ];

  const insuranceProviders = [
    { name: 'Tricare', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/tricare.png' },
    { name: 'Blue Cross Blue Shield', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/blue-cross.png' },
    { name: 'Medicaid', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/medicaid.png' },
    { name: 'Humana', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/humana.png' },
    { name: 'United Healthcare', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/united-healthcare.png' },
    { name: 'Medicare', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/medicare.png' },
    { name: 'Cigna', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/cigna.png' },
    { name: 'Aetna', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/aetna.png' },
    { name: 'Partners', logo: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/partners.png' },
    { name: 'Other', logo: null },
    { name: 'No Insurance/Self-Pay', logo: null }
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMultiSelect = (field, value) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    setFormData({ ...formData, [field]: newValues });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      const templateParams = {
        to_email: RECIPIENT_EMAIL,
        reply_to: formData.email,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        seekingCareFor: formData.seekingCareFor,
        supportType: formData.supportType.join(', '),
        previousCare: formData.previousCare,
        appointmentType: formData.appointmentType,
        availability: formData.availability.join(', '),
        preferredContact: formData.preferredContact,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        insuranceProvider: formData.insuranceProvider,
        subscriberId: formData.subscriberId,
        notes: formData.notes || 'No additional notes'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      // Show success page
      setCurrentStep(8);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again or contact us directly at (980) 585-2019.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-patient-form">
      <div className="form-container">
        <div className="form-header">
          <div className="header-top">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <button className="close-button" onClick={() => navigate('/')}>
              ✕
            </button>
          </div>
          {currentStep <= totalSteps && (
            <div className="step-indicator">
              Step {currentStep} of {totalSteps}
            </div>
          )}
        </div>

        <div className="form-content">
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Who is seeking care?</h2>
              <div className="options-grid">
                {['Me', 'My child', 'My partner and me', 'My family'].map(option => (
                  <button
                    key={option}
                    className={`option-button ${formData.seekingCareFor === option ? 'selected' : ''}`}
                    onClick={() => handleInputChange('seekingCareFor', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2>What kind of support are you looking for?</h2>
              <p className="step-subtitle">Select all that apply</p>
              <div className="checkbox-grid">
                {conditions.map(condition => (
                  <label key={condition} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.supportType.includes(condition)}
                      onChange={() => handleMultiSelect('supportType', condition)}
                    />
                    <span className="checkbox-text">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2>Have you received mental health care before?</h2>
              <div className="options-grid">
                {['Yes', 'No', 'Not sure'].map(option => (
                  <button
                    key={option}
                    className={`option-button ${formData.previousCare === option ? 'selected' : ''}`}
                    onClick={() => handleInputChange('previousCare', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-step">
              <h2>What type of appointment do you prefer?</h2>
              <div className="options-grid">
                {['In-person', 'Telehealth', 'Either'].map(option => (
                  <button
                    key={option}
                    className={`option-button ${formData.appointmentType === option ? 'selected' : ''}`}
                    onClick={() => handleInputChange('appointmentType', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="form-step">
              <h2>When are you typically available?</h2>
              <p className="step-subtitle">Select all that apply</p>
              <div className="checkbox-grid">
                {timeSlots.map(slot => (
                  <label key={slot} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(slot)}
                      onChange={() => handleMultiSelect('availability', slot)}
                    />
                    <span className="checkbox-text">{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="form-step">
              <h2>Personal & insurance information</h2>
              <div className="input-grid">
                <div className="input-group">
                  <label htmlFor="name">Full name *</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 555-5555"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="form-step">
              <h2>Anything else you'd like us to know?</h2>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Optional: Share any additional information that might be helpful..."
                rows={8}
                className="notes-textarea"
              />
            </div>
          )}

          {currentStep === 8 && (
            <div className="form-step success-step">
              <div className="success-icon">
                <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/heart.png" alt="Heart icon" />
              </div>
              <h2>Thank you for reaching out!</h2>
              <p>We've received your information and will contact you within 1-2 business days.</p>
              <p>For urgent mental health concerns, please call us at (980) 585-2019.</p>
              <div className="action-buttons">
                <button 
                  className="action-button primary"
                  onClick={() => navigate('/')}
                >
                  Return to home
                </button>
                <button 
                  className="action-button secondary"
                  onClick={() => navigate('/helpful-resources')}
                >
                  Helpful resources
                </button>
              </div>
              <div className="crisis-info">
                <p><strong>If you are experiencing a life-threatening emergency, please call 911 immediately.</strong></p>
              </div>
            </div>
          )}
        </div>

        {currentStep < 8 && (
          <div className="form-footer">
            <button 
              className="nav-button previous"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>
            
            {currentStep === 7 ? (
              <button 
                className="nav-button next primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button 
                className="nav-button next"
                onClick={handleNext}
              >
                Next →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPatientFormFixed;