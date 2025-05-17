import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '📋',
      title: 'Psychiatric Evaluations',
      description: 'Comprehensive assessments to understand your mental health needs and create personalized treatment plans',
      link: '/services/evaluations'
    },
    {
      icon: '💊',
      title: 'Medication Management',
      description: 'Expert psychiatric medication evaluation, prescribing, and ongoing monitoring for optimal results',
      link: '/services/medication'
    },
    {
      icon: '🖥️',
      title: 'Telemedicine',
      description: 'Convenient virtual appointments from the comfort of your home with the same quality care',
      link: '/services/telemedicine'
    },
    {
      icon: '⭐',
      title: 'Specialized Care',
      description: 'Focused treatment for anxiety, depression, ADHD, trauma, and other mental health conditions',
      link: '/services/specialized'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href={service.link} className="service-link">Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;