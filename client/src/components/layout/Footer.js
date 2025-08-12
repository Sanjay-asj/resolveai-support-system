import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto py-8 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-2">ResolveAI</h3>
            <p className="text-gray-400 text-sm">
              Intelligent support, instantly resolved. Our platform uses AI to streamline customer service.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-2">Learn More</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a 
                  href="https://www.youtube.com/watch?v=E_y_J7e4s7A" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white"
                >
                  AI in Customer Support (Video)
                </a>
              </li>
              <li><Link to="/features" className="hover:text-white">Features</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Pondicherry, India</li>
              <li>sanjaydoss737@gmail.com</li>
              <li>+91 93631 21772</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-700">
          © {new Date().getFullYear()} ResolveAI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;