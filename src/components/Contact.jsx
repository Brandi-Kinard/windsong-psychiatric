import React, { useState } from 'react';
import './Contact.css';
import '../styles/icons.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Get in touch</h2>
        
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="contact-submit">Send message</button>
          </form>
          
          <div className="contact-info">
            <div className="info-item">
              <h3><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/location.png" alt="Location pin" /> Location</h3>
              <p>123 Wellness Drive<br />Miami, FL 33101</p>
            </div>
            
            <div className="info-item">
              <h3><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/phone.png" alt="Phone" /> Phone</h3>
              <p>980-585-2019</p>
            </div>
            
            <div className="info-item">
              <h3>Email</h3>
              <p>info@windsongpsychiatric.com</p>
            </div>
            
            <div className="info-item">
              <h3><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/hours.png" alt="Clock" /> Hours</h3>
              <p>Monday–Thursday: 8:00 AM – 7:00 PM<br />Friday–Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;