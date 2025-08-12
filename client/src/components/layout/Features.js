import React from 'react';

const Features = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <span className="font-semibold">24/7 Ticket Submission:</span> Customers can submit support tickets anytime.
        </li>
        <li>
          <span className="font-semibold">Centralized Agent Dashboard:</span> A single, clear view for support agents to manage all incoming tickets.
        </li>
        <li>
          <span className="font-semibold">Role-Based Access Control:</span> Secure portals for both customers and agents.
        </li>
        <li className="font-bold text-blue-500">
          AI-Powered Analysis (Coming in Phase 3!): Automatic ticket summarization, categorization, and prioritization.
        </li>
      </ul>
    </div>
  );
};

export default Features;