import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Join ResolveAI</h2>
        <p className="text-gray-600 mb-8">
          Choose an option below to continue.
        </p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;