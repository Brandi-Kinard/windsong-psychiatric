import React from 'react';
import './PoliciesModal.css';

const PoliciesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const privacyContent = `🌿 POLICIES & FEES

At Windsong Family & Psychiatric Associates, we are committed to providing compassionate, personalized care. To ensure a smooth experience for all our clients, we've outlined our policies and fees below.

📅 APPOINTMENT SCHEDULING & CANCELLATIONS

Scheduling
• Appointments can be made by calling our office at 980-585-2019 or through our Patient Portal
• We offer both in-person and telemedicine appointments

Cancellations
• We understand that life happens. If you need to cancel or reschedule, please provide at least 24 hours' notice
• This allows us to offer the slot to another client in need

Late Cancellations/No-Shows
• Appointments missed or canceled with less than 24 hours' notice may incur a fee
• We appreciate your understanding as this helps us manage our schedule effectively
• Emergency situations are handled on a case-by-case basis

💳 FEES & INSURANCE

Initial Psychiatric Evaluation (60-90 min)
• Insurance: Copay varies by plan
• Self-pay: $350-$450

Follow-Up Sessions
• Medication Management (15-30 min): $150-$200
• Psychotherapy Session (45-50 min): $175-$225
• Combined Therapy & Medication (60 min): $250-$300

Accepted Insurance
We accept most major insurance plans, including:
• Blue Cross Blue Shield
• Aetna  
• Cigna
• United Healthcare
• Medicare
• Medicaid
• It's advisable to check with your provider regarding coverage specifics

Self-Pay Options
• For clients without insurance, we offer self-pay rates
• Flexible payment plans available upon request
• Sliding scale fees based on financial need
• Please contact our office for more details

Payment Methods
• Payment is due at the time of service
• We accept cash, check, credit/debit cards, and HSA/FSA cards

💊 PRESCRIPTION REFILLS

During Appointments
• We recommend discussing medication needs during your scheduled sessions

Between Appointments  
• If you require a refill between appointments, please contact our office at least 3 business days in advance

After-Hours Requests
• Refill requests made outside of business hours will be addressed on the next business day

📄 FORMS & DOCUMENTATION

Standard Forms
• Completion of standard forms (e.g., work/school notes) is complimentary

Extended Documentation
• For detailed forms or letters (e.g., FMLA, disability), a fee may apply
• Please submit such requests well in advance to allow adequate processing time

🔐 PRIVACY & CONFIDENTIALITY

Your privacy is paramount. We adhere to all HIPAA regulations to ensure your personal and health information remains confidential.

Information We Collect
• Personal Information: Name, contact details, and health information necessary for treatment
• Technical Information: IP addresses, browser types, and website usage statistics
• Demographic Information: Age, gender, and location to better understand our patient population

How We Protect Your Information
• Encrypted data transmission using SSL protocols
• Secure servers with restricted access
• Regular security audits and updates
• Ongoing training on privacy and security best practices

Your Rights
You have the right to:
• Access your personal information
• Request corrections to your records
• Opt-out of certain communications
• Request restrictions on how we use your information

Third-Party Disclosure
We do not sell, trade, or otherwise transfer your personal information to third parties except:
• When necessary for treatment coordination with other healthcare providers
• For payment processing and insurance claims
• When required by law or court order
• With your explicit consent

📞 CONTACT US

If you have any questions or need assistance, our friendly staff is here to help.

Phone: 980-585-2019
Email: info@windsongpsychiatric.com
Address: 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078
Office Hours: Monday–Thursday, 8:30 AM – 6:00 PM; Friday, 8:30 AM – 12:00 PM

We appreciate the opportunity to support your mental health journey. Thank you for choosing Windsong Family & Psychiatric Associates.`;

  return (
    <>
      <div className="policies-modal-overlay" onClick={onClose}></div>
      <div className="policies-modal">
        <div className="policies-modal-header">
          <h2>Policies & fees</h2>
          <button className="policies-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="policies-modal-content">
          <pre>{privacyContent}</pre>
        </div>
        <div className="policies-modal-footer">
          <button className="policies-modal-ok" onClick={onClose}>
            Accept
          </button>
        </div>
      </div>
    </>
  );
};

export default PoliciesModal;