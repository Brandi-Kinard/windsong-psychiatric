import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './PatientReferralForm.css';

const PatientReferralForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    address: '',
    email: '',
    race: '',
    gender: '',
    dateOfBirth: '',
    privateInsurance: '',
    medicare: '',
    medicaid: '',
    referralSource: '',
    symptoms: '',
    servicesRequesting: '',
    currentTreatmentProvider: '',
    mentalHealthDiagnosis: '',
    substanceUse: '',
    specialNeeds: ''
  });

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_p61h5be';
  const EMAILJS_TEMPLATE_ID = 'template_uw8p9tg'; // Patient referral template
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
        patient_name: `${formData.firstName} ${formData.lastName}`,
        lastName: formData.lastName,
        firstName: formData.firstName,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        race: formData.race,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        privateInsurance: formData.privateInsurance || 'Not provided',
        medicare: formData.medicare || 'Not provided',
        medicaid: formData.medicaid || 'Not provided',
        referralSource: formData.referralSource || 'Not provided',
        symptoms: formData.symptoms || 'Not provided',
        servicesRequesting: formData.servicesRequesting || 'Not provided',
        currentTreatmentProvider: formData.currentTreatmentProvider || 'Not provided',
        mentalHealthDiagnosis: formData.mentalHealthDiagnosis || 'Not provided',
        substanceUse: formData.substanceUse || 'Not provided',
        specialNeeds: formData.specialNeeds || 'Not provided',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Set success flag and navigate back
      sessionStorage.setItem('referralSubmitted', 'true');
      navigate('/patient-forms');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="patient-referral-page">
      <div className="referral-form-container">
        <div className="form-header">
          <h1>Windsong Psychiatric patient referral form</h1>
          <button className="close-button" onClick={() => navigate('/patient-forms')}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="referral-form">
          {/* Patient Information */}
          <div className="form-section">
            <h3>Patient information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastName">Last name *</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First name *</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                placeholder="123 Main St, City, State 12345"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                placeholder="john.smith@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="race">Race *</label>
                <input
                  type="text"
                  id="race"
                  placeholder="e.g., Caucasian, African American"
                  value={formData.race}
                  onChange={(e) => handleInputChange('race', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                placeholder="MM/DD/YYYY"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Insurance Information */}
          <div className="form-section">
            <h3>Insurance information</h3>
            <div className="form-group">
              <label htmlFor="privateInsurance">Private insurance info *</label>
              <input
                type="text"
                id="privateInsurance"
                placeholder="Provider name & ID# (or type N/A)"
                value={formData.privateInsurance}
                onChange={(e) => handleInputChange('privateInsurance', e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="medicare">Medicare # *</label>
                <input
                  type="text"
                  id="medicare"
                  placeholder="Medicare # or N/A"
                  value={formData.medicare}
                  onChange={(e) => handleInputChange('medicare', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="medicaid">Medicaid # *</label>
                <input
                  type="text"
                  id="medicaid"
                  placeholder="Medicaid # or N/A"
                  value={formData.medicaid}
                  onChange={(e) => handleInputChange('medicaid', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Reason for Referral */}
          <div className="form-section">
            <h3>Reason for referral</h3>
            <div className="form-group">
              <label htmlFor="referralSource">Referral source (name & phone #)</label>
              <input
                type="text"
                id="referralSource"
                placeholder="Dr. Jane Doe - (555) 987-6543"
                value={formData.referralSource}
                onChange={(e) => handleInputChange('referralSource', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="symptoms">Symptoms</label>
              <textarea
                id="symptoms"
                placeholder="Describe current symptoms or concerns"
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="servicesRequesting">Services requesting</label>
              <textarea
                id="servicesRequesting"
                placeholder="e.g., Psychiatric evaluation, medication management"
                value={formData.servicesRequesting}
                onChange={(e) => handleInputChange('servicesRequesting', e.target.value)}
                rows="3"
              />
            </div>
          </div>

          {/* History */}
          <div className="form-section">
            <h3>History</h3>
            <div className="form-group">
              <label htmlFor="currentTreatmentProvider">Current treatment provider (name & phone #)</label>
              <input
                type="text"
                id="currentTreatmentProvider"
                placeholder="Provider name & contact (or leave blank)"
                value={formData.currentTreatmentProvider}
                onChange={(e) => handleInputChange('currentTreatmentProvider', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mentalHealthDiagnosis">Mental health diagnosis</label>
              <textarea
                id="mentalHealthDiagnosis"
                placeholder="Previous or current diagnoses"
                value={formData.mentalHealthDiagnosis}
                onChange={(e) => handleInputChange('mentalHealthDiagnosis', e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="substanceUse">Substance use</label>
              <textarea
                id="substanceUse"
                placeholder="Current or past substance use history"
                value={formData.substanceUse}
                onChange={(e) => handleInputChange('substanceUse', e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="specialNeeds">MR/developmental disabilities/special needs</label>
              <textarea
                id="specialNeeds"
                placeholder="Any accommodations or special needs"
                value={formData.specialNeeds}
                onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                rows="3"
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

export default PatientReferralForm;