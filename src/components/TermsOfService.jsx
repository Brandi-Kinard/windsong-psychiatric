import React from 'react';
import { Link } from 'react-router-dom';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="terms-of-service-page">
      <div className="terms-container">
        <h1>Terms of service</h1>
        
        <p><strong>Last updated: May 18, 2025</strong></p>
        
        <p>Welcome to the website of <strong>Windsong & Family Psychiatric Associates, PLLC</strong>. By accessing or using our website, you agree to the following terms and conditions. If you do not agree with these terms, please do not use the website.</p>
        
        <hr />
        
        <h3>1. Use of Website Content</h3>
        
        <p>All information provided on this website is for <strong>informational purposes only</strong> and should not be considered medical advice, diagnosis, or treatment. Always consult a licensed healthcare provider for personalized medical or mental health concerns.</p>
        
        <hr />
        
        <h3>2. No Provider-Patient Relationship</h3>
        
        <p>Using this website or submitting a contact form does not create a provider-patient relationship. Such a relationship is only established once you have completed intake and are formally accepted into care.</p>
        
        <hr />
        
        <h3>3. Appointment Requests and Forms</h3>
        
        <p>Our site may allow you to submit information for appointment scheduling or inquiries. Submissions are reviewed during normal business hours and do not guarantee an appointment until confirmed.</p>
        
        <hr />
        
        <h3>4. Communication Disclaimer</h3>
        
        <p>Email or text message reminders may be used for scheduling purposes. However, these methods are not intended for emergency communication or sharing sensitive health information. <strong>If you are experiencing a crisis, please call 988 or go to the nearest emergency room.</strong></p>
        
        <hr />
        
        <h3>5. Privacy and Confidentiality</h3>
        
        <p>We respect your privacy and are committed to protecting your information. Please refer to our <Link to="/privacy">Privacy policy</Link> for details about how we handle your data. Please note, standard website visits may be logged via cookies or analytics tools.</p>
        
        <hr />
        
        <h3>6. Third-Party Services</h3>
        
        <p>We may include links to third-party services (e.g., insurance verifiers, health resources). Windsong is not responsible for the content, policies, or accuracy of those external sites.</p>
        
        <hr />
        
        <h3>7. Intellectual Property</h3>
        
        <p>All text, logos, graphics, and media are the property of <strong>Windsong & Family Psychiatric Associates, PLLC</strong> unless otherwise noted. Unauthorized use or reproduction is prohibited.</p>
        
        <hr />
        
        <h3>8. Limitations of Liability</h3>
        
        <p>We are not liable for any damages or losses arising from your use of the site or reliance on the information presented here.</p>
        
        <hr />
        
        <h3>9. Changes to Terms</h3>
        
        <p>We may update these Terms of Service from time to time. Continued use of the website after updates means you accept the revised terms.</p>
        
        <hr />
        
        <p>If you have questions about these Terms, please contact us at:</p>
        
        <p>📧 <a href="mailto:contact@windsongpsychiatric.com">contact@windsongpsychiatric.com</a></p>
        
        <p>📞 <a href="tel:9805852019">980-585-2019</a></p>
      </div>
    </div>
  );
};

export default TermsOfService;