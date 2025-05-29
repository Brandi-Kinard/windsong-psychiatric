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
        email_subject: 'Neuroleptic Consent Form Submitted',
        printed_name: formData.printedName,
        signature: formData.signature,
        relationship: formData.relationship || 'Self',
        date: formData.date,
        time: new Date().toLocaleTimeString(),
        consent_text: 'The mental health team has recommended antipsychotic medication as part of the treatment plan.'
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
          <h1>Neuroleptic Consent Form</h1>
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
                The mental health team has recommended antipsychotic medication (also known as neuroleptic medication) 
                as part of the treatment plan. These medications are used to treat various psychiatric conditions 
                including schizophrenia, bipolar disorder, severe depression, and other mental health conditions.
              </p>
              <p>
                <strong>Potential Benefits:</strong> Antipsychotic medications can help reduce symptoms such as 
                hallucinations, delusions, severe mood swings, agitation, and disorganized thinking. They may help 
                improve functioning and quality of life.
              </p>
              <p>
                <strong>Potential Risks and Side Effects:</strong> Like all medications, antipsychotics can have 
                side effects. Common side effects may include drowsiness, dizziness, weight gain, dry mouth, 
                constipation, and blurred vision. Some patients may experience movement disorders, metabolic changes, 
                or other side effects. Your healthcare provider will monitor you for these effects.
              </p>
              <p>
                <strong>Alternative Treatments:</strong> Alternative treatments may include other medications, 
                psychotherapy, lifestyle changes, or a combination of treatments. The risks of not taking medication 
                include continued or worsening symptoms.
              </p>
              <p>
                By signing below, I acknowledge that:
              </p>
              <ul>
                <li>I have been informed about the medication, its benefits, risks, and alternatives</li>
                <li>I have had the opportunity to ask questions</li>
                <li>I understand I can withdraw consent at any time</li>
                <li>I consent to treatment with antipsychotic medication</li>
              </ul>
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
        </form>
      </div>
    </div>
  );
};

export default NeurolepticConsentForm;