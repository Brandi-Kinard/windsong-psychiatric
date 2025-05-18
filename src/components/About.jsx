import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-page">
      <div className="about-container">
        <h1 className="about-title">Meet Felicia Davis, MSN, PMHNP-BC, FNP-BC</h1>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-greeting">Hello, my name is Felicia Davis.</p>
            
            <p>
              I am a board-certified nurse practitioner in both Family Medicine and Psychiatric Mental Health. 
              While my clinical background includes experience in both fields, I have focused exclusively on 
              psychiatry since 2015. My areas of expertise include the care of individuals with persistent 
              mental illness, acute psychiatric stabilization, and addiction medicine.
            </p>
            
            <p>
              Over the years, I've had the privilege of working across a variety of settings—including 
              inpatient forensic psychiatry, community mental health clinics, outpatient care, and 
              hospital-based psychiatric consultation. I currently provide psychiatric support in acute 
              and emergency settings, including consultation to medically hospitalized patients.
            </p>
            
            <p>
              My educational journey reflects a deep commitment to service and growth. I earned a Bachelor 
              of Arts in Sociology and Criminal Justice from Norfolk State University, followed by an 
              Associate's Degree from Queens University and a Bachelor of Science in Nursing from 
              Winston-Salem State University. To advance my career, I completed a Master of Science in 
              Nursing at Winston-Salem State, and later obtained a Post-Master's Certificate in Psychiatric 
              Mental Health Nursing from Husson University.
            </p>
            
            <p>
              Providing psychiatric care is not just my profession—it is my calling. I'm passionate about 
              supporting individuals on their path to healing and mental wellness. The mission behind 
              Windsong Family Psychiatric Associates is rooted in a commitment to compassionate care, 
              reducing disparities in treatment access, and promoting mental health awareness in the 
              communities we serve.
            </p>
            
            <p>
              At the heart of our practice are three core values: restoring hope, upholding respect, 
              and empowering individuals.
            </p>
            
            <p className="about-quote">"All to Thee I Owe."</p>
          </div>
          
          <div className="about-image">
            <div className="about-image-background"></div>
            <img 
              src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/felicia-davis.avif" 
              alt="Felicia Davis, MSN, PMHNP-BC, FNP-BC" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;