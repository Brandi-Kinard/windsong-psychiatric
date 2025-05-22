import React from 'react';
import './Insurance.css';

const Insurance = () => {
  const insuranceLogos = [
    { name: 'Tricare', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/tricare.png' },
    { name: 'Blue Cross Blue Shield', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/blue-cross.png' },
    { name: 'Medicaid', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/medicaid.png' },
    { name: 'Humana', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/humana.png' },
    { name: 'United Healthcare', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/united-healthcare.png' },
    { name: 'Medicare', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/medicare.png' },
    { name: 'Cigna', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/cigna.png' },
    { name: 'Aetna', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/aetna.png' },
    { name: 'Partners', src: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/partners.png' }
  ];

  return (
    <section className="insurance" id="insurance">
      <div className="insurance-container">
        <h2 className="insurance-title">We accept nearly all major insurance plans including:</h2>
        <div className="insurance-logos">
          {insuranceLogos.map((logo, index) => (
            <div key={index} className="insurance-logo-item">
              <img 
                src={logo.src} 
                alt={logo.name}
                className="insurance-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insurance;