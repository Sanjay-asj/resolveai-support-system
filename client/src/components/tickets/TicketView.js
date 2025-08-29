import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import { getUserRole } from '../../utils/auth';

const TicketView = () => {
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState('');
  const { id } = useParams();

  const fetchTicket = async () => {
    try {
      const res = await api.get(`/tickets/${id}`);
      setTicket(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/tickets/${id}/comments`, { text: comment });
      setComment('');
      fetchTicket();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await api.put(`/tickets/${id}`, { status: newStatus });
      fetchTicket();
    } catch (err) {
      alert('Failed to update status.');
    }
  };
  
  if (!ticket) {
    return <div>Loading...</div>;
  }

  const userRole = getUserRole();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{ticket.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold mt-2 inline-block ${ticket.status === 'Open' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
            {ticket.status}
          </span>
        </div>
        {userRole === 'agent' && (
          <div>
            <label className="text-xs text-gray-500">Change Status</label>
            <select 
              value={ticket.status} 
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border border-gray-300 rounded p-1 text-sm ml-2"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Conversation</h3>
        <div className="space-y-4">
          {ticket.comments.map((c) => (
            <div key={c._id} className="p-4 rounded-lg bg-gray-50 border">
              <p className="font-semibold text-gray-700">{c.name}</p>
              <p className="text-gray-600">{c.text}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(c.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <form onSubmit={onCommentSubmit}>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Type your reply..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Reply
          </button>
        </form>
      </div>
       {userRole === 'agent' && (
         <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 mt-4 inline-block">
            &larr; Back to Dashboard
        </Link>
       )}
    </div>
  );
};

export default TicketView;
