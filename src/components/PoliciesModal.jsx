import React, { useState } from 'react';
import './PoliciesModal.css';
import '../styles/icons.css';

const PoliciesModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('fees');

  if (!isOpen) return null;

  const feesContent = (
    <div className="tab-content">
      <h3>Service fees</h3>
      
      <p className="payment-due">Payment is due at the time of service</p>
      <p className="payment-methods">• We accept cash, check, credit/debit cards, and HSA/FSA cards</p>
      
      <div className="services-list">
        <div className="service-item">
          <h4>New Patient Visit - $280</h4>
          <p>Self pay fee for Initial Appointments</p>
        </div>
        
        <div className="service-item">
          <h4>Follow Up Visit - $140</h4>
          <p>Self pay fee for Established Patient Appointments</p>
        </div>
        
        <div className="service-item">
          <h4>Forms - $10 per page</h4>
          <p>The completion of detailed forms for use outside of the patient's medical record (e.g. Pre-Employment, Workman's Comp, Disability, Life Insurance, Family Medical Leave)</p>
          <p className="note">Completion of standard forms (work/school notes, e.g.) is complimentary</p>
        </div>
      </div>
      
      <h3>Appointment Scheduling & Cancellations</h3>
      
      <p>We know life can be unpredictable, and we're here to support you. Appointments can be made by calling our office at 980-585-2019 or through our Patient Portal. We offer both in-person and telemedicine appointments.</p>
      
      <p>If you need to cancel or reschedule an appointment, please let us know at least 24 hours in advance. This allows us to offer the slot to another client in need.</p>
      
      <p><strong>Late Cancellations</strong> (less than 24 hours' notice): May incur a fee of $50</p>
      <p><strong>No-Show Appointments</strong> (missed without notice): May incur a fee of $120</p>
      
      <p className="emergency-notice">We understand that emergencies happen. If your cancellation is due to an unforeseen circumstance, please let us know — we may be able to waive the fee. Emergency situations are handled on a case-by-case basis. We appreciate your understanding as this helps us manage our schedule effectively.</p>
    </div>
  );

  const policiesContent = (
    <div className="tab-content">
      <h3>Attendance Policy</h3>
      
      <p>We understand that unexpected situations can arise. Each patient is allowed up to two late cancellations or missed appointments. After the second occurrence, continued care at our practice may be discontinued.</p>
      
      <p className="policy-note"><strong>Please note:</strong> Fees for missed appointments and late cancellations are the responsibility of the patient and are not covered by insurance.</p>
    </div>
  );

  return (
    <>
      <div className="policies-modal-overlay" onClick={onClose}></div>
      <div className="policies-modal">
        <div className="policies-modal-header">
          <div className="header-title">
            <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/branch.png" alt="Branch icon" className="header-icon" />
            <h2>Policies & fees</h2>
          </div>
          <button className="policies-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
          <p className="header-description">
            At Windsong Family & Psychiatric Associates, we are committed to providing compassionate, personalized care. To ensure a smooth experience for all our clients, we've outlined our policies and fees below.
          </p>
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'fees' ? 'active' : ''}`}
              onClick={() => setActiveTab('fees')}
            >
              Fees
            </button>
            <button 
              className={`tab-button ${activeTab === 'policies' ? 'active' : ''}`}
              onClick={() => setActiveTab('policies')}
            >
              Policies
            </button>
          </div>
        </div>
        <div className="policies-modal-content">
          {activeTab === 'fees' ? feesContent : policiesContent}
        </div>
        <div className="policies-modal-footer">
          <button className="policies-modal-ok" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PoliciesModal;