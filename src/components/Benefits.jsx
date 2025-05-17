import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefitsData = [
    {
      icon: '🛡️',
      title: 'Care for every age',
      description: 'We provide specialized mental health care for children, adolescents, adults, and seniors, ensuring age-appropriate treatment approaches.'
    },
    {
      icon: '❤️',
      title: 'Experienced providers',
      description: 'Our team of board-certified psychiatrists and licensed therapists brings decades of combined experience in mental health care.'
    },
    {
      icon: '🧠',
      title: 'Whole-person approach',
      description: 'We treat the whole person, not just symptoms, integrating physical health, lifestyle, and environmental factors into your care plan.'
    }
  ];

  return (
    <section className="benefits" id="benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">Why Choose Windsong Psychiatric</h2>
          <p className="benefits-subtitle">Evidence-based care that puts you first</p>
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