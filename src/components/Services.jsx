import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import '../styles/icons.css';

const Services = () => {
  const services = [
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Psychiatric%20evaluations.png',
      iconAlt: 'Psychiatric evaluations icon',
      title: 'Psychiatric evaluations',
      description: 'Comprehensive assessments to understand your mental health needs and create personalized treatment plans',
      link: '/services'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Medication%20management.png',
      iconAlt: 'Medication management icon',
      title: 'Medication management',
      description: 'Expert psychiatric medication evaluation, prescribing, and ongoing monitoring for optimal results',
      link: '/services'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Telemedicine.png',
      iconAlt: 'Telemedicine icon',
      title: 'Telemedicine',
      description: 'Convenient virtual appointments from the comfort of your home with the same quality care',
      link: '/services'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Specialized%20care.png',
      iconAlt: 'Specialized care icon',
      title: 'Specialized care',
      description: 'Focused treatment for anxiety, depression, ADHD, trauma, and other mental health conditions',
      link: '/services'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <h2 className="services-title">Our services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <img src={service.icon} alt={service.iconAlt} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <Link to={service.link} className="service-link">Learn more</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;