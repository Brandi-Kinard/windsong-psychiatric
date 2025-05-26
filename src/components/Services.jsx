import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import '../styles/icons.css';

const Services = () => {
  const services = [
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Psychiatric%20evaluations.png',
      iconAlt: 'Psychiatric evaluations icon',
      title: 'Psychiatric Evaluations',
      description: 'Comprehensive assessments to understand your mental health needs and create personalized treatment plans'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Medication%20management.png',
      iconAlt: 'Medication management icon',
      title: 'Medication Management',
      description: 'Expert psychiatric medication evaluation, prescribing, and ongoing monitoring for optimal results'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Telemedicine.png',
      iconAlt: 'Telemedicine icon',
      title: 'Telemedicine',
      description: 'Convenient virtual appointments from the comfort of your home with the same quality care'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Specialized%20care.png',
      iconAlt: 'Specialized care icon',
      title: 'Specialized Care',
      description: 'Focused treatment for anxiety, depression, ADHD, trauma, and other mental health conditions'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/injection.png',
      iconAlt: 'Injections icon',
      title: 'Injections',
      description: 'Medical injections for psychiatric conditions, including long-acting medications for sustained treatment'
    },
    {
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/prevention%20and%20wellness.png',
      iconAlt: 'Prevention and wellness icon',
      title: 'Prevention & Wellness',
      description: 'Patient advocate, proactive mental health strategies, and wellness programs to maintain optimal psychological well-being'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon.startsWith('http') ? (
                  <img src={service.icon} alt={service.iconAlt} />
                ) : (
                  <span className="service-icon-emoji">{service.icon}</span>
                )}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="services-learn-more">
          <Link to="/services" className="services-cta-button">
            Learn more about our services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;