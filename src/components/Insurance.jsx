import React from 'react';
import './Insurance.css';

const Insurance = () => {
  return (
    <section className="insurance" id="insurance">
      <div className="insurance-container">
        <h2 className="insurance-title">We accept nearly all major insurance plans including:</h2>
        <div className="insurance-logos">
          <img 
            src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/insurance1.png" 
            alt="Accepted insurance providers"
            className="insurance-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Insurance;