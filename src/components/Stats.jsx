import React from 'react';
import './Stats.css';

const Stats = () => {
  const statsData = [
    { value: '10+', label: 'Years of Experience' },
    { value: '500+', label: 'Patients Helped' },
    { value: '95%', label: 'Patient Satisfaction' }
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;