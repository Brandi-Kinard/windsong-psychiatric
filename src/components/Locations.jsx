import React from 'react';
import './Locations.css';

const Locations = () => {
  const locations = [
    {
      name: 'Huntersville, NC',
      image: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-hospital+246D80(-80.8428,35.4107)/-80.8428,35.4107,14/400x300?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      address: '16740 Cranlyn Road\nSuite 201\nHuntersville, NC 28078',
      phone: '(704) 688-4199',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: By Appointment',
      link: 'https://maps.google.com/?q=16740+Cranlyn+Road+Huntersville+NC+28078',
      linkText: 'Get directions',
      mapLink: 'https://www.google.com/maps/dir//16740+Cranlyn+Road,+Suite+201,+Huntersville,+NC+28078'
    },
    {
      name: 'Fort Mill, SC',
      image: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-hospital+246D80(-80.9744,35.0074)/-80.9744,35.0074,14/400x300?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      address: '200 Tom Hall Street\nSuite 102\nFort Mill, SC 29715',
      phone: '(803) 547-2000',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: By Appointment',
      link: 'https://maps.google.com/?q=200+Tom+Hall+Street+Fort+Mill+SC+29715',
      linkText: 'Get directions',
      mapLink: 'https://www.google.com/maps/dir//200+Tom+Hall+Street,+Suite+102,+Fort+Mill,+SC+29715'
    },
    {
      name: 'Virtual Care',
      image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop&crop=center',
      address: 'Available throughout\nNorth & South Carolina',
      phone: '(980) 585-2019',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM',
      link: '/virtual-care',
      linkText: 'Learn more',
      mapLink: null
    }
  ];

  return (
    <section className="locations" id="locations">
      <div className="locations-container">
        <h2 className="locations-title">Our locations</h2>
        <p className="locations-subtitle">Convenient care where you need it</p>
        
        <div className="locations-grid">
          {locations.map((location, index) => (
            <div key={index} className="location-card">
              <div className="location-image">
                {location.mapLink ? (
                  <a href={location.mapLink} target="_blank" rel="noopener noreferrer" title="Get directions">
                    <img src={location.image} alt={`Map of ${location.name}`} />
                  </a>
                ) : (
                  <img src={location.image} alt={location.name} />
                )}
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