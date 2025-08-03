import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ConsentForTreatmentForm.css';

const ConsentForTreatmentForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    signature: '',
    relationship: '',
    date: new Date().toLocaleDateString('en-US')
  });

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_idvcxum';
  const EMAILJS_TEMPLATE_ID = 'template_yegoqun'; // Consent for Treatment template
  const EMAILJS_PUBLIC_KEY = 'wFQLtLxDwWnkGF0TF';
  
  // Testing email address
  const RECIPIENT_EMAIL = 'contact@windsongpsychiatric.com';

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      const templateParams = {
        to_email: RECIPIENT_EMAIL,
        reply_to: RECIPIENT_EMAIL, // Required by EmailJS
        name: formData.patientName, // Using standard 'name' field
        patientName: formData.patientName,
        signature: formData.signature,
        relationship: formData.relationship || 'Self',
        date: formData.date,
        submissionDate: new Date().toLocaleDateString(),
        submissionTime: new Date().toLocaleTimeString(),
        // Add empty fields that might be expected
        email: 'Not provided',
        phone: 'Not provided',
        notes: 'Consent for Treatment form submitted'
      };

      // Debug logging
      console.log('=== CONSENT FORM DEBUG ===');
      console.log('Template ID:', EMAILJS_TEMPLATE_ID);
      console.log('Form Data:', formData);
      console.log('Template Params:', templateParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Set success flag and navigate back
      sessionStorage.setItem('consentSubmitted', 'true');
      navigate('/patient-forms');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="consent-form-page">
      <div className="consent-form-container">
        <div className="form-header">
          <h1>Consent for Care and Treatment</h1>
          <button className="close-button" onClick={() => navigate('/patient-forms')}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="consent-form">
          {/* Consent Explanation */}
          <div className="form-section">
            <h3>Consent Information</h3>
            <div className="consent-text">
              <p><strong>1)</strong> I understand that my records may contain documentation of psychiatric conditions, medical
              history and substance use, and that this information will be released as part of my record.</p>
              
              <p><strong>2)</strong> I understand that if the person or entity receiving this information is not covered by federal
              privacy regulations, this information will no longer be protected and may be redisclosed.</p>
              
              <p><strong>3)</strong> I understand that I may revoke this authorization at any time, but revocation will not apply to
              information that has already been released.</p>
              
              <p><strong>4)</strong> I understand that a copy, email or FAX of this document is just as valid as the original document. 
              A photocopy of this authorization is as valid as the original form and I have a right to receive a copy upon request.</p>
              
              <p><strong>5)</strong> I understand that my records are protected under the Federal regulations and cannot be disclosed 
              without my written consent unless otherwise provided for in the regulations.</p>
              
              <p><strong>I permit the following disclosure of information about me to be made in the format requested, including
              by telephone, fax or mail:</strong></p>
              
              <p><strong>1. I permit:</strong> Any physician or other medical/care provider, hospital, clinic, therapist and other
              medical related facility or service, pharmacy benefit administrator, insurer, employer, government
              agency, group policyholder, contract holder or benefit plan administrator to disclose to Windsong
              Family and Psychiatric Associates information about my health.</p>
              
              <p><strong>2. I permit:</strong> Windsong Family and Psychiatric Associates the right to contact my healthcare
              provider on my behalf to obtain clarifying information (subjective to all state laws) for any
              reason.</p>
              
              <p>I understand that the information that is collected and discussed is to be treated with confidentiality.
              However, directly relevant information may be shared with appropriate parties that is deemed necessary.</p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="form-section">
            <h3>Signature</h3>
            
            <div className="form-group">
              <label htmlFor="patientName">Printed Name of Patient or Representative *</label>
              <input
                type="text"
                id="patientName"
                placeholder="John Smith"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signature">Signature *</label>
              <input
                type="text"
                id="signature"
                placeholder="Type your full name as signature"
                value={formData.signature}
                onChange={(e) => handleInputChange('signature', e.target.value)}
                required
              />
              <small className="form-hint">Please type your full name to serve as your electronic signature</small>
            </div>

            <div className="form-group">
              <label htmlFor="relationship">Relationship to Patient</label>
              <input
                type="text"
                id="relationship"
                placeholder="Self, Parent, Guardian, etc."
                value={formData.relationship}
                onChange={(e) => handleInputChange('relationship', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="text"
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
                readOnly
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/patient-forms')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          
          {/* Footer Contact Information */}
          <div className="form-footer-contact">
            <p><strong>Fort Mill, SC:</strong> 975 Market Street, Suite 201-F, Fort Mill, SC 29708</p>
            <p><strong>Huntersville, NC:</strong> 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078</p>
            <p><strong>Office Phone:</strong> <a href="tel:9805852019">(980) 585-2019</a></p>
            <p><strong>Office Fax:</strong> (980) 585-2016</p>
            <p><strong>Email:</strong> <a href="mailto:contact@windsongpsychiatric.com">contact@windsongpsychiatric.com</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsentForTreatmentForm;