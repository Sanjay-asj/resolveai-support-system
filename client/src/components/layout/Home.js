import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div>
      {/* This hero section is now full-width */}
      <div className="hero-section text-center">
        <div className="animated-gradient"></div>
        <div className="hero-content">
          <h1 className="text-5xl font-bold text-white">
            Get Support Fast – We’re Here to Help.
          </h1>
          <p className="text-xl mt-6 text-white/90 max-w-2xl mx-auto">
            Our intelligent platform gets your support requests to the right people instantly. Submit a ticket and let our AI-powered system do the rest.
          </p>
          <Link
            to="/auth"
            className="mt-10 inline-block bg-white hover:bg-gray-200 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* We add the container here to center the testimonials */}
      <div className="container mx-auto px-8">
         <Testimonials />
      </div>
    </div>
  );
};

export default Home;