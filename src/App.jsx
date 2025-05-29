import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Insurance from './components/Insurance';
import Stats from './components/Stats';
import Benefits from './components/Benefits';
import Provider from './components/Provider';
import Services from './components/Services';
import Locations from './components/Locations';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FixedButtons from './components/FixedButtons';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import NewPatientForm from './components/NewPatientForm';
import HelpfulResources from './components/HelpfulResources';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import PatientForms from './components/PatientForms';
import PatientReferralForm from './components/PatientReferralForm';
import ConsentForTreatmentForm from './components/ConsentForTreatmentForm';
import ReleaseOfInfoForm from './components/ReleaseOfInfoForm';
import NeurolepticConsentForm from './components/NeurolepticConsentForm';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function Home() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView();
        }, 0);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Insurance />
      <Benefits />
      <Stats />
      <Provider />
      <Services />
      <Locations />
      <CTA />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meet-felicia-davis" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/new-patient" element={<NewPatientForm />} />
          <Route path="/helpful-resources" element={<HelpfulResources />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/patient-forms" element={<PatientForms />} />
          <Route path="/patient-referral" element={<PatientReferralForm />} />
          <Route path="/consent-for-treatment" element={<ConsentForTreatmentForm />} />
          <Route path="/release-of-information" element={<ReleaseOfInfoForm />} />
          <Route path="/neuroleptic-consent" element={<NeurolepticConsentForm />} />
        </Routes>
        <Footer />
        <FixedButtons />
      </div>
    </Router>
  );
}

export default App;