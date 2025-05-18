import React from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  const services = [
    {
      title: 'Depression & Anxiety Treatment',
      icon: '🌤️',
      description: 'Expert care for mood disorders and anxiety conditions',
      details: [
        'Major Depressive Disorder',
        'Generalized Anxiety Disorder',
        'Panic Disorder',
        'Social Anxiety',
        'Seasonal Affective Disorder'
      ],
      approach: 'We use a combination of evidence-based therapies and medication management to help you find relief from symptoms and develop healthy coping strategies.',
      color: '#E3F2FD'
    },
    {
      title: 'ADHD Management',
      icon: '🎯',
      description: 'Comprehensive evaluation and treatment for attention disorders',
      details: [
        'Adult ADHD assessment',
        'Medication management',
        'Behavioral strategies',
        'Executive function support',
        'School/work accommodations'
      ],
      approach: 'Our holistic approach combines medication when appropriate with practical strategies to improve focus, organization, and daily functioning.',
      color: '#F3E5F5'
    },
    {
      title: 'Trauma Recovery',
      icon: '🌿',
      description: 'Healing support for PTSD and trauma-related conditions',
      details: [
        'Post-Traumatic Stress Disorder',
        'Complex trauma',
        'Childhood trauma',
        'Acute stress reactions',
        'Grief and loss'
      ],
      approach: 'Using trauma-informed care principles, we create a safe space for healing and help you process difficult experiences at your own pace.',
      color: '#E8F5E9'
    },
    {
      title: 'Medication Management',
      icon: '💊',
      description: 'Personalized psychiatric medication treatment',
      details: [
        'Initial psychiatric evaluation',
        'Medication selection and titration',
        'Side effect monitoring',
        'Regular follow-ups',
        'Coordination with other providers'
      ],
      approach: 'We carefully evaluate your needs and work collaboratively to find the right medication regimen that provides maximum benefit with minimal side effects.',
      color: '#FFF3E0'
    },
    {
      title: 'Couples & Family Support',
      icon: '❤️',
      description: 'Strengthening relationships through mental health care',
      details: [
        'Couples counseling',
        'Family therapy',
        'Communication skills',
        'Conflict resolution',
        'Relationship enhancement'
      ],
      approach: 'We help couples and families navigate mental health challenges together, improving communication and building stronger, healthier relationships.',
      color: '#FCE4EC'
    },
    {
      title: 'Telepsychiatry',
      icon: '💻',
      description: 'Convenient virtual mental health care',
      details: [
        'Secure video appointments',
        'Flexible scheduling',
        'Prescription management',
        'Follow-up care',
        'Crisis support'
      ],
      approach: 'Access quality psychiatric care from the comfort of your home with our secure, HIPAA-compliant telehealth platform.',
      color: '#E0F2F1'
    }
  ];

  return (
    <section className="services-page">
      <div className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-hero-title">Our Services</h1>
          <p className="services-hero-subtitle">
            Comprehensive psychiatric care tailored to your unique needs
          </p>
        </div>
      </div>

      <div className="services-intro">
        <div className="services-intro-container">
          <p className="services-intro-text">
            At Windsong Family Psychiatric Associates, we provide evidence-based mental health 
            treatment in a warm, supportive environment. Our comprehensive services address a 
            wide range of psychiatric conditions, with treatment plans customized to each 
            individual's specific needs and goals.
          </p>
        </div>
      </div>

      <div className="services-grid-container">
        {services.map((service, index) => (
          <div key={index} className="service-detail-card">
            <div 
              className="service-detail-header"
              style={{ backgroundColor: service.color }}
            >
              <span className="service-detail-icon">{service.icon}</span>
              <h2 className="service-detail-title">{service.title}</h2>
              <p className="service-detail-description">{service.description}</p>
            </div>
            
            <div className="service-detail-content">
              <h3 className="service-detail-subtitle">What We Treat</h3>
              <ul className="service-detail-list">
                {service.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
              
              <h3 className="service-detail-subtitle">Our Approach</h3>
              <p className="service-detail-approach">{service.approach}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="services-cta-section">
        <div className="services-cta-container">
          <h2 className="services-cta-title">Ready to Start Your Journey?</h2>
          <p className="services-cta-text">
            Take the first step toward better mental health. We're here to support you every step of the way.
          </p>
          <div className="services-cta-buttons">
            <a href="tel:9805852019" className="services-cta-button primary">
              Call (980) 585-2019
            </a>
            <a href="/patient-portal" className="services-cta-button secondary">
              Patient Portal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;