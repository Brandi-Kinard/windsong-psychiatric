import React from 'react';
import './HelpfulResources.css';

const HelpfulResources = () => {
  const resources = [
    {
      title: 'NATIONAL ALLIANCE ON MENTAL ILLNESS CRISIS HOTLINES',
      subtitle: 'Mental Health Emergency Hotline',
      number: '988',
      description: 'If you\'re overwhelmed or in a crisis and it is after business hours, you can call or text 988 anytime for support from the Suicide & Crisis Lifeline.'
    },
    {
      title: 'NATIONAL SUICIDE HOTLINE',
      number: '1-800-273-TALK (8255)'
    },
    {
      title: 'NATIONAL SEXUAL ASSAULT HOTLINE',
      number: '1-800-656-HOPE (4673)'
    },
    {
      title: 'NATIONAL DOMESTIC VIOLENCE HOTLINE',
      number: '1-800-799-SAFE (7233)'
    },
    {
      title: 'National Council on Alcoholism & Drug Dependency',
      number: '1-800-622-2255'
    }
  ];

  return (
    <div className="helpful-resources-page">
      <div className="page-header">
        <h1>Helpful resources</h1>
        <p className="page-subtitle">Crisis support and mental health resources available 24/7</p>
      </div>

      <div className="emergency-notice">
        <p><strong>If you are experiencing a life-threatening emergency, please call 911 immediately.</strong></p>
      </div>

      <div className="resources-container">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card">
            <h3 className="resource-title">{resource.title}</h3>
            {resource.subtitle && <p className="resource-subtitle">{resource.subtitle}</p>}
            <a href={`tel:${resource.number.replace(/[^0-9]/g, '')}`} className="resource-number">
              {resource.number}
            </a>
            {resource.description && <p className="resource-description">{resource.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpfulResources;