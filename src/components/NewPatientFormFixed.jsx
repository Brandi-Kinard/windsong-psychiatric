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

  const [errors, setErrors] = useState({});

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

  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    switch(currentStep) {
      case 1:
        if (!formData.seekingCareFor) {
          isValid = false;
        }
        break;
      case 2:
        if (formData.supportType.length === 0) {
          isValid = false;
        }
        break;
      case 3:
        if (!formData.previousCare) {
          isValid = false;
        }
        break;
      case 4:
        if (!formData.appointmentType) {
          isValid = false;
        }
        break;
      case 5:
        if (formData.availability.length === 0) {
          isValid = false;
        }
        break;
      case 6:
        if (!formData.name) { newErrors.name = true; isValid = false; }
        if (!formData.email) { newErrors.email = true; isValid = false; }
        if (!formData.phone) { newErrors.phone = true; isValid = false; }
        if (!formData.preferredContact) { newErrors.preferredContact = true; isValid = false; }
        if (!formData.dateOfBirth) { newErrors.dateOfBirth = true; isValid = false; }
        if (!formData.address) { newErrors.address = true; isValid = false; }
        if (!formData.city) { newErrors.city = true; isValid = false; }
        if (!formData.state) { newErrors.state = true; isValid = false; }
        if (!formData.zipCode) { newErrors.zipCode = true; isValid = false; }
        if (!formData.insuranceProvider) { newErrors.insuranceProvider = true; isValid = false; }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

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

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
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
        contactMethod: formData.preferredContact,
        seekingCareFor: formData.seekingCareFor,
        supportType: formData.supportType.join(', '),
        primaryConcerns: formData.supportType.join(', '),
        previousCare: formData.previousCare,
        appointmentType: formData.appointmentType,
        availability: formData.availability.join(', '),
        dob: formData.dateOfBirth,
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        provider: formData.insuranceProvider,
        otherinsurance: formData.otherInsurance || 'Not provided',
        subscriberid: formData.subscriberId || 'Not provided',
        notes: formData.notes || 'No additional notes',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };

      // Debug logging to see what we're sending
      console.log('=== EMAILJS TEMPLATE PARAMETERS ===');
      console.log('Date of Birth:', formData.dateOfBirth);
      console.log('Address:', formData.address);
      console.log('Insurance Provider:', formData.insuranceProvider);
      console.log('Other Insurance:', formData.otherInsurance);
      console.log('Subscriber ID:', formData.subscriberId);
      console.log('Template Params:', templateParams);

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
                <div className="input-group">
                  <label htmlFor="preferredContact">Preferred contact method *</label>
                  <select
                    id="preferredContact"
                    value={formData.preferredContact}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    required
                  >
                    <option value="">Select preferred contact</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="dateOfBirth">Date of birth *</label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="address">Street address *</label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="state">State *</label>
                  <input
                    id="state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="NC"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="zipCode">Zip code *</label>
                  <input
                    id="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="28266"
                    required
                  />
                </div>
                <div className="input-group full-width">
                  <label>Subscriber/Insurance provider *</label>
                  <div className={`insurance-selector ${errors.insuranceProvider ? 'error' : ''}`}>
                    {insuranceProviders.map(provider => (
                      <div 
                        key={provider.name}
                        className={`insurance-option ${formData.insuranceProvider === provider.name ? 'selected' : ''}`}
                        onClick={() => handleInputChange('insuranceProvider', provider.name)}
                      >
                        {provider.logo && (
                          <img src={provider.logo} alt={provider.name} className="insurance-logo-small" />
                        )}
                        <span className="insurance-name">{provider.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {formData.insuranceProvider === 'Other' && (
                  <div className="input-group full-width">
                    <label htmlFor="otherInsurance">Please specify insurance provider</label>
                    <input
                      id="otherInsurance"
                      type="text"
                      value={formData.otherInsurance}
                      onChange={(e) => handleInputChange('otherInsurance', e.target.value)}
                      placeholder="Enter your insurance provider name"
                    />
                  </div>
                )}
                {formData.insuranceProvider && formData.insuranceProvider !== 'No Insurance/Self-Pay' && (
                  <div className="input-group">
                    <label htmlFor="subscriberId">Subscriber ID</label>
                    <input
                      id="subscriberId"
                      type="text"
                      value={formData.subscriberId}
                      onChange={(e) => handleInputChange('subscriberId', e.target.value)}
                      placeholder="Subscriber ID"
                    />
                  </div>
                )}
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