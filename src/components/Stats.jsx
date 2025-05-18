import React from 'react';
import './Stats.css';

const Stats = () => {
  const statsData = [
    { 
      image: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/symptom-improvement.png',
      label: 'Symptom improvement',
      description: 'Patients report significant improvement in their mental health symptoms'
    },
    { 
      image: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/patient-satisfied.png',
      label: 'Patient satisfied',
      description: 'Our patients rate their care experience as excellent'
    },
    { 
      image: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/response-time.png',
      label: 'Response time',
      description: 'Quick response to all patient inquiries and concerns'
    }
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-item">
            <img src={stat.image} alt={stat.label} className="stat-image" />
            <div className="stat-label">{stat.label}</div>
            <div className="stat-description">{stat.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;