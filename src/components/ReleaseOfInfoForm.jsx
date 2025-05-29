import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ReleaseOfInfoForm.css';

const ReleaseOfInfoForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    birthdate: '',
    printedName: '',
    signature: '',
    relationship: '',
    date: new Date().toLocaleDateString('en-US')
  });

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_idvcxum';
  const EMAILJS_TEMPLATE_ID = 'template_releaseOfInfo'; // Placeholder template ID
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
        email_subject: 'Release of Information Submitted',
        patient_name: formData.patientName,
        birthdate: formData.birthdate,
        printed_name: formData.printedName,
        signature: formData.signature,
        relationship: formData.relationship || 'Self',
        date: formData.date,
        time: new Date().toLocaleTimeString(),
        authorization_text: 'I understand my records may contain documentation of psychiatric conditions, drug and alcohol abuse, HIV/AIDS testing and treatment, and genetic testing information.'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Set success flag and navigate back
      sessionStorage.setItem('releaseSubmitted', 'true');
      navigate('/patient-forms');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="release-form-page">
      <div className="release-form-container">
        <div className="form-header">
          <h1>Authorization for Release of Medical Information</h1>
          <button className="close-button" onClick={() => navigate('/patient-forms')}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="release-form">
          {/* Authorization Text */}
          <div className="form-section">
            <h3>Authorization Information</h3>
            <div className="authorization-text">
              <p>
                I hereby authorize Windsong Psychiatric Services, PLLC to release and/or obtain medical information 
                concerning my care and treatment. I understand that this authorization is voluntary and that I may 
                refuse to sign this authorization. My refusal to sign will not affect my ability to obtain treatment.
              </p>
              <p>
                I understand my records may contain documentation of psychiatric conditions, drug and alcohol abuse, 
                HIV/AIDS testing and treatment, and genetic testing information. I understand that these records are 
                protected by federal and/or state law and cannot be disclosed without my written authorization.
              </p>
              <p>
                I understand that I may revoke this authorization at any time by notifying Windsong Psychiatric Services, 
                PLLC in writing. I understand that revocation will not apply to information that has already been 
                released in response to this authorization.
              </p>
              <p>
                This authorization will expire one year from the date of signature unless otherwise specified.
              </p>
            </div>
          </div>

          {/* Patient Information */}
          <div className="form-section">
            <h3>Patient Information</h3>
            
            <div className="form-group">
              <label htmlFor="patientName">Patient Name *</label>
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
              <label htmlFor="birthdate">Birthdate *</label>
              <input
                type="date"
                id="birthdate"
                value={formData.birthdate}
                onChange={(e) => handleInputChange('birthdate', e.target.value)}
                required
              />
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

export default ReleaseOfInfoForm;