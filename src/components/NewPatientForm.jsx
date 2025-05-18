import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './NewPatientForm.css';

const NewPatientForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    notes: ''
  });

  const totalSteps = 7;

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
    'Afternoon (12PM - 5PM)',
    'Evening (5PM - 8PM)',
    'Weekdays',
    'Weekends'
  ];

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
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

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.seekingCareFor !== '';
      case 2:
        return formData.supportType.length > 0;
      case 3:
        return formData.previousCare !== '';
      case 4:
        return formData.appointmentType !== '';
      case 5:
        return formData.availability.length > 0;
      case 6:
        return formData.name && formData.email && formData.phone && formData.preferredContact;
      default:
        return true;
    }
  };

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_idvcxum';
  const EMAILJS_TEMPLATE_ID = 'template_xjaha0n';
  const EMAILJS_PUBLIC_KEY = 'wFQLtLxDwWnkGF0TF';
  
  // Toggle this to switch between test and production emails
  const TEST_MODE = true; // Set to false when ready for production
  const TEST_EMAIL = 'brandiellenkinard@gmail.com';
  const PRODUCTION_EMAIL = 'brandiellenkinard@gmail.com';

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);

    // Format the data for email
    const emailBody = `
New Patient Inquiry

Who is seeking care: ${formData.seekingCareFor}

Support needed for:
${formData.supportType.join(', ')}

Previous mental health care: ${formData.previousCare}

Preferred appointment type: ${formData.appointmentType}

Availability:
${formData.availability.join(', ')}

Contact Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred contact method: ${formData.preferredContact}

Additional notes:
${formData.notes || 'None'}
    `;

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      // Debug: Log form data
      console.log('Form data:', formData);
      
      const templateParams = {
        to_email: TEST_MODE ? TEST_EMAIL : PRODUCTION_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,  // This ensures replies go to the form submitter
        phone: formData.phone,
        preferred_contact: formData.preferredContact,
        seeking_care_for: formData.seekingCareFor,
        support_type: formData.supportType.join(', '),
        previous_care: formData.previousCare,
        appointment_type: formData.appointmentType,
        availability: formData.availability.join(', '),
        notes: formData.notes || 'None provided',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };

      // Debug: Log template parameters
      console.log('Template parameters:', templateParams);

      // Send email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      // Show success message
      setCurrentStep(8); // Success step
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = currentStep <= totalSteps ? ((currentStep - 1) / totalSteps) * 100 : 100;

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
              <h2>Let's get your contact information</h2>
              <div className="input-grid">
                <div className="input-group">
                  <label htmlFor="name">Name *</label>
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
                <div className="input-group">
                  <label htmlFor="contact-method">Preferred contact method *</label>
                  <select
                    id="contact-method"
                    value={formData.preferredContact}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    required
                  >
                    <option value="">Select one</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Text">Text</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="form-step">
              <h2>Is there anything else you'd like us to know?</h2>
              <p className="step-subtitle">This is optional</p>
              <textarea
                className="notes-textarea"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Feel free to share any additional information that might be helpful..."
                rows="6"
              />
            </div>
          )}

          {currentStep === 8 && (
            <div className="form-step success-step">
              <div className="success-icon">✓</div>
              <h2>Thank you for reaching out!</h2>
              <p>We've received your information and will contact you within 1-2 business days.</p>
              <p>For urgent mental health concerns, please call us at (980) 585-2019.</p>
              <button 
                className="action-button primary"
                onClick={() => navigate('/')}
              >
                Return to Home
              </button>
              <div className="crisis-info">
                <p>If you're overwhelmed or in a crisis and it is after business hours, you can call or text 988 anytime for support from the Suicide & Crisis Lifeline.</p>
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
                disabled={!validateStep() || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button 
                className="nav-button next"
                onClick={handleNext}
                disabled={!validateStep()}
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

export default NewPatientForm;