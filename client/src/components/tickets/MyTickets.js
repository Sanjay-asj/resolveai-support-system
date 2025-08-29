import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets/mytickets');
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Submitted Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link to={`/tickets/${ticket._id}`} className="text-blue-500 hover:underline font-semibold">
                    {ticket.title}
                  </Link>
                </td>
                <td className="py-3 px-4">{ticket.category}</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs">
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 px-4">{new Date(ticket.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTickets;
