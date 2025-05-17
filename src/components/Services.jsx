import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '🧠',
      title: 'Individual Therapy',
      description: 'One-on-one sessions tailored to your unique needs and goals'
    },
    {
      icon: '👥',
      title: 'Group Therapy',
      description: 'Connect with others in a supportive group environment'
    },
    {
      icon: '💊',
      title: 'Medication Management',
      description: 'Expert psychiatric evaluation and medication monitoring'
    },
    {
      icon: '📋',
      title: 'Psychological Assessment',
      description: 'Comprehensive evaluations to better understand your needs'
    },
    {
      icon: '🏥',
      title: 'Crisis Intervention',
      description: '24/7 support for urgent mental health concerns'
    },
    {
      icon: '📱',
      title: 'Telepsychiatry',
      description: 'Convenient virtual appointments from anywhere'
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;