import React from 'react';  
import '../css/LandingPage.css'; // Import a CSS file for styling  
import Footer from './Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {  
  return (  
    <div className="landing-page">  
      <header className="header">  
        <h1>MedimateHub</h1>  
        <p>Your health, our priority!</p>  
      </header>  

      <main className="main-content">  
        <section className="info-section">  
          <h2>Welcome to MedimateHub</h2>  
          <p>  
            You can book your appointment with any doctor, clinic, or hospital.   
            Doctors can let everyone who has an appointment know about their working hours.   
            You can provide feedback on your treatment experiences and report any bad treatment   
            to the Department of Health.  
          </p>  
          <p>  
            Buy medication and book your line at any pharmacy. Before a nurse or doctor   
            starts treating you, they must report to the app. If they refuse, you have the right   
            to report them to the health department.  
          </p>  
          <p>  
            We also show which hospitals have available ambulances for emergencies and provide   
            information on hospitals, clinics, or doctors with low or high appointment availability.  
          </p>  
        </section>  

        <section className="action-section">  
          <h2>Get Started</h2>  
          <div className="button-group">  
            <Link to="/login" className="btn login-btn">Login</Link>  
            <Link to="/register" className="btn register-btn">Register</Link>  
            <Link to="/" className="btn subscribe-btn">Subscribe</Link>  
          </div>  
        </section>  
      </main>  

       <Footer></Footer>
    </div>  
  );  
};  

export default LandingPage;