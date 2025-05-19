import React, { useState } from 'react';
import './Locations.css';
import '../styles/icons.css';

const Locations = () => {
  const locations = [
    {
      name: 'Huntersville, NC',
      image: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/huntersville.png',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.3090508308605!2d-80.86399598788918!3d35.44714257254964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a905bf400001%3A0xd79199411b30f474!2s9820%20Northcross%20Center%20Ct%20%2350%2C%20Huntersville%2C%20NC%2028078!5e0!3m2!1sen!2sus!4v1747537548863!5m2!1sen!2sus',
      useEmbed: true,
      address: '9820 Northcross Center Court\nSuite 50\nHuntersville, NC 28078',
      phone: '(704) 688-4199',
      hours: 'Mon–Thu: 8:30 AM – 6:00 PM\nFri: 8:30 AM – 12:00 PM\nSat & Sun: Closed',
      link: 'https://maps.google.com/?q=9820+Northcross+Center+Court+Huntersville+NC+28078',
      linkText: 'Get directions',
      mapLink: 'https://www.google.com/maps/dir//9820+Northcross+Center+Court,+Suite+50,+Huntersville,+NC+28078',
      lat: 35.4107,
      lng: -80.8428
    },
    {
      name: 'Fort Mill, SC',
      image: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/fort-mill.png',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.996578456237!2d-80.94278922424216!3d35.006790772812415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856845575be0347%3A0x2c1e0668d9a69920!2s200%20Tom%20Hall%20St%20%23102%2C%20Fort%20Mill%2C%20SC%2029715!5e0!3m2!1sen!2sus!4v1747537302551!5m2!1sen!2sus',
      useEmbed: true,
      address: '200 Tom Hall Street\nSuite 102\nFort Mill, SC 29715',
      phone: '(803) 547-2000',
      hours: 'Mon–Thu: 8:30 AM – 6:00 PM\nFri: 8:30 AM – 12:00 PM\nSat & Sun: Closed',
      link: 'https://maps.google.com/?q=200+Tom+Hall+Street+Fort+Mill+SC+29715',
      linkText: 'Get directions',
      mapLink: 'https://www.google.com/maps/dir//200+Tom+Hall+Street,+Suite+102,+Fort+Mill,+SC+29715',
      lat: 35.0074,
      lng: -80.9744
    },
    {
      name: 'Virtual Care',
      image: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/virtual-call.png',
      address: 'Available throughout\nNorth & South Carolina',
      phone: '(980) 585-2019',
      hours: 'Mon–Thu: 8:30 AM – 6:00 PM\nFri: 8:30 AM – 12:00 PM\nSat & Sun: Closed',
      link: '/virtual-care',
      linkText: 'Learn more',
      mapLink: null,
      lat: null,
      lng: null
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
                {location.useEmbed ? (
                  <iframe 
                    src={location.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{border:0}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${location.name}`}
                  />
                ) : location.mapLink ? (
                  <a href={location.mapLink} target="_blank" rel="noopener noreferrer" title="Get directions">
                    <img 
                      src={location.image} 
                      alt={`Map of ${location.name}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x200/EDF6F9/246D80?text=${encodeURIComponent(location.name)}`;
                      }}
                    />
                  </a>
                ) : (
                  <img 
                    src={location.image} 
                    alt={location.name}
                    loading="lazy"
                  />
                )}
              </div>
              
              <div className="location-content">
                <h3 className="location-name">{location.name}</h3>
                
                <div className="location-info">
                  <div className="location-address">
                    <span className="location-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/location.png" alt="Location pin" /></span>
                    <pre>{location.address}</pre>
                  </div>
                  
                  <div className="location-phone">
                    <span className="location-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/phone.png" alt="Phone" /></span>
                    <a href={`tel:${location.phone.replace(/\D/g, '')}`}>{location.phone}</a>
                  </div>
                  
                  <div className="location-hours">
                    <span className="location-icon"><img src="https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/windsong-psych/hours.png" alt="Clock" /></span>
                    <pre>{location.hours}</pre>
                  </div>
                </div>
                
                {location.name !== 'Virtual Care' && (
                  <a href={location.link} className="location-cta">
                    {location.linkText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;