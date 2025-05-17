import React from 'react';
import './Locations.css';

const Locations = () => {
  const locations = [
    {
      name: 'Huntersville, NC',
      image: '/images/huntersville-office.jpg',
      address: '16740 Cranlyn Road\nSuite 201\nHuntersville, NC 28078',
      phone: '(704) 688-4199',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: By Appointment',
      link: 'https://maps.google.com/?q=16740+Cranlyn+Road+Huntersville+NC',
      linkText: 'Get directions'
    },
    {
      name: 'Fort Mill, SC',
      image: '/images/fort-mill-office.jpg',
      address: '200 Tom Hall Street\nSuite 102\nFort Mill, SC 29715',
      phone: '(803) 547-2000',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: By Appointment',
      link: 'https://maps.google.com/?q=200+Tom+Hall+Street+Fort+Mill+SC',
      linkText: 'Get directions'
    },
    {
      name: 'Virtual Care',
      image: '/images/virtual-care.jpg',
      address: 'Available throughout\nNorth & South Carolina',
      phone: '(980) 585-2019',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM',
      link: '/virtual-care',
      linkText: 'Learn more'
    }
  ];

  return (
    <section className="locations" id="locations">
      <div className="locations-container">
        <h2 className="locations-title">Our Locations</h2>
        <p className="locations-subtitle">Convenient care where you need it</p>
        
        <div className="locations-grid">
          {locations.map((location, index) => (
            <div key={index} className="location-card">
              <div className="location-image">
                <img src={location.image} alt={location.name} />
              </div>
              
              <div className="location-content">
                <h3 className="location-name">{location.name}</h3>
                
                <div className="location-info">
                  <div className="location-address">
                    <span className="location-icon">📍</span>
                    <pre>{location.address}</pre>
                  </div>
                  
                  <div className="location-phone">
                    <span className="location-icon">📞</span>
                    <a href={`tel:${location.phone.replace(/\D/g, '')}`}>{location.phone}</a>
                  </div>
                  
                  <div className="location-hours">
                    <span className="location-icon">🕐</span>
                    <pre>{location.hours}</pre>
                  </div>
                </div>
                
                <a href={location.link} className="location-link">
                  {location.linkText} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;