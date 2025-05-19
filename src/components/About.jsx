import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-page">
      <div className="about-container">
        <h1 className="about-title">Meet Felicia Davis, MSN, PMHNP-BC, FNP-BC</h1>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              As a board-certified nurse practitioner in both family and psychiatric medicine, Felicia Davis brings a rare depth of training and heart to every patient interaction. While her clinical experience spans family practice, her true passion lies in psychiatry—particularly in supporting individuals living with chronic mental illness, providing crisis stabilization, and guiding recovery from addiction.
            </p>
            
            <p>
              Over the past decade, Felicia has served patients across a wide range of settings—including inpatient forensic psychiatry, community mental health centers, outpatient clinics, and emergency departments. Today, she provides emergency psychiatric evaluations and consultations to hospitalized patients, working at the intersection of physical and mental health.
            </p>
            
            <p>
              Felicia's educational journey reflects her deep commitment to lifelong learning and care excellence. She holds a Bachelor of Arts in Sociology and Criminal Justice from Norfolk State University, an Associate's degree from Queens University, and a Bachelor of Science in Nursing from Winston-Salem State University. She later completed a Master of Science in Nursing at Winston-Salem State and earned a Post-Master's Certificate in Psychiatric Mental Health Nursing from Husson University.
            </p>
            
            <p>
              Felicia founded Windsong Family and Psychiatric Associates with a simple but powerful mission: to expand access to compassionate, evidence-based care—especially for those who've historically been underserved or overlooked. Her work is guided by the belief that every person deserves dignity, hope, and the opportunity to heal.
            </p>
            
            <p>
              "All To Thee I Owe" is more than a phrase for Felicia—it's a personal expression of gratitude, purpose, and service that continues to shape how she shows up for her patients each day.
            </p>
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