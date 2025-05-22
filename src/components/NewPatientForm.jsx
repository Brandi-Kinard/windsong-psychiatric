import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './NewPatientForm.css';

const NewPatientForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
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
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleMultiSelect = (field, value) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    setFormData({ ...formData, [field]: newValues });
  };

  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    switch (currentStep) {
      case 1:
        if (!formData.seekingCareFor) {
          newErrors.seekingCareFor = true;
          isValid = false;
        }
        break;
      case 2:
        if (formData.supportType.length === 0) {
          newErrors.supportType = true;
          isValid = false;
        }
        break;
      case 3:
        if (!formData.previousCare) {
          newErrors.previousCare = true;
          isValid = false;
        }
        break;
      case 4:
        if (!formData.appointmentType) {
          newErrors.appointmentType = true;
          isValid = false;
        }
        break;
      case 5:
        if (formData.availability.length === 0) {
          newErrors.availability = true;
          isValid = false;
        }
        break;
      case 6:
        if (!formData.name) { newErrors.name = true; isValid = false; }
        if (!formData.email) { newErrors.email = true; isValid = false; }
        if (!formData.phone) { newErrors.phone = true; isValid = false; }
        if (!formData.preferredContact) { newErrors.preferredContact = true; isValid = false; }
        if (!formData.dateOfBirth || formData.dateOfBirth.split('/').some(part => !part)) { 
          newErrors.dateOfBirth = true; isValid = false; 
        }
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

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_idvcxum';
  const EMAILJS_TEMPLATE_ID = 'template_xjaha0n';  // Back to main template
  const EMAILJS_PUBLIC_KEY = 'wFQLtLxDwWnkGF0TF';
  
  // Testing mode - emails go to personal email
  const RECIPIENT_EMAIL = 'brandiellenkinard@gmail.com';

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

Personal Information:
Name: ${formData.name}
Date of Birth: ${formData.dateOfBirth}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred contact method: ${formData.preferredContact}

Address:
${formData.address}
${formData.city}, ${formData.state} ${formData.zipCode}

Insurance Information:
Provider: ${formData.insuranceProvider}
${formData.otherInsurance ? `Other Provider: ${formData.otherInsurance}` : ''}
${formData.subscriberId ? `Subscriber ID: ${formData.subscriberId}` : ''}

Additional notes:
${formData.notes || 'None'}
    `;

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      const templateParams = {
        // EmailJS only accepts non-underscore variables in your template
        to_email: RECIPIENT_EMAIL,
        reply_to: formData.email,
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        contactMethod: formData.preferredContact,  // camelCase for template
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        insuranceProvider: formData.insuranceProvider,
        otherInsurance: formData.otherInsurance || 'Not provided',
        subscriberId: formData.subscriberId || 'Not provided',
        seekingCareFor: formData.seekingCareFor,
        supportType: formData.supportType.join(', '),
        primaryConcerns: formData.supportType.join(', '),  // Alternative name
        previousCare: formData.previousCare,
        appointmentType: formData.appointmentType,
        availability: formData.availability.join(', '),
        notes: formData.notes || 'None provided',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      
      // Temporary debug to see what we're sending
      console.log('=== EMAILJS TEMPLATE PARAMETERS ===');
      Object.entries(templateParams).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });

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
                    className={errors.name ? 'error' : ''}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="dateOfBirth">Date of birth *</label>
                  <div className="date-picker-container">
                    <select
                      value={formData.dateOfBirth.split('/')[0] || ''}
                      onChange={(e) => {
                        const parts = formData.dateOfBirth.split('/');
                        const newDate = `${e.target.value}/${parts[1] || ''}/${parts[2] || ''}`;
                        handleInputChange('dateOfBirth', newDate);
                      }}
                      className={`date-select ${errors.dateOfBirth ? 'error' : ''}`}
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.dateOfBirth.split('/')[1] || ''}
                      onChange={(e) => {
                        const parts = formData.dateOfBirth.split('/');
                        const newDate = `${parts[0] || ''}/${e.target.value}/${parts[2] || ''}`;
                        handleInputChange('dateOfBirth', newDate);
                      }}
                      className={`date-select ${errors.dateOfBirth ? 'error' : ''}`}
                      required
                    >
                      <option value="">Day</option>
                      {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                        <option key={day} value={day.toString().padStart(2, '0')}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.dateOfBirth.split('/')[2] || ''}
                      onChange={(e) => {
                        const parts = formData.dateOfBirth.split('/');
                        const newDate = `${parts[0] || ''}/${parts[1] || ''}/${e.target.value}`;
                        handleInputChange('dateOfBirth', newDate);
                      }}
                      className={`date-select ${errors.dateOfBirth ? 'error' : ''}`}
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={errors.email ? 'error' : ''}
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
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="contact-method">Preferred contact method *</label>
                  <select
                    id="contact-method"
                    value={formData.preferredContact}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className={errors.preferredContact ? 'error' : ''}
                    required
                  >
                    <option value="">Select one</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Text">Text</option>
                  </select>
                </div>
                <div className="input-group full-width">
                  <label htmlFor="address">Address *</label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street address"
                    className={errors.address ? 'error' : ''}
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
                    className={errors.city ? 'error' : ''}
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
                    placeholder="State"
                    className={errors.state ? 'error' : ''}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="zipCode">ZIP code *</label>
                  <input
                    id="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="ZIP code"
                    className={errors.zipCode ? 'error' : ''}
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