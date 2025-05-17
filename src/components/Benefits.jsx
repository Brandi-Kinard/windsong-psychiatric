import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefitsData = [
    {
      icon: '🧠',
      title: 'Care for every age',
      description: 'Felicia provides specialized mental health care for children, adolescents, adults, and seniors, ensuring age-appropriate treatment approaches.'
    },
    {
      icon: '🩺',
      title: 'Experienced provider',
      description: 'Felicia Davis is a board-certified psychiatric provider with decades of experience in mental health care.'
    },
    {
      icon: '👤',
      title: 'Whole-person approach',
      description: 'Felicia treats the whole person, not just symptoms, integrating physical health, lifestyle, and environmental factors into your care plan.'
    }
  ];

  return (
    <section className="benefits" id="benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">Why choose Windsong Psychiatric</h2>
          <p className="benefits-subtitle">Evidence-based care that puts you first, offering the right treatment at the right time</p>
        </div>
        
        <div className="benefits-grid">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-icon-wrapper">
                <div className="benefit-icon">{benefit.icon}</div>
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