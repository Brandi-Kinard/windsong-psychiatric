import React from 'react';
import './ServicesPage.css';
import '../styles/icons.css';

const ServicesPage = () => {
  const services = [
    {
      title: 'Psychiatric evaluations',
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Psychiatric%20evaluations.png',
      iconAlt: 'Psychiatric evaluations icon',
      description: 'Comprehensive assessments and diagnoses',
      details: [
        'Clinical evaluation and diagnosis',
        'Treatment plan development',
        'Cognitive assessments',
        'Risk assessment',
        'Second opinions'
      ],
      approach: 'Through thorough clinical evaluations, we gather comprehensive information to develop personalized treatment plans tailored to your specific needs.',
      color: '#E3F2FD'
    },
    {
      title: 'Medication management',
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Medication%20management.png',
      iconAlt: 'Medication management icon',
      description: 'Expert psychiatric medication treatment',
      details: [
        'Medication selection and titration',
        'Side effect monitoring',
        'Regular follow-ups',
        'Coordination with other providers',
        'Medication education'
      ],
      approach: 'We work collaboratively to find the right medication regimen that provides maximum benefit with minimal side effects.',
      color: '#FFF3E0'
    },
    {
      title: 'Telemedicine',
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Telemedicine.png',
      iconAlt: 'Telemedicine icon',
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
    },
    {
      title: 'Specialized care',
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Specialized%20care.png',
      iconAlt: 'Specialized care icon',
      description: 'Targeted treatment for specific conditions',
      details: [
        'Evidence-based therapies',
        'Individualized treatment plans',
        'Holistic approach',
        'Family involvement when appropriate',
        'Long-term management strategies'
      ],
      approach: 'We provide specialized treatment approaches tailored to specific mental health conditions, ensuring the most effective care for each patient.',
      color: '#F3E5F5'
    },
    {
      title: 'Injections',
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/injection.png',
      iconAlt: 'Injections icon',
      description: 'Medical injections for psychiatric conditions',
      details: [
        'Long-acting antipsychotics',
        'Mood stabilizer injections',
        'Vitamin B12 injections',
        'Monthly medication options',
        'Reduced medication non-compliance'
      ],
      approach: 'Injectable medications provide sustained treatment with improved adherence, offering convenience and consistent therapeutic levels.',
      color: '#E8EAF6'
    },
    {
      title: 'Prevention & wellness',
      icon: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/prevention%20and%20wellness.png',
      iconAlt: 'Prevention and wellness icon',
      description: 'Proactive mental health strategies',
      details: [
        'Stress management techniques',
        'Wellness education',
        'Lifestyle counseling',
        'Early intervention programs',
        'Mental health maintenance'
      ],
      approach: 'We believe in preventing mental health issues before they arise through education, healthy lifestyle promotion, and early intervention.',
      color: '#FFF8E1'
    }
  ];

  const treatmentAreas = [
    {
      category: 'Mood disorders',
      conditions: [
        { name: 'Depression', description: 'Persistent feelings of sadness or loss of interest in activities, causing significant impairment in daily life.' },
        { name: 'Bipolar disorder', description: 'Episodes of unusual and extreme mood swings ranging from depressive lows to manic highs, affecting the ability to carry out day-to-day tasks.' },
        { name: 'Major depressive disorder', description: 'Severe, persistent depression that interferes with daily functioning and quality of life.' }
      ]
    },
    {
      category: 'Anxiety & stress disorders',
      conditions: [
        { name: 'Anxiety', description: 'Intense, excessive, and persistent worry and fear about everyday situations. Fast heart rate, rapid breathing, sweating, and feeling tired may occur.' },
        { name: 'OCD', description: 'Centers on themes such as fear of germs or the need to arrange objects in a specific manner. Symptoms usually begin gradually and vary throughout life.' },
        { name: 'PTSD (Trauma)', description: 'Includes nightmares or unwanted memories of trauma, avoidance of triggering situations, heightened reactions, anxiety, or depressed mood.' }
      ]
    },
    {
      category: 'Psychotic disorders',
      conditions: [
        { name: 'Schizophrenia', description: 'Thoughts or experiences that seem out of touch with reality, disorganized speech or behavior, and decreased participation in daily activities.' },
        { name: 'Schizoaffective disorder', description: 'A combination of schizophrenia symptoms and mood disorder symptoms.' }
      ]
    },
    {
      category: 'Neurodevelopmental & cognitive',
      conditions: [
        { name: 'ADHD', description: 'Symptoms of inattention, distractibility, and poor working memory such as trouble focusing, forgetting appointments, and struggling with executive functions.' },
        { name: 'Dementia', description: 'Progressive decline in cognitive function, memory, and ability to perform everyday activities.' },
        { name: 'Cognitive assessments', description: 'Comprehensive evaluations of memory, thinking, and reasoning abilities.' }
      ]
    },
    {
      category: 'Sleep & other conditions',
      conditions: [
        { name: 'Insomnia', description: 'Having difficulty falling or staying asleep and not feeling well-rested.' },
        { name: 'Adjustment disorder', description: 'Difficulty coping with stressful life events or significant changes.' },
        { name: 'Grief', description: 'Support for processing loss and bereavement.' }
      ]
    }
  ];

  const geriatricServices = {
    title: 'Geriatric care',
    features: [
      'In-home visits',
      'Facility visits',
      'Dementia care',
      'Medication management',
      'Family support and education',
      'Coordination with medical providers',
      'Cognitive assessments',
      'End-of-life mental health support'
    ]
  };

  return (
    <section className="services-page">
      <div className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-hero-title">Our services</h1>
          <p className="services-hero-subtitle">
            At Windsong Family Psychiatric Associates, we provide evidence-based mental health 
            treatment in a warm, supportive environment. Our services address a wide range of 
            psychiatric conditions, with treatment plans customized to each individual's needs.
          </p>
        </div>
      </div>

      {/* Main Services */}
      <div className="services-section">
        <div className="services-grid-container">
          {services.map((service, index) => (
            <div key={index} className="service-detail-card">
              <div className="service-detail-icon">
                {service.icon.startsWith('http') ? (
                  <img src={service.icon} alt={service.iconAlt} />
                ) : (
                  <span className="service-detail-icon-emoji">{service.icon}</span>
                )}
              </div>
              <h2 className="service-detail-title">{service.title}</h2>
              <p className="service-detail-description">{service.description}</p>
              
              <div className="service-detail-content">
                <h3 className="service-detail-subtitle">What's included</h3>
                <ul className="service-detail-list">
                  {service.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
                
                <h3 className="service-detail-subtitle">Our approach</h3>
                <p className="service-detail-approach">{service.approach}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Areas */}
      <div className="treatment-areas-section">
        <h2 className="section-title">Conditions we treat</h2>
        <div className="treatment-areas-grid">
          {treatmentAreas.map((category, index) => (
            <div key={index} className="treatment-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="conditions-list">
                {category.conditions.map((condition, idx) => (
                  <div key={idx} className="condition-item">
                    <h4 className="condition-name">{condition.name}</h4>
                    <p className="condition-description">{condition.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geriatric Specialty Section */}
      <div className="geriatric-section">
        <div className="geriatric-content">
          <h2 className="section-title">{geriatricServices.title}</h2>
          <div className="geriatric-features">
            <ul className="geriatric-list">
              {geriatricServices.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="services-cta-section">
        <div className="services-cta-container">
          <h2 className="services-cta-title">Ready to start your journey?</h2>
          <p className="services-cta-text">
            Take the first step toward better mental health. We're here to support you every step of the way.
          </p>
          <div className="services-cta-buttons">
            <div className="services-cta-option">
              <a href="/new-patient" className="services-cta-button primary">
                <span className="cta-button-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/Get%20started.png" alt="Sparkles" /></span>
                Get started
              </a>
              <p className="services-cta-caption">New patients begin here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;