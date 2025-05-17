import React from 'react';
import './PoliciesModal.css';

const PoliciesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const privacyContent = `PRIVACY STATEMENT

At Windsong Family & Psychiatric Associates, we are committed to protecting your privacy and ensuring a safe online experience. This Privacy Statement outlines how we collect, use, and protect your information.

Information We Collect
• Personal Information: We collect information you provide directly, such as your name, contact details, and health information necessary for treatment.
• Technical Information: We automatically collect certain technical data including IP addresses, browser types, and website usage statistics to improve our services.
• Demographic Information: We may collect non-identifying information such as age, gender, and location to better understand our patient population.

How We Use Your Information
• To provide and improve our mental health services
• To communicate with you about appointments, treatment, and health information
• To process payments and insurance claims
• To comply with legal and regulatory requirements
• To improve our website and patient experience

Information Protection
We implement industry-standard security measures to protect your personal health information:
• Encrypted data transmission using SSL protocols
• Secure servers with restricted access
• Regular security audits and updates
• Staff training on privacy and security practices

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

Contact Information
For privacy concerns or questions, please contact us:
Phone: 980-585-2019
Address: 9820 Northcross Center Court, Suite 50, Huntersville, NC 28078
Email: privacy@windsongpsychiatric.com

FEES AND PAYMENT POLICIES

Insurance Coverage
We accept most major insurance plans, including:
• Blue Cross Blue Shield
• Aetna
• Cigna
• United Healthcare
• Medicare
• Medicaid
• And many others

Please verify your specific coverage before your appointment.

Self-Pay Rates
For patients without insurance or choosing to self-pay:
• Initial Psychiatric Evaluation (60-90 min): $350-$450
• Medication Management (15-30 min): $150-$200
• Psychotherapy Session (45-50 min): $175-$225
• Combined Therapy & Medication (60 min): $250-$300

Payment Options
• Cash, check, or credit card accepted
• Payment due at time of service
• Flexible payment plans available upon request
• Sliding scale fees based on financial need

Cancellation Policy
• 24-hour notice required for cancellations
• Late cancellations or no-shows may incur a fee
• Emergency situations handled on a case-by-case basis

Questions?
Our billing department is available to discuss payment options, insurance coverage, and financial assistance programs. We believe cost should not be a barrier to mental health care.`;

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