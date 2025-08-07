import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './FinancialResponsibilityForm.css';

const FinancialResponsibilityForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    signature: '',
    relationship: '',
    date: new Date().toLocaleDateString('en-US'),
    acknowledgment: false
  });

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_idvcxum';
  const EMAILJS_TEMPLATE_ID = 'template_thdv17m';
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
    
    if (!formData.acknowledgment) {
      alert('Please acknowledge that you have read, understood, and agree to the financial responsibility and payment policy.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      const templateParams = {
        to_email: RECIPIENT_EMAIL,
        reply_to: RECIPIENT_EMAIL,
        name: formData.patientName,
        patientName: formData.patientName,
        signature: formData.signature,
        relationship: formData.relationship || 'Self',
        date: formData.date,
        submissionDate: new Date().toLocaleDateString(),
        submissionTime: new Date().toLocaleTimeString(),
        acknowledgment: formData.acknowledgment ? 'Yes' : 'No',
        formType: 'Patient Financial Responsibility and Payment Policy',
        email: 'Not provided',
        phone: 'Not provided',
        notes: 'Patient Financial Responsibility and Payment Policy form submitted'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Set success flag and navigate back
      sessionStorage.setItem('financialPolicySubmitted', 'true');
      navigate('/patient-forms');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="financial-responsibility-page">
      <div className="financial-responsibility-container">
        <div className="form-header">
          <h1>Patient Financial Responsibility and Payment Policy</h1>
          <button className="close-button" onClick={() => navigate('/patient-forms')}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="financial-responsibility-form">
          {/* Policy Content */}
          <div className="form-section">
            <div className="policy-text">
              <p>Thank you for choosing our practice for your healthcare needs. We are committed to providing high-quality care. As part of our commitment, we want to ensure our patients fully understand their financial responsibilities.</p>
              
              <h3>1. Insurance</h3>
              <ul>
                <li>Please bring your current insurance card to each visit.</li>
                <li>It is your responsibility to ensure that we are in-network with your insurance plan.</li>
                <li>You are responsible for knowing your insurance benefits, including coverage, co-payments, deductibles, and referral requirements.</li>
                <li>If your insurance requires a referral and one is not provided, you may be responsible for the full cost of the visit.</li>
              </ul>
              
              <h3>2. Co-Payments and Deductibles</h3>
              <ul>
                <li>Co-payments and known deductibles are due at the time of service.</li>
                <li>We accept payment by cash, credit/debit card, or approved payment methods.</li>
              </ul>
              
              <h3>3. Non-Covered Services</h3>
              <ul>
                <li>You are financially responsible for any services not covered by your insurance plan.</li>
                <li>We will do our best to inform you of non-covered services in advance, but we recommend confirming coverage with your insurer.</li>
              </ul>
              
              <h3>4. Self-Pay Patients</h3>
              <ul>
                <li>Patients without insurance or those receiving non-covered services are considered self-pay.</li>
                <li>Self-pay patients are expected to pay in full at the time of service unless a payment plan has been arranged in advance.</li>
              </ul>
              
              <h3>5. Statements and Past-Due Balances</h3>
              <ul>
                <li>You will receive a billing statement for any remaining balance after insurance has processed your claim.</li>
                <li>Payment is due upon receipt. Past-due balances may be subject to collections if not resolved in a timely manner.</li>
              </ul>
              
              <h3>6. Returned Payments</h3>
              <p>A $25 fee will be charged for returned checks or failed transactions due to insufficient funds.</p>
              
              <h3>7. Payment Plans</h3>
              <p>Payment plans may be available for patients with financial hardship. Please speak with our billing department in advance to make arrangements.</p>
            </div>
          </div>

          {/* Acknowledgment Section */}
          <div className="form-section">
            <h3>Acknowledgment</h3>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.acknowledgment}
                  onChange={(e) => handleInputChange('acknowledgment', e.target.checked)}
                  required
                />
                <div></div>
                <span>By signing below, I acknowledge that I have read, understand, and agree to comply with the financial responsibility and payment policy.</span>
              </label>
            </div>

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

export default FinancialResponsibilityForm;