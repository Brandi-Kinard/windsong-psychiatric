import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './AttendancePolicyForm.css';

const AttendancePolicyForm = () => {
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
  const EMAILJS_TEMPLATE_ID = 'template_uk2dxe5'; // Attendance Policy template
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
      alert('Please acknowledge that you have read and understood the attendance policy.');
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
        formType: 'Medical Practice Attendance Policy',
        email: 'Not provided',
        phone: 'Not provided',
        notes: 'Medical Practice Attendance Policy form submitted'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Set success flag and navigate back
      sessionStorage.setItem('attendancePolicySubmitted', 'true');
      navigate('/patient-forms');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="attendance-policy-page">
      <div className="attendance-policy-container">
        <div className="form-header">
          <h1>Medical Practice Attendance Policy</h1>
          <button className="close-button" onClick={() => navigate('/patient-forms')}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="attendance-policy-form">
          {/* Policy Content */}
          <div className="form-section">
            <div className="policy-text">
              <p>At our practice, we are committed to providing timely, high-quality care to every patient. To help us achieve this goal and ensure fairness and availability for all, we ask that you adhere to the following attendance policy:</p>
              
              <h3>1. Appointment Commitment</h3>
              <p>Patients are expected to attend all scheduled appointments. Please arrive on time to ensure you receive the full benefit of your visit. If you arrive more than 15 minutes late, your appointment may need to be rescheduled and may be counted as a missed appointment.</p>
              
              <h3>2. Cancellations and Rescheduling</h3>
              <p>If you are unable to keep a scheduled appointment, we request that you notify our office at least 24 hours in advance. This courtesy allows us to offer the time to another patient in need of care.</p>
              
              <h3>3. Missed Appointments</h3>
              <p>A missed appointment is defined as:</p>
              <ul>
                <li>Not showing up for a scheduled appointment without notice.</li>
                <li>Canceling or rescheduling an appointment with less than 24 hours' notice.</li>
              </ul>
              
              <h3>4. Repeated Missed Appointments</h3>
              <p>After two (2) missed appointments within a 12-month period, the provider reserves the right to discontinue services and discharge the patient from the practice. A written notice will be provided if this action is taken.</p>
              
              <h3>5. Emergencies</h3>
              <p>We understand that emergencies happen. If a missed appointment was due to a serious or unavoidable circumstance, please contact our office as soon as possible to discuss the situation. Documentation may be requested.</p>
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
                <span>I acknowledge that I have read and understood the Medical Practice Attendance Policy and agree to comply with its terms.</span>
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

export default AttendancePolicyForm;