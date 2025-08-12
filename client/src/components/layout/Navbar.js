import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const guestLinks = (
    <Fragment>
      <Link to="/features" className="text-gray-300 hover:text-white">Features</Link>
      <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
      <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
      <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Register
      </Link>
    </Fragment>
  );

  const customerLinks = (
    <Fragment>
      <Link to="/mytickets" className="text-gray-300 hover:text-white">My Tickets</Link>
      <Link to="/submit" className="text-gray-300 hover:text-white">Submit Ticket</Link>
      <button onClick={handleLogout} className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">
        Logout
      </button>
    </Fragment>
  );

  const agentLinks = (
    <Fragment>
      <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
      <Link to="/analytics" className="text-gray-300 hover:text-white">Analytics</Link> {/* This is the new link */}
      <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
      <button onClick={handleLogout} className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer">
        Logout
      </button>
    </Fragment>
  );

  const getLinks = () => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role === 'agent') {
        return agentLinks;
      }
      return customerLinks;
    }
    return guestLinks;
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          ResolveAI
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          {getLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;