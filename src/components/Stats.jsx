import React from 'react';
import './Stats.css';

const Stats = () => {
  const statsData = [
    { 
      value: '87%', 
      label: 'Symptom improvement',
      description: 'Patients report significant improvement in their mental health symptoms'
    },
    { 
      value: '94%', 
      label: 'Patient satisfaction',
      description: 'Our patients rate their care experience as excellent'
    },
    { 
      value: '24h', 
      label: 'Response time',
      description: 'Quick response to all patient inquiries and concerns'
    }
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-description">{stat.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;