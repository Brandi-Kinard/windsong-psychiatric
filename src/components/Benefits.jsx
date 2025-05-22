import React from 'react';
import './Benefits.css';
import '../styles/icons.css';

const Benefits = () => {
  const benefitsData = [
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Care%20for%20everyone.png',
      iconAlt: 'Brain icon',
      title: 'Care for every age',
      description: 'Provides specialized mental health care for children, adolescents, adults, and seniors, ensuring age-appropriate treatment approaches.'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Experienced%20provider.png',
      iconAlt: 'Stethoscope icon',
      title: 'Experienced provider',
      description: 'A board-certified psychiatric provider with over a decade of experience in mental health care.'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Whole-person%20approach.png',
      iconAlt: 'Person icon',
      title: 'Whole-person approach',
      description: 'Treats the whole person, not just symptoms, integrating physical health, lifestyle, and environmental factors into your care plan.'
    }
  ];

  return (
    <section className="benefits" id="benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">Why choose Windsong Psychiatric Associates</h2>
          <p className="benefits-subtitle">Evidence-based care that puts you first, offering the right treatment at the right time</p>
        </div>
        
        <div className="benefits-grid">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-icon-wrapper">
                <div className="benefit-icon">
                  <img src={benefit.icon} alt={benefit.iconAlt} />
                </div>
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;