import React from 'react';
import './HelpfulResources.css';

const HelpfulResources = () => {
  const resources = [
    {
      title: 'Life-Threatening Emergency',
      number: '911',
      isEmergency: true
    },
    {
      title: 'Mental Health Emergency Hotline',
      number: '988'
    },
    {
      title: 'National Suicide Hotline',
      number: '1-800-273-TALK (8255)'
    },
    {
      title: 'National Sexual Assault Hotline',
      number: '1-800-656-HOPE (4673)'
    },
    {
      title: 'National Domestic Violence Hotline',
      number: '1-800-799-SAFE (7233)'
    },
    {
      title: 'National Council on Alcoholism & Drug Dependency',
      number: '1-800-622-2255'
    }
  ];

  return (
    <div className="helpful-resources-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Helpful Resources</h1>
          <p className="page-subtitle">Crisis support and mental health resources available 24/7</p>
        </div>
        <div className="hero-image">
          <img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/green-robbin-hero.png" alt="Mental health awareness green ribbon" />
        </div>
      </div>

      <div className="resources-section">
        <h2 className="section-title">National Alliance on Mental Illness Crisis Hotlines</h2>
        <div className="resources-grid">
          {resources.map((resource, index) => (
            <div key={index} className={`resource-card ${resource.isEmergency ? 'emergency' : ''}`}>
              <h3 className="resource-title">{resource.title}</h3>
              <a href={`tel:${resource.number.replace(/[^0-9]/g, '')}`} className="resource-number">
                {resource.number}
              </a>
              {resource.description && (
                <p className="resource-description">{resource.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpfulResources;