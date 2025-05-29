import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './NeurolepticConsentForm.css';

const NeurolepticConsentForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    printedName: '',
    signature: '',
    relationship: '',
    date: new Date().toLocaleDateString('en-US')
  });

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_idvcxum';
  const EMAILJS_TEMPLATE_ID = 'template_neuroleptic'; // Placeholder template ID
  const EMAILJS_PUBLIC_KEY = 'wFQLtLxDwWnkGF0TF';
  
  // Testing email address
  const RECIPIENT_EMAIL = 'brandiellenkinard@gmail.com';

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
      const templateParams = {
        to_email: RECIPIENT_EMAIL,
        email_subject: 'Consent for Antipsychotic Medication Submitted',
        printed_name: formData.printedName,
        signature: formData.signature,
        relationship: formData.relationship || 'Self',
        date: formData.date,
        time: new Date().toLocaleTimeString(),
        consent_text: 'Consent for antipsychotic medication with Black Box Warning acknowledgment'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Set success flag and navigate back
      sessionStorage.setItem('neurolepticSubmitted', 'true');
      navigate('/patient-forms');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="neuroleptic-form-page">
      <div className="neuroleptic-form-container">
        <div className="form-header">
          <h1>Consent for Antipsychotic Medication</h1>
          <button className="close-button" onClick={() => navigate('/patient-forms')}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="neuroleptic-form">
          {/* Consent Explanation */}
          <div className="form-section">
            <h3>Consent Information</h3>
            <div className="consent-text">
              <p>
                These medications carry a Black Box Warning; although the FDA has determined that medications in this 
                class carry an increased risk for stroke and death when given to elderly dementia patients, it is for 
                safety and/or to relieve suffering. It is only being recommended because other non-antipsychotic 
                medication regimens have proven unsuccessful.
              </p>
              <p>
                There are currently no medications that are approved for the treatment of the behavioral and psychiatric 
                symptoms associated with dementia. The signature below signifies agreement with this treatment plan and 
                acknowledgement that these risks have been explained to me.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="form-section">
            <h3>Signature</h3>
            
            <div className="form-group">
              <label htmlFor="printedName">Printed Name of Patient or Representative *</label>
              <input
                type="text"
                id="printedName"
                placeholder="John Smith"
                value={formData.printedName}
                onChange={(e) => handleInputChange('printedName', e.target.value)}
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
            <p><strong>Fort Mill, SC:</strong> 1285 Broadcloth St Suite B, Fort Mill, SC 29715</p>
            <p><strong>Huntersville, NC:</strong> 110 Commerce Center Dr Suite 101, Huntersville, NC 28078</p>
            <p><strong>Office Phone:</strong> <a href="tel:8038020060">(803) 802-0060</a></p>
            <p><strong>Office Fax:</strong> (803) 802-8005</p>
            <p><strong>Email:</strong> <a href="mailto:contact@windsongpsychiatric.com">contact@windsongpsychiatric.com</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NeurolepticConsentForm;